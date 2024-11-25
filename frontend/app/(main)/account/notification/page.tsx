"use client";
import { Card, CardBody } from "@nextui-org/card";
import { Button } from "@nextui-org/button";
import { Checkbox } from "@nextui-org/checkbox";
import { useContext, useState } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { FormikState } from "formik/dist/types";
import { useSession } from "next-auth/react";

import { ToastContext } from "@/app/providers";

const NotificationSettingPage = () => {
  const toast = useContext(ToastContext);
  const { data: session } = useSession();
  const [pending, setPending] = useState<boolean>(false);

  const initialValues = {
    new: false,
    favorite: false,
    feedback: false,
  };

  const validationSchema = Yup.object({});

  const formik = useFormik({
    initialValues,
    onSubmit: async (values) => {
      setPending(true);
      const response = await fetch("/api/account/change", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...values, userId: session?.user?.id }),
      });

      if (response.ok) {
        toast.success("Notification settings saved successfully");
      } else {
        toast.error("An unexpected error occurred.");
      }
      setPending(false);
    },
  });

  return (
    <div
      className={"max-w-2xl mx-auto flex flex-col items-center py-6 space-y-6"}
    >
      <div className={"w-full text-start"}>
        <h2 className={"text-xl font-medium mb-1"}>Notifications</h2>
        <h4 className={"text-base font-medium"}>
          Manage your preferences about mail alerts here.
        </h4>
      </div>
      <div className={"w-full flex flex-col space-y-6"}>
        <Card
          className={
            "p-6 w-full text-start flex flex-col items-start space-y-6"
          }
        >
          <CardBody>
            <form
              className={"flex flex-col space-y-10"}
              onReset={(e) => formik.resetForm(e as Partial<FormikState<any>>)}
              onSubmit={formik.handleSubmit}
            >
              <div className={"flex flex-col space-y-6"}>
                <div className={"flex flex-col space-y-1"}>
                  <Checkbox
                    checked={formik.values.new}
                    name={"new"}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                  >
                    New Programs Added
                  </Checkbox>
                  <span className={"text-sm text-divider/60"}>
                    Get notified when we add affiliate programs that match your
                    preferences.
                  </span>
                </div>
                <div className={"flex flex-col space-y-1"}>
                  <Checkbox
                    checked={formik.values.favorite}
                    name={"favorite"}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                  >
                    Favorite Programs Updated
                  </Checkbox>
                  <span className={"text-sm text-divider/60"}>
                    Get notified when we update an affiliate program that you
                    have in your favorites{" "}
                    <a className={"underline text-purple-300"} href={"/"}>
                      affiliate programs
                    </a>
                    .
                  </span>
                  <span className={"text-sm text-divider/60"}>
                    For examples, when we update commission or cookie duration,
                    etc.
                  </span>
                </div>
                <div className={"flex flex-col space-y-1"}>
                  <Checkbox
                    checked={formik.values.feedback}
                    name={"feedback"}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                  >
                    Giving your feedback on programs that you apply
                  </Checkbox>
                  <span className={"text-sm text-divider/60"}>
                    Get notified in order to give you feedbacks on the programs{" "}
                    <a className={"underline text-purple-300"} href={"/"}>
                      you have recently joined
                    </a>
                    .
                  </span>
                </div>
                {/*<div className={"flex flex-col space-y-1"}>*/}
                {/*  <Checkbox defaultSelected>New Demo Programs List (Free Users Only)</Checkbox>*/}
                {/*  <span className={"text-sm text-divider/60"}>Every month, a new demo list featuring 30 affiliate programs is made available to free members. This alerts keeps up to date (not used for premium).</span>*/}
                {/*</div>*/}
              </div>
              <div
                className={
                  "flex flex-col md:flex-row items-center md:space-x-4 space-y-4 md:space-y-0"
                }
              >
                <Button
                  className={"w-full md:w-auto"}
                  color={"secondary"}
                  isLoading={pending}
                  type={"submit"}
                  variant={"flat"}
                >
                  Save Changes
                </Button>
                <Button
                  className={"w-full md:w-auto"}
                  color={"default"}
                  type={"reset"}
                  variant={"flat"}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export default NotificationSettingPage;
