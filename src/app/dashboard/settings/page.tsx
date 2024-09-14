"use client";
import { trpc } from "@/app/_trpc/client";
import UserDialog from "@/components/user-dialog";
import Image from "next/image";
import { useRouter } from "next/navigation"; // Use next/navigation for client-side navigation

export default function Settings() {
  const router = useRouter();
  const auth = trpc.getAuthUser.useQuery();
  const authUser = auth?.data;

  if (authUser && authUser.name === "AuthSessionMissingError") {
    router.push("/login");
  }

  const userObj = trpc.getUser.useQuery(authUser?.id, {
    enabled: !!authUser,
  });
  console.log(userObj);
  const userdata = userObj.data;
  console.log(userdata);

  const addUserMutation = trpc.addUser.useMutation();

  let opened = false;

  if (!userObj.isLoading && userdata?.length === 0) {
    opened = true;
    console.log(opened);

    /* addUserMutation.mutate(); */
  }

  const user: {
    username: string;
    email: string;
    name: string;
    image: string;
    bio: string;
  } = userdata && userdata.length > 0 ? userdata[0] : {};

  console.log(user);

  const imgObj = trpc.getImage.useQuery(user.image, {
    enabled: !!user.image,
  });
  const imgUrl = imgObj.data;

  const logoutMutation = trpc.logout.useMutation();

  const logout = async () => {
    try {
      await logoutMutation.mutateAsync();
      console.log("Logout successful");
      router.push("/login"); // Redirect to login page using next/navigation
    } catch (error) {
      console.error("Logout failed:", error.message);
      alert("Failed to log out");
    }
  };

  return (
    <div className="text-white px-14">
      <div className="my-11">
        <div className="flex justify-between">
          <h1 className="text-4xl font-bold">Profile Information</h1>
          <UserDialog
            opened={opened}
            authId={authUser?.id}
            id={user.id}
            image={user.image}
            username={user.username}
            email={authUser?.email}
            name={user.name}
            bio={user.bio}
          />
        </div>

        <p className="mb-10 font-light">
          You can edit your profile picture and your personal information by
          clicking on the Edit button
        </p>
        <div className="mb-4">
          <Image
            src={imgUrl ? imgUrl : "/avatar.svg"}
            alt=""
            width={100}
            height={100}
            className="cursor-pointer"
          />
        </div>
        <p>Username: {user.username}</p>
        <p>Email: {user.email}</p>
        <p>Name: {user.name}</p>
        <p>Bio: {user.bio}</p>
      </div>
      <div className="w-full h-[1px] bg-white"></div>
      <div className="my-11">
        <p className="text-xs mb-5 cursor-pointer">Terms of Service</p>
        <p className="text-xs cursor-pointer">Help</p>
      </div>
      <div className="w-full h-[1px] bg-white"></div>
      <div className="my-11">
        <button
          onClick={logout}
          className="px-6 py-3 rounded-lg bg-red-900 hover:bg-red-600"
        >
          Log out
        </button>
      </div>
    </div>
  );
}
