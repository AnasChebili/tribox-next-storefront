"use client";

import { trpc } from "@/app/_trpc/client";
import CheckoutPage from "@/components/check-out-page";
import convertToSubcurrency from "@/lib/convertToSubcurrency";
import Providers from "@/store/providers";
import { RootState } from "@/store/store";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useSearchParams } from "next/navigation";
import { useSelector } from "react-redux";

if (process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY === undefined) {
  throw new Error("NEXT_PUBLIC_STRIPE_PUBLIC_KEY is not defined");
}

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

export default function Payment({
  clientSecret,
  orderId,
  amount,
}: {
  clientSecret: string;
  orderId: string;
  amount: number;
}) {
  return (
    <div className="flex items-center h-screen ">
      <div className=" mx-auto flex flex-col items-center">
        <Elements
          stripe={stripePromise}
          options={{
            mode: "payment",
            amount: convertToSubcurrency(amount),
            currency: "usd",
          }}
        >
          <Providers>
            {clientSecret && (
              <CheckoutPage
                clientSecret={clientSecret}
                amount={amount}
                orderId={orderId}
              ></CheckoutPage>
            )}
          </Providers>
        </Elements>
      </div>
    </div>
  );
}
