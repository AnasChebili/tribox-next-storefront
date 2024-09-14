import { trpc } from "@/app/_trpc/client";
import Image from "next/image";
import Link from "next/link";

export default function NavSign() {
  const { data: authUser } = trpc.getAuthUser.useQuery();
  let signedIn = true;
  if (authUser && authUser.name === "AuthSessionMissingError") {
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
