"use client";
import { useFormState } from "react-dom";
import { signup } from "../actions";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { format } from "path";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useState } from "react";
import { Spinner } from "@/components/ui/spinner";
import { useRouter } from "next/navigation";

export const registerFormSchema = z
  .object({
    email: z
      .string()
      .min(1, "Please enter email")
      .email("Please enter a valid email"),
    password: z
      .string()
      .min(1, "Please enter password")
      .min(8, "Password cannot be less than 8 characters"),
    confirmPassword: z
      .string()
      .min(1, "Please enter password")
      .min(8, "Password cannot be less than 8 characters"),
  })
  .refine((values) => values.password === values.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export type RegisterForm = z.infer<typeof registerFormSchema>;

export default function Home() {
  const router = useRouter();
  const [emailMessage, setEmailMessage] = useState(false);
  const {
    formState: { errors, isSubmitting },
    handleSubmit,
    register,
  } = useForm({
    values: {
      email: "",
      password: "",
      confirmPassword: "",
    },
    mode: "onChange",
    resolver: zodResolver(registerFormSchema),
  });

  const isDisabled = Boolean(
    errors.password || errors.email || errors.confirmPassword
  );
  return (
    <form
      onSubmit={handleSubmit(async (values) => {
        const result = await signup(values);
        if (result?.error) toast.error(result.error);
        else if (result?.data) {
          toast.success(result.data);
          setEmailMessage(true);
          router.push("/on-boarding");
        }
      })}
      className="my-[30%] lg:w-[50%]  px-4 lg:px-0 mx-auto"
    >
      <div className="flex">
        <div className="border-b-[3px] border-gray-300 font-light text-xl xl:pl-4 pl-1 pr-2 pb-2 text-gray-500">
          <Link href="/login">Sign-in</Link>
        </div>
        <div className="border-b-[3px]  border-blue-600  font-bold text-xl xl:pl-8 pl-2 pr-2 pb-2  cursor-pointer">
          Create an account
        </div>
      </div>
      <div className="mt-10 mb-10">
        <h1 className="font-bold text-4xl font-serif">Welcome To Di-Box</h1>
        <p className="text-xs w-2/3 mt-2">
          Just need a little bit of your information and I’ll give you your very
          own account!
        </p>
      </div>
      <div>
        <label
          htmlFor="email"
          className={cn("block font-bold text-xs mb-5", {
            "text-red-500": errors?.email,
          })}
        >
          Email
        </label>
        <input
          id="email"
          type="email"
          required
          placeholder="Enter your email"
          className={cn(
            "block text-black bg-gray-300 bg-opacity-25 text-xs py-4 pl-2 rounded-lg w-full",
            { "border-2 border-red-500 bg-red-100 text-red-500": errors.email }
          )}
          {...register("email")}
        />
        {errors.email && (
          <p className="text-xs text-red-500">{errors.email.message}</p>
        )}
        <label
          htmlFor="password"
          className={cn("block font-bold text-xs mb-5 mt-8", {
            "text-red-500": errors?.password,
          })}
        >
          Password:
        </label>
        <input
          id="password"
          type="password"
          required
          placeholder="Enter your passowrd"
          className={cn(
            "block text-black bg-gray-300 bg-opacity-25 text-xs py-4 pl-2 rounded-lg w-full",
            {
              "border-2 border-red-500 bg-red-100 text-red-500":
                errors.password,
            }
          )}
          {...register("password")}
        />
        {errors.password && (
          <p className="text-xs text-red-500">{errors.password.message}</p>
        )}
        <label
          htmlFor="confirm-password"
          className={cn("block font-bold text-xs mb-5 mt-8", {
            "text-red-500": errors?.confirmPassword,
          })}
        >
          Confirm Password:
        </label>
        <input
          id="confirm-password"
          type="password"
          required
          placeholder="Enter your passowrd"
          className={cn(
            "block text-black bg-gray-300 bg-opacity-25 text-xs py-4 pl-2 rounded-lg w-full",
            {
              "border-2 border-red-500 bg-red-100 text-red-500":
                errors.confirmPassword,
            }
          )}
          {...register("confirmPassword")}
        />
        {errors.confirmPassword && (
          <p className="text-xs text-red-500">
            {errors.confirmPassword.message}
          </p>
        )}

        <button
          disabled={isDisabled || isSubmitting}
          type="submit"
          className={cn(
            "w-full text-white bg-black mt-8 py-3 rounded-md flex justify-center gap-3 items-center",
            { "opacity-50": isDisabled || isSubmitting, hidden: emailMessage }
          )}
        >
          {isSubmitting && <Spinner className="w-5 h-5 text-white"></Spinner>}
          Sign up
        </button>
        {/* <button formAction={signup}>Sign up</button> */}
      </div>
    </form>
  );
}
