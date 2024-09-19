import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "sonner";
import Provider from "./_trpc/Provider";
import { trpcServer } from "@/server/trpc";
import { redirect } from "next/navigation";
import { headers } from "next/headers";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  /* const headerList = headers();
  const pathname = headerList.get("x-current-path");
  console.log("=================", pathname);
  const currentUrl = null;
  if (currentUrl) {
    const currentUrlArr = currentUrl?.split("/");
    console.log("the current url");

    console.log(
      "the last url segment ===============================",
      currentUrlArr[currentUrlArr?.length - 1]
    );
    if (currentUrlArr[currentUrlArr?.length - 1] !== "on-boarding") {
      let redirectPath = null;
      try {
        const authUser = await trpcServer.getAuthUser.query();
        const user = await trpcServer.getUser.query(authUser.user.id);

        if (!user) {
          redirectPath = "/on-boarding";
        }
      } catch (error) {
      } finally {
        if (redirectPath) redirect(redirectPath);
      }
    }
  } */

  return (
    <html lang="en">
      <body>
        <Provider>{children}</Provider>
        <Toaster richColors></Toaster>
      </body>
    </html>
  );
}
