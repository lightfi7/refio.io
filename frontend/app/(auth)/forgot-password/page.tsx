"use client";
import { Image } from "@nextui-org/image";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { ArrowLeftIcon } from "lucide-react";
import { Link } from "@nextui-org/link";
import { useRouter } from "next/navigation";
import React, { useContext, useState } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useTheme } from "next-themes";

import { ToastContext } from "@/app/providers";

export default function Page() {
  const toast = useContext(ToastContext);
  const { theme } = useTheme();
  const router = useRouter();
  const [error, setError] = useState<string>();
  const [pending, setPending] = useState(false);

  const initialValues = {
    email: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      try {
        setPending(true);
        const response = await fetch("/api/auth/forgot-password", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        });

        if (!response.ok) {
          const { message } = await response.json();

          toast.error(message);
          setError(message);
        } else {
          const { validToken } = await response.json();

          router.push(`/confirm-code/${values.email}?validToken=${validToken}`);
        }
      } catch (err) {
        console.error(err);
        toast.error("An unexpected error occurred.");
      } finally {
        setPending(false);
      }
    },
  });

  return (
    <div className="flex flex-col items-center py-24">
      <div className="flex flex-col items-center">
        {theme == "light" ? (
          <Image
            className="min-w-40"
            height={90}
            src={"/images/logo.png"}
            width={160}
          />
        ) : (
          <Image
            className="min-w-40"
            height={90}
            src={"/images/logo-dark.png"}
            width={160}
          />
        )}
        <h1 className="mt-5 text-2xl font-semibold">Forget Password</h1>
        <span className="mt-2 text-base font-medium text-center">
          Please enter your registered email address to receive <br />a
          verification code
        </span>
      </div>
      <div className="mt-16 w-full min-w-80 max-w-[480px] flex-1">
        <form onSubmit={formik.handleSubmit}>
          <div className="space-y-6">
            <div className={"block w-full space-y-2"}>
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
                size={"lg"}
                type="email"
                value={formik.values.email}
                variant={"bordered"}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
              />
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
            <div className="w-full pt-10">
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
                <ArrowLeftIcon className="w-5 inline mr-1" /> Back to log in
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
