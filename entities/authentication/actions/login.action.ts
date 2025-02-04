"use server";

import { createClient } from "@/lib/supabase/supabase-server-side";
import { AuthenticationContracts } from "../authentication.dtos";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { ROUTES } from "@/shared/constants/routes";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const loginAction = async (prevState: any, formData: FormData) => {
  const supabase = await createClient();

  const safeParse = AuthenticationContracts.loginContract.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!safeParse.success) {
    return { message: safeParse.error.message, error: true };
  }
  const { error } = await supabase.auth.signInWithPassword(safeParse.data);
  if (error) {
    console.log("wsh", error);
    return { message: error, error: true };
  }

  console.log("LOGGED IN");

  revalidatePath(ROUTES.ACCOUNT, "layout");
  redirect(ROUTES.ACCOUNT);
};
