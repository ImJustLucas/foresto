import { Activity } from "../activity";
import { User } from "../users";

export interface ReservationSchema {
  id: string;
  user_id: string;
  activity_id: string;
  reservation_date: Date;
  status: boolean;
}

export interface Reservation {
  id: string;
  user: User;
  activity: Activity;
  reservation_date: Date;
  status: boolean;
}

export interface createReservationDto {
  user_id: string;
  activity_id: string;
  reservation_date: Date;
}
