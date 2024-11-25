import { NextAuthRequest } from "next-auth/lib";
import { NextResponse, userAgent } from "next/server";

import { signOut } from "./auth";

const sessionHandler = (
  handler: (req: NextAuthRequest, options?: any) => Promise<Response>,
) => {
  return async (req: NextAuthRequest) => {
    const { os, browser } = userAgent(req);
    const forwarded = req.headers.get("x-forwarded-for");
    let ip = forwarded ? forwarded.split(",")[0].trim() : "unknown";

    if (ip === "::1") {
      ip = "127.0.0.1";
    }

    const response = await fetch(
      "http://127.0.0.1:5001/api/user/get-browser-session",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: req.auth?.user.id, ip, os, browser }),
      },
    );

    if (response.ok) {
    } else {
      if (response.status === 401) {
        await signOut();
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
      }

      return NextResponse.json(
        { message: "No session found" },
        { status: response.status },
      );
    }

    return handler(req);
  };
};

export default sessionHandler;
