export interface Activity {
  name: string;
  location: string;
  description: string;
  type_id: number;
  available_slots: number;
  start_datetime: Date;
  duration: number;
  id: string;
}
