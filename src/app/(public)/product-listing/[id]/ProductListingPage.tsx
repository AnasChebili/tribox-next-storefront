"use client";
import Carousel from "@/components/carousel";
import ProductDescription from "@/components/product-description";
import ProductFormats from "@/components/product-formats";
import Recommendations from "@/components/recommendations";
import Image from "next/image";
import { FC } from "react";
import recs1 from "../../../../data/reccomendations.json";
import { trpc } from "@/app/_trpc/client";
import { RouterOutput } from "@/server";
import { trpcServer } from "@/server/trpc";
import { toast } from "sonner";

export const ProductListingPage: FC<{
  product: RouterOutput["getProduct"];
}> = ({ product }) => {
  const addToCart = () => {
    let cart = JSON.parse(localStorage.getItem("cart") || "[]");
    if (
      cart.some((item: RouterOutput["getProduct"]) => item.id === product.id)
    ) {
      toast.error("Product is already added to your cart");
    } else {
      cart.push(product);
      localStorage.setItem("cart", JSON.stringify(cart));
      toast.success("added");
    }
  };
  const prod: {
    formats: string[];
    ID: string;
    softwares: string[];
  } = {
    formats: [".eps", ".obj"],
    ID: "13fiomoasfj-11ad",
    softwares: ["/blender.png", "/ps.png"],
  };
  return (
    <div className="mb-28">
      <div>
        <div className="mx-[5%] mt-20">
          <div className="flex   space-x-4 items-center">
            <div className=" shadow cursor-pointer shadow-white w-9 h-9 rounded-full bg-white flex items-center">
              <Image
                src="/left.png"
                alt=""
                width={20}
                height={20}
                className="m-auto"
              ></Image>
            </div>
            <h1 className="text-3xl tracking-widest">Back</h1>
          </div>
          <p className="text-2xl mt-5">
            Home/Categories/3D-Model/Product-Name-Lorem-Ipsum
          </p>
        </div>
        <div className="mx-[5%] mt-10">
          <Carousel images={product.image as string[]}></Carousel>
        </div>
        <div className="flex flex-col xl:flex-row xl:justify-between mx-[5%] justify-center align-center ">
          <ProductDescription
            addToCart={addToCart}
            rating={product.rating}
            title={product.title}
            date={product.date}
            author={product.author}
            tags={product.tags}
            description={product.description}
          ></ProductDescription>
          <div className="w-full xl:w-[47.5%] h-full">
            <ProductFormats
              formats={prod.formats}
              ID={prod.ID}
              softwares={prod.softwares}
            ></ProductFormats>
            <div className="hidden sm:flex space-x-3 mt-12">
              <Image src="/barcode.png" alt="" width={345} height={154}></Image>
              <Image src="/qrcode.png" alt="" width={154} height={154}></Image>
              <Image src="/recycle.png" alt="" width={179} height={154}></Image>
            </div>
          </div>
        </div>

        <div className="my-11  ml-[5%]">
          <h1 className="text-4xl font-bold ">
            Stuff You Might Like (Allegedly)
          </h1>
          <p className="mt-2 font-light">
            Personally Picked from your taste and by spying on you.
          </p>
        </div>
        <Recommendations categs={recs1}></Recommendations>
      </div>
    </div>
  );
};