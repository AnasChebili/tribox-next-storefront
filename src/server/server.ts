import "server-only";
import { FetchCreateContextFnOptions } from "@trpc/server/adapters/fetch";
import { createCaller } from ".";
import { cache } from "react";
import { headers } from "next/headers";
import { parse } from "cookie";

export const createContext = () => {
  const heads = new Headers(headers());
  heads.set("x-trpc-source", "rsc");

  return { cookies: parse(heads.get("cookie") || "") };
};
export const trpcServer = createCaller(createContext);
