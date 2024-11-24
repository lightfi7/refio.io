import { NextResponse } from "next/server";

import { createOrder } from "@/lib/paypal";

import { auth } from "@/lib/auth";
import sessionHandler from "@/lib/session-handler";

export const POST = auth(sessionHandler(async function POST(req) {
  try {
    const { amount } = await req.json();

    const result = await fetch("http://127.0.0.1:5001/api/main/get-config", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({}),
    });

    if (result.ok) {
      const { paypal: {
        client_id,
        secret_key,
      } } = await result.json();
      const { jsonResponse, httpStatusCode } = (await createOrder(amount, client_id, secret_key)) as {
        jsonResponse: any;
        httpStatusCode: any;
      };
      return NextResponse.json(jsonResponse, { status: httpStatusCode });
    } else {
      return NextResponse.error();
    }


  } catch (error) {
    return NextResponse.error();
  }
}));
