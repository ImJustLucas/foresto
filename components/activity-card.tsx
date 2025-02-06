import {
  MapPinIcon,
  CalendarIcon,
  UsersIcon,
  TreesIcon as TreeIcon,
  InfoIcon,
  Edit,
  LoaderCircle,
} from "lucide-react";
import { SpotlightCard } from "./react-bits-dev/spotlight-card";
import { Activity } from "@/shared/types/activity";
import { Button } from "./ui/button";

import dayjs from "dayjs";
import { useActivities } from "@/shared/contexts/activities.context";
import { toast } from "sonner";
import { useState } from "react";
import { ReservationApi } from "@/entities/reservation/reservation.api";
import { useReservation } from "@/shared/contexts/reservations.context";
import { User as AuthUser } from "@supabase/supabase-js";

type ActivityCardProps = {
  activity: Activity;
  onClickInfo: (a: Activity) => void;
  isAdmin?: boolean;
  user: AuthUser | null;
};

export const ActivityCard: React.FC<ActivityCardProps> = ({
  activity,
  onClickInfo,
  isAdmin = false,
  user,
}) => {
  const { editModal, activities } = useActivities();
  const { reservations } = useReservation();

  const [loading, setLoading] = useState<boolean>(false);

  const handleAddBooking = async () => {
    if (!user)
      return toast.error("You must create an account to book a moment");
    setLoading(true);
    const response = await ReservationApi.create({
      user_id: user.id,
      activity_id: activity.id,
      reservation_date: new Date(),
    });

    if (!response.success) {
      setLoading(false);
      return toast.error("Error while booking a moment");
    }

    reservations.addOne(response.data);
    setLoading(false);
    toast.success("Booking successful");
  };

  return (
    <SpotlightCard className="h-full" spotlightColor="rgba(34, 197, 94, 0.2)">
      <div className="flex flex-col h-full">
        <div className="flex-grow">
          <div className="flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
            <TreeIcon className="w-8 h-8 text-green-600" />
          </div>
          <h3 className="text-xl font-semibold mb-2 text-black">
            {activity.name}
          </h3>
          <div className="flex items-center text-sm text-gray-700 mb-2">
            <MapPinIcon className="w-4 h-4 mr-1" />
            {activity.location}
          </div>
          <div className="flex items-center text-sm text-gray-700 mb-2">
            <CalendarIcon className="w-4 h-4 mr-1" />
            {dayjs(activity.start_datetime).format("DD/MM/YYYY")}
          </div>
          <div className="flex items-center text-sm text-gray-700">
            <UsersIcon className="w-4 h-4 mr-1" />
            {activity.available_slots} guests
          </div>
        </div>
        <div className="mt-4 flex justify-between items-center">
          <Button
            onClick={handleAddBooking}
            disabled={Boolean(!user) || loading}
          >
            {loading ? (
              <LoaderCircle className="animate-spin" />
            ) : (
              " Book Campsite"
            )}
          </Button>
          <div className="flex gap-2">
            {isAdmin && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  activities.selectOneById(activity.id);
                  editModal.set(true);
                }}
              >
                <Edit className="w-4 h-4" />
              </Button>
            )}
            <Button
              variant="outline"
              size="sm"
              onClick={() => onClickInfo(activity)}
            >
              <InfoIcon className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </SpotlightCard>
  );
};
