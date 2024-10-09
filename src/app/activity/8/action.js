"use server";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/utils/supabase/server";

const getSupabaseClientAndUser = async () => {
  const supabase = createClient();
  const user = await supabase.auth.getUser();
  return { supabase, user: user.data.user };
};

export const getAllTasks = async () => {
  console.log("getAllTasks");
  const { supabase, user } = await getSupabaseClientAndUser();

  let { data: tasks, error } = await supabase
    .from("tasks")
    .select("*")
    .eq("isCompleted", false)
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("error from getAll tasks", error);
    return;
  }

  console.log("Inside get all tasks action file");
  console.log("tasks", tasks);
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
    console.error("error from getAll completed tasks", error);
    return;
  }

  console.log("completed tasks", tasks);
  return tasks;
};

export const createTask = async (name) => {
  const { supabase } = await getSupabaseClientAndUser();

  const { data: newTask, error } = await supabase
    .from("tasks")
    .insert([{ name }])
    .select();

  if (error) {
    console.error("error from create task", error);
    return;
  }
  console.log("newTask", newTask);
  return newTask;
};

export const updateNameOfTask = async (id, name) => {
  const { supabase, user } = await getSupabaseClientAndUser();
  console.log("inside updateNameOfTask");
  console.log("id", id);
  console.log("name", name);

  const { data: updatedTaskName, error } = await supabase
    .from("tasks")
    .update({ name })
    .eq("id", id)
    .eq("user_id", user.id)
    .select();

  if (error) {
    console.error("error from update task", error);
    return;
  }
  console.log("updatedTaskName", updatedTaskName);
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
    console.error("error from update task", error);
    return;
  }
  console.log("updatedTaskCompletion", updatedTaskCompletion);
  return updatedTaskCompletion;
};

export const deleteTask = async (id) => {
  const { supabase } = await getSupabaseClientAndUser();

  const { error } = await supabase.from("tasks").delete().eq("id", id);

  if (error) {
    console.error("error from delete task", error);
    return;
  }
  return true;
};

export async function logout() {
  const { supabase } = await getSupabaseClientAndUser();
  await supabase.auth.signOut();
  redirect("/login");
}
