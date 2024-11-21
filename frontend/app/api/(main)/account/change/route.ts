import { NextResponse } from "next/server";

import { auth } from "@/lib/auth";

export const POST = auth(async function POST(request) {
  try {
    if (!request.auth)
      return NextResponse.json(
        { message: "Not authenticated" },
        { status: 401 },
      );

    let result;

    // Check if the request is form data or JSON
    if (request.headers.get("Content-Type") !== "application/json") {
      const formData = await request.formData();

      result = await fetch("http://127.0.0.1:5001/api/user/update", {
        method: "PUT",
        body: formData,
      });
    } else {
      const data = await request.json();

      result = await fetch("http://127.0.0.1:5001/api/user/update", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
    }

    if (result.ok) {
      const data = await result.json();

      console.log(data);

      return NextResponse.json(data);
    } else {
      const { message } = await result.json();

      return NextResponse.json({ message }, { status: result.status });
    }
  } catch (error) {
    console.error("Error:", error);

    return NextResponse.error();
  }
});
