"use client";

import { Input } from "@/components/ui/input";
import { SearchIcon } from "lucide-react";
import { useState } from "react";
import { ActivityCard } from "../activity-card";
import { Activity } from "@/shared/types/activity";

type ActivitiesScreenProps = {
  activities: Activity[];
};

export const ActivitiesScreen: React.FC<ActivitiesScreenProps> = ({
  activities,
}) => {
  const [searchTerm, setSearchTerm] = useState<string>("");

  const filteredReservations = activities.filter(
    (activity) =>
      activity.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      activity.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header with search bar */}
      <div className="mb-8">
        <div className="flex items-center justify-center mb-4">
          <h1 className="text-3xl font-bold text-center">
            Find your forest retreat 🌳
          </h1>
        </div>
        <div className="relative w-1/2 mx-auto">
          <Input
            type="text"
            placeholder="Search for cabins, locations, or dates..."
            className="w-full pl-10 pr-4 py-2 rounded-full border-1 border-gray-300 focus:border-green-500 focus:outline-none"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredReservations.map((activity, key) => (
          <ActivityCard key={key} activity={activity} />
        ))}
      </div>
    </div>
  );
};
