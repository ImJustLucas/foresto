import { Activity } from "../activity";
import { User } from "../users";

export interface ReservationSchema {
  id: string;
  name: string;
  user_id: string;
  activity_id: string;
  reservation_date: Date;
  status: boolean;
}

export interface Reservation {
  id: string;
  name: string;
  user: User;
  activity: Activity;
  reservation_date: Date;
  status: boolean;
}
