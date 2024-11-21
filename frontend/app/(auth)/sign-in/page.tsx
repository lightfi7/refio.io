"use client";
import React, { useState } from "react";
import { Image } from "@nextui-org/image";
import { Input } from "@nextui-org/input";
import { Checkbox } from "@nextui-org/checkbox";
import { Link } from "@nextui-org/link";
import { Button } from "@nextui-org/button";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import { signIn } from "next-auth/react";
import * as Yup from "yup";

const initialValues = {
  email: "light7fi@outlook.com",
  password: "p@ssW0rd",
};

const validationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

export default function Page() {
  const router = useRouter();
  const [error, setError] = useState<string>();
  const [pending, setPending] = useState(false);

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      setPending(true);
      const result = await signIn("credentials", {
        redirect: false,
        ...values,
      });

      if (result?.error) {
        switch (result.error) {
          case "CredentialsSignin":
            setError("Invalid email or password.");
            break;
          default:
            setError("An unexpected error occurred.");
        }
      } else {
        router.push("/dashboard");
      }
      setPending(false);
    },
  });

  return (
    <div className="flex flex-col items-center py-24">
      <div className="flex flex-col items-center">
        <Image height={42} src={"/images/logo.png"} width={42} />
        <h1 className="mt-5 text-2xl font-semibold">Welcome Back</h1>
        <span className="mt-2 text-base font-medium">
          Glad to see you again
        </span>
        <span className="mt-2 text-base font-medium">
          Sign in to your account below
        </span>
      </div>
      <div className="mt-16 w-full min-w-80 max-w-[480px] flex-1">
        <form
          className={"w-full flex flex-col items-center space-y-7"}
          onSubmit={formik.handleSubmit}
        >
          <div className={"block w-full space-y-2"}>
            <label className={"font-medium"} htmlFor="email">
              Email
            </label>
            <Input
              errorMessage={formik.errors.email}
              isInvalid={
                formik.touched.email != undefined &&
                formik.errors.email != undefined
              }
              name="email"
              placeholder="Enter your email address"
              size={"lg"}
              type="email"
              value={formik.values.email}
              variant={"bordered"}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
            />
          </div>
          <div className={"block w-full space-y-2"}>
            <label className={"font-medium"} htmlFor="password">
              Password
            </label>
            <Input
              errorMessage={formik.errors.password}
              isInvalid={
                formik.touched.password != undefined &&
                formik.errors.password != undefined
              }
              name="password"
              placeholder="Enter password"
              size={"lg"}
              type="password"
              value={formik.values.password}
              variant={"bordered"}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
            />
          </div>
          <div className={"w-full flex justify-between items-center"}>
            <Checkbox>Remember me</Checkbox>
            <Link className={"text-secondary"} href={"/forgot-password"}>
              Forget password?
            </Link>
          </div>
          {error != null && (
            <div
              className={
                "w-full flex justify-between items-center text-xs text-danger"
              }
            >
              {error}
            </div>
          )}
          <div className={"w-full"}>
            <Button
              fullWidth
              color={"secondary"}
              isLoading={pending}
              size={"lg"}
              type={"submit"}
              variant={"flat"}
            >
              {pending ? "Submitting..." : "Login"}
            </Button>
          </div>
          <div>
            <span className={"text-base font-medium"}>
              Don’t have an account?
              <Link className={"ml-1 text-secondary"} href={"/sign-up"}>
                Sign up
              </Link>
            </span>
          </div>
        </form>
      </div>
      <div className="flex flex-col items-center mt-12 p-1 gap-3">
        <Image height={24} src={"/images/chat-smile.png"} width={24} />
        <div className="flex flex-col items-center gap-1 mt-3">
          <h5 className="text-center text-zinc-600 text-base font-medium">
            Any question or feedback?
          </h5>
          <Button size={"sm"} variant={"flat"}>
            Reach out anytime
          </Button>
        </div>
      </div>
    </div>
  );
}
