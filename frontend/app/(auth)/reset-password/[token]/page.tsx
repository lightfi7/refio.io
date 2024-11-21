"use client";
import Image from "next/image";
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import { ArrowLeftIcon } from "lucide-react";
import { Link } from "@nextui-org/link";
import { useParams, useRouter } from "next/navigation";
import React, { useState } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";

export default function Page() {
  const router = useRouter();
  const { token }: { token: string } = useParams();
  const [error, setError] = useState<string>();
  const [pending, setPending] = useState(false);

  const initialValues = {
    validToken: token,
    password: "",
    confirmPassword: "",
  };

  const validationSchema = Yup.object({
    validToken: Yup.string().required("Token is required"),
    password: Yup.string().required("Password is required"),
    confirmPassword: Yup.string()
      .required("Confirm Password is required")
      .oneOf([Yup.ref("password")], "Passwords must match"),
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      try {
        setPending(true);
        const response = await fetch("/api/auth/reset-password", {
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
      } catch (err) {
        setPending(false);
      } finally {
        setPending(false);
      }
    },
  });

  if (!token) {
    return router.push("/");
  }

  return (
    <div className="flex flex-col items-center justify-center py-24">
      <div className="flex flex-col items-center">
        <Image alt="" height={42} src={"/images/logo.png"} width={42} />
        <h1 className="mt-5 text-2xl font-semibold">Set New Password</h1>
        <span className="mt-2 text-base font-medium">
          Must be atleast 8 characters.
        </span>
      </div>
      <div className="mt-16 w-full min-w-80 max-w-[480px] flex-1">
        <form onSubmit={formik.handleSubmit}>
          <input name={"validToken"} type={"hidden"} value={token} />
          <div className="space-y-6">
            <div className={"space-y-2"}>
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
                size={"lg"}
                type="password"
                value={formik.values.password}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
              />
            </div>
            <div className={"space-y-2"}>
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
                size={"lg"}
                type="password"
                value={formik.values.confirmPassword}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
              />
            </div>
            {error != null && (
              <div
                className={
                  "w-full flex justify-between items-center text-xs text-danger pt-4"
                }
              >
                {error}
              </div>
            )}
            <div className="w-full pt-6">
              <Button
                fullWidth
                color={"secondary"}
                isLoading={pending}
                size={"lg"}
                type={"submit"}
                variant={"flat"}
              >
                {pending ? "Submitting..." : "Continue"}
              </Button>
            </div>
            <div className={"flex flex-col items-center"}>
              <Link
                className="text-secondary font-medium underline"
                href="/sign-in"
              >
                <ArrowLeftIcon className="w-5 inline mr-1" /> Back to log in{" "}
              </Link>
            </div>
          </div>
        </form>
      </div>
      <div className="flex flex-col items-center mt-12 p-1 gap-3">
        <Image
          alt="whatsapp"
          height={24}
          src={"/images/chat-smile.png"}
          width={24}
        />
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
