"use client";
import Intercom from "@intercom/messenger-js-sdk";
import { useEffect, useState } from "react";

export default function Intercon() {
  const [appId, setAppId] = useState(process.env.NEXT_INTERCOM_APPID as string);
  useEffect(() => {
    fetch("/api/main/get-config", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({}),
    }).then((response) => response.json())
      .then(res => {
        const { config } = res;
        setAppId(config.intercom || process.env.NEXT_INTERCOM_APPID);
      })
      .catch(error => console.error(error));
  }, [])

  Intercom({
    app_id: appId,
  });

  return <div />;
}
