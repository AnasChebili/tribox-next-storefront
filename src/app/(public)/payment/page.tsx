import Providers from "@/store/providers";
import Payment from "./payment";
import { trpcServer } from "@/server/trpc";
import { redirect } from "next/navigation";
import { RouterOutput } from "@/server";

export default async function PaymentPage({
  searchParams,
}: {
  searchParams: any;
}) {
  const clientSecret = searchParams.clientSecret;
  const orderId = searchParams.order;
  if (!clientSecret || !orderId) redirect("/");

  const order = await trpcServer.getOrder.query({ orderId: orderId });

  if (!order) redirect("/");
  let amount = 0;
  if (order.items && order.items.length > 0)
    amount = order.items.reduce(
      (sum: number, item: RouterOutput["getProduct"]) =>
        (sum = sum + item.price),
      0
    );

  return (
    <Providers>
      <Payment
        clientSecret={clientSecret}
        orderId={orderId}
        amount={amount}
      ></Payment>
    </Providers>
  );
}
