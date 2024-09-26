"use client";
import { trpc } from "@/app/_trpc/client";
import UserDialog from "@/components/user-dialog";
import Image from "next/image";
import { useRouter } from "next/navigation"; // Use next/navigation for client-side navigation
import { toast } from "sonner";

export default function Settings() {
  const router = useRouter();
  const { data: authUser } = trpc.getAuthUser.useQuery();
  //auth user will be predefined in rsc
  const { data: user } = trpc.getUser.useQuery(authUser!.user.id, {
    enabled: !!authUser,
  });

  const logoutMutation = trpc.logout.useMutation({
    onSuccess: (data) => {
      router.push("/login");
    },
    onError: (error) => {
      // alert("Failed to log out");
      toast.error("Failed to log out");
    },
  });

  return (
    <div className="text-white lg:px-14">
      <div className="my-11">
        <div className="flex justify-between">
          <h1 className="text-4xl font-bold">Profile Information</h1>

          <UserDialog />
        </div>

        <p className="mb-10 font-light">
          You can edit your profile picture and your personal information by
          clicking on the Edit button
        </p>
        <div className="mb-4">
          {user && (
            <div>
              <Image
                src={user.image != "" ? user.image : "/anonymous-avatar.png"}
                alt=""
                width={100}
                height={100}
                className="cursor-pointer rounded-full"
              />
            </div>
          )}
        </div>
        {user && (
          <div>
            <p>Username: {user.username}</p>
            <p>Email: {user.email}</p>
            <p>Name: {user.name}</p>
            <p>Bio: {user.bio}</p>
          </div>
        )}
      </div>
      <div className="w-full h-[1px] bg-white"></div>
      <div className="my-11">
        <p className="text-xs mb-5 cursor-pointer">Terms of Service</p>
        <p className="text-xs cursor-pointer">Help</p>
      </div>
      <div className="w-full h-[1px] bg-white"></div>
      <div className="my-11">
        <button
          onClick={() => logoutMutation.mutate()}
          className="px-6 py-3 rounded-lg bg-red-900 hover:bg-red-600"
        >
          Log out
        </button>
      </div>
    </div>
  );
}
