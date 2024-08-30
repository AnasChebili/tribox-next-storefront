import Image from "next/image";
import Link from "next/link";


export default function RecCard({
  image,
  rating,
  title,
  date,
  author,
  tags,
  description,
}: {
  image: string,
  rating: string,
  title: string,
  date: string,
  author:string,
  tags: Array<string>,
  description: string

}) {
  return <div className="cursor-pointer">
    <Link href="/product-listing">
    <Image src={image} alt="" width={400} height={350}></Image>
    <div className="flex px-2 py-[2px] rounded-md bg-orange-300 text-black w-fit mt-4">
        <p className="font-semibold text-xs mr-1">{rating}</p>
        <Image src="/Star 7.svg" alt="" width={10} height={10}></Image>
    </div>
    <h1 className="text-3xl font-bold w-[75%]">{title}</h1>
    <div className="flex mt-1">
    <p className="font-bold text-sm mr-2">Upload Date</p>
    <p className="font-extralight text-sm">{date}</p>
    </div>
    <div className="flex mt-1">
    <p className="font-bold mr-2 text-sm ">Author </p>
    <p className="font-extralight text-sm">{author}</p>
    </div>
    <div className="flex mt-2">
    {tags.map((tag,index)=>(<div key={index} className="bg-white px-3 font-bold text-xs text-center text-black mr-2 rounded-lg ">
        {tag}
    </div>))}
    </div>
    <p className="mt-2 text-[10px] font-light">{description}</p>
    <button className="underline text-orange-300 mt-2 text-xl underline-offset-2">View Details</button>
    </Link>
  </div>;
}
