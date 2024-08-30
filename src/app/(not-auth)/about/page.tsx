import Collaborations from "@/components/collaborations";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <div className="mt-8">
        <Image
          src="/assetart.svg"
          alt=""
          width={500}
          height={300}
          className="w-full"
        ></Image>
      </div>
      <h1 className="font-bold text-4xl mt-24 mb-16 mx-[5%]">Understanding what we are.</h1>
      <div className="mx-[5%]">
      <p>
        DiBox is pretty cool. Like your ex-girlfriend saying that she’s not like
        other girls, we’re also not like other asset stores. The only difference
        is that we’re not lying and we actually care about you as a designer.
        That’s why we collaborate with only the best artists in the world. Our
        assets are completely free to use in your next big project. We really do
        mean it when we say we love you.
      </p>
      <p className="mt-4">
        Of-course not, If only things were that simple. Every single asset that
        you see here is scrambled in one way or another. Design assets have
        fucked up layers, 3-D assets are hidden under more polygons than your
        mom can fit.
      </p>
      <p className="mt-4">
        Overall, it’s a disaster. It’s your job to “fix” these assets like you
        tried doing with your previous relationships and see if you are able to.
        If you do, the asset is completely yours to use. Alternatively, you can
        skip this entire mess and just pay directly to get the asset. Yes, for
        once, there is an actual problem that can be solved with money. See how
        it feels. For us, it will keep our servers running,
      </p>
      </div>
      <div className="mx-[5%] my-10">
      <Image src="/storeimg.png" alt="" width={1500} height={500} className=""></Image>
      </div>
      <p className="mx-[5%] mb-10">Top Artists We Are Collaborating With</p>
      <Collaborations></Collaborations>
      
      <div className="mx-[5%] mt-14">
      <p >
        DiBox is pretty cool. Like your ex-girlfriend saying that she’s not like
        other girls, we’re also not like other asset stores. The only difference
        is that we’re not lying and we actually care about you as a designer.
        That’s why we collaborate with only the best artists in the world. Our
        assets are completely free to use in your next big project. We really do
        mean it when we say we love you.
      </p>
      <p className="mt-4">
        Of-course not, If only things were that simple. Every single asset that
        you see here is scrambled in one way or another. Design assets have
        fucked up layers, 3-D assets are hidden under more polygons than your
        mom can fit.
      </p>
      <p className="mt-4">
        Overall, it’s a disaster. It’s your job to “fix” these assets like you
        tried doing with your previous relationships and see if you are able to.
        If you do, the asset is completely yours to use. Alternatively, you can
        skip this entire mess and just pay directly to get the asset. Yes, for
        once, there is an actual problem that can be solved with money. See how
        it feels. For us, it will keep our servers running,
      </p>
      </div>
      <div className="flex mx-[5%] my-24 justify-between items-center mb">
      <div>
        <button className="w-40 h-10 font-bold rounded-lg bg-gradient-to-r from-red-500 to-white mb-2">View Store</button>
        <p>Click above, check us out.</p>
      </div>
      <div className=" space-x-3 hidden sm:flex">
      <Image src="/barcode.png" alt="" width={200} height={90}></Image>
      <Image src="/qrcode.png" alt="" width={90} height={90}></Image>
      <Image src="/recycle.png" alt="" width={100} height={900}></Image>
      </div>
      </div>  
    </div>
  );
}