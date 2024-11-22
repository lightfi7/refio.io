import { NextResponse } from "next/server";

import { captureOrder } from "@/lib/paypal";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const orderID = (await params).id;
    const { userId } = await request.json();
    const { jsonResponse, httpStatusCode } = (await captureOrder(orderID)) as {
      jsonResponse: any;
      httpStatusCode: any;
    };

    await fetch("http://127.0.0.1:5001/api/user/subscribed", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId }),
    });

    return NextResponse.json(jsonResponse, { status: httpStatusCode });
  } catch (error) {
    return NextResponse.error();
  }
}
