import Providers from "@/store/providers";
import Cart from "./cart";
import { createServerSideHelpers } from "@trpc/react-query/server";
import { appRouter } from "@/server";
import { dehydrate, Hydrate } from "@tanstack/react-query";
import { createAdminContext } from "@/server/trpc-contexts";
import { headers } from "next/headers";

export default async function CartPage({
  searchParams: { toPayment },
}: {
  searchParams: { toPayment: string };
}) {
  const toPaymentBool = Boolean(toPayment && toPayment === "true");

  const helpers = createServerSideHelpers({
    router: appRouter,
    ctx: async () =>
      await createAdminContext({ cookies: headers().get("cookie") }),
  });

  await helpers.getAuthUser.prefetch();

  return (
    <Hydrate state={dehydrate(helpers.queryClient)}>
      <Providers>
        <Cart toPaymentBool={toPaymentBool}></Cart>
      </Providers>
    </Hydrate>
  );
}
