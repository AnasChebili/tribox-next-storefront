import { initTRPC } from "@trpc/server";
// utils/trpc-server.ts
import { createTRPCProxyClient, httpBatchLink } from "@trpc/client";
import { AppRouter } from ".";

export const t = initTRPC.create();

export const router = t.router;
export const publicProcedure = t.procedure;

export const trpcServer = createTRPCProxyClient<AppRouter>({
  links: [
    httpBatchLink({
      url: `${process.env.NEXT_PUBLIC_SITE_URL}/api/trpc`,
      // Optionally set headers, such as authentication
      headers() {
        return {
          // Include any headers needed
        };
      },
    }),
  ],
});
