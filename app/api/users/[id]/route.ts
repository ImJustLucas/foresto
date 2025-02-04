import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/supabase-server-side";

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const supabase = await createClient();
  const id = (await params).id;

  const updates = await request.json();

  const { data, error } = await supabase
    .from("profiles")
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

export async function DELETE() {
  console.log("Users - @DELETE ONE");
  const supabase = await createClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    return NextResponse.json({ error: "Non authentifié" }, { status: 401 });
  }

  const response = await supabase
    .from("auth.users")
    .delete()
    .eq("id", session.user.id);

  if (response.error) {
    console.error(response.error);
    return NextResponse.json(
      { success: false, message: response.error.message },
      { status: 500 }
    );
  }

  return NextResponse.json(
    { success: true },
    {
      status: 204,
    }
  );
}
