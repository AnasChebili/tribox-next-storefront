"use client";

import { login } from "../actions";

import { z } from "zod";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Spinner } from "@/components/ui/spinner";
import { useRouter } from "next/navigation";
import { setCookie } from "cookies-next";

const loginFormSchema = z.object({
  email: z
    .string()
    .min(1, "Please enter email")
    .email("Please enter a valid email"),
  password: z.string().min(1, "Please enter password"),
});

type LoginForm = z.infer<typeof loginFormSchema>;

export default function LoginPage() {
  const router = useRouter();
  const {
    formState: { errors, isSubmitting },
    handleSubmit,
    register,
  } = useForm({
    values: {
      email: "",
      password: "",
    },
    mode: "onChange",
    resolver: zodResolver(loginFormSchema),
  });

  const isDisabled = Boolean(errors.password || errors.email);

  return (
    <form
      onSubmit={handleSubmit(async (values) => {
        const result = await login(values);
        if (result?.error) toast.error(result.error);
        else if (result?.data) {
          toast.success(result.data.message);
          setCookie("authSession", result.data.session);
          router.push("/");
        }
      })}
      className="my-[30%] lg:w-[50%]  px-4 lg:px-0 mx-auto"
    >
      <div className="flex">
        <div className="border-b-[3px] border-blue-600 font-bold text-xl xl:pl-4 pl-1 pr-2 pb-2 cursor-pointer">
          Sign-in
        </div>
        <div className="border-b-[3px] border-gray-300 font-light text-xl xl:pl-8 pl-2 pr-2 pb-2 text-gray-500">
          <Link href="/register">Create an account</Link>
        </div>
      </div>
      <div className="mt-10 mb-10">
        <h1 className="font-bold text-4xl font-serif">Welcome Back.</h1>
        <p className="text-xs w-1/2 mt-2">
          Enter your email and password to access your account
        </p>
      </div>
      <div>
        <label
          htmlFor="email"
          className={cn("block font-bold text-xs mb-5", {
            "text-red-500": errors.email,
          })}
        >
          Email
        </label>
        <input
          id="email"
          type="email"
          required
          placeholder="Enter your email"
          {...register("email")}
          className={cn(
            "block text-black bg-gray-300 bg-opacity-25 text-xs py-4 pl-2 rounded-lg w-full",
            { "border-2 border-red-500 bg-red-100 text-red-500": errors.email }
          )}
        />
        {errors.email && (
          <p className="text-xs text-red-500">{errors.email.message}</p>
        )}

        <div className="mt-8">
          <label
            htmlFor="password"
            className={cn("block font-bold text-xs mb-5", {
              "text-red-500": errors.password,
            })}
          >
            Password
          </label>
          <input
            id="password"
            type="password"
            required
            placeholder="Enter your password"
            {...register("password")}
            className={cn(
              "block text-black bg-gray-300 bg-opacity-25 text-xs py-4 pl-2 rounded-lg w-full",
              {
                "border-2 border-red-500 bg-red-100 text-red-500":
                  errors.password,
              }
            )}
          />
          {errors.password && (
            <p className="text-xs text-red-500">{errors.password.message}</p>
          )}
        </div>

        <div className="flex justify-between mt-8">
          <div>
            <label
              htmlFor="checkbox"
              className="flex gap-3 items-center text-xs font-bold"
            >
              <input id="checkbox" type="checkbox" className="w-4 h-4" />
              Remember me!
            </label>
          </div>
          <p className="text-xs font-bold text-purple-950">Forgot Password?</p>
        </div>
        <button
          disabled={isDisabled || isSubmitting}
          type="submit"
          className={cn(
            "w-full text-white bg-black mt-8 py-3 rounded-md flex justify-center items-center gap-3",
            {
              "opacity-50": isDisabled || isSubmitting,
            }
          )}
        >
          {isSubmitting && <Spinner className="w-5 h-5 text-white"></Spinner>}
          Sign in
        </button>

        {/* <button formAction={signup}>Sign up</button> */}
      </div>
    </form>
  );
}
