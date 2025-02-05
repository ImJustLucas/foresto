import { ActivitiesScreen } from "@/components/screens/activities";
import { ActivityApi } from "@/entities/activity/activity.api";
import { toast } from "sonner";

export default async function ActivitiesPage() {
  const response = await ActivityApi.getAll();

  if (!response.success) {
    toast.error("Error while fetching activities");
    return;
  }

  return <ActivitiesScreen activities={response.data} />;
}
