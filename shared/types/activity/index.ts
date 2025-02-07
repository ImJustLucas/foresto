import { ActivityType } from "../activity-type";
import { z } from "zod";

export interface Activity {
  name: string;
  location: string;
  description: string;
  activity_types: ActivityType;
  available_slots: number;
  start_datetime: Date;
  duration: number;
  id: string;
  reservations: { user_id: string }[];
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

export type ActivityUpdateDto = {
  name: string;
  location: string;
  description: string;
  type_id: string;
  available_slots: number;
  start_datetime: Date;
  duration: number;
};

export const ActivitySchema = z.object({
  name: z.string(),
  location: z.string(),
  description: z.string(),
  activity_types: z.any(), // Adjust this according to the actual schema of ActivityType
  available_slots: z.number().int().nonnegative(),
  start_datetime: z.date(),
  duration: z.number().int().positive(),
  id: z.string(),
  reservations: z.array(z.object({ user_id: z.string() })),
});

export const ActivityCreateDtoSchema = z.object({
  name: z.string(),
  location: z.string(),
  description: z.string(),
  type_id: z.number(),
  available_slots: z.number().int().nonnegative(),
  start_datetime: z.date(),
  duration: z.number().int().positive(),
});

export const ActivityUpdateDtoSchema = z.object({
  name: z.string(),
  location: z.string(),
  description: z.string(),
  type_id: z.string(),
  available_slots: z.number().int().nonnegative(),
  start_datetime: z.date(),
  duration: z.number().int().positive(),
});

export type ActivitySchema = z.infer<typeof ActivitySchema>;
export type ActivityCreateDtoSchema = z.infer<typeof ActivityCreateDtoSchema>;
export type ActivityUpdateDtoSchema = z.infer<typeof ActivityUpdateDtoSchema>;
