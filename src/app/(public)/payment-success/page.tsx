import Providers from "@/store/providers";
import PaymentSuccess from "./payment-success";
import { trpcServer } from "@/server/trpc";
import { redirect } from "next/navigation";
import { RouterOutput } from "@/server";

export default async function PaymentSuccessPage({
  searchParams: { orderId },
}: {
  searchParams: { orderId: string };
}) {
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
      <PaymentSuccess items={order.items} amount={amount}></PaymentSuccess>
    </Providers>
  );
}
