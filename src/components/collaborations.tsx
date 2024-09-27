import { trpcServer } from "@/server/trpc";
import { UUID } from "crypto";
import Image from "next/image";
import Link from "next/link";

const CollabCard = async ({ id, image }: { id: string; image: string }) => {
  return (
    <div className=" cursor-pointer">
      <Link href={`/user/${id}`}>
        <div className="w-[350px] h-[350px] justify-center items-center cursor-pointer overflow-hidden">
          <Image
            src={image}
            alt=""
            width={350}
            height={350}
            className="min-w-[350px] min-h-[350px] object-cover"
          ></Image>
        </div>
        {/* <h1 className="font-bold text-4xl mt-2">{num}</h1>
        <p className="text-xl">{stats}</p> */}
      </Link>
    </div>
  );
};

export default async function Collaborations() {
  const collabs = await trpcServer.getUsers.query();

  return (
    <div className=" ml-[5%] flex overflow-x-auto gap-4 no-scrollbar">
      {collabs &&
        collabs.map((collab, index) => (
          <CollabCard
            key={collab.id}
            id={collab.id}
            image={collab.image !== "" ? collab.image : "/anonymous-avatar.png"}
          ></CollabCard>
        ))}
    </div>
  );
}
