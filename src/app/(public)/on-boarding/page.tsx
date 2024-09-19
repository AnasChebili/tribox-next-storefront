import { appRouter } from "@/server";
import { createAdminContext } from "@/server/trpc-contexts";
import { dehydrate, Hydrate } from "@tanstack/react-query";
import { createServerSideHelpers } from "@trpc/react-query/server";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import OnBoarding from "./on-boarding";
import { trpcServer } from "@/server/trpc";

export default async function onBoardingPage() {
  let redirectPath: string | null = null;
  let helpers = undefined;
  try {
    const ctx = await createAdminContext({ cookies: headers().get("cookie") });
    helpers = createServerSideHelpers({
      router: appRouter,
      ctx: ctx,
    });

    const authUser = await helpers.getAuthUser.fetch();
    const user = await trpcServer.getUser.query(authUser.user.id);
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
