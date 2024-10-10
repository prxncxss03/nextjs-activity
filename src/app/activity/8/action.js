"use server";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/utils/supabase/server";

export const getSupabaseClientAndUser = async () => {
  const supabase = createClient();
  const user = await supabase.auth.getUser();
  return { supabase, user: user.data.user };
};

export const getAllTasks = async () => {
  const { supabase, user } = await getSupabaseClientAndUser();

  let { data: tasks, error } = await supabase
    .from("tasks")
    .select("*")
    .eq("isCompleted", false)
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error("Failed to fetch tasks");
  }

  return tasks;
};

export const getAllCompletedTasks = async () => {
  const { supabase, user } = await getSupabaseClientAndUser();

  let { data: tasks, error } = await supabase
    .from("tasks")
    .select("*")
    .eq("isCompleted", true)
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error("Failed to fetch completed tasks");
  }

  return tasks;
};

export const createTask = async (name) => {
  const { supabase } = await getSupabaseClientAndUser();

  const { data: newTask, error } = await supabase
    .from("tasks")
    .insert([{ name }])
    .select();

  if (error) {
    throw new Error("Failed to create task");
  }
  return newTask;
};

export const updateNameOfTask = async (id, name) => {
  const { supabase, user } = await getSupabaseClientAndUser();

  const { data: updatedTaskName, error } = await supabase
    .from("tasks")
    .update({ name })
    .eq("id", id)
    .eq("user_id", user.id)
    .select();

  if (error) {
    throw new Error("Failed to update task name");
  }
  return updatedTaskName;
};

export const updateTaskCompletion = async (id, isCompleted) => {
  const { supabase } = await getSupabaseClientAndUser();

  const { data: updatedTaskCompletion, error } = await supabase
    .from("tasks")
    .update({ isCompleted })
    .eq("id", id)
    .select();

  if (error) {
    throw new Error("Failed to update task completion");
  }
  return updatedTaskCompletion;
};

export const deleteTask = async (id) => {
  const { supabase } = await getSupabaseClientAndUser();

  const { error } = await supabase.from("tasks").delete().eq("id", id);

  if (error) {
    throw new Error("Failed to delete task");
  }
  return true;
};

export async function logout() {
  const { supabase } = await getSupabaseClientAndUser();
  await supabase.auth.signOut();
  redirect("/login");
}
