"use client";
import { ChangeEventHandler, useEffect, useState } from "react";
import { login, signup } from "../actions";
import { Divide } from "lucide-react";
import { z } from "zod";
import { cn } from "@/lib/utils";
import { error } from "console";
import { useFormState } from "react-dom";
import { toast } from "sonner";

const InputField = ({
  label,
  id,
  name,
  type,
  placeholder,
  value,
  error,
  onChange,
}: {
  label: string;
  id: string;
  name: string;
  type: string;
  placeholder: string;
  value: string;
  error: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
}) => {
  return (
    <>
      <label
        htmlFor={id}
        className={cn("block font-bold text-xs mb-5", {
          "text-red-500": error,
        })}
      >
        {label}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        required
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={cn(
          "block text-black bg-gray-300 bg-opacity-25 text-xs py-4 pl-2 rounded-lg w-full",
          { "border-2 border-red-500 bg-red-100 text-red-500": error }
        )}
      />
      {error && <p className="text-xs text-red-500">{error}</p>}
    </>
  );
};

const passwordSchema = z.string().min(1);

export default function LoginPage() {
  const [formState, setFormState] = useFormState(login, null);
  const emailSchema = z.string().email();

  useEffect(() => {
    if (formState?.error) toast.error(formState.error);
    else if (formState?.data) toast.success(formState.data)
  }, [formState]);

  interface formValues {
    email: string;
    password: string;
  }

  const [errors, setErrors] = useState<formValues>({ email: "", password: "" });
  const [values, setValues] = useState<formValues>({ email: "", password: "" });

  const isDisabled = Boolean(errors.password || errors.email);

  return (
    <form className="my-[30%] w-[50%] mx-auto">
      <div className="flex">
        <div className="border-b-[3px] border-blue-600 font-bold text-xl pl-4 pr-2 pb-2">
          Sign-in
        </div>
        <div className="border-b-[3px] border-gray-300 font-light text-xl pl-8 pr-4 pb-2 text-gray-500">
          Create an account
        </div>
      </div>
      <div className="mt-10 mb-10">
        <h1 className="font-bold text-4xl font-serif">Welcome Back.</h1>
        <p className="text-xs w-1/2 mt-2">
          Enter your email and password to access your account
        </p>
      </div>
      <div>
        <InputField
          label="Email"
          id="email"
          name="email"
          type="email"
          placeholder="Enter your email"
          value={values.email}
          error={errors.email}
          onChange={(e) => {
            if (!emailSchema.safeParse(e.target.value).success)
              setErrors((prevvalue) => ({
                ...prevvalue,
                email: "Invalid email",
              }));
            else if (errors.email)
              setErrors((prevvalue) => ({ ...prevvalue, email: "" }));
            setValues((prevvalue) => ({
              ...prevvalue,
              email: e.target.value,
            }));
          }}
        ></InputField>
        <div className="mt-8">
          <InputField
            label="Password"
            id="password"
            name="password"
            type="password"
            placeholder="Enter your password"
            value={values.password}
            error={errors.password}
            onChange={(e) => {
              const result = passwordSchema.safeParse(e.target.value);
              console.log(result);
              if (!result.success)
                setErrors((prevvalue) => ({
                  ...prevvalue,
                  password: "Password is required",
                }));
              else if (errors.password)
                setErrors((prevvalue) => ({ ...prevvalue, password: "" }));
              setValues((prevvalue) => ({
                ...prevvalue,
                password: e.target.value,
              }));
            }}
          ></InputField>
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
          disabled={isDisabled}
          formAction={setFormState}
          className={cn("w-full text-white bg-black mt-8 py-3 rounded-md", {
            "opacity-50": isDisabled,
          })}
        >
          Sign in
        </button>

        {/* <button formAction={signup}>Sign up</button> */}
      </div>
    </form>
  );
}
