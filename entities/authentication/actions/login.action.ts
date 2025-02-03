"use server";

import { createClient } from "@/lib/supabase/supabase-server-side";
import { AuthenticationContracts } from "../authentication.dtos";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { ROUTES } from "@/shared/constants/routes";

export const loginAction = async (formData: FormData) => {
  const supabase = await createClient();

  const safeParse = AuthenticationContracts.loginContract.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (safeParse.error) return;

  const { error } = await supabase.auth.signInWithPassword(safeParse.data);

  if (error) {
    redirect(ROUTES.ERROR);
  }

  revalidatePath(ROUTES.HOMEPAGE, "layout");
  redirect(ROUTES.HOMEPAGE);
};
