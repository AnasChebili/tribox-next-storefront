import { trpc } from "@/app/_trpc/client";
import Image from "next/image";
import Link from "next/link";

export default function WorkCard({
  id,
  image,
  rating,
  title,
  date,
  author,
  tags,
  description,
}: {
  id: number;
  image: string;
  rating: string;
  title: string;
  date: string;
  author: string;
  tags: Array<string>;
  description: string;
}) {
  const imgUrlObj = trpc.getImage.useQuery(image[0]);
  const imgUrl = imgUrlObj.data;

  return (
    <div className="cursor-pointer">
      <Link href={`/product-listing/${id}`}>
        <Image src={imgUrl} alt="" width={400} height={350}></Image>
        <div className="flex px-2 rounded-md bg-red-500 text-black w-fit mt-4">
          <p className="font-semibold mr-1">{rating}</p>
          <Image src="/Star 7.svg" alt="" width={15} height={15}></Image>
        </div>
        <h1 className="text-5xl font-bold w-[75%]">{title}</h1>
        <div className="flex mt-2">
          <p className="font-bold mr-2 mt">Upload Date</p>
          <p className="font-extralight">{date}</p>
        </div>
        <div className="flex mt-2">
          <p className="font-bold mr-2 ">Author </p>
          <p className="font-extralight">{author}</p>
        </div>
        <div className="flex mt-4">
          {tags.map((tag, index) => (
            <div
              key={index}
              className="bg-white px-3 font-bold text-xs text-center text-black mr-2 rounded-lg "
            >
              {tag}
            </div>
          ))}
        </div>
        <p className="mt-4 text-sm">{description}</p>
        <button className="underline text-red-500 mt-2 text-xl underline-offset-2">
          View Details
        </button>
      </Link>
    </div>
  );
}
