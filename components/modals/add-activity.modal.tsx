import { useState } from "react";
import { CustomFormItem } from "../forms/atoms/form-item";
import {
  Dialog,
  DialogContent,
  DialogDescription,
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
import { ActivityCreateDto } from "@/shared/types/activity";
import { useActivities } from "@/app/activities/_contexts/activities.context";

type ModalProps = {
  open: boolean;
  onOpenChange: () => void;
};

const InitialState: ActivityCreateDto = {
  name: "",
  location: "",
  available_slots: 0,
  start_datetime: new Date(),
  duration: 0,
  description: "",
  type_id: "1",
};

export const AddActivityModal: React.FC<ModalProps> = ({
  open,
  onOpenChange,
}) => {
  const [newActivity, setNewActivity] = useState(InitialState);
  const [loading, setLoading] = useState<boolean>(false);
  const { addActivity } = useActivities();

  const handleChange = (
    field: string,
    value: string | number | Date | undefined
  ) => {
    setNewActivity((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    if (loading) return;
    setLoading(true);

    const response = await ActivityApi.create(newActivity);

    if (!response.success) {
      setLoading(false);
      toast.error("Error while create activity!");
      return;
    }
    toast.success("Activity created successfully!");
    addActivity(response.data);
    setLoading(false);
    setNewActivity(InitialState);
    onOpenChange();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Create New Activity</DialogTitle>
          <DialogDescription>
            Fill in the details for the new forest retreat activity.
          </DialogDescription>
        </DialogHeader>
        <form action="">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-4">
              <CustomFormItem
                name="name"
                label="Name"
                description="Add a name to your activity"
                type="text"
                onChange={(v) => handleChange("name", v)}
                value={newActivity.name}
              />

              <CustomFormItem
                name="location"
                label="Location"
                description="Add a Location"
                type="text"
                onChange={(v) => handleChange("location", v)}
                value={newActivity.location}
              />
            </div>

            <div className="flex items-center gap-4">
              <CustomFormItem
                name="available_slots"
                label="Slot available"
                description="Add some places"
                type="number"
                onChange={(v) => handleChange("available_slots", v)}
                value={newActivity.available_slots}
              />

              <CustomFormItem
                name="duration"
                label="duration"
                description="Duration of the moment"
                type="number"
                onChange={(v) => handleChange("duration", v)}
                value={newActivity.available_slots}
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
                    {newActivity.start_datetime ? (
                      format(newActivity.start_datetime, "dd MMMM yyyy", {
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
                    selected={newActivity.start_datetime}
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

            <CustomFormItem
              name="description"
              type="text"
              label="Description"
              description="Enter the activity description"
              value={newActivity.description}
              onChange={(value) => handleChange("description", value)}
            />
          </div>
        </form>
        <DialogFooter className="sm:justify-between">
          <Button variant={"destructive"}>Cancel</Button>
          <Button disabled={loading} onClick={handleSubmit}>
            {loading ? <LoaderCircle className="animate-spin" /> : "Create"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
