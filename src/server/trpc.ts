import { inferAsyncReturnType, initTRPC, TRPCError } from "@trpc/server";
// utils/trpc-server.ts
import { createTRPCProxyClient, httpBatchLink } from "@trpc/client";
import { AppRouter, RouterOutput } from ".";
import { createClient } from "../../utils/supabase/server";
import { headers } from "next/headers";
import type { CreateNextContextOptions } from "@trpc/server/adapters/next";
import { FetchCreateContextFnOptions } from "@trpc/server/adapters/fetch";
import cookie from "cookie";
import { createAdminContext } from "./trpc-contexts";

/* export const createContext = async ({ req }: FetchCreateContextFnOptions) => {
  const supabase = createClient();
  const incomingCookies = req.headers.get("cookie");
  if (!incomingCookies) throw new TRPCError({ code: "UNAUTHORIZED" });
  const stringifiedAuthSession = cookie.parse(incomingCookies).authSession;
  if (!stringifiedAuthSession) throw new TRPCError({ code: "UNAUTHORIZED" });
  const authSession = JSON.parse(stringifiedAuthSession);

  const { data, error } = await supabase.auth.getUser(authSession.access_token);

  if (error || !data.user) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }

  return data.user;
}; */

export const createContext = async ({ req }: FetchCreateContextFnOptions) => {
  // Pass the `req` object into the context so it's accessible in middleware
  return { cookies: req.headers.get("cookie") };
};

export type Context = inferAsyncReturnType<typeof createContext>;

export const t = initTRPC.create();

export const router = t.router;
export const publicProcedure = t.procedure;
export const privateRouter = initTRPC.context<typeof createContext>().create();
export const privateProcedure = privateRouter.procedure;

export const adminProcedure = privateProcedure.use(async ({ ctx, next }) => {
  try {
    const adminCtx = await createAdminContext({ cookies: ctx.cookies });
    return next({ ctx: adminCtx });
  } catch (error) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }
});

export const trpcServer = createTRPCProxyClient<AppRouter>({
  links: [
    httpBatchLink({
      url: `${process.env.NEXT_PUBLIC_SITE_URL}/api/trpc`,
      // Optionally set headers, such as authentication
      headers() {
        const heads = new Map(headers());
        return Object.fromEntries(heads);
      },
    }),
  ],
});
