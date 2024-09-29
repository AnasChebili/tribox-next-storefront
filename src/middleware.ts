import { NextResponse, type NextRequest } from "next/server";
import { updateSession } from "../utils/supabase/middleware";
import { trpcServer } from "./server/server";

export async function middleware(request: NextRequest) {
  let redirectPath = null;
  try {
    const authUser = await trpcServer.getAuthUser();
    const user = await trpcServer.getUser(authUser.user.id);

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
