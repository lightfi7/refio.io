"use client";
import { Card, CardBody } from "@nextui-org/card";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useState } from "react";
import { FormikState } from "formik/dist/types";
import { useSession } from "next-auth/react";

const SecuritySettingPage = () => {
  const { data: session, update } = useSession();
  const [pending, setPending] = useState<boolean>(false);

  const initialValues = {
    // currentPassword: '',
    password: "",
    confirmPassword: "",
  };

  const validationSchema = Yup.object({
    // currentPassword: Yup.string()
    //     .min(6, 'Password must be at least 6 characters')
    //     .required('Password is required'),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    confirmPassword: Yup.string()
      .required("Confirm Password is required") // Changed from "Code" to "Confirm Password"
      .oneOf([Yup.ref("password")], "Passwords must match"), // Ensure it matches the password
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
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
      }
      setPending(false);
    },
  });

  return (
    <div
      className={"max-w-2xl mx-auto flex flex-col items-center py-6 space-y-6"}
    >
      <div className={"w-full text-start"}>
        <h2 className={"text-xl font-medium mb-1"}>Password</h2>
        <h4 className={"text-base font-medium"}>
          Ensure your account is using a long, random password to stay secure.
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
              className={"flex flex-col space-y-6"}
              onReset={(e) => formik.resetForm(e as Partial<FormikState<any>>)}
              onSubmit={formik.handleSubmit}
            >
              <div className={"flex flex-col space-y-4"}>
                {/*<Input type="password" label="Current Password" name={'currentPassword'} placeholder="Enter your current password" />*/}
                <Input
                  errorMessage={formik.errors.password}
                  isInvalid={
                    formik.touched.password != undefined &&
                    formik.errors.password != undefined
                  }
                  label="New Password"
                  name={"password"}
                  placeholder="Enter your new password"
                  type="password"
                  value={formik.values.password}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                />
                <Input
                  errorMessage={formik.errors.confirmPassword}
                  isInvalid={
                    formik.touched.confirmPassword != undefined &&
                    formik.errors.confirmPassword != undefined
                  }
                  label="Confirm Password"
                  name={"confirmPassword"}
                  placeholder="Enter your new password"
                  type="password"
                  value={formik.values.confirmPassword}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                />
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
                  {pending ? "Submitting..." : "Save Changes"}
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

export default SecuritySettingPage;
