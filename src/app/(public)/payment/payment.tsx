"use client";

import CheckoutPage from "@/components/check-out-page";
import convertToSubcurrency from "@/lib/convertToSubcurrency";
import Providers from "@/store/providers";
import { RootState } from "@/store/store";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useSelector } from "react-redux";

if (process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY === undefined) {
  throw new Error("NEXT_PUBLIC_STRIPE_PUBLIC_KEY is not defined");
}

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

export default function Payment() {
  const amount = useSelector((state: RootState) => state.cart.totalAmount);

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
            <CheckoutPage amount={amount}></CheckoutPage>
          </Providers>
        </Elements>
      </div>
    </div>
  );
}
