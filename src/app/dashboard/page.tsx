"use client";
import DashProducts from "@/components/dashproducts";
import DashUpload from "@/components/dashupload";
import { useRouter } from "next/navigation";
import { trpc } from "../_trpc/client";

export default function Dashboard() {
  return (
    <>
      <DashUpload></DashUpload>

      <DashProducts></DashProducts>
    </>
  );
}
