"use client";
import { Card, CardBody, CardHeader } from "@nextui-org/card";
import { Avatar, AvatarIcon } from "@nextui-org/avatar";
import { Button } from "@nextui-org/button";
import { Trash2Icon, UploadIcon } from "lucide-react";
import { Input } from "@nextui-org/input";
import React, { useContext, useEffect, useState } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useSession } from "next-auth/react";
import { ToastContext } from "@/app/providers";

const validationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  name: Yup.string()
    .min(4, "Name must be at least 4 characters long")
    .required("Name is required"),
});

const MyProfilePage = () => {
  const toast = useContext(ToastContext);
  const { data: session, update } = useSession();
  const [pending, setPending] = useState(false);

  useEffect(() => {
    formik.handleChange({
      target: {
        name: "name",
        value: session?.user?.name,
      },
    });
    formik.handleChange({
      target: {
        name: "email",
        value: session?.user?.email,
      },
    });
  }, [session?.user?.name, session?.user?.email]);

  const initialValues = {
    email: session?.user?.email,
    name: session?.user?.name,
  };

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
        const { user } = await response.json();
        toast.success("Profile updated successfully!");
        update({ user });
      }
      else {
        toast.error("Failed to update profile");
      }
      setPending(false);
    },
  });

  const uploadAvatar = async (event: any) => {
    const file = event.target.files[0];

    if (!file) return;
    const formData = new FormData();

    formData.append("userId", session?.user?.id as string);
    formData.append("avatar", file);

    const response = await fetch("/api/account/change", {
      method: "POST",
      body: formData,
    });

    if (response.ok) {
      const { user } = await response.json();
      toast.success("Avatar updated successfully!");
      update({ user });
    } else {
      toast.error("Failed to update avatar");
    }
  };

  const resetAvatar = async (e: any) => {
    const response = await fetch("/api/account/change", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ removeAvatar: true, userId: session?.user.id }),
    });

    if (response.ok) {
      const { user } = await response.json();
      toast.success("Avatar removed successfully!");
      update({ user });
    } else {
      toast.error("Failed to remove avatar");
    }
  };

  return (
    <>
      <div
        className={
          "max-w-2xl mx-auto flex flex-col items-center py-6 space-y-6"
        }
      >
        <div className={"w-full text-start"}>
          <h2 className={"text-xl font-medium mb-1"}>My Profile</h2>
          <h4 className={"text-base font-medium"}>
            Update your account’s profile information and email address.
          </h4>
        </div>
        <div className={"w-full flex flex-col space-y-6"}>
          <Card
            className={
              "p-6 w-full text-start flex flex-col items-start space-y-6"
            }
          >
            <CardHeader className={"p-0"}>
              <h3 className={"text-md font-medium"}>Profile Picture</h3>
            </CardHeader>
            <CardBody>
              <div
                className={
                  "flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4"
                }
              >
                {session?.user?.image ? (
                  <Avatar
                    className={"w-24 h-24 text-large mr-4"}
                    name={session?.user?.name}
                    src={`https://refio.io/images/${session?.user?.image}`}
                  />
                ) : (
                  <Avatar
                    className={"w-24 h-24 text-large mr-4"}
                    icon={<AvatarIcon />}
                    name={session?.user?.name}
                  />
                )}
                {/* Hidden file input */}
                <input
                  accept="image/*"
                  id="avatar-upload"
                  name={"avatar"}
                  style={{ display: "none" }}
                  type="file"
                  onChange={uploadAvatar}
                />
                {/* Label that triggers the file input */}
                <label htmlFor="avatar-upload">
                  <Button
                    className={"w-full md:w-auto"}
                    color={"secondary"}
                    isLoading={pending}
                    size={"md"}
                    startContent={<UploadIcon />}
                    variant={"flat"}
                    onClick={(e) =>
                      document.getElementById("avatar-upload")?.click()
                    } // Trigger file input click
                  >
                    {pending ? "Submitting..." : "Upload"}
                  </Button>
                </label>
                <Button
                  className={"w-full md:w-auto"}
                  color={"danger"}
                  isLoading={pending}
                  size={"md"}
                  startContent={<Trash2Icon />}
                  variant={"flat"}
                  onClick={resetAvatar}
                >
                  {pending ? "Submitting..." : "Remove"}
                </Button>
              </div>
            </CardBody>
          </Card>
          <Card
            className={
              "p-6 w-full text-start flex flex-col items-start space-y-6"
            }
          >
            <CardBody className={"flex flex-col space-y-6"}>
              <form onSubmit={formik.handleSubmit}>
                <div className={"flex flex-col space-y-4"}>
                  <Input
                    errorMessage={formik.errors.name}
                    isInvalid={
                      formik.touched.name != undefined &&
                      formik.errors.name != undefined
                    }
                    label="Name"
                    name={"name"}
                    placeholder="Enter your name"
                    type="text"
                    value={formik.values.name}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                  />
                  <Input
                    errorMessage={formik.errors.email}
                    isInvalid={
                      formik.touched.email != undefined &&
                      formik.errors.email != undefined
                    }
                    label="Email"
                    name={"email"}
                    placeholder="Enter your email"
                    type="email"
                    value={formik.values.email || undefined}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                  />
                </div>
                <div
                  className={
                    "flex flex-col md:flex-row items-center md:space-x-4 space-y-4 md:space-y-0 mt-4"
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
    </>
  );
};

export default MyProfilePage;
