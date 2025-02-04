"use server";

import { createClient } from "@/lib/supabase/supabase-server-side";
import { ROUTES } from "@/shared/constants/routes";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const registerAction = async (formData: FormData) => {
  const supabase = await createClient();

  const newData = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
    first_name: formData.get("firstName") as string,
    last_name: formData.get("lastName") as string,
  };

  const { data: authData, error } = await supabase.auth.signUp({
    email: newData.email,
    password: newData.password,
    options: {
      data: {
        first_name: newData.first_name,
        last_name: newData.last_name,
        role: "user",
      },
    },
  });

  if (error) {
    console.error("Erreur signup:", error);
    redirect(ROUTES.ERROR);
  }

  const userId = authData.user?.id;
  if (!userId) throw new Error("User not created.");

  revalidatePath(ROUTES.HOMEPAGE, "layout");
  redirect(ROUTES.HOMEPAGE);
};
