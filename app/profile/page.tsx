import { DeleteUserForm } from "@/components/forms/delete-user.form";
import { UpdateUserForm } from "@/components/forms/update-user.form";
import { getProfileById } from "@/entities/users/user.api";
import { createClient } from "@/lib/supabase/supabase-server-side";
import { redirect } from "next/navigation";
import { toast } from "sonner";

export default async function ProfilePage() {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect("/login");
  }

  const { data: profiles, error: profileError } = await getProfileById(
    data.user.id
  );

  if (profileError) return toast.error("Error while fetching profile");

  console.log(data, profiles);

  return (
    <div className="flex w-100 items-center flex-col gap-4 justify-center">
      <UpdateUserForm userId={data.user.id} profile={profiles} />
      <DeleteUserForm userId={data.user.id} />
    </div>
  );
}
