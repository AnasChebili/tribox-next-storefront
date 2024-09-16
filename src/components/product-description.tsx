import Image from "next/image";

export default function ProductDescription({
  addToCart,
  rating,
  title,
  date,
  author,
  tags,
  description,
}: {
  addToCart: () => void;
  rating: number;
  title: string;
  date: string;
  author: string;
  tags: Array<string>;
  description: string;
}) {
  return (
    <div className=" mt-20  cursor-pointer w-full xl:w-[47.5%]">
      <h1 className="text-7xl sm:text-[112px] leading-[100px]  font-ThickThinks">
        {title}
      </h1>
      <div className="flex py-3 px-5 rounded-md mt-7 bg-white text-black text-lg w-fit">
        <p className="font-semibold text-3xl mr-2">{rating}</p>
        <Image src="/Star 7.svg" alt="" width={25} height={25}></Image>
      </div>
      <div className="">
        <div className=" mt-3 flex justify-between">
          <div className=" mt-2">
            <p className="font-bold text-xl mr-2 ">Author </p>
            <p className="font-extralight text-xl">{author}</p>
          </div>
          <div className=" mt-2">
            <p className="font-bold mr-2 text-xl">Upload Date</p>
            <p className="font-extralight text-xl">{date}</p>
          </div>
        </div>

        <p className=" tracking-[5px] text-xl  whitespace-pre-line mt-9 ">
          {description}
        </p>
        <div className="flex mt-6">
          {tags.map((tag, index) => (
            <div
              key={index}
              className="bg-white px-3 font-bold  text-center text-black mr-2 rounded-3xl "
            >
              {tag}
            </div>
          ))}
        </div>
        <button className="underline text-xl text-white mt-6 ml-6 font-bold underline-offset-8">
          Download this listing as a cool poster
        </button>
        <button className=" text-black w-full py-5 rounded-lg bg-white mt-6   font-bold text-xl">
          Download for free
        </button>
        <div className="w-full flex items-center h-[68px] mt-6">
          <button className="basis-5/6 h-full rounded-md bg-gradient-to-r from-red-400 to-white text-xl  font-bold ">
            Buy now for $30
          </button>
          <button className="basis-1/6 flex items-center justify-center h-full">
            <div onClick={addToCart}>
              <Image src="/cart.svg" alt="" width={50} height={50}></Image>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
