"use client";
import { Image } from "@nextui-org/image";
import { Input } from "@nextui-org/input";
import { Checkbox } from "@nextui-org/checkbox";
import { Button } from "@nextui-org/button";
import { Link } from "@nextui-org/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";

const initialValues = {
  name: "John",
  email: "light7fi@outlook.com",
  password: "p@ssW0rd",
  confirmPassword: "p@ssW0rd",
};

const validationSchema = Yup.object({
  name: Yup.string()
    .min(4, "Name is at least 4 characters")
    .required("Name is required"),
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .required("Confirm Password is required") // Changed from "Code" to "Confirm Password"
    .oneOf([Yup.ref("password")], "Passwords must match"), // Ensure it matches the password
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
      try {
        const response = await fetch("/api/auth/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        });

        if (response.ok) {
          router.push("/sign-in");
        } else {
          const { message } = await response.json();

          setError(message);
        }
      } catch (err: any) {
        setError(err.message);
      } finally {
        setPending(false);
      }
    },
  });

  return (
    <div className="flex flex-col items-center py-24">
      <div className="flex flex-col items-center">
        <Image height={42} src={"/images/logo.png"} width={42} />
        <h1 className="mt-5 text-2xl font-semibold">Get Started With Cosi</h1>
        <span className="mt-2 text-base font-medium">
          Please enter your details to get started!
        </span>
      </div>
      <div className="mt-16 w-full min-w-80 max-w-[480px] flex-1">
        <form onSubmit={formik.handleSubmit}>
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="block text-base font-medium" htmlFor="name">
                Name
              </label>
              <Input
                errorMessage={formik.errors.name}
                isInvalid={
                  formik.touched.name != undefined &&
                  formik.errors.name != undefined
                }
                name="name"
                placeholder="Enter your full name"
                size="lg"
                value={formik.values.name}
                variant={"bordered"}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
              />
            </div>
            <div className="space-y-2">
              <label className="block text-base font-medium" htmlFor="email">
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
                size="lg"
                type="email"
                value={formik.values.email}
                variant={"bordered"}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
              />
            </div>
            <div className="space-y-2">
              <label className="block text-base font-medium" htmlFor="password">
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
                size="lg"
                type="password"
                value={formik.values.password}
                variant={"bordered"}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
              />
            </div>
            <div className="space-y-2">
              <label
                className="block text-base font-medium"
                htmlFor="confirmPassword"
              >
                Confirm Password
              </label>
              <Input
                errorMessage={formik.errors.confirmPassword}
                isInvalid={
                  formik.touched.confirmPassword != undefined &&
                  formik.errors.confirmPassword != undefined
                }
                name="confirmPassword"
                placeholder="Enter password"
                size="lg"
                type="password"
                value={formik.values.confirmPassword}
                variant={"bordered"}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
              />
            </div>
            <div className="flex">
              <Checkbox name="term">
                I agree to the Terms of Service & Privacy Policy
              </Checkbox>
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
            <div>
              <Button
                fullWidth
                color={"secondary"}
                isLoading={pending}
                size={"lg"}
                type={"submit"}
                variant={"flat"}
              >
                {pending ? "Submitting..." : "Sign up"}
              </Button>
            </div>
            <div className={"flex flex-col items-center"}>
              <label
                className={"text-divider/70 text-base font-medium mt-5"}
                htmlFor="#"
              >
                Already have an account?{" "}
                <Link
                  className="text-secondary font-semibold underline"
                  href="/sign-in"
                >
                  Log in
                </Link>
              </label>
            </div>
          </div>
        </form>
      </div>
      <div className="flex flex-col items-center mt-12 p-1 gap-3">
        <Image src={"/images/chat-smile.png"} width={24} />
        <div className="flex flex-col items-center gap-1 mt-3">
          <h5 className="text-center text-zinc-600 text-base font-medium">
            Any question or feedback?
          </h5>
          <Button size="sm" variant="flat">
            Reach out anytime
          </Button>
        </div>
      </div>
    </div>
  );
}
