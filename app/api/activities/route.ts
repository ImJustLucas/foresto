import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/supabase-server-side";
import { ActivityCreateDtoSchema } from "@/shared/types/activity";

export async function POST(request: Request) {
  const supabase = await createClient();
  const body = await request.json();

  const response = ActivityCreateDtoSchema.safeParse(body);

  if (!response.success) {
    console.error(response.error);
    return NextResponse.json(
      { success: false, message: "Bad request", errors: response.error },
      { status: 500 }
    );
  }

  const { data, error } = await supabase.from("activities").insert([body]);

  if (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 400 }
    );
  }

  return NextResponse.json({ success: true, data }, { status: 201 });
}

export async function GET() {
  const supabase = await createClient();

  const { data, error } = await supabase.from("activities").select(
    `
    *,
    activity_types:type_id (
      id,
      name
    ),
    reservations (
      user_id
    )
  `
  );

  if (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }

  return NextResponse.json({ success: true, data });
}
