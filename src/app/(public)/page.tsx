"use client";
import AssetMarket from "@/components/asset-market";
import Break from "@/components/break";
import Works from "@/components/works";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";

export default function Home() {
  const searchParams = useSearchParams();
  const category = searchParams.get("category");
  const targetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (category) {
      targetRef.current?.scrollIntoView({ behavior: "smooth" });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <AssetMarket></AssetMarket>
      <Break></Break>
      <div className="mx-[5%] my-24 " ref={targetRef}>
        <h1 className="text-5xl font-extralight">FEATURED WORKS</h1>
        <div>
          <Works initialFilter={category ? category : ""}></Works>
        </div>
      </div>
    </div>
  );
}
