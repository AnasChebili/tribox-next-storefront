"use client";

import { RouterOutput } from "@/server";
import { useEffect, useRef } from "react";

export default function PaymentSuccess({
  items,
  amount,
}: {
  items: RouterOutput["getProduct"][] | null;
  amount: number;
}) {
  const hasDownloaded = useRef(false);

  useEffect(() => {
    const downloadFile = async (product: RouterOutput["getProduct"]) => {
      if (!hasDownloaded.current) {
        const response = await fetch(product.file);
        const blob = await response.blob();
        const link = document.createElement("a");
        const objectUrl = URL.createObjectURL(blob);
        const fileExtension = product.file.split(".").pop(); // Get the file extension
        link.href = objectUrl;
        link.download = `${product.title}.${fileExtension || "file"}`; // Use the correct extension or fallback to "file"
        document.body.appendChild(link);
        link.click();
        URL.revokeObjectURL(objectUrl);
        document.body.removeChild(link);
        hasDownloaded.current = true;
      }
    };
    if (items) items.forEach((item) => downloadFile(item));
    localStorage.setItem("cart", JSON.stringify([]));
  }, [items]);

  return (
    <div className="flex items-center justify-center min-h-screen text-white">
      <div className="text-center">
        <h1 className="text-5xl font-bold mb-4">Thank you!</h1>
        <p className="text-lg mb-6">
          Your assets will be downloaded automatically
        </p>

        <div className="animate-bounce text-3xl">✅</div>
      </div>
    </div>
  );
}
