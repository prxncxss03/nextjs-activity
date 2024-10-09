'use server'
import { redirect, RedirectType } from 'next/navigation'

import { createClient } from '@/lib/utils/supabase/server'
export async function verify() {
  const supabase = createClient()

  const { data, error } = await supabase.auth.getUser()
  if (error || !data?.user) {
    console.log("error", error);
    redirect('/login')
  }
  console.log("data from server", data);
  return data
}

export async function logout() {
  const supabase = createClient()
  await supabase.auth.signOut()
  redirect('/login')
}