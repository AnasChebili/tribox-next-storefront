import Image from "next/image";
import tagsTable from "@/data/tags-table.json";
import { RouterOutput } from "@/server";
import Rating from "./rating";

export default function ProductDescription({
  addToCart,
  addToPayment,
  product,
  user,
  cartCount,
}: {
  addToCart: () => void;
  addToPayment: (free: boolean) => void;
  product: RouterOutput["getProduct"];
  user: RouterOutput["getUser"] | undefined;
  cartCount: number;
}) {
  return (
    <div className=" mt-20  cursor-pointer w-full xl:w-[47.5%]">
      <h1 className="text-7xl sm:text-[112px] leading-[100px]  font-ThickThinks break-words">
        {product.title}
      </h1>
      <div className="flex gap-5 mt-12">
        <div className="flex py-3 px-5 rounded-md  bg-white text-black text-lg w-fit">
          <p className="font-semibold text-3xl mr-2">{product.rating}</p>
          <Image src="/Star 7.svg" alt="" width={25} height={25}></Image>
        </div>
        <div>
          <Rating product={product} user={user}></Rating>
        </div>
      </div>
      <div className="">
        <div className=" mt-3 flex justify-between">
          <div className=" mt-2">
            <p className="font-bold text-xl mr-2 ">Author </p>
            <p className="font-extralight text-xl break-words">
              {product.author}
            </p>
          </div>
          <div className=" mt-2">
            <p className="font-bold mr-2 text-xl">Upload Date</p>
            <p className="font-extralight text-xl">
              {product.created_at.slice(0, 10)}
            </p>
          </div>
        </div>

        <p className=" tracking-[5px] text-xl  whitespace-pre-line mt-9 break-words ">
          {product.description}
        </p>
        <div className="flex mt-6 flex-wrap gap-y-5">
          {product.tags.map((tag, index) => (
            <div
              key={index}
              className="bg-white px-3 font-bold  text-center text-black mr-2 rounded-3xl "
            >
              {tagsTable.find((element) => element.key === tag)!.title}
            </div>
          ))}
        </div>
        <button className="underline text-xl text-white mt-6 ml-6 font-bold underline-offset-8">
          Download this listing as a cool poster
        </button>
        <button
          onClick={() => {
            addToPayment(true);
          }}
          className=" text-black w-full py-5 rounded-lg bg-white mt-6   font-bold text-xl"
        >
          {user &&
          user.bought_products.find(
            (boughtProduct) => boughtProduct === product.id
          )
            ? "You bought this product"
            : "Download for free"}
        </button>
        <div className="w-full flex items-center h-[68px] mt-6">
          <button
            onClick={() => {
              addToPayment(false);
            }}
            className="basis-5/6 h-full rounded-md bg-gradient-to-r from-red-400 to-white text-xl  font-bold "
          >
            {user &&
            user.bought_products.find(
              (boughtProduct) => boughtProduct === product.id
            )
              ? "Download"
              : `Buy now for ${product.price} $`}
          </button>
          <button
            onClick={addToCart}
            className="basis-1/6 flex items-center justify-center h-full"
          >
            <div className="relative">
              <div className="absolute h-5 w-5 rounded-full bg-red-500 top-0 right-0 z-0"></div>
              <div className="absolute top-[-1px] right-[13px] z-10 text-sm h-0 w-0">
                {cartCount}
              </div>
              <Image src="/cart.svg" alt="" width={50} height={50}></Image>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
