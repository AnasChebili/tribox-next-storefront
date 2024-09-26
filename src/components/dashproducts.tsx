"use client";
import { useEffect } from "react";
import recs1 from "../data/reccomendations.json";
import Recommendations, { categstype } from "./recommendations";
import { trpc } from "@/app/_trpc/client";
import Recskeleton from "./recskeleton";
import EditCards from "./editcards";

export default function DashProducts() {
  const { data: authsUser } = trpc.getAuthUser.useQuery(); // prefetched in layout
  const { data: user } = trpc.getUser.useQuery(authsUser!.user.id); // user cannot be undefined, handled in middleware and layout
  const { data: products } = trpc.getProductsOfUser.useQuery(user!.id);

  return (
    <>
      <div className="my-11  ml-[5%]">
        <h1 className="text-4xl font-bold">Your Products</h1>
        <p className="mt-2 font-light w-1/2">
          Click on "Add Product" to add a product!
        </p>
      </div>
      {products ? (
        <EditCards categs={products}></EditCards>
      ) : (
        <Recskeleton></Recskeleton>
      )}
    </>
  );
}
