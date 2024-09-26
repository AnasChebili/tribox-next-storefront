import { redirect, useRouter } from "next/navigation";
import { logout } from "@/app/(auth)/logout/actions";
import Image from "next/image";
import SidePanel from "@/components/sidepanel";
import Works from "@/components/works";
import { trpc } from "@/app/_trpc/client";
import { publicProcedure, t, trpcServer } from "@/server/trpc";

export default async function PrivatePage() {
  const authUser = await trpcServer.getAuthUser.query();

  const user = await trpcServer.getUser.query(authUser.user.id);

  if (!user) {
    redirect("/on-boarding");
  }

  return (
    <div className=" text-white  lg:px-14">
      <div className="w-full flex justify-between">
        <div className="flex items-center">
          <div className="mb-4">
            <Image
              src={user.image != "" ? user.image : "/anonymous-avatar.png"}
              alt=""
              width={200}
              height={200}
              className="cursor-pointer rounded-full"
            ></Image>
          </div>
          <div className="text-center mb-4 flex flex-col items-start ml-5">
            <p>Username:{user.username}</p>
            <p>Name:{user.name}</p>
          </div>
        </div>
      </div>
      <p>Bio: {user.bio}</p>
      <div className="my-11">
        <h1 className="text-4xl font-bold">Uploaded Products</h1>
        <p className="mt-2 font-light">You can upload more in the dashboard.</p>
      </div>
      <div className="">
        <Works initialFilter=""></Works>
      </div>
    </div>
  );
}
