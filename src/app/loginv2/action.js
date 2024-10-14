'use server'

import { createClient } from "@/lib/utils/supabase/server"
import { headers } from "next/headers"
import { redirect } from "next/navigation"

export async function signUpV2 () {
    const supabase = createClient()
    const origin = headers().get('origin')
    const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${origin}/auth/callback`
        },
      })

    if (error) {
        redirect('/error')
    } else {
        redirect(data.url)
    }
}