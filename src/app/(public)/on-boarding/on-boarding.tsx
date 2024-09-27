"use client";

import { trpc } from "@/app/_trpc/client";
import { RouterInput } from "@/server";
import { getQueryKey } from "@trpc/react-query";
import { ChangeEvent, useState } from "react";
import { useForm } from "react-hook-form";
import { createClient } from "../../../../utils/supabase/client";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import Image from "next/image";
import ImageUpload from "@/components/ui/imageUpload";
import AssetMarket from "@/components/asset-market";
import { useRouter } from "next/navigation";
import { Spinner } from "@/components/ui/spinner";

export default function OnBoarding() {
  const router = useRouter();
  const { data: authUser } = trpc.getAuthUser.useQuery();

  const { data: user } = trpc.getUser.useQuery(authUser!.user.id, {
    enabled: !!authUser,
  });

  const [imageState, setImageState] = useState<string>("/avatar.svg");

  const [imageId, setImageId] = useState<string>("anonymous-avatar.png");

  const [isLoading, setIsLoading] = useState(false);

  const utils = trpc.useUtils();

  const addUserMutation = trpc.addUser.useMutation();

  function handleAddTodo(data: RouterInput["addUser"]) {
    setIsLoading(true);

    addUserMutation.mutate(data, {
      onSuccess: () => {
        utils.invalidate(undefined, {
          queryKey: getQueryKey(trpc.getUser),
        });
        router.push("/dashboard/profile");
      },
      onError: (error) => {
        setIsLoading(false);
        console.error("Error adding todo:", error);
      },
    });
  }

  const { register, handleSubmit, reset } = useForm({
    values: {
      username: "",
      email: authUser!.user!.id,
      name: "",
      bio: "",
    },
  });

  const uploadFile = async (event: ChangeEvent<HTMLInputElement>) => {
    const supabase = createClient();
    const file = event.target.files![0];
    const img = `${Math.random()}.${file.name}`;
    setImageId(img);

    const bucket = "documents";

    const reader = new FileReader();

    reader.onloadend = () => {
      const base64String = reader.result as string;
      setImageState(base64String);
    };

    reader.readAsDataURL(file);

    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(img, file);

    if (error) {
      alert("Error uploading file.");
      console.log(error);
      return;
    }

    alert("File uploaded successfully!");
  };

  const addData = (values: {
    username: string;
    email: string;
    name: string;
    bio: string;
  }) => {
    const data = {
      ...values,
      id: authUser!.user.id,
      image: imageId,
    };
    handleAddTodo(data);

    reset();
  };

  return (
    <div>
      <div className="blur-sm">
        <AssetMarket></AssetMarket>
      </div>
      <Dialog open={true}>
        <DialogTrigger asChild></DialogTrigger>
        <DialogContent className="max-w-md w-full border-0 p-6 bg-gray-900 bg-opacity-95 text-gray-400 rounded-lg shadow-md">
          <DialogTitle>Tell us some things about you</DialogTitle>
          <form
            onSubmit={handleSubmit((values) => {
              addData(values);
            })}
            className="space-y-4 "
          >
            <div className="flex gap-4 items-center">
              <Image
                src={imageState}
                alt=""
                height={50}
                width={50}
                className="rounded-full"
              ></Image>

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

            <div className="hidden">
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
              <button
                disabled={isLoading}
                type="submit"
                className="w-32 py-3 bg-red-500 text-white font-bold rounded-md flex items-center gap-2 justify-center disabled:opacity-50"
              >
                <p className="h-6">Submit</p>
                <Spinner
                  className={!isLoading ? "hidden" : "w-6 h-6 text-white"}
                ></Spinner>
              </button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
