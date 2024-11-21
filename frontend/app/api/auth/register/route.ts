import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const values = await request.json();

    const result = await fetch("http://127.0.0.1:5001/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });

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
}
