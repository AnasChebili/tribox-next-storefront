import { RouterOutput } from "@/server";
import { trpcServer } from "@/server/trpc";
import Image from "next/image";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { EditIcon, SettingsIcon, UserIcon } from "lucide-react";

export default async function NavSign() {
  let signedIn = true;
  let user: RouterOutput["getUser"];
  try {
    const authUser = await trpcServer.getAuthUser.query();
    user = await trpcServer.getUser.query(authUser.user.id);
    // @ts-expect-error
    signedIn = authUser?.name !== "AuthSessionMissingError";
  } catch (error) {
    console.log("error", error);

    signedIn = false;
  }

  return (
    <>
      {signedIn ? (
        <div>
          {user && (
            <DropdownMenu>
              <DropdownMenuTrigger className="border-0">
                <div className="h-[50px] w-[50px] justify-center items-center cursor-pointer rounded-full overflow-hidden">
                  <Image
                    src={
                      user.image != "" ? user.image : "/anonymous-avatar.png"
                    }
                    alt=""
                    width={50}
                    height={50}
                    className="object-cover"
                  ></Image>
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-black text-white border-0  p-2">
                <DropdownMenuItem className="py-2 px-6 rounded-lg cursor-pointer">
                  <Link href="/dashboard" className="flex gap-2 items-center">
                    {<EditIcon className="w-4 h-4"></EditIcon>} Dashboard
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="py-2 px-6 rounded-lg cursor-pointer">
                  <Link
                    href="/dashboard/profile"
                    className="flex gap-2 items-center"
                  >
                    {<UserIcon className="w-4 h-4"></UserIcon>} Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="py-2 px-6 rounded-lg cursor-pointer">
                  <Link
                    href="/dashboard/settings"
                    className="flex gap-2 items-center"
                  >
                    {<SettingsIcon className="w-4 h-4"></SettingsIcon>}
                    Settings
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
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
