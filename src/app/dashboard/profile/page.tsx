"use client";
import { redirect, useRouter } from "next/navigation";
import { logout } from "@/app/(auth)/logout/actions";
import Image from "next/image";
import SidePanel from "@/components/sidepanel";
import Works from "@/components/works";
import { trpc } from "@/app/_trpc/client";
import { publicProcedure, t } from "@/server/trpc";

export default function PrivatePage() {
  const auth = trpc.getAuthUser.useQuery();
  const authUser = auth?.data;

  const router = useRouter();

  if (authUser && authUser.name === "AuthSessionMissingError") {
    router.push("/login");
  }

  const userObj = trpc.getUser.useQuery(authUser?.id, {
    enabled: !!authUser,
  });
  const userdata = userObj.data;
  console.log(userdata);
  const user: {
    username: string;
    email: string;
    name: string;
    image: string;
    bio: string;
  } = userdata ? userdata[0] : {};
  console.log(user.image);

  const imgObj = trpc.getImage.useQuery(user.image, {
    enabled: !!user,
  });
  const imgUrl = imgObj.data;
  console.log(imgUrl);

  return (
    <div className=" text-white  px-14">
      <div className="w-full flex justify-between">
        <div className="flex items-center">
          <div className="mb-4">
            <Image
              src={imgUrl ? imgUrl : "/avatar.svg"}
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
        <Works></Works>
      </div>
    </div>
  );
}
