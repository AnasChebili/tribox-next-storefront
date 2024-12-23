import "server-only";
import { inferAsyncReturnType, initTRPC, TRPCError } from "@trpc/server";
// utils/trpc-server.ts
import { FetchCreateContextFnOptions } from "@trpc/server/adapters/fetch";
import superjson from "superjson";
import { ZodError } from "zod";
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

export const t = initTRPC.context<Function>().create({
  transformer: superjson,
  errorFormatter({ shape, error }) {
    return {
      ...shape,
      data: {
        ...shape.data,
        ZodError:
          error.cause instanceof ZodError ? error.cause.flatten() : null,
      },
    };
  },
});

export const router = t.router;
export const publicProcedure = t.procedure;

export const adminProcedure = publicProcedure.use(async ({ ctx, next }) => {
  try {
    const heads = (await ctx()) as Record<string, any>;
    const adminCtx = await createAdminContext({
      cookies: heads["cookies"],
    });

    return next({ ctx: adminCtx });
  } catch (error) {
    console.log(error);
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "Failed to create admin procedure context",
    });
  }
});

export const createCallerFactory = t.createCallerFactory;
/* 
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
 */
