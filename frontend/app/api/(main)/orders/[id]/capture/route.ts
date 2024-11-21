import { NextResponse } from "next/server";

import { captureOrder } from "@/lib/paypal";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const orderID = (await params).id;
    const { jsonResponse, httpStatusCode } = (await captureOrder(orderID)) as {
      jsonResponse: any;
      httpStatusCode: any;
    };

    return NextResponse.json(jsonResponse, { status: httpStatusCode });
  } catch (error) {
    return NextResponse.error();
  }
}
