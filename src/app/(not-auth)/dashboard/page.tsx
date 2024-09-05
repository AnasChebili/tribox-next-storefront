import DashProducts from "@/components/dashproducts";
import DashUpload from "@/components/dashupload";

import { useState } from "react";

export default function Dashboard() {

  return (
    <>
      <DashUpload></DashUpload>
      
      
      <DashProducts ></DashProducts>
    </>
  );
}
