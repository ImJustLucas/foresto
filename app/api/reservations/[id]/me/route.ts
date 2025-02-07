import { createClient } from "@/lib/supabase/supabase-server-side";
import { NextResponse } from "next/server";
import { type NextRequest } from "next/server";

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

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const supabase = await createClient();
  const id = (await params).id;
  const searchParams = request.nextUrl.searchParams;

  const reservationId = searchParams.get("reservationId");

  if (!id || !reservationId) {
    return NextResponse.json(
      { success: false, message: "Bad request, id's missing" },
      { status: 400 }
    );
  }

  const { data: reservation, error: fetchError } = await supabase
    .from("reservations")
    .select("*")
    .eq("user_id", id)
    .eq("id", reservationId)
    .single();

  if (fetchError) {
    console.error(fetchError);
    return NextResponse.json(
      { success: false, message: fetchError.message },
      { status: 500 }
    );
  }

  if (!reservation) {
    return NextResponse.json(
      { success: false, message: "Reservation not found" },
      { status: 404 }
    );
  }

  const { data, error } = await supabase
    .from("reservations")
    .update({ status: false })
    .eq("id", reservationId)
    .single();

  if (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }

  return NextResponse.json({ success: true, data });
}
