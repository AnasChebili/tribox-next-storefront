import Image from "next/image";
import Link from "next/link";

export default function AssetMarket() {
  return (
    <div className="flex justify-between items-center mt-16">
      <div className="w-[500px] ml-8 mb-8">
        <h1 className="text-5xl font-bold tracking-widest mb-7">
          ASSET MARKET
        </h1>
        <h2 className="text-4xl font-extralight tracking-[15px] mb-7">
          WITH A TWIST
        </h2>
        <p className="tracking-[4px] text-sm">
          <span className="mb-7 block">
            Because true artists struggle, go through pain and then when we
            emerge from an internal conflict, we bask in the glory of what we
            create. but in cases we lose the battle , we download a template and
            call it a day. thinking “did we even do anyhting?”
          </span>
          <span className="mb-7 block">
            Reconstruct iconic looks or create something entirely new. Our
            assets are the raw materials for your next masterpiece. so you can
            steal without the guilt (like an artist)
          </span>
          <span className="mb-7 block">
            or you could buy the design and be done with it (like a sheep)
          </span>
          <span className="mb-7 block font-bold">
            Contrary to popular belief, Lorem Ipsum is not simply random text.
            It has roots in a piece of classical Latin literature from 45 BC,
            making it over 2000 years old.
          </span>
        </p>
        <div className="flex space-x-5">
          <Link href="/store">
            <button className="bg-sky-500 h-[43px] w-[125px] leading-[37px] align-middle text-base font-light">
              View Store
            </button>
          </Link>
          <Link href="/dashboard">
            <button className="bg-transparent underline underline-offset-4 font-light">
              Upload an asset
            </button>
          </Link>
        </div>
      </div>
      <Image
        src="/art.svg"
        alt=""
        width={800}
        height={700}
        className=" hidden md:block  md:w-[400px] xl:w-[800px]"
      ></Image>
    </div>
  );
}
