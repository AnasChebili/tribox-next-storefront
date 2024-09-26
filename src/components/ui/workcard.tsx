import { trpc } from "@/app/_trpc/client";
import Image from "next/image";
import Link from "next/link";
import tagsTable from "@/data/tags-table.json";
import { RouterOutput } from "@/server";

export default function WorkCard({
  product,
}: {
  product: RouterOutput["getProduct"];
}) {
  const imgUrlObj = trpc.getImage.useQuery(product.image[0]);
  const imgUrl = imgUrlObj.data;

  return (
    <div className="cursor-pointer">
      <Link href={`/product-listing/${product.id}`}>
        <div className="h-[300px] overflow-hidden">
          {imgUrl && (
            <Image
              src={imgUrl}
              alt=""
              width={400}
              height={350}
              className="object-cover min-h-[300px]"
            ></Image>
          )}
        </div>

        <div className="flex px-2 rounded-md bg-red-500 text-black w-fit mt-4">
          <p className="font-semibold mr-1">{product.rating}</p>
          <Image src="/Star 7.svg" alt="" width={15} height={15}></Image>
        </div>
        <h1 className="text-5xl font-bold w-[75%] overflow-hidden line-clamp-2 text-ellipsis break-words">
          {product.title}
        </h1>
        <div className="flex mt-2">
          <p className="font-bold mr-2 mt">Upload Date</p>
          <p className="font-extralight">{product.created_at.slice(0, 10)}</p>
        </div>
        <div className="flex mt-2">
          <p className="font-bold mr-2 ">Author </p>
          <p className="font-extralight break-words">{product.author}</p>
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
        <p className="mt-4 text-sm tracking-[5px] whitespace-pre-line break-words text-ellipsis overflow-hidden line-clamp-3">
          {product.description}
        </p>
        <button className="underline text-red-500 mt-2 text-xl underline-offset-2">
          View Details
        </button>
      </Link>
    </div>
  );
}
