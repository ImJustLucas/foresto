import { requester } from "@/lib/requester";
import { createReservationDto, Reservation } from "@/shared/types/reservation";

const BASE_URL = "/reservations";

export const ReservationApi = {
  create: async (reservation: createReservationDto) =>
    await requester().post<Reservation>(BASE_URL, { data: reservation }),

  getAll: async () => await requester().get<Reservation[]>(BASE_URL),

  getUserReservation: async (id: string) =>
    await requester().get<Reservation>(`${BASE_URL}/${id}/me`),

  update: async (id: string, data: Partial<Reservation>) =>
    await requester().put<Reservation>(`${BASE_URL}/${id}`, { data }),

  delete: async (id: string) =>
    await requester().delete<Reservation>(`${BASE_URL}/${id}`),
};
