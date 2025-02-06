import { Activity } from "../activity";

export interface ReservationSchema {
  id: string;
  user_id: string;
  activity_id: string;
  reservation_date: Date;
  status: boolean;
}

export interface Reservation {
  id: string;
  user_id: string;
  activity: Activity;
  reservation_date: Date;
  status: boolean;
}

export interface createReservationDto {
  user_id: string;
  activity_id: string;
  reservation_date: Date;
}
