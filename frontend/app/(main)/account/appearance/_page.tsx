"use client";
import { Button } from "@nextui-org/button";
import { Card, CardBody } from "@nextui-org/card";
import { Image } from "@nextui-org/image";
import { Badge } from "@nextui-org/badge";
import { CheckIcon } from "lucide-react";

const AppearanceSettingPage = () => {
  return (
    <div
      className={"max-w-2xl mx-auto flex flex-col items-center py-6 space-y-6"}
    >
      <div className={"w-full text-start"}>
        <h2 className={"text-xl font-medium mb-1"}>Appearance</h2>
        <h4 className={"text-base font-medium"}>
          Select your interface theme of your choice.
        </h4>
      </div>
      <div className={"w-full flex flex-col space-y-6"}>
        <Card
          className={
            "p-6 w-full text-start flex flex-col items-start space-y-6"
          }
        >
          <CardBody className={"flex flex-col space-y-10"}>
            <div
              className={
                "flex flex-col md:flex-row space-y-6 md:space-y-0 md:space-x-6 items-center"
              }
            >
              <div className={"flex flex-col space-y-2"}>
                <Badge
                  isOneChar
                  className={"border-none text-white"}
                  color="success"
                  content={<CheckIcon />}
                  placement="bottom-left"
                  shape="circle"
                >
                  <Image
                    isZoomed
                    alt="System default"
                    className={"max-w-42"}
                    src="/images/system-preference.png"
                    width={200}
                  />
                </Badge>
                <h6 className={"text-divider/60 text-md text-center"}>
                  System
                </h6>
              </div>
              <div className={"flex flex-col space-y-2"}>
                <Image
                  isZoomed
                  alt="System default"
                  className={"max-w-42"}
                  src="/images/light-preference.png"
                  width={200}
                />
                <h6 className={"text-divider/60 text-md text-center"}>Light</h6>
              </div>
              <div className={"flex flex-col space-y-2"}>
                <Image
                  isZoomed
                  alt="System default"
                  className={"max-w-42"}
                  src="/images/dark-preference.png"
                  width={200}
                />
                <h6 className={"text-divider/60 text-md text-center"}>Dark</h6>
              </div>
            </div>
            <div
              className={
                "flex flex-col md:flex-row items-center md:space-x-4 space-y-4 md:space-y-0"
              }
            >
              <Button
                className={"w-full md:w-auto"}
                color={"secondary"}
                variant={"flat"}
              >
                Save Changes
              </Button>
              <Button
                className={"w-full md:w-auto"}
                color={"default"}
                variant={"flat"}
              >
                Cancel
              </Button>
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export default AppearanceSettingPage;
