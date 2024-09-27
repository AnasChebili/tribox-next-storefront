/* eslint-disable react/no-unescaped-entities */
import Categories from "@/components/categories";
import Morning from "@/components/morning";
import Recommendations from "@/components/recommendations";
import Image from "next/image";
import { trpcServer } from "@/server/trpc";
import { createClient } from "../../../../utils/supabase/server";
import { redirect } from "next/navigation";

export default async function StoreAuth() {
  const supabase = createClient();
  const products = await trpcServer.getTodos.query();
  let user;
  try {
    const authUser = await trpcServer.getAuthUser.query();
    user = await trpcServer.getUser.query(authUser.user.id);
  } catch (error) {
    user = undefined;
  }

  return (
    <div className="mb-28">
      <Morning user={user}></Morning>
      <h1 className="my-11 text-4xl font-bold ml-[5%]">Top Categories</h1>
      <Categories></Categories>
      <div className="my-11  ml-[5%]">
        <h1 className="text-4xl font-bold">Stuff You Might Like</h1>
        <p className="mt-2 font-light">Personally Picked from your taste.</p>
      </div>
      <Recommendations categs={products}></Recommendations>
      <div className="my-11  mx-[5%]">
        <Image
          src="/elara.png"
          alt=""
          width={1550}
          height={1550}
          className="w-full rounded-[5%]"
        ></Image>
        <div className=" mb-20 mt-12 flex justify-between text-sm text-gray-400 italic">
          <p>From Hassaan’s 2023 Art Gallery Collection</p>
          <p>Copyright 2024 - Hassaan</p>
        </div>
      </div>

      <div className="my-11  ml-[5%]">
        <h1 className="text-4xl font-bold">Acedia x Di-Box Collection</h1>
        <p className="mt-2 font-light sm:w-1/2">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book.
        </p>
      </div>
      <Recommendations categs={products}></Recommendations>
      <div className="my-20 hidden md:block  mx-[5%] relative text-black">
        <Image
          src="/japanart.png"
          alt=""
          width={1550}
          height={500}
          className="w-full"
        ></Image>
      </div>
      <div className="mt-4">
        <Recommendations categs={products}></Recommendations>
      </div>
    </div>
  );
}
