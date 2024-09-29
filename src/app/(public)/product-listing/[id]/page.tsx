import { appRouter, RouterOutput } from "@/server";
import { createServerSideHelpers } from "@trpc/react-query/server";
import { ProductListingPage } from "./ProductListingPage";
import { dehydrate, Hydrate } from "@tanstack/react-query";
import { createAdminContext } from "@/server/trpc-contexts";
import { headers } from "next/headers";

export default async function ProductListing({
  params,
}: {
  params: { id: string };
}) {
  const helpers = createServerSideHelpers({
    router: appRouter,
    ctx: async () =>
      await createAdminContext({ cookies: headers().get("cookie") }),
  });

  const productId = params.id;

  const product = await helpers.getProduct.fetch(productId);
  const products = await helpers.getTodos.fetch();
  try {
    const authUser = await helpers.getAuthUser.fetch();
    const user = await helpers.getUser.fetch(authUser.user.id);
  } catch (error) {}

  return (
    <Hydrate state={dehydrate(helpers.queryClient)}>
      <ProductListingPage productId={productId} />
    </Hydrate>
  );
}
