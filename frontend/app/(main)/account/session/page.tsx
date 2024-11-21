"use client";
import { Card, CardBody } from "@nextui-org/card";
import { Button } from "@nextui-org/button";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

const SessionSettingPage = () => {
  const { data: session, update } = useSession();
  const [pending, setPending] = useState<boolean>(false);
  const [sessions, setSessions] = useState<
    {
      ip: string;
      osName: string;
      browserName: string;
    }[]
  >([]);
  const [ip, setIp] = useState<string>("");
  const [browserInfo, setBrowserInfo] = useState<{
    osName: string;
    browserName: string;
  }>();

  useEffect(() => {}, []);

  const logoutOthers = async () => {};

  return (
    <div
      className={"max-w-2xl mx-auto flex flex-col items-center py-6 space-y-6"}
    >
      <div className={"w-full text-start"}>
        <h2 className={"text-xl font-medium mb-1"}>Browser Sessions</h2>
        <h4 className={"text-base font-medium"}>
          Add additional security to your account using two factor
          authentication.
        </h4>
      </div>
      <div className={"w-full flex flex-col space-y-6"}>
        <Card
          className={
            "p-6 w-full text-start flex flex-col items-start space-y-6"
          }
        >
          <CardBody className={"flex flex-col space-y-6"}>
            <div className={"flex flex-col space-y-4"}>
              <h6 className={"text-base font-mono"}>
                If necessary you may log out of all of your other browser
                sessions across all of your devices, some of your recent
                sessions are listed below, however, this list may also update
                your password
              </h6>
              <div className={"flex flex-col space-y-6"}>
                {sessions.length > 0 &&
                  sessions.map((session, i) => (
                    <div
                      key={i}
                      className={"flex flex-col px-4 text-divider/30"}
                    >
                      <h5>
                        {session.osName}-{session.browserName}
                      </h5>
                      <span>
                        {session.ip}{" "}
                        <strong className={"text-green-200 font-mono"}>
                          {ip == session.ip && "This device"}
                        </strong>
                      </span>
                    </div>
                  ))}
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
                isLoading={pending}
                variant={"flat"}
                onClick={logoutOthers}
              >
                Logout Other Browser Sessions
              </Button>
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export default SessionSettingPage;
