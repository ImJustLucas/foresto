"use server";

import { createClient } from "@/lib/supabase/supabase-server-side";
import { User } from "@/shared/types/users";

export const createUser = async (user: Omit<User, "id">) => {
  const { data, error } = await (await createClient())
    .from("profiles")
    .insert([user]);

  if (error) throw error;
  return data;
};

export const getProfileById = async (id: string) =>
  (await createClient()).from("profiles").select("*").eq("id", id).single();

export const updateUser = async (id: string, updates: Partial<User>) => {
  const { data, error } = await (await createClient())
    .from("profiles")
    .update(updates)
    .eq("id", id);

  if (error) throw error;
  return data;
};

export const deleteUser = async (id: string) =>
  (await createClient()).from("profiles").delete().eq("id", id);
