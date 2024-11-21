"use client";
import { Image } from "@nextui-org/image";
import { Button } from "@nextui-org/button";
import { Link } from "@nextui-org/link";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";

import VerificationCodeInput from "@/components/verification-code-input";

export default function Page() {
  const router = useRouter();
  const { email }: { email: string } = useParams();
  const searchParams = useSearchParams();
  const [code, setCode] = useState<string>();
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string>();

  const initialValues = {
    validToken: searchParams.get("validToken") as string,
    code: "",
  };

  const validationSchema = Yup.object({
    validToken: Yup.string().required("Token is required"),
    code: Yup.string().required("Code is required"),
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      try {
        setPending(true);
        const response = await fetch(`/api/auth/confirm-code`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        });

        if (response.ok) {
          const { redirectUrl } = await response.json();

          router.push(`${redirectUrl}`);
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

  if (!email) {
    return router.push("/");
  }

  return (
    <div className="flex flex-col items-center py-24">
      <div className="flex flex-col items-center">
        <Image height={42} src={"/images/logo.png"} width={42} />
        <h1 className="mt-5 text-2xl font-semibold">Enter Verification Code</h1>
        <span className="mt-2 text-base font-medium">
          Enter the 6-digit code sent to your email
        </span>
        <a
          className="text-base font-medium underline"
          href={`mailto:${decodeURIComponent(email)}`}
        >
          {decodeURIComponent(email)}
        </a>
      </div>
      <div className="mt-16 w-full min-w-80 max-w-[480px] flex-1">
        <div className="space-y-6">
          <div className="flex flex-row gap-2 justify-center">
            <VerificationCodeInput
              onComplete={(code) => {
                setCode(code);
                formik.handleChange({
                  target: {
                    name: "code",
                    value: code,
                  },
                });
              }}
            />
          </div>
          <div className="flex justify-center gap-2 py-14">
            <label className="text-zinc-500" htmlFor="#">
              Didn’t get the code?
              <Link
                className="text-base text-secondary font-medium underline"
                href="/forgot-password"
              >
                Click to resend
              </Link>
            </label>
          </div>
          {formik.errors.code}
          {formik.errors.validToken}
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
            <form onSubmit={formik.handleSubmit}>
              <input
                name={"code"}
                type={"hidden"}
                value={formik.values.code}
                onChange={formik.handleChange}
              />
              <input
                name={"validToken"}
                type={"hidden"}
                value={formik.values.validToken}
                onChange={formik.handleChange}
              />
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
            </form>
          </div>
          <div className={"flex flex-col items-center"}>
            <label
              className={"text-divider/70 text-base font-medium mt-5"}
              htmlFor="#"
            >
              Already have an account?{" "}
              <Link
                className="text-secondary text-base font-semibold underline"
                href="/sign-in"
              >
                Log in
              </Link>
            </label>
          </div>
        </div>
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
          <Button size="sm" variant="flat">
            Reach out anytime
          </Button>
        </div>
      </div>
    </div>
  );
}
