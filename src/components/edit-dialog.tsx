"use client";

import { ChangeEvent, ReactEventHandler, useState } from "react";
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

type productUpload = {
  id: string;
  data: {
    image?: string[];
    title?: string;
    tags?: string[];
    description?: string;
  };
};

export default function EditDialog({ id }: { id: UUID }) {
  console.log("edit");
  const productObj = trpc.getProduct.useQuery(id);
  const isLoading = productObj.isLoading;
  const data = productObj.data;
  console.log(data, isLoading);
  const product: {
    image: string[];
    rating: string;
    title: string;
    date: string;
    author: string;
    tags: Array<string>;
    description: string;
  } = data ? data[0] : {};

  const [imageState, setImageState] = useState<string[]>(product.image);

  const supabase = createClient();

  const updateProductMutation = trpc.updateProduct.useMutation();
  const utils = trpc.useUtils();

  function handleAddTodo(data: productUpload) {
    updateProductMutation.mutate(data, {
      onSuccess: () => {
        console.log("Todo added successfully!");
        utils.invalidate(undefined, { queryKey: getQueryKey(trpc.getProduct) });
      },
      onError: (error) => {
        console.error("Error adding todo:", error);
      },
    });
  }

  let imageId: string = "";

  const { register, handleSubmit, reset } = useForm({
    values: {
      title: product.title,
      description: product.description,
      tags: product.tags?.toString(),
    },
  });
  const [open, setOpen] = useState(false);

  const uploadFile = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files![0];
    imageId = `${Math.random()}.${file.name}`;

    const bucket = "documents";

    setImageState((prevvalue) => {
      prevvalue[parseInt(event.target.id)] = imageId;
      return prevvalue;
    });

    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(imageId, file);

    if (error) {
      alert("Error uploading file.");
      console.log(error);
      return;
    }

    alert("File uploaded successfully!");
  };

  const uploadData = (values: {
    title: string;
    description: string;
    tags: string;
  }) => {
    const transformedValues = {
      ...values,
      tags: values.tags.split(","),
    };

    const arr: string[] = [];
    imageState?.forEach((element) => {
      if (element) {
        arr.push(element);
      }
    });

    const data = {
      id,
      data: { ...transformedValues, image: imageState },
    };

    console.log(data);

    if (/* arr.length === 0 */ false) {
      alert("you need at least one picture");
    } else {
      handleAddTodo(data);

      reset();
      setOpen(false);
    }
  };

  return (
    <div
      className="w-full h-full "
      onClick={(event) => {
        event.stopPropagation();
      }}
    >
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <div className=" w-full h-full flex p-2">
            <div className="w-4 h-4 ">
              <Image src="/editing.png" alt="" height={128} width={128}></Image>
            </div>
            <p>Edit</p>
          </div>
        </DialogTrigger>
        <DialogContent className="max-w-md w-full border-0 p-6 bg-gray-900 bg-opacity-95 text-gray-400 rounded-lg shadow-md">
          <DialogTitle>Upload Product</DialogTitle>
          <form
            onSubmit={handleSubmit((values) => {
              uploadData(values);
            })}
            className="space-y-4 "
          >
            <div>
              {JSON.stringify(imageState)}
              <ImageUpload onChange={uploadFile} id="0"></ImageUpload>
              <ImageUpload onChange={uploadFile} id="1"></ImageUpload>
              <ImageUpload onChange={uploadFile} id="2"></ImageUpload>
              <ImageUpload onChange={uploadFile} id="3"></ImageUpload>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 ">
                Title
              </label>
              <input
                type="text"
                {...register("title", { required: false })}
                className="mt-1 block w-full border border-gray-800 rounded-md bg-transparent py-1"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <textarea
                {...register("description", { required: false })}
                className="mt-1 block w-full border rounded-md bg-transparent border-gray-800"
              ></textarea>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Tags (comma separated)
              </label>
              <input
                type="text"
                {...register("tags")}
                className="mt-1 block w-full border rounded-md bg-transparent border-gray-800 py-1"
              />
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
    </div>
  );
}
