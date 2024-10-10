"use server";
import { redirect } from "next/navigation";

import { createClient } from "@/lib/utils/supabase/server";
export async function verify(route) {
  const supabase = createClient();

  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    if (route === "8") {
      redirect("/login");
    }
  }
  return data;
}