import { ActivitiesScreen } from "@/components/screens/activities";
import { ActivityApi } from "@/entities/activity/activity.api";
import { getProfileById } from "@/entities/users/user.api";
import { createClient } from "@/lib/supabase/supabase-server-side";
import { toast } from "sonner";
import { ActivitiesProvider } from "./_contexts/activities.context";
import { Metadata } from "next";
import { ActivityTypeApi } from "@/entities/activity-type/activity-type.api";

export const metadata: Metadata = {
  title: "FORESTO - All the moment you can book",
};

export default async function ActivitiesPage() {
  const supabase = await createClient();

  let userRole: "visitor" | "user" | "admin" = "visitor";

  const responseActivity = await ActivityApi.getAll();
  const responseActivityType = await ActivityTypeApi.getAll();
  const { data } = await supabase.auth.getUser();

  if (data && data.user) {
    const { data: profile } = await getProfileById(data.user.id);
    userRole = profile ? profile.role : "visitor";
  }

  if (!responseActivityType.success) {
    toast.error("Error while fetching activities");
    return;
  }

  if (!responseActivity.success) {
    toast.error("Error while fetching activities");
    return;
  }

  return (
    <ActivitiesProvider>
      <ActivitiesScreen
        activities={responseActivity.data}
        activityType={responseActivityType.data}
        userRole={userRole}
      />
      ;
    </ActivitiesProvider>
  );
}
