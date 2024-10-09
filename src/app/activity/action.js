'use server'
import { redirect } from 'next/navigation'

import { AuthUser } from '@supabase/supabase-js'
import { createClient } from '@/lib/utils/supabase/server'
export async function verify() {
  const supabase = createClient()

  const { data, error } = await supabase.auth.getUser()
  if (error || !data?.user) {
    console.log("error", error);
  }
  return data
}

export async function logout() {
  const supabase = createClient()

  await supabase.auth.signOut()
  console.log('logged out')
  

  
    redirect('/login')
}