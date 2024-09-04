"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";

import { log } from "console";
import { trpc } from "@/app/_trpc/client";
import DashProducts from "@/components/dashproducts";
import { createClient } from "../../utils/supabase/client";

export default function DashUpload( {onDataUpload}: {onDataUpload: () => void}) {
  const supabase = createClient();

  const addTodoMutation = trpc.addTodo.useMutation();

  function handleAddTodo(data) {
    addTodoMutation.mutate(data, {
      onSuccess: () => {
        console.log("Todo added successfully!");
        onDataUpload()
        // Optionally, clear form or update UI after successful addition
      },
      onError: (error) => {
        console.error("Error adding todo:", error);
      },
    });
  }

  let imageId: string = "";

  const { register, handleSubmit, reset } = useForm();
  const [open, setOpen] = useState(false);

  // Handle file upload event
  const uploadFile = async (event) => {
    console.log(event);
    console.log(event.target);
    console.log(event.target.files);

    const file = event.target.files[0];
    imageId = `${Math.random()}.${file.name}`;
    console.log(file);
    console.log(file.name);

    const bucket = "documents";

    // Call Storage API to upload file
    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(imageId, file);

    // Handle error if upload failed
    if (error) {
      alert("Error uploading file.");
      console.log(error);

      return;
    }

    alert("File uploaded successfully!");
  };

  return (
    <div className=" py-[5%] px-[5%] ">
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <button className="w-[150px] h-[150px] flex justify-center items-center  bg-gray-800 bg-opacity-50  text-gray-400 rounded-md">
            <div>
              <p>Add Product </p>
              <p>+</p>
            </div>
          </button>
        </DialogTrigger>
        <DialogContent className="max-w-md w-full border-0 p-6 bg-gray-900 bg-opacity-95 text-gray-400 rounded-lg shadow-md">
          <DialogTitle>Upload Product</DialogTitle>
          <form
            onSubmit={handleSubmit((data) => {
              data.tags = data.tags.split(",");
              console.log(data.tags);

              data = {
                ...data,
                
                created_at: new Date(),
                image: imageId,
                rating: 4,
                date: "6/4/08",
                author: "abbas",
              };
              console.log(data);

              handleAddTodo(data);

              reset();
              setOpen(false);
              
            })}
            className="space-y-4 "
          >
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Product Image
              </label>
              <input
                type="file"
                accept="image/*"
                required
                onChange={uploadFile}
                className="mt-1 block w-full rounded-md border-0 cursor-pointer"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 ">
                Title
              </label>
              <input
                type="text"
                {...register("title", { required: true })}
                className="mt-1 block w-full border border-gray-800 rounded-md bg-transparent py-1"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <textarea
                {...register("description", { required: true })}
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
