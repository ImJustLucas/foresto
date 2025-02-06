import { createClient } from "@/lib/supabase/supabase-server-side";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const supabase = await createClient();
  const id = (await params).id;

  if (!id) {
    return NextResponse.json(
      { success: false, message: "Bad request, id's missing" },
      { status: 400 }
    );
  }

  const { data, error } = await supabase
    .from("reservations")
    .select(
      `
    *,
    activity:activity_id(*)
    `
    )
    .eq("user_id", id);

  if (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }

  return NextResponse.json({ success: true, data });
}
