import { FetchCreateContextFnOptions } from "@trpc/server/adapters/fetch";
import { createCaller } from ".";

export const createContext = async ({ req }: FetchCreateContextFnOptions) => {
  // Pass the `req` object into the context so it's accessible in middleware
  return { cookies: req.headers.get("cookie") };
};
export const trpcServer = createCaller(createContext);
