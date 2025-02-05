import { requester } from "@/lib/requester";
import {
  Activity,
  ActivityCreateDto,
  ActivityUpdateDto,
} from "@/shared/types/activity";

const BASE_URL = "/activities";

export const ActivityApi = {
  create: async (activity: ActivityCreateDto) =>
    await requester().post<Activity>(BASE_URL, { data: activity }),

  getAll: async () => await requester().get<Activity[]>(BASE_URL),

  getOneById: async (id: string) =>
    await requester().get<Activity>(`${BASE_URL}/${id}`),

  updateOneById: async (id: string, data: ActivityUpdateDto) =>
    await requester().put<Activity>(`${BASE_URL}/${id}`, { data }),

  delete: async (id: string) =>
    await requester().delete<Activity>(`${BASE_URL}/${id}`),
};
