import { NextResponse } from "next/server";

import { auth } from "@/lib/auth";

export const POST = auth(async function POST(request) {
  try {
    if (!request.auth)
      return NextResponse.json(
        { message: "Not authenticated" },
        { status: 401 },
      );

    const values = await request.json();

    const result = await fetch(
      "http://127.0.0.1:5001/api/user/logout-other-browsers",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      },
    );

    if (result.ok) {
      const data = await result.json();

      return NextResponse.json(data);
    } else {
      const { message } = await result.json();

      return NextResponse.json({ message }, { status: result.status });
    }
  } catch (error) {
    return NextResponse.error();
  }
});
