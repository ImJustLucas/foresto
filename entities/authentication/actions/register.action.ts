"use server";

import { createClient } from "@/lib/supabase/supabase-server-side";
import { ROUTES } from "@/shared/constants/routes";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const registerAction = async (formData: FormData) => {
  const supabase = await createClient();

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const { error } = await supabase.auth.signUp(data);

  if (error) {
    console.error(error);
    redirect(ROUTES.ERROR);
  }

  revalidatePath(ROUTES.HOMEPAGE, "layout");
  redirect(ROUTES.HOMEPAGE);
};
