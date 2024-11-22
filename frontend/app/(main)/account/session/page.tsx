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
      userId: string;
      ip: string;
      os: {
        name: string,
        version: string,
      };
      browser: {
        name: string;
        version: string;
        major: string;
      };
    }[]
  >([]);
  const [ip, setIp] = useState<string>("");
  const [os, setOs] = useState<{
    name: string,
    version: string,
  }>();
  const [browser, setBrowser] = useState<{
    name: string;
    version: string;
    major: string;
  }>();

  useEffect(() => {
    if (!session)
      return;

    fetch('/api/get-client-info', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }).then(response => response.json())
      .then(({ ip, os, browser }) => {
        setIp(ip);
        setOs(os);
        setBrowser(browser);
      });

    fetch('/api/get-browser-sessions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId: session?.user.id }),
    }).then(response => response.json())
      .then(({ sessions }) => {
        console.log(sessions)
        setSessions(sessions);
      });

  }, [session?.user.id]);

  const logoutOthers = async () => { };

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
                  sessions.map((s, i) => (
                    <div
                      key={i}
                      className={"flex flex-col px-4 text-divider/30"}
                    >
                      <h5>
                        {s.os.name}-{s.browser.name}
                      </h5>
                      <span>
                        {s.ip}
                        <strong className={"text-green-200 font-mono ml-2"}>
                          {`${ip}-${os?.name}-${os?.version}-${browser?.name}-${browser?.version}-${browser?.major}` == `${s.ip}-${s.os?.name}-${s.os?.version}-${s.browser?.name}-${s.browser?.version}-${s.browser?.major}` && "this device"}
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
