import { redirect } from "next/navigation";
import { createClient } from "../../../../utils/supabase/server";
import { logout } from "@/app/(auth)/logout/actions";
import Image from "next/image";

export default async function PrivatePage() {
  const supabase = createClient();

  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect("/login");
  }
  console.log(data.user);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-sm w-full">
        <div className="flex flex-col items-center">
          <div className="mb-4">
            <Image
              src="/avatar.svg"
              alt=""
              width={200}
              height={200}
              className="cursor-pointer "
            ></Image>
          </div>
          <div className="text-center mb-4">
            <p className="text-xl font-semibold text-black">{data.user.email}</p>
          </div>
          <form action={logout}>
            <button
              type="submit"
              className="mt-4 px-4 py-2 bg-black text-white rounded-md hover:bg-blue-600"
            >
              Log Out
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
