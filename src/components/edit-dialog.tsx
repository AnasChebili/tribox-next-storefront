"use client";

import { ChangeEvent, Dispatch, useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";

import { trpc } from "@/app/_trpc/client";
import { createClient } from "../../utils/supabase/client";
import { getQueryKey } from "@trpc/react-query";
import ImageUpload from "./ui/imageUpload";
import Image from "next/image";
import { UUID } from "crypto";
import { RouterInput, RouterOutput } from "@/server";
import tagsTable from "@/data/tags-table.json";
import { boolean, z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { MultiSelect } from "./multi-select";
import { cn } from "@/lib/utils";

const tagsTableList = tagsTable.map((tag, index) => ({
  value: tag.key,
  label: tag.title,
}));

const formatsList = [
  { value: ".eps", label: ".eps" },
  { value: ".obj", label: ".obj" },
];

const softwareList = [
  { value: "/blender.png", label: "Blender" },
  { value: "/ps.png", label: "PhotoShop" },
];
const shapesList = [
  { value: "polygons", label: "Polygons" },
  { value: "vertices", label: "Vertices" },
  { value: "geometry", label: "Geometry" },
];
const assetsList = [
  { value: "textures", label: "Textures" },
  { value: "uvs", label: "UVs" },
  { value: "brushes", label: "Brushes" },
];

const UpdateProductSchema = z.object({
  title: z.string().min(1, "PleaseEnter a Title"),
  description: z.string().min(1, "PleaseEnter a description"),
  tags: z.array(z.string()),
  formats: z.array(z.string()),
  software: z.array(z.string()),
  shapes: z.array(z.string()),
  assets: z.array(z.string()),
  image: z
    .array(
      z.object({
        index: z.number(),
        id: z.string({ message: "Please select an image" }),
      })
    )
    .min(1, "Please select atleast one image"),
  price: z
    .number({ message: "Please set a valid price" })
    .int()
    .min(1, "Please set a valid price"),
});

export default function EditDialog({
  product,
  open,
  setOpen,
}: {
  product: RouterOutput["getProduct"];
  open: boolean;
  setOpen: Dispatch<boolean>;
}) {
  const [imageState, setImageState] = useState<string[]>();

  const supabase = createClient();
  const utils = trpc.useUtils();

  const { data: authUser } = trpc.getAuthUser.useQuery(); //already prefetched in layout

  const { data: user } = trpc.getUser.useQuery(authUser!.user.id); //if authUser was undefined, user would have been redirected in layout

  const updateProductMutation = trpc.updateProduct.useMutation({
    onSuccess: () => {
      console.log("Todo added successfully!");
      utils.invalidate(undefined, { queryKey: getQueryKey(trpc.getProduct) });
    },
    onError: (error) => {
      console.error("Error adding todo:", error);
    },
  });

  useEffect(() => {
    async function convertImageToBase64(
      imageUrl: string
    ): Promise<string | null> {
      try {
        // Fetch the image from the URL
        const response = await fetch(imageUrl);

        // Ensure the response is okay and contains an image
        if (!response.ok) {
          throw new Error("Failed to fetch image");
        }

        // Convert response to a Blob (Binary Large Object)
        const blob = await response.blob();

        // Create a FileReader to read the Blob as a data URL (Base64)
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result as string);
          reader.onerror = reject;
          reader.readAsDataURL(blob); // Start reading the Blob as Base64
        });
      } catch (error) {
        console.error("Error converting image to Base64:", error);
        return null;
      }
    }

    const image64await = async () => {
      const promises = product.image.map((img) => convertImageToBase64(img));
      const image64promises = await Promise.all(promises);
      const image64 = image64promises.filter((img) => img != null);
      setImageState(image64);
    };
    image64await();
  }, [product.image]);

  const defaultTags = useMemo(() => {
    if (product) {
      return product.tags;
    } else {
      return [];
    }
  }, [product]);
  console.log(defaultTags);

  const defaultFormats = useMemo<string[]>(() => {
    if (product) {
      return product.formats;
    } else {
      return [];
    }
  }, [product]);
  console.log(defaultFormats);

  const defaultSoftware = useMemo<string[]>(() => {
    if (product) {
      return product.software;
    } else {
      return [];
    }
  }, [product]);
  const defaultShapes = useMemo<string[]>(() => {
    if (product) {
      return product.shapes;
    } else {
      return [];
    }
  }, [product]);
  const defaultAssets = useMemo<string[]>(() => {
    if (product) {
      return product.assets;
    } else {
      return [];
    }
  }, [product]);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    getValues,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: product?.title,
      description: product?.description,
      tags: defaultTags,
      formats: defaultFormats,
      software: defaultSoftware,
      shapes: defaultShapes,
      assets: defaultAssets,
      image: product
        ? product.image.map(
            (img, index) =>
              ({
                index: index,
                id: `0.${img.split(".")[3]}.${img.split(".")[4]}.${
                  img.split(".")[5]
                }`,
              } as {
                index: number;
                id: string | undefined;
              })
          )
        : [],
      price: product?.price,
    },
    resolver: zodResolver(UpdateProductSchema),
    mode: "onChange",
  });

  const uploadFile = async (
    event: ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const file = event.target.files![0];
    const imageId: string = `${Math.random()}.${file.name}`;

    const bucket = "documents";

    const $image = getValues("image");
    $image[index] = { index, id: imageId };
    setValue("image", $image);

    const reader = new FileReader();

    reader.onloadend = () => {
      const base64String = reader.result as string;
      setImageState((prevvalue) => {
        const newState = [...(prevvalue || [])];
        newState[index] = base64String;
        return newState;
      });
    };

    reader.readAsDataURL(file);

    const { error } = await supabase.storage.from(bucket).upload(imageId, file);

    if (error) {
      alert("Error uploading file.");
      console.log(error);
      return;
    }

    alert("File uploaded successfully!");
  };

  const uploadData = (values: z.infer<typeof UpdateProductSchema>) => {
    console.log({
      ...values,
      image: values.image.map((e) => e.id),
      rating: 0,
      author: user!.name || "",
    });
    updateProductMutation.mutate({
      id: product!.id,
      data: {
        ...values,
        image: values.image.map((e) => e.id),
        rating: 0,
        author: user!.name || "",
      },
    });
  };
  return (
    <div
      className="w-full h-full "
      onClick={(event) => {
        event.stopPropagation();
      }}
    >
      {product && (
        <Dialog
          open={open}
          onOpenChange={($open) => {
            if (!$open) reset();
            setOpen($open);
          }}
        >
          <DialogTrigger asChild></DialogTrigger>
          <DialogContent className="max-w-md w-full border-0 h-[600px] p-6 bg-gray-900 bg-opacity-95 text-gray-400 rounded-lg shadow-md overflow-auto">
            <DialogTitle>Update Product</DialogTitle>
            <form
              onSubmit={handleSubmit((values) => {
                console.log(values);

                uploadData(values as z.infer<typeof UpdateProductSchema>);
                setOpen(false);
              })}
              className="space-y-4"
            >
              <div>
                <label className="block text-sm font-medium text-gray-700 h-full">
                  Image
                </label>
                {watch("image").map((imageRow, _, array) => {
                  const { id, index } = imageRow;
                  const isLastRow = index >= array.length - 1;
                  const MAX_IMAGES = 4;
                  const imageError = errors.image?.[index]?.id;
                  return (
                    <div key={`${index}`}>
                      <div className="flex gap-4 items-center mb-2">
                        {imageState?.[index] && (
                          <Image
                            src={imageState[index]}
                            alt=""
                            height={50}
                            width={50}
                            className="rounded-full"
                          ></Image>
                        )}

                        <ImageUpload
                          id={imageRow.id}
                          onChange={(event) => uploadFile(event, index)}
                        />
                        {isLastRow && index < MAX_IMAGES - 1 ? (
                          <button
                            onClick={() => {
                              const $image = [
                                ...watch("image"),
                                {
                                  index: index + 1,
                                  id: undefined,
                                },
                              ];
                              setValue("image", $image);
                            }}
                            className="text-2xl h-full "
                          >
                            +
                          </button>
                        ) : undefined}
                      </div>

                      {imageError ? (
                        <p className="text-xs text-red-500">
                          {imageError.message}
                        </p>
                      ) : undefined}
                    </div>
                  );
                })}
              </div>

              <div>
                <label
                  className={cn("block text-sm font-medium text-gray-700", {
                    "text-red-500": errors.title,
                  })}
                >
                  Title
                </label>
                <input
                  type="text"
                  {...register("title", { required: true })}
                  className="mt-1 block w-full border border-gray-800 rounded-md bg-transparent py-1"
                />
                <p className="text-xs text-red-500">{errors.title?.message}</p>
              </div>

              <div>
                <label
                  className={cn("block text-sm font-medium text-gray-700", {
                    "text-red-500": errors.description,
                  })}
                >
                  Description
                </label>
                <textarea
                  {...register("description", { required: true })}
                  className="mt-1 block w-full border rounded-md bg-transparent border-gray-800"
                ></textarea>
                <p className="text-xs text-red-500">
                  {errors.description?.message}
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Tags
                </label>

                <div className="flex items-center gap-2 flex-wrap">
                  <MultiSelect
                    options={tagsTableList}
                    onValueChange={(selectedTags) =>
                      setValue("tags", selectedTags)
                    }
                    defaultValue={defaultTags.filter(Boolean) as string[]}
                    placeholder="Select Tags"
                    variant="inverted"
                    animation={2}
                    maxCount={3}
                    className="w-full border-gray-800 bg-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Formats
                </label>
                <div className="flex items-center gap-2 flex-wrap">
                  <MultiSelect
                    options={formatsList}
                    onValueChange={(selectedFormats) =>
                      setValue("formats", selectedFormats)
                    }
                    defaultValue={defaultFormats}
                    placeholder="Select Formats"
                    variant="inverted"
                    animation={2}
                    maxCount={3}
                    className="w-full border-gray-800 bg-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Software
                </label>
                <div className="flex items-center gap-2 flex-wrap">
                  <MultiSelect
                    options={softwareList}
                    onValueChange={(selectedSoftware) =>
                      setValue("software", selectedSoftware)
                    }
                    defaultValue={defaultSoftware}
                    placeholder="Select Software"
                    variant="inverted"
                    animation={2}
                    maxCount={3}
                    className="w-full border-gray-800 bg-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Shapes
                </label>
                <div className="flex items-center gap-2 flex-wrap">
                  <MultiSelect
                    options={shapesList}
                    onValueChange={(selectedShapes) =>
                      setValue("shapes", selectedShapes)
                    }
                    defaultValue={defaultShapes}
                    placeholder="Select Shapes"
                    variant="inverted"
                    animation={2}
                    maxCount={3}
                    className="w-full border-gray-800 bg-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Assets
                </label>
                <div className="flex items-center gap-2 flex-wrap">
                  <MultiSelect
                    options={assetsList}
                    onValueChange={(selectedassets) =>
                      setValue("assets", selectedassets)
                    }
                    defaultValue={defaultAssets}
                    placeholder="Select Assets"
                    variant="inverted"
                    animation={2}
                    maxCount={3}
                    className="w-full border-gray-800 bg-transparent"
                  />
                </div>
              </div>

              <div>
                <label
                  className={cn("block text-sm font-medium text-gray-700", {
                    "text-red-500": errors.price,
                  })}
                >
                  Price
                </label>
                <input
                  type="number"
                  {...register("price", {
                    required: true,
                    valueAsNumber: true,
                  })}
                  className="mt-1 block w-full border border-gray-800 rounded-md bg-transparent py-1"
                />
                <p className="text-xs text-red-500">{errors.price?.message}</p>
              </div>

              <div className="flex justify-end">
                <DialogClose asChild>
                  <button
                    type="button"
                    className="mr-2 px-4 py-2 bg-gray-300 rounded-md bg-transparent border-2"
                  >
                    Cancel
                  </button>
                </DialogClose>
                <button
                  type="submit"
                  className="px-4 py-2 bg-white text-black font-bold rounded-md"
                >
                  Submit
                </button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
