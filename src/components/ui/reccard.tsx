"use client"
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { createClient } from "../../../utils/supabase/client";
import { Skeleton } from "./skeleton";


export default function RecCard({
  image,
  rating,
  title,
  date,
  author,
  tags,
  description,
  id
}: {
  image: string,
  rating: string,
  title: string,
  date: string,
  author:string,
  tags: Array<string>,
  description: string,
  id:number

}) {
  const supabase = createClient()

  const [imgUrl, setImgUrl] = useState<string | null>()

  useEffect(() => {
    async function downloadImage(path: string) {
      try {
        console.log(path);
        
        const { data, error } = await supabase.storage.from('documents').download(path)
        console.log("data:",data);
        
        if (error) {
          throw error
        }

        const url = URL.createObjectURL(data)
        console.log("url:",url);
        
        setImgUrl(url)
        console.log("imgurl:",imgUrl);
        
      } catch (error) {
        console.log('Error downloading image: ', error)
      }
    }
    console.log("a");
    

    downloadImage(image)
    console.log(imgUrl);
      
  }, [supabase])


  return <div className="cursor-pointer">
    <Link href={`/product-listing/${id}`}>
    <div className="h-[225px] overflow-hidden">
      { imgUrl ?
      <Image src={imgUrl} alt="" width={400} height={350} className="object-cover min-h-[225px]"></Image> :
      <Skeleton className="h-[225px] w-[250px] rounded-xl bg-gray-500" />
      } 
    
    </div>
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
    <div className="flex mt-2 flex-wrap ">
    {tags.map((tag,index)=>(<div key={index} className="bg-white px-3 font-bold text-xs text-center text-black mr-2 mb-2 rounded-lg ">
        {tag}
    </div>))}
    </div>
    <p className="mt-2 text-[10px] font-light">{description}</p>
    <button className="underline text-orange-300 mt-2 text-xl underline-offset-2">View Details</button>
    </Link>
  </div>;
}
