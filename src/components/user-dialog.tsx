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
import { cn } from "@/lib/utils";

type userUpdate = {
  id: UUID;
  data: {
    image: string;
    username: string;
    email: string;
    name: string;
    bio: string;
  };
};

export default function UserDialog({
  opened,
  authId,
  id,
  image,
  username,
  email,
  name,
  bio,
}: {
  opened: boolean;
  authId: UUID;
  id: UUID;
  image: string;
  username: string;
  email: string;
  name: string;
  bio: string;
}) {
  const [imageState, setImageState] = useState<string>(image);

  const updateUserMutation = trpc.updateUser.useMutation();
  const utils = trpc.useUtils();

  const addUserMutation = trpc.addUser.useMutation();

  function handleAddTodo(data: userUpdate) {
    if (id) {
      updateUserMutation.mutate(data, {
        onSuccess: () => {
          console.log("Todo added successfully!");
          utils.invalidate(undefined, {
            queryKey: getQueryKey(trpc.getUser),
          });
        },
        onError: (error) => {
          console.error("Error adding todo:", error);
        },
      });
    } else {
      data.id = authId;
      data.data.image = "";
      const param = {
        id: data.id,
        username: data.data.username,
        email: data.data.email,
        name: data.data.name,
        ...(data.data.image && { image: data.data.image }),
        bio: data.data.bio,
      };
      addUserMutation.mutate(param, {
        onSuccess: () => {
          console.log("Todo added successfully!");
          utils.invalidate(undefined, {
            queryKey: getQueryKey(trpc.getUser),
          });
        },
        onError: (error) => {
          console.error("Error adding todo:", error);
        },
      });
    }
  }

  let imageId: string = "";

  const { register, handleSubmit, reset } = useForm({
    values: {
      username: username,
      email: email,
      name: name,
      bio: bio,
    },
  });
  console.log(opened);

  const [open, setOpen] = useState(opened);
  console.log(open);

  const uploadFile = async (event: ChangeEvent<HTMLInputElement>) => {
    const supabase = createClient();
    const file = event.target.files![0];
    imageId = `${Math.random()}.${file.name}`;

    const bucket = "documents";

    setImageState(imageId);

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
    username: string;
    email: string;
    name: string;
    bio: string;
  }) => {
    const data = {
      id,
      data: { ...values, image: imageState },
    };

    console.log(data);
    handleAddTodo(data);

    reset();
    setOpen(false);
  };

  return (
    <div className="">
      <Dialog open={opened ? opened : open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <p className="px-6 py-3 rounded-lg bg-gray-900 font-bold hover:bg-gray-700 cursor-pointer">
            edit
          </p>
        </DialogTrigger>
        <DialogContent className="max-w-md w-full border-0 p-6 bg-gray-900 bg-opacity-95 text-gray-400 rounded-lg shadow-md">
          <DialogTitle>Edit Information</DialogTitle>
          <form
            onSubmit={handleSubmit((values) => {
              uploadData(values);
            })}
            className="space-y-4 "
          >
            <div>
              {JSON.stringify(imageState)}
              <ImageUpload onChange={uploadFile} id="0"></ImageUpload>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 ">
                Username
              </label>
              <input
                type="text"
                {...register("username", { required: true })}
                className="mt-1 block w-full border border-gray-800 rounded-md bg-transparent py-1"
              />
            </div>

            <div className={opened ? "hidden" : ""}>
              <label className="block text-sm font-medium text-gray-700 ">
                Email
              </label>
              <input
                type="text"
                {...register("email", { required: true })}
                className="mt-1 block w-full border border-gray-800 rounded-md bg-transparent py-1"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 ">
                Name
              </label>
              <input
                type="text"
                {...register("name", { required: true })}
                className="mt-1 block w-full border border-gray-800 rounded-md bg-transparent py-1"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Bio
              </label>
              <textarea
                {...register("bio", { required: false })}
                className="mt-1 block w-full border rounded-md bg-transparent border-gray-800"
              ></textarea>
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
