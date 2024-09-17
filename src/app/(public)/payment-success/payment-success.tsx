"use client";

import { RouterOutput } from "@/server";
import { RootState } from "@/store/store";
import { useEffect } from "react";
import { useSelector } from "react-redux";

export default function PaymentSuccess({ amount }: { amount: string }) {
  const items = useSelector((state: RootState) => state.cart.items);
  console.log(items);

  useEffect(() => {
    const downloadFile = (product: RouterOutput["getProduct"]) => {
      const link = document.createElement("a");
      link.href = product.image[0];
      link.download = `${product.title}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    };
    items.forEach((item) => downloadFile(item));
  }, [items]);

  return (
    <div className="flex items-center justify-center min-h-screen text-white">
      <div className="text-center">
        <h1 className="text-5xl font-bold mb-4">Thank you!</h1>
        <p className="text-lg mb-6">You successfully sent</p>
        <p className="text-lg mb-6 text-black font-bold p-2 bg-white rounded-lg">
          ${amount}
        </p>
        <div className="animate-bounce text-3xl">✅</div>
      </div>
    </div>
  );
}
