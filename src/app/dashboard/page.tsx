"use client";
import DashProducts from "@/components/dashproducts";
import DashUpload from "@/components/dashupload";
import { useRouter } from "next/navigation";
import { trpc } from "../_trpc/client";
import Providers from "@/store/providers";

export default function Dashboard() {
  return (
    <>
      <Providers>
        <DashUpload></DashUpload>
      </Providers>

      <DashProducts></DashProducts>
    </>
  );
}
