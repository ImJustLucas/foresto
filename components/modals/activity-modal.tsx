import {
  MapPinIcon,
  CalendarIcon,
  UsersIcon,
  MapIcon,
  List,
  LoaderCircle,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Activity } from "@/shared/types/activity";
import { Button } from "../ui/button";
import { useState } from "react";
import { useActivities } from "@/app/activities/_contexts/activities.context";
import { ActivityApi } from "@/entities/activity/activity.api";
import { toast } from "sonner";

export const ActivityModal: React.FC<{
  open: boolean;
  onOpenChange: () => void;
  activity: Activity | null;
  isAdmin: boolean;
}> = ({ open, onOpenChange, activity, isAdmin = false }) => {
  const [loading, setLoading] = useState(false);

  const { activities } = useActivities();

  const handleDelete = async () => {
    if (activity) {
      setLoading(true);

      const response = await ActivityApi.delete(activity.id);
      if (!response.success) {
        return toast.error("Error while deleting activity");
      }
      activities.delete(activity.id);
      toast.success("Activity successfully deleted");

      setLoading(false);
      onOpenChange();
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{activity?.name}</DialogTitle>
          <div className="mt-8">
            <div className="text-sm text-gray-500 mb-2">
              <MapPinIcon className="inline-block w-4 h-4 mr-1" />
              <span className="font-bold">Where: </span>
              {activity?.location}
            </div>
            <div className="text-sm text-gray-500 mb-2">
              <CalendarIcon className="inline-block w-4 h-4 mr-1" />
              <span className="font-bold">Start: </span>
              {activity?.start_datetime.toLocaleString()}
            </div>
            <div className="text-sm text-gray-500 mb-2">
              <UsersIcon className="inline-block w-4 h-4 mr-1" />
              <span className="font-bold">Available Slots: </span>
              {activity?.available_slots}
            </div>
            <div className="text-sm text-gray-500 mb-2">
              <MapIcon className="inline-block w-4 h-4 mr-1" />
              <span className="font-bold">Duration: </span>
              {activity && activity.duration / (24 * 60 * 60 * 1000)} days
            </div>
            <div className="text-sm text-gray-500 mb-4">
              <List className="inline-block w-4 h-4 mr-1" />
              <span className="font-bold">Activity type: </span>
              {activity?.activity_types.name}
            </div>
            <div className="text-sm">{activity?.description}</div>
          </div>
        </DialogHeader>
        {isAdmin && (
          <DialogFooter>
            <Button
              variant={"destructive"}
              onClick={handleDelete}
              disabled={loading}
            >
              {loading ? (
                <LoaderCircle className="animate-spin" />
              ) : (
                "Delete activity"
              )}
            </Button>
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
};
