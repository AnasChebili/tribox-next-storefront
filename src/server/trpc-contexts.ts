import { getAuthUser } from "@/lib/auth";
import { parse } from "cookie";

export const createAdminContext = async ({
  cookies: cookieString,
}: {
  cookies: any | null;
}) => {
  if (!cookieString) {
    throw new Error("No cookies");
  }

  const cookies = !cookieString.authSession
    ? parse(cookieString)
    : cookieString;

  if (!cookies.authSession) {
    throw new Error("No auth session");
  }

  const authSession = JSON.parse(cookies.authSession);

  if (!authSession.access_token) {
    throw new Error("No access token");
  }

  const user = await getAuthUser(authSession.access_token);

  return { cookies, user };
};
