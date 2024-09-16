import Works from "@/components/works";
import { trpcServer } from "@/server/trpc";
import Image from "next/image";

export default async function User({ params }: { params: { id: string } }) {
  const userdata = await trpcServer.getUser.query(params.id);
  const user: {
    username: string;
    email: string;
    name: string;
    image: string;
    bio: string;
  } = userdata ? userdata[0] : {};
  console.log(user.image);

  const imgUrl = await trpcServer.getImage.query(user.image);

  console.log(imgUrl);
  return (
    <div className=" text-white  px-[5%] mt-20">
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
