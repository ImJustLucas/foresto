import { requester } from "@/lib/requester";
import { ActivityType } from "@/shared/types/activity-type";

const BASE_URL = "/activity-type";

export const ActivityTypeApi = {
  create: async (activityType: Omit<ActivityType, "id">) =>
    await requester().post<ActivityType>(BASE_URL, {
      data: activityType,
    }),

  getAll: async () => await requester().get<ActivityType[]>(BASE_URL),

  getOneById: async (id: string) =>
    await requester().get<ActivityType>(`${BASE_URL}/${id}`),

  updateOneById: async (id: string, data: Partial<ActivityType>) =>
    await requester().put<ActivityType>(`${BASE_URL}/${id}`, {
      data,
    }),

  delete: async (id: string) =>
    await requester().delete<ActivityType>(`${BASE_URL}/${id}`),
};
