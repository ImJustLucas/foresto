"use client";

import { Activity } from "@/shared/types/activity";
import React, { createContext, useContext, useState, ReactNode } from "react";

interface ActivitiesContextProps {
  activities: Activity[];
  addActivity: (activity: Activity) => void;
  initActivity: (activities: Activity[]) => void;
}

const ActivitiesContext = createContext<ActivitiesContextProps | undefined>(
  undefined
);

export const ActivitiesProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [activities, setActivities] = useState<Activity[]>([]);

  const addActivity = (activity: Activity) => {
    setActivities([...activities, activity]);
  };

  const initActivity = (activities: Activity[]) => setActivities(activities);

  return (
    <ActivitiesContext.Provider
      value={{ activities, addActivity, initActivity }}
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
