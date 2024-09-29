"use client";

import { ChangeEvent, ReactEventHandler, useMemo, useState } from "react";
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
import { setSelectedTags } from "@/store/selectedTagsSlice";
import { MultiSelect } from "@/components/multi-select";

import tagsTable from "@/data/tags-table.json";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { cn } from "@/lib/utils";
import Image from "next/image";
import FileUpload from "./file-upload";
import { Spinner } from "./ui/spinner";

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

const UploadProductSchema = z.object({
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
  file: z.string().min(1, "Please upload the product file"),
});

export default function DashUpload() {
  const supabase = createClient();

  const utils = trpc.useUtils();

  const { data: authUser } = trpc.getAuthUser.useQuery(); //already prefetched in layout

  const { data: user } = trpc.getUser.useQuery(authUser!.user.id); //if authUser was undefined, user would have been redirected in layout

  const [isLoading, setIsLoading] = useState(false);
  const addTodoMutation = trpc.addTodo.useMutation({
    onSuccess: async () => {
      await utils.invalidate(undefined, {
        queryKey: getQueryKey(trpc.getProduct),
      });
      reset();
      setOpen(false);
      setIsLoading(false);
    },
    onError: (error) => {
      console.error("Error adding todo:", error);
      setIsLoading(false);
    },
  });

  const [imageState, setImageState] = useState<string[]>([]);

  const defaultTags = useMemo<string[]>(() => [], []);
  const defaultFormats = useMemo<string[]>(() => [], []);
  const defaultSoftware = useMemo<string[]>(() => [], []);
  const defaultShapes = useMemo<string[]>(() => [], []);
  const defaultAssets = useMemo<string[]>(() => [], []);

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
      title: "",
      description: "",
      tags: defaultTags,
      formats: defaultFormats,
      software: defaultSoftware,
      shapes: defaultShapes,
      assets: defaultAssets,
      image: [{ index: 0, id: undefined }] as {
        index: number;
        id: string | undefined;
      }[],
      price: 0,
      file: "",
    },
    resolver: zodResolver(UploadProductSchema),
    mode: "onChange",
  });

  const [open, setOpen] = useState(false);

  const uploadFile = async (
    event: ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const file = event.target.files![0];
    if (!file) return;
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
      console.log(error);
      return;
    }
  };

  const uploadData = (values: z.infer<typeof UploadProductSchema>) => {
    setIsLoading(true);
    addTodoMutation.mutate({
      ...values,
      image: values.image.map((e) => e.id),
      rating: 0,
      author_id: user!.id,
      author: user!.name || "",
    });
  };

  return (
    <div className=" py-[5%] px-[5%]">
      <Dialog
        open={open}
        onOpenChange={($open) => {
          if (!$open) reset();
          setOpen($open);
          setImageState([]);
        }}
      >
        <DialogTrigger asChild>
          <button className="w-[150px] h-[150px] flex justify-center items-center  bg-gray-800 bg-opacity-50  text-gray-400 rounded-md">
            <div>
              <p>Add Product </p>
              <p>+</p>
            </div>
          </button>
        </DialogTrigger>
        <div className="  overflow-auto">
          <DialogContent className="max-w-md w-full border-0 h-[600px] p-6 bg-gray-900 bg-opacity-95 text-gray-400 rounded-lg shadow-md overflow-auto">
            <DialogTitle>Upload Product</DialogTitle>
            <form
              onSubmit={handleSubmit((values) => {
                uploadData(values as z.infer<typeof UploadProductSchema>);
              })}
              className="space-y-4 "
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
                          <div className="w-[50px] h-[50px]">
                            <Image
                              src={imageState[index]}
                              alt=""
                              height={50}
                              width={50}
                              className="w-full h-full object-cover rounded-full"
                            ></Image>
                          </div>
                        )}
                        <ImageUpload
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
                    defaultValue={defaultTags}
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

              <label
                className={cn("block text-sm font-medium text-gray-700", {
                  "text-red-500": errors.file,
                })}
              >
                Product File
              </label>

              <FileUpload
                setFile={(file: string) => setValue("file", file)}
              ></FileUpload>
              <p className="text-xs text-red-500">{errors.file?.message}</p>

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
                  disabled={isLoading}
                  type="submit"
                  className="px-4 py-2 bg-white text-black font-bold rounded-md disabled:opacity-50 flex items-center gap-2"
                >
                  Submit
                  {isLoading && <Spinner className="w-5 h-5"></Spinner>}
                </button>
              </div>
            </form>
          </DialogContent>
        </div>
      </Dialog>
    </div>
  );
}
