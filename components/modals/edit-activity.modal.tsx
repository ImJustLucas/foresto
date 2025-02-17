import { useEffect, useState } from "react";
import { CustomFormItem } from "../forms/atoms/form-item";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Label } from "../ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { fr } from "date-fns/locale";
import { format } from "date-fns";
import { Button } from "../ui/button";
import { Calendar } from "../ui/calendar";
import { CalendarIcon, LoaderCircle } from "lucide-react";
import { ActivityApi } from "@/entities/activity/activity.api";
import { toast } from "sonner";
import { Activity } from "@/shared/types/activity";
import { useActivities } from "@/shared/contexts/activities.context";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

type ModalProps = {
  open: boolean;
  onOpenChange: () => void;
};

export const EditActivityModal: React.FC<ModalProps> = ({
  open,
  onOpenChange,
}) => {
  const [activityData, setActivityData] = useState<Activity>({} as Activity);
  const [loading, setLoading] = useState<boolean>(false);
  const { activities, activityType } = useActivities();

  useEffect(() => {
    if (open) {
      const selectedActivity = activities.getSelectedActivity();
      if (selectedActivity) {
        setActivityData(selectedActivity);
      } else onOpenChange();
    } else {
      setActivityData({} as Activity);
    }
  }, [open]);

  const handleChange = (
    field: string,
    value: string | number | Date | undefined
  ) => {
    setActivityData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    if (loading) return;
    setLoading(true);

    const response = await ActivityApi.updateOneById(activityData.id, {
      name: activityData.name,
      location: activityData.location,
      description: activityData.description,
      available_slots: activityData.available_slots,
      start_datetime: activityData.start_datetime,
      duration: activityData.duration,
      type_id: activityData.activity_types.id,
    });

    if (!response.success) {
      toast.error(response.message ?? "Failed to update activity");
      setLoading(false);
      return;
    }

    toast.success("Activity updated successfully");
    const updatedActivities = activities.get.map((activity) =>
      activity.id === activityData.id ? activityData : activity
    );
    activities.init(updatedActivities);
    onOpenChange();
    setLoading(true);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Activity</DialogTitle>
        </DialogHeader>
        <div className="flex items-center gap-4">
          <CustomFormItem
            name="name"
            type="text"
            label="Name"
            description="Enter the activity name"
            value={activityData.name}
            onChange={(value) => handleChange("name", value)}
          />
          <CustomFormItem
            name="location"
            type="text"
            label="Location"
            description="Enter the activity location"
            value={activityData.location}
            onChange={(value) => handleChange("location", value)}
          />
        </div>

        <div className="flex items-center gap-4">
          <CustomFormItem
            name="available_slots"
            type="number"
            label="Available Slots"
            description="Enter the number of available slots"
            value={activityData.available_slots}
            onChange={(value) => handleChange("available_slots", value)}
          />
          <CustomFormItem
            name="duration"
            type="number"
            label="Duration"
            description="Enter the duration in days"
            value={activityData.duration}
            onChange={(value) => handleChange("duration", value)}
          />
        </div>

        <div className="space-y-2">
          <Label>Start time</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="w-full justify-start text-left font-normal"
              >
                {activityData.start_datetime ? (
                  format(activityData.start_datetime, "dd MMMM yyyy", {
                    locale: fr,
                  })
                ) : (
                  <span>Choose a date</span>
                )}
                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={activityData.start_datetime}
                onSelect={(date) => handleChange("start_datetime", date)}
                disabled={(date) =>
                  date < new Date() || date < new Date("1900-01-01")
                }
                initialFocus
                locale={fr}
              />
            </PopoverContent>
          </Popover>
        </div>

        <div className="flex items-center gap-4">
          <div className="w-[280px]">
            <label
              htmlFor="name"
              className="text-sm font-semibold leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Activity Type
            </label>
            <Select
              name="type_id"
              onValueChange={(value) => handleChange("type_id", value)}
            >
              <SelectTrigger className="my-1">
                <SelectValue placeholder="Activity type" />
              </SelectTrigger>
              <SelectContent>
                {activityType.get.map((at, index) => (
                  <SelectItem key={index} value={at.id.toString()}>
                    {at.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <p className="text-[0.8rem] text-muted-foreground">
              Select a activity type
            </p>
          </div>

          <CustomFormItem
            name="description"
            type="text"
            label="Description"
            description="Enter the activity description"
            value={activityData.description}
            onChange={(value) => handleChange("description", value)}
          />
        </div>
        <DialogFooter>
          <Button onClick={handleSubmit} disabled={loading}>
            {loading ? <LoaderCircle className="animate-spin" /> : "Save"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
