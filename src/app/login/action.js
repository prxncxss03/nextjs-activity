'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { headers } from 'next/headers'

import { createClient } from '@/lib/utils/supabase/server'
export async function signup() {
  const supabase = createClient()
  const origin = headers().get('origin')
  const { error, data } = await supabase.auth.signInWithOAuth({
    provider : 'google',
    options: {
      redirectTo: `${origin}/auth/callback`,
    },
  })
  
  if (error) {
    redirect('/error')
  } else {
    console.log('data', data)
    redirect(data.url)
  }
}