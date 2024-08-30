import Image from "next/image";

export default function Collaborations() {
  const collabs: Array<{ image: string; num: string; stats: string }> = [
    { image: "/collab1.png", num: "100,000", stats: "Stats" },
    { image: "/collab2.png", num: "100,000", stats: "Stats" },
    { image: "/collab3.png", num: "100,000", stats: "Stats" },
    { image: "/collab4.png", num: "100,000", stats: "Stats" },
    { image: "/collab1.png", num: "100,000", stats: "Stats" },
    
  ];

  return (
    <div className=" ml-[5%] flex overflow-x-auto space-x-8 no-scrollbar">
        {collabs.map((collab,index)=><div key={index} className="min-w-80 cursor-pointer"> 
            <Image src={collab.image} alt="" width={350} height={350} className="w-80 h-80"></Image>
            <h1 className="font-bold text-4xl mt-2">{collab.num}</h1>
            <p className="text-xl">{collab.stats}</p>
            </div>)}
    </div>
  )
}
