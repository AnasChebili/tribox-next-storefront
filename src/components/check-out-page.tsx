"use client";

import React, { useState } from "react";
import {
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";
import { Spinner } from "./ui/spinner";

export default function CheckoutPage({
  amount,
  clientSecret,
  orderId,
}: {
  amount: number;
  clientSecret: string;
  orderId: string;
}) {
  const stripe = useStripe();
  const elements = useElements();
  const [errorMessage, setErrorMessage] = useState<string>();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    if (!stripe || !elements) {
      return;
    }

    const { error: submitError } = await elements.submit();

    if (submitError) {
      setErrorMessage(submitError.message);
      setLoading(false);
      return;
    }

    const { error } = await stripe.confirmPayment({
      elements,
      clientSecret,
      confirmParams: {
        return_url: `${process.env.NEXT_PUBLIC_SITE_URL}/payment-success?orderId=${orderId}`,
      },
    });

    if (error) {
      setErrorMessage(error.message);
    } else {
      //the user will be automatically redirected to the return_url
    }

    setLoading(false);
  };

  if (!clientSecret || !stripe || !elements) {
    return (
      <div className="flex items-center justify-center">
        <Spinner className="w-8 h-8 text-white"></Spinner>
        <p className="text-white">Loading...</p>
      </div>
    );
  }

  return (
    <form
      className="bg-white p-2 rounded-md sm:w-[500px]"
      onSubmit={handleSubmit}
    >
      {clientSecret && <PaymentElement></PaymentElement>}
      {errorMessage && <div>{errorMessage}</div>}
      <button
        disabled={!stripe || loading}
        className="w-full p-5 bg-black rounded-md font-bold disabled:opacity-50 disabled:animate-pulse"
      >
        {!loading ? `Pay $${amount}` : "Processing..."}
      </button>
    </form>
  );
}
