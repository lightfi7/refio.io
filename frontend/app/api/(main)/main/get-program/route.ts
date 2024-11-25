import { NextResponse } from "next/server";

import { auth } from "@/lib/auth";
import sessionHandler from "@/lib/session-handler";

export const POST = auth(
  sessionHandler(async function POST(request) {
    const session = await auth();

    try {
      if (!request.auth)
        return NextResponse.json(
          { message: "Not authenticated" },
          { status: 401 },
        );
      const values = await request.json();

      return fetch("http://127.0.0.1:5001/api/main/get-program", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...values, userId: session?.user.id }),
      });
    } catch (error) {
      return NextResponse.error();
    }
  }),
);
