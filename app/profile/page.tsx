import { DeleteUserForm } from "@/components/forms/delete-user.form";
import { UpdateUserForm } from "@/components/forms/update-user.form";
import { getProfileById } from "@/entities/users/user.api";
import { createClient } from "@/lib/supabase/supabase-server-side";
import { ROUTES } from "@/shared/constants/routes";
import { redirect } from "next/navigation";
import { toast } from "sonner";
import { Separator } from "@/components/ui/separator";

export default async function ProfilePage() {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect(ROUTES.AUTH.LOGIN);
  }

  const { data: profiles, error: profileError } = await getProfileById(
    data.user.id
  );

  if (profileError) return toast.error("Error while fetching profile");

  return (
    <div className="flex w-1/2 items-center flex-col gap-4 justify-center mx-auto">
      <UpdateUserForm userId={data.user.id} profile={profiles} />
      <Separator />
      <DeleteUserForm userId={data.user.id} />
    </div>
  );
}
