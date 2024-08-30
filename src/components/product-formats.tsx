import Image from "next/image";

const ImageComponent = ({image, title, desc}:{image:string, title:string, desc:string}) => {
  return <div className="flex-1">
    
  <div className="max-w-[80px]">
  <Image src={image} alt="" width={80} height={80} className="w-full h-full object-contain"></Image>
  </div>
  <h1 className="text-3xl font-bold tracking-wider mt-5">{title}</h1>
  <p className="text-3xl font-light mt-4">{desc}</p>
  
</div>
}

const IncludesComponent = ({image, title}:{image:string, title:string}) => {
  return <div className=" flex-1 ">
    <div className="flex flex-col items-center">
    <div className="max-w-[83px]">
  <Image src={image} alt="" width={83} height={61} className="h-full w-full object-contain"></Image>
  </div>
  <h1 className="text-2xl font-bold tracking-wider mt-3" >{title}</h1>
  </div>
</div>
}

export default function ProductFormats({
  formats,
  ID,
  softwares,
}: {
  formats: string[];
  ID: string;
  softwares: string[];
}) {
  return (
    <div className="  border-white border-4  mt-20 h-full">
      <div className="pt-6 pl-7 pr-6">
        <div className="flex justify-between items-center ">
          <h1 className="font-bold text-xl">Formats Available</h1>
          <div className="bg-white w-8 h-1"></div>
        </div>
        <p className="font-light text-xl tracking-widest">01</p>
        <div className="flex mt-7">
          {formats.map((format, index) => (
            <div
              key={index}
              className="bg-white px-10 py-1 font-bold text-lg  text-center text-black mr-2 rounded-3xl "
            >
              {format}
            </div>
          ))}
        </div>
        <div className=" mt-14 flex font-bold text-xl justify-between items-center">
          <h1>Product ID</h1>
          <p className="underline underline-offset-4">{ID}</p>
        </div>
      </div>
      <div className="bg-white w-full h-[3px] mt-7"></div>
      <div className=" pl-7 pt-4 pr-6">
        <div className="flex justify-between items-start ">
          <div>
            <h1 className="font-bold text-xl">Software Used</h1>
            <p className="font-light text-xl tracking-widest">02</p>
            <div className="bg-white w-8 mt-12 h-1"></div>
          </div>
          <div className="flex flex-col items-center space-y-5">
            {softwares.map((software, index) => (
              <div key={index} className="h-[41px] ">
                <Image
                  src={software}
                  alt=""
                  width={0}
                  height={0}
                  sizes="100vw"
                  className="h-full w-auto"
                ></Image>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="bg-white w-full h-[3px] mt-7"></div>
      <div className=" pl-7 pt-4 pr-6">
        <div className="flex items-center  justify-between space-y-11 flex-col sm:flex-row sm:items-baseline">
          {/* <div className="flex-1">
            <div className="">
            <Image src="/brutalist1.png" alt="" width={80} height={80} className="w-full h-full object-contain"></Image>
            </div>
            <h1 className="text-md sm:text-3xl font-bold tracking-wider mt-5">Polygons</h1>
            <p className="text-md sm:text-3xl font-light mt-4">784,570</p>
          </div>
          <div className="flex-1">
            <Image src="/brutalist2.png" alt="" width={82} height={69} className="h-full w-auto sm:h-[69px] sm:[px]"></Image>
            <h1 className="text-md sm:text-3xl font-bold tracking-wider mt-5">Vertices</h1>
            <p className="text-md sm:text-3xl font-light mt-4">784,570</p>
          </div>
          <div className="flex-1">
            <Image src="/brutalist3.png" alt="" width={120} height={80} className="h-full w-auto sm:h-[69px] sm:[px]"></Image>
            <h1 className="text-md sm:text-3xl font-bold tracking-wider mt-5">Geometry</h1>
            <p className="text-md sm:text-3xl font-light mt-4">Tris/Quads</p>
          </div> */}
          <ImageComponent image="/brutalist1.png" title="Polygons" desc="784,570" />
          <ImageComponent image="/brutalist2.png" title="Vertices" desc="784,570" />

          <ImageComponent image="/brutalist3.png" title="Geometry" desc="Tris/Quads" />

        </div>
      </div>
      <div className="bg-white w-full h-[3px] mt-7"></div>
      <div className=" pl-7 pt-4 pr-6">
        <h1 className="font-bold text-xl">Includes</h1>
        <p className="font-light text-xl tracking-widest">04 </p>
        <div className="flex justify-start sm:items-baseline mt-8 space-y-11 flex-col sm:flex-row items-center ">
          {/* <div className="flex flex-col items-center">
            <Image src="/brutalist4.png" alt="" width={83} height={61} className="h-full w-auto"></Image>
            <h1 className="text-lg sm:text-2xl font-bold tracking-wider mt-3" >Textures</h1>
          </div>
          <div className="flex flex-col items-center">
            <Image src="/brutalist5.png" alt="" width={85} height={52} className="h-full w-auto"></Image>
            <h1 className="text-lg sm:text-2xl font-bold tracking-wider mt-3">UVs</h1>
          </div>
          <div className="flex flex-col items-center">
            <Image src="/brutalist6.png" alt="" width={64} height={83} className="h-full w-auto"></Image>
            <h1 className="text-lg sm:text-2xl font-bold tracking-wider mt-3">Brushes</h1>
          </div> */}
          <IncludesComponent image="/brutalist4.png" title="Textures"></IncludesComponent>
          <IncludesComponent image="/brutalist5.png" title="UVs"></IncludesComponent>
          <IncludesComponent image="/brutalist6.png" title="Brushes"></IncludesComponent>
        </div>
      </div>
      <div className="bg-white w-full h-[3px] mt-7"></div>
      <div className=" pl-7 pt-4 pr-6 pb-6">
        <div className="flex justify-between items-center">
          <p className="w-3/5 font-light text-sm tracking-[5px] leading-4">
            You can use this template/Model however you want to as long as you
            download it from our website. You can get the design either broken
            which you have to assemble together or pay a fee to get the proper
            file.
          </p>
          <Image src="/brutalist7.png" alt="" width={93} height={93}></Image>
        </div>
        <div className="relative mt-4">
            <div className="w-full h-5 bg-white absolute z-10"></div>
            <div className="w-full h-5 bg-red-500 absolute top-2 left-3 z-0"></div>
        </div>
        <div className="flex justify-between items-center mt-16">
          <p className="w-3/5 font-light text-sm tracking-[5px] leading-4">
            You can use this template/Model however you want to as long as you
            download it from our website. You can get the design either broken
            which you have to assemble together or pay a fee to get the proper
            file.
          </p>
          <h1 className="text-xl sm:text-4xl w-1/4 text-right font-Helvetica font-bold">Open License</h1>
        </div>
      </div>
    </div>
  );
}
