import Providers from "@/store/providers";
import PaymentSuccess from "./payment-success";

export default function PaymentSuccessPage({
  searchParams: { amount },
}: {
  searchParams: { amount: string };
}) {
  return (
    <Providers>
      <PaymentSuccess amount={amount}></PaymentSuccess>
    </Providers>
  );
}
