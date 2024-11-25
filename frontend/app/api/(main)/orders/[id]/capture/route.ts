import { NextResponse } from "next/server";

import { captureOrder } from "@/lib/paypal";

import { auth } from "@/lib/auth";
import sessionHandler from "@/lib/session-handler";

export const POST = auth(sessionHandler(async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const session = await auth();
    const orderID = (await params).id;
    const { userId } = await request.json();
    const result = await fetch("http://127.0.0.1:5001/api/main/get-config", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId: session?.user.id }),
    });

    if (result.ok) {
      const { paypal: {
        client_id,
        secret_key,
      } } = await result.json();
      const { jsonResponse, httpStatusCode } = (await captureOrder(orderID, client_id, secret_key)) as {
        jsonResponse: any;
        httpStatusCode: any;
      };

      await fetch("http://127.0.0.1:5001/api/user/subscribed", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: session?.user.id }),
      });

      return NextResponse.json(jsonResponse, { status: httpStatusCode });
    } else {
      return NextResponse.error();
    }
  } catch (error) {
    return NextResponse.error();
  }
}))
