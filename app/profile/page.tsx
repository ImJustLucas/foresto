import { createClient } from "@/lib/supabase/supabase-server-side";
import { redirect } from "next/navigation";

export default async function ProfilePage() {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect("/login");
  }

  console.log(data);

  return <p>Hello {data.user.email}</p>;
}
