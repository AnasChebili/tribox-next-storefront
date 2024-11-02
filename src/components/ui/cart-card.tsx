import Image from "next/image";
import Link from "next/link";
import { Skeleton } from "./skeleton";
import { toast } from "sonner";
import { RouterOutput } from "@/server";
import { MouseEventHandler } from "react";
import tagsTable from "@/data/tags-table.json";

export default function CartCard({
  product,
  removeCard,
}: {
  product: RouterOutput["getProduct"];
  removeCard: (id: string) => void;
}) {
  return (
    <div className="cursor-pointer">
      <Link href={`/product-listing/${product.id}`}>
        <div className="h-[225px] overflow-hidden relative">
          <div
            className="absolute right-2 top-2 z-10 bg-black p-[6px] rounded-full"
            onClick={(e) => {
              removeCard(product.id);
              e.stopPropagation();
              e.preventDefault();
            }}
          >
            <Image
              src="/trash-bin.png"
              alt=""
              height={15}
              width={15}
              className="z-0"
            ></Image>
          </div>
          {product.image?.[0] ? (
            <Image
              src={product.image[0]}
              alt=""
              width={400}
              height={350}
              className="object-cover min-h-[225px]"
            ></Image>
          ) : (
            <Skeleton className="h-[225px] w-[250px] rounded-[0px] bg-gray-500" />
          )}
        </div>
        <div className="flex px-2 py-[2px] rounded-md bg-orange-300 text-black w-fit mt-4">
          <p className="font-semibold text-xs mr-1">{product.rating}</p>
          <Image src="/Star 7.svg" alt="" width={10} height={10}></Image>
        </div>
        <h1 className="text-3xl overflow-hidden line-clamp-2 text-ellipsis font-bold w-[75%] break-words">
          {product.title}
        </h1>
        <div className="flex mt-1">
          <p className="font-bold text-sm mr-2">Upload Date</p>
          <p className="font-extralight text-sm">
            {product.created_at.slice(0, 10)}
          </p>
        </div>
        <div className="flex mt-1">
          <p className="font-bold mr-2 text-sm ">Author </p>
          <p className="font-extralight text-sm truncate break-words">
            {product.author}
          </p>
        </div>
        <div className="flex mt-2 flex-wrap h-[96px] items-center">
          {product.tags.map((tag, index) => (
            <div
              key={index}
              className="bg-white px-3 h-[16px] font-bold text-xs text-center text-black mr-2 mb-2 rounded-lg "
            >
              {tagsTable.find(($tag) => $tag.key == tag)?.title}
            </div>
          ))}
        </div>
        <p className="mt-2 text-[10px] font-light text-ellipsis overflow-hidden line-clamp-3 h-[45px]">
          {product.description}
        </p>
        <button className="underline text-orange-300 mt-2 text-xl underline-offset-2">
          View Details
        </button>
      </Link>
    </div>
  );
}
