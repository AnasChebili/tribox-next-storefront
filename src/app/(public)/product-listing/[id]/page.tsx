import Recommendations from "@/components/recommendations";
import recs1 from "../../../../data/reccomendations.json";
import ProductDescription from "@/components/product-description";
import ProductFormats from "@/components/product-formats";
import Image from "next/image";
import { trpcServer } from "@/server/trpc";
import { appRouter, RouterOutput } from "@/server";
import { createServerSideHelpers } from "@trpc/react-query/server";
import { ProductListingPage } from "./ProductListingPage";
import { dehydrate, Hydrate } from "@tanstack/react-query";

export default async function ProductListing({
  params,
}: {
  params: { id: string };
}) {
  const helpers = createServerSideHelpers({ router: appRouter, ctx: {} });

  const productId = params.id;

  const product = await helpers.getProduct.fetch(productId);

  return (
    <Hydrate state={dehydrate(helpers.queryClient)}>
      <ProductListingPage product={product} />
    </Hydrate>
  );
}
