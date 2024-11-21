import { NextResponse } from "next/server";

import { createOrder } from "@/lib/paypal";

export async function POST(req: Request) {
  try {
    const { amount } = await req.json();
    const { jsonResponse, httpStatusCode } = (await createOrder(amount)) as {
      jsonResponse: any;
      httpStatusCode: any;
    };

    return NextResponse.json(jsonResponse, { status: httpStatusCode });
  } catch (error) {
    return NextResponse.error();
  }
}
