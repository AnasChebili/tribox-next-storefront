"use client";
import DashProducts from "@/components/dashproducts";
import DashUpload from "@/components/dashupload";
import { useRouter } from "next/navigation";
import { trpc } from "../_trpc/client";

export default function Dashboard() {
  const router = useRouter();
  const { data: authUser } = trpc.getAuthUser.useQuery();

  if (authUser && authUser.name === "AuthSessionMissingError") {
    router.push("/login");
  }

  return (
    <>
      <DashUpload></DashUpload>

      <DashProducts></DashProducts>
    </>
  );
}
