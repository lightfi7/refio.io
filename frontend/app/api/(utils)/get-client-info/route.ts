import { NextResponse, userAgent } from "next/server";

import { auth } from "@/lib/auth";

export async function GET(req: Request) {
  const session = await auth();
  const { os, browser } = userAgent(req);
  const forwarded = req.headers.get("x-forwarded-for");
  let ip = forwarded ? forwarded.split(",")[0].trim() : "unknown";

  if (ip === "::1") {
    ip = "127.0.0.1";
  }

  await fetch("http://127.0.0.1:5001/api/user/update-browser-session", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      userId: session?.user.id,
      ip,
      os,
      browser,
    }),
  });

  return NextResponse.json({
    ip,
    os,
    browser,
  });
}
