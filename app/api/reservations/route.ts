import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/supabase-server-side";

export async function POST(request: Request) {
  const supabase = await createClient();
  const body = await request.json();

  const { data, error } = await supabase.from("reservations").insert([body]);

  if (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }

  return NextResponse.json({ success: true, data }, { status: 201 });
}

export async function GET() {
  const supabase = await createClient();

  const { data, error } = await supabase.from("reservations").select("*");

  if (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }

  return NextResponse.json({ success: true, data });
}
