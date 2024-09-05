"use client";
import { useEffect } from "react";
import recs1 from "../data/reccomendations.json";
import Recommendations, { categstype } from "./recommendations";
import { trpc } from "@/app/_trpc/client";
import Recskeleton from "./recskeleton";

export default function DashProducts() {
  const products = trpc.getTodos.useQuery();
  const isLoading = products.isLoading;
  const recs3 = products.data;

  console.log("recs3:", recs3, "idloading:", isLoading);

  return (
    <>
      <div className="my-11  ml-[5%]">
        <h1 className="text-4xl font-bold">Your Products</h1>
        <p className="mt-2 font-light w-1/2">
          Click on "Add Product" to add a product!
        </p>
      </div>
      {recs3 ? (
        <Recommendations categs={recs3}></Recommendations>
      ) : (
        <Recskeleton></Recskeleton>
      )}
    </>
  );
}
