import Image from "next/image";
import Link from "next/link";

export default function AssetMarket() {
  return (
    <>
      <section className="w-[500px] ml-8 mb-8">
        <header>
          <h1 className="text-5xl font-bold tracking-widest mb-7">
            ASSET MARKET
          </h1>
          <h2 className="text-4xl font-extralight tracking-[15px] mb-7">
            WITH A TWIST
          </h2>
        </header>
        <main className="tracking-[4px] text-sm">
          <p className="mb-7">
            Because true artists struggle, go through pain and then when we
            emerge from an internal conflict, we bask in the glory of what we
            create. but in cases we lose the battle , we download a template and
            call it a day. thinking “did we even do anyhting?”
          </p>
          <p className="mb-7">
            Reconstruct iconic looks or create something entirely new. Our
            assets are the raw materials for your next masterpiece. so you can
            steal without the guilt (like an artist)
          </p>
          <p className="mb-7">
            or you could buy the design and be done with it (like a sheep)
          </p>
          <p className="mb-7 font-bold">
            Contrary to popular belief, Lorem Ipsum is not simply random text.
            It has roots in a piece of classical Latin literature from 45 BC,
            making it over 2000 years old.
          </p>
        </main>
        <footer className="flex space-x-5">
          <Link
            href="/store"
            className="bg-sky-500 h-[43px] w-[125px] leading-[37px] align-middle text-base font-light flex justify-center items-center"
          >
            View Store
          </Link>
          <Link
            href="/dashboard"
            className="bg-transparent underline underline-offset-4 font-light"
          >
            Upload an asset
          </Link>
        </footer>
      </section>
      <section>
        <Image
          src="/art.svg"
          alt=""
          width={800}
          height={700}
          className=" hidden md:block  md:w-[400px] xl:w-[800px]"
        ></Image>
      </section>
    </>
  );
}
