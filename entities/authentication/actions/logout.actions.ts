"use server";

import { createClient } from "@/lib/supabase/supabase-server-side";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { ROUTES } from "@/shared/constants/routes";

export const loginAction = async () => {
  const supabase = await createClient();

  const { error } = await supabase.auth.signOut();

  if (error) {
    redirect(ROUTES.ERROR);
  }

  revalidatePath(ROUTES.HOMEPAGE, "layout");
  redirect(ROUTES.HOMEPAGE);
};
