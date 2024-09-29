import { redirect, useRouter } from "next/navigation";
import Image from "next/image";
import SidePanel from "@/components/sidepanel";
import Works from "@/components/works";
import { trpc } from "@/app/_trpc/client";
import { trpcServer } from "@/server/server";

export const dynamic = "force-dynamic";

export default async function PrivatePage() {
  const authUser = await trpcServer.getAuthUser();

  const user = await trpcServer.getUser(authUser.user.id);

  if (!user) {
    redirect("/on-boarding");
  }

  return (
    <div className=" text-white  lg:px-14">
      <div className="w-full flex justify-between">
        <div className="flex items-center">
          <div className="mb-4 w-[200px] h-[200px] justify-center items-center cursor-pointer rounded-full overflow-hidden">
            <Image
              src={user.image != "" ? user.image : "/anonymous-avatar.png"}
              alt=""
              width={200}
              height={200}
              className="object-cover min-w-[200px] min-h-[200px]"
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
        <Works initialFilter="" user={user.id}></Works>
      </div>
    </div>
  );
}
