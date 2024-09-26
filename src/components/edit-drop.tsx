import { trpc } from "@/app/_trpc/client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { getQueryKey } from "@trpc/react-query";
import Image from "next/image";
import EditDialog from "./edit-dialog";
import { UUID } from "crypto";
import { Dispatch, useState } from "react";
import { RouterOutput } from "@/server";

export default function EditDrop({
  product,
}: {
  product: RouterOutput["getProduct"];
}) {
  const deleteProductMutation = trpc.deleteProduct.useMutation();
  const utils = trpc.useUtils();

  function handleDeleteProduct(id: string) {
    deleteProductMutation.mutate(id, {
      onSuccess: () => {
        console.log("product Deleted Succefully");
        utils.invalidate(undefined, {
          queryKey: getQueryKey(trpc.getProduct),
        });
      },
      onError: (error) => {
        console.error("Error adding todo:", error);
      },
    });
  }

  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <div className=" bg-black p-1 rounded-xl">
            <Image src="/edit-menu.png" alt="" height={28} width={28}></Image>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="bg-black text-white border-0 w-auto">
          <DropdownMenuItem
            className="flex cursor-pointer p-2"
            onClick={(event) => {
              event.stopPropagation();
              handleDeleteProduct(product.id);
            }}
          >
            <div className=" w-4 h-4 ">
              <Image
                src="/trash-bin.png"
                alt=""
                height={128}
                width={128}
              ></Image>
            </div>
            <p>Delete</p>
          </DropdownMenuItem>
          <DropdownMenuItem
            className="cursor-pointer p-0"
            onClick={(event) => {
              event.stopPropagation();
              setIsEditDialogOpen((prevvalue) => !prevvalue);
            }}
          >
            <div className=" w-full h-full flex p-2">
              <div className="w-4 h-4 ">
                <Image
                  src="/editing.png"
                  alt=""
                  height={128}
                  width={128}
                ></Image>
              </div>
              <p>Edit</p>
            </div>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <EditDialog
        open={isEditDialogOpen}
        setOpen={setIsEditDialogOpen}
        product={product}
      ></EditDialog>
    </>
  );
}
