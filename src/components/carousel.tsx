"use client";

import Image from "next/image";
import { useState } from "react";

export default function Carousel({ images }: { images: string[] }) {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const handlePrevClick = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };
  const handleNextClick = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="cursor-pointer">
      <div className="relative w-full ">
        <div className="relative z-0">
          {
            <div  className="h-[50vw] w-full flex justify-center items-center ">
              <Image
                src={images[currentIndex]}
                alt=""
                fill
                className="object-cover min-h-full min-w-full "
              />
            </div>
          }
        </div>
        <div onClick={handlePrevClick} className=" outline-0 focus:outline-none shadow-sm shadow-black z-10 w-10 h-10 rounded-full cursor-pointer bg-white flex items-center absolute top-1/2 left-5 transform -translate-y-1/2 hover:bg-gray-400">
          <Image src="/left.png" alt="" width={20} height={20} className="m-auto relative outline-0 focus:outline-none"></Image>
        </div>
        
        <div onClick={handleNextClick} className=" outline-0 focus:outline-none shadow-sm shadow-black z-10 w-10 h-10 rounded-full cursor-pointer bg-white flex items-center absolute top-1/2 right-5 transform -translate-y-1/2 hover:bg-gray-400">
          <Image src="/right.png" alt="" width={20} height={20} className="m-auto relative outline-0 focus:outline-none "></Image>
        </div>
       
        
      </div>
      <div className="grid grid-cols-7">
          {images.map((image,index)=> <div key={index} onClick={()=>{setCurrentIndex(index)}} className={`border-white h-[8vw] flex justify-center items-center  w-auto ${index === currentIndex && "border-4"}`}> <Image src={image} alt="" width={236} height={139} className="object-cover w-full h-full"></Image></div> )}
          <div className="col-span-3 px-2 py-1 flex justify-center items-center">
            <Image src="/carouseldeco.png" alt="" width={572} height={111} className="w-full h-full object-contain"></Image>
          </div>
      </div>
    </div>
  );
}
