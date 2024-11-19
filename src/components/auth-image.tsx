import Image from "next/image";

export default function AuthImage() {
  return (
    <section className="fixed  w-1/2 h-full overflow-hidden">
      <div className="h-full  hidden sm:block md:h-auto w-full">
        <Image
          src="authart.svg"
          alt=""
          height={1449}
          width={864}
          className="object-cover w-full h-full"
        ></Image>
      </div>
      <Image
        src="logo.svg"
        alt=""
        height={50}
        width={72}
        className="absolute top-12 left-12"
      ></Image>
      <section className=" absolute top-72 -right-44 rotate-90 hidden md:block">
        <h1 className="text-3xl font-semibold tracking-wider">
          CHANGE THE WORLD. NEVER SETTLE
        </h1>
        <section className="flex">
          <h1 className="text-3xl font-semibold tracking-wider">NEVER FEAR.</h1>
          <div className=" ml-4 mt-[5px] h-6 w-[343px] rounded-3xl border-[3px] border-white "></div>
        </section>
        <section className="flex items-center space-x-[260px]">
          <p className="text-xs font-semibold">3431-24190-21ASX-AZCV4-DGTPS1</p>
          <ul className="flex space-x-2">
            <li>
              <Image src="/star.png" alt="" height={32} width={30}></Image>
            </li>
            <li>
              <Image src="/star.png" alt="" height={32} width={30}></Image>
            </li>
            <li>
              <Image src="/star.png" alt="" height={32} width={30}></Image>
            </li>
          </ul>
        </section>
      </section>
    </section>
  );
}
