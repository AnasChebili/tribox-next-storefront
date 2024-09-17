import { getAuthUser } from "@/lib/auth";
import { parse } from "cookie";

export const createAdminContext = async ({
  cookies: cookieString,
}: {
  cookies: string | null;
}) => {
  if (!cookieString) throw new Error();

  const cookies = parse(cookieString);

  if (!cookies.authSession) throw new Error();

  const authSession = JSON.parse(cookies.authSession);

  if (!authSession.access_token) throw new Error();

  const user = await getAuthUser(authSession.access_token);

  return { cookies, user };
};
