import { appRouter } from "@/server";
import { createAdminContext } from "@/server/trpc-contexts";
import { dehydrate, Hydrate } from "@tanstack/react-query";
import { createServerSideHelpers } from "@trpc/react-query/server";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import OnBoarding from "./on-boarding";
import { trpcServer } from "@/server/server";

export default async function onBoardingPage() {
  let redirectPath: string | null = null;
  let helpers = undefined;
  try {
    helpers = createServerSideHelpers({
      router: appRouter,
      ctx: async () =>
        await createAdminContext({ cookies: headers().get("cookie") }),
    });

    const authUser = await helpers.getAuthUser.fetch();
    const user = await trpcServer.getUser(authUser.user.id);
    if (user) {
      redirectPath = "/";
    }
  } catch (error) {
    redirectPath = "/login";
  } finally {
    if (redirectPath) redirect(redirectPath);
  }

  if (!helpers) return <></>;

  return (
    <Hydrate state={dehydrate(helpers.queryClient)}>
      <OnBoarding></OnBoarding>
    </Hydrate>
  );
}
