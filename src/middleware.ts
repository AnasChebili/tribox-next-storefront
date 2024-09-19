import { NextResponse, type NextRequest } from "next/server";
import { updateSession } from "../utils/supabase/middleware";
import { trpcServer } from "@/server/trpc";

export async function middleware(request: NextRequest) {
  console.log("middleware========================================");

  let redirectPath = null;
  try {
    const authUser = await trpcServer.getAuthUser.query();
    const user = await trpcServer.getUser.query(authUser.user.id);

    if (!user) {
      redirectPath = "/on-boarding";
    }
  } catch (error) {
  } finally {
    if (redirectPath)
      return NextResponse.redirect(new URL("/on-boarding", request.url));
  }
  return await updateSession(request);
}

export const config = {
  matcher: ["/", "/about", "/store", "/dashboard/:path*"],
};
