import { ActivityType } from "../activity-type";

export interface Activity {
  name: string;
  location: string;
  description: string;
  activity_types: ActivityType;
  available_slots: number;
  start_datetime: Date;
  duration: number;
  id: string;
}

export type ActivityCreateDto = {
  name: string;
  location: string;
  description: string;
  type_id: string;
  available_slots: number;
  start_datetime: Date;
  duration: number;
};
