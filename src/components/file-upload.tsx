"use client";
import { useState } from "react";

import Uppy from "@uppy/core";
import Tus from "@uppy/tus";
import { Dashboard } from "@uppy/react";

import "@uppy/core/dist/style.min.css";
import "@uppy/dashboard/dist/style.min.css";

const token = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const projectId = process.env.NEXT_PUBLIC_SUPABASE_URL;
const bucketName = "documents";
const supabaseUploadURL = `${projectId}/storage/v1/upload/resumable`;

export default function FileUpload({ setFile }: { setFile: any }) {
  const [uppy] = useState(() =>
    new Uppy().use(Tus, {
      endpoint: supabaseUploadURL,
      headers: {
        authorization: `Bearer ${token}`,
      },
      chunkSize: 6 * 1024 * 1024,
      allowedMetaFields: [
        "bucketName",
        "objectName",
        "contentType",
        "cacheControl",
      ],
    })
  );

  uppy.on("file-added", (file) => {
    file.meta = {
      ...file.meta,
      bucketName: bucketName,
      objectName: file.name,
      contentType: file.type,
    };
  });

  uppy.on("complete", (result) => {
    setFile(result.successful?.[0].name);
  });

  return (
    <Dashboard
      uppy={uppy}
      height={350}
      theme="dark"
      width={"100%"}
      className="border-gray-800"
    ></Dashboard>
  );
}
