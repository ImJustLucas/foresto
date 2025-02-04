import { UpdateUserForm } from "@/components/forms/update-user.form";
import { TypographyP } from "@/components/typography";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/supabase-server-side";
import { redirect } from "next/navigation";

export default async function ProfilePage() {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect("/login");
  }

  console.log(data);

  return (
    <div className="flex w-100 items-center flex-col gap-4 justify-center">
      <UpdateUserForm userId={data.user.id} />
      <div className="min-w-100">
        <TypographyP bold>DANGER ZONE</TypographyP>
        <Button variant="destructive" className="w-full">
          Delete my account
        </Button>
      </div>
    </div>
  );
}
