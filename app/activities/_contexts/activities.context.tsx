"use client";

import { Activity } from "@/shared/types/activity";
import { ActivityType } from "@/shared/types/activity-type";
import React, { createContext, useContext, useState, ReactNode } from "react";

interface ActivitiesContextProps {
  activityType: {
    init: (at: ActivityType[]) => void;
    get: ActivityType[];
  };

  activities: {
    init: (activities: Activity[]) => void;
    get: Activity[];
    addOne: (activity: Activity) => void;
    selectOneById: (id: string) => void;
    getSelectedActivity: () => Activity | null;
    delete: (id: string) => void;
  };

  editModal: {
    get: boolean;
    set: (v: boolean) => void;
  };
}

const ActivitiesContext = createContext<ActivitiesContextProps | undefined>(
  undefined
);

export const ActivitiesProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [_editModal, setEditModal] = useState<boolean>(false);
  const [selectedActivityId, setSelectedActivityId] = useState<string | null>(
    null
  );

  const addActivity = (activity: Activity) => {
    setActivities([...activities, activity]);
  };

  const initActivity = (activities: Activity[]) => setActivities(activities);

  const selectActivity = (id: string) => {
    setSelectedActivityId(id);
  };

  const getSelectedActivity = (): Activity | null => {
    return (
      activities.find((activity) => activity.id === selectedActivityId) || null
    );
  };

  const deleteActivity = (id: string) =>
    setActivities(activities.filter((activity) => activity.id !== id));

  const [_activityTypes, setActivityTypes] = useState<ActivityType[]>([]);

  const activityType = {
    init: (at: ActivityType[]) => setActivityTypes(at),
    get: _activityTypes,
  };

  return (
    <ActivitiesContext.Provider
      value={{
        activities: {
          init: initActivity,
          get: activities,
          addOne: addActivity,
          selectOneById: selectActivity,
          getSelectedActivity,
          delete: deleteActivity,
        },
        editModal: {
          get: _editModal,
          set: (b) => setEditModal(b),
        },
        activityType,
      }}
    >
      {children}
    </ActivitiesContext.Provider>
  );
};

export const useActivities = (): ActivitiesContextProps => {
  const context = useContext(ActivitiesContext);
  if (!context) {
    throw new Error("useActivities must be used within an ActivitiesProvider");
  }
  return context;
};
