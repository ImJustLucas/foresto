import { NextResponse } from "next/server";
import { createClient as createServerClient } from "@/lib/supabase/supabase-server-side";
import { createClient } from "@supabase/supabase-js";

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const supabase = await createServerClient();
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

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  console.log("Users - @DELETE ONE");

  const supabase = await createServerClient();

  const response = await supabase.auth.getUser();

  if (response.error) {
    return NextResponse.json(
      { success: false, message: response.error },
      { status: 401 }
    );
  } else if (!response.data) {
    return NextResponse.json(
      { success: false, error: "Usr not logged" },
      { status: 401 }
    );
  }

  const userIdToDelete = response.data.user.id;
  const id = (await params).id;

  if (id !== userIdToDelete) {
    return NextResponse.json(
      { error: "Action not allowed: You can only delete your own account" },
      { status: 403 }
    );
  }

  const adminSupabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  const { error } = await adminSupabase.auth.admin.deleteUser(userIdToDelete);

  if (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }

  return NextResponse.json({ success: true }, { status: 200 });
}
