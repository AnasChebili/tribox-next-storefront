import { trpc } from "@/app/_trpc/client";
import { trpcServer } from "@/server/trpc";
import Image from "next/image";
import Link from "next/link";
import { useMemo } from "react";

export default async function NavSign() {
  // const { data: authUser, isError } = trpc.getAuthUser.useQuery();

  // const signedIn = useMemo(() => {
  //   const noAuthUser = !Boolean(authUser);
  //   const authSessionMissing = noAuthUser
  //     ? true
  //     : // @ts-expect-error
  //       authUser?.name === "AuthSessionMissingError";
  //   return !noAuthUser && !authSessionMissing && !isError;
  // }, [authUser, isError]);
  let signedIn = true;
  try {
    const authUser = await trpcServer.getAuthUser.query();
    // @ts-expect-error
    signedIn = authUser?.name !== "AuthSessionMissingError";
  } catch (error) {
    signedIn = false;
  }

  return (
    <>
      {signedIn ? (
        <div>
          <Link href="/dashboard/profile">
            <Image
              src="/avatar.svg"
              alt=""
              width={50}
              height={50}
              className="cursor-pointer"
            ></Image>
          </Link>
        </div>
      ) : (
        <div className="flex gap-12">
          <Link href="/login">Sign In</Link>
          <Link href="/register">Sign Up</Link>
        </div>
      )}
    </>
  );
}
