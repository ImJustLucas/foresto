"use client";

import { Activity } from "@/shared/types/activity";
import React, { createContext, useContext, useState, ReactNode } from "react";

interface ActivitiesContextProps {
  activities: Activity[];
  addActivity: (activity: Activity) => void;
  initActivity: (activities: Activity[]) => void;
  selectActivity: (id: string) => void;
  getSelectedActivity: () => Activity | null;
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

  return (
    <ActivitiesContext.Provider
      value={{
        activities,
        addActivity,
        initActivity,
        selectActivity,
        getSelectedActivity,
        editModal: {
          get: _editModal,
          set: (b) => setEditModal(b),
        },
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
