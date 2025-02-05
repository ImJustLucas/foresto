import { create } from "zustand";
import { Activity } from "@/shared/types/activity";
import { ActivityApi } from "./activity.api";

interface ActivitiesState {
  activities: Activity[];
  loading: boolean;

  fetchActivities: () => Promise<void>;
  addActivity: (activity: Omit<Activity, "id">) => Promise<void>;
  removeActivity: (id: string) => Promise<void>;
}

export const useActivitiesStore = create<ActivitiesState>((set) => ({
  activities: [],
  loading: false,

  fetchActivities: async () => {
    set({ loading: true });
    try {
      const response = await ActivityApi.getAll();
      if (!response.success) throw Error(response.message);
      set({ activities: response.data, loading: false });
    } catch (error) {
      console.error("Error fetching activities:", error);
      set({ loading: false });
    }
  },

  addActivity: async (activity) => {
    try {
      const response = await ActivityApi.create(activity);
      if (!response.success) throw Error(response.message);

      set((state) => ({
        activities: [...state.activities, response.data],
      }));
    } catch (error) {
      console.error("Error adding activity:", error);
    }
  },

  removeActivity: async (id) => {
    try {
      await ActivityApi.delete(id);
      set((state) => ({
        activities: state.activities.filter((activity) => activity.id !== id),
      }));
    } catch (error) {
      console.error("Error deleting activity:", error);
    }
  },
}));
