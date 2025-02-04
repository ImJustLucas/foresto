"use server";

import { createClient } from "@/lib/supabase/supabase-server-side";
import { User } from "@/shared/types/users";

const supabase = await createClient();

export const createUser = async (user: Omit<User, "id">) => {
  const { data, error } = await supabase.from("profiles").insert([user]);

  if (error) throw error;
  return data;
};

export const getUser = async (id: string) => {
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", id)
    .single();

  if (error) throw error;
  return data;
};

export const updateUser = async (id: string, updates: Partial<User>) => {
  const { data, error } = await supabase
    .from("profiles")
    .update(updates)
    .eq("id", id);

  if (error) throw error;
  return data;
};

export const deleteUser = async (id: string) => {
  const { data, error } = await supabase.from("profiles").delete().eq("id", id);

  if (error) throw error;
  return data;
};
