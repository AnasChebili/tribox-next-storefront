"use client"
import DashProducts from "@/components/dashproducts";
import DashUpload from "@/components/dashupload";

import { useState } from "react";

export default function Dashboard() {
  const [updated, setUpdated] = useState(false);

  return (
    <>
      <DashUpload
        onDataUpload={ () => {
          window.location.reload();
        }}
      ></DashUpload>
      
      
      <DashProducts dataUpdated={updated}></DashProducts>
    </>
  );
}
