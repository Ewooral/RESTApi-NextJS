import { NextRequest, NextResponse } from "next/server";
import { personalInfoSchema } from "@/lib/schemas";

export const dynamic = "force-dynamic"; // defaults to auto

export async function POST(req: NextRequest) {
  const data = await req.json();
  console.log("Data:: ", data);
  let parsed = personalInfoSchema.safeParse(data);
  if (parsed.success) {
    // Add parsed.data to the database
    return NextResponse.json({ message: "User registered", data: parsed.data });
  } else {
    return NextResponse.json({ error: parsed.error }, { status: 400 });
  }
}
