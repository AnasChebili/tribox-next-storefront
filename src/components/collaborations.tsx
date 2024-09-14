"use client";
import { trpc } from "@/app/_trpc/client";
import { UUID } from "crypto";
import Image from "next/image";
import Link from "next/link";

const CollabCard = ({
  id,
  image,
  num,
  stats,
}: {
  id: UUID;
  image: string;
  num: string;
  stats: string;
}) => {
  const { data: imgUrl } = trpc.getImage.useQuery(image);
  return (
    <div className="min-w-80 cursor-pointer">
      <Link href={`/user/${id}`}>
        <Image
          src={imgUrl}
          alt=""
          width={350}
          height={350}
          className="w-80 h-80"
        ></Image>
        <h1 className="font-bold text-4xl mt-2">{num}</h1>
        <p className="text-xl">{stats}</p>
      </Link>
    </div>
  );
};

export default function Collaborations() {
  /* const collabs: Array<{ image: string; num: string; stats: string }> = [
    { image: "/collab1.png", num: "100,000", stats: "Stats" },
    { image: "/collab2.png", num: "100,000", stats: "Stats" },
    { image: "/collab3.png", num: "100,000", stats: "Stats" },
    { image: "/collab4.png", num: "100,000", stats: "Stats" },
    { image: "/collab1.png", num: "100,000", stats: "Stats" },
    
  ]; */

  const { data: collabs } = trpc.getUsers.useQuery();

  return (
    <div className=" ml-[5%] flex overflow-x-auto space-x-8 no-scrollbar">
      {collabs &&
        collabs.map((collab, index) => (
          <CollabCard
            key={collab.id}
            id={collab.id}
            image={collab.image}
            num={collab.num}
            stats={collab.stats}
          ></CollabCard>
        ))}
    </div>
  );
}
