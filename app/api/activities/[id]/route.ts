import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/supabase-server-side";
import { ActivityCreateDtoSchema } from "@/shared/types/activity";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const supabase = await createClient();
  const id = (await params).id;

  const { data, error } = await supabase
    .from("activities")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }

  return NextResponse.json({ success: true, data });
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const supabase = await createClient();
  const id = (await params).id;
  const updates = await request.json();

  const response = ActivityCreateDtoSchema.safeParse(updates);

  if (!response.success) {
    console.error(response.error);
    return NextResponse.json(
      { success: false, message: "Bad request", errors: response.error },
      { status: 400 }
    );
  }

  const { data, error } = await supabase
    .from("activities")
    .update(updates)
    .eq("id", id);

  if (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }

  return NextResponse.json({ success: true, data });
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const supabase = await createClient();
  const id = (await params).id;

  const { error } = await supabase.from("activities").delete().eq("id", id);

  if (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }

  return NextResponse.json({ success: true }, { status: 200 });
}
