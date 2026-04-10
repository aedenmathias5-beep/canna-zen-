import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL
  || 'https://iaisoihmrbfvbllabnsl.supabase.co'
const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY
  || ''
const siteUrl = import.meta.env.VITE_SITE_URL || 'https://cannazen.fun'

export const isSupabaseConfigured = true

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY, {
  auth: {
    flowType: 'implicit',
    detectSessionInUrl: true,
    persistSession: true,
    autoRefreshToken: true,
    storage: typeof window !== 'undefined' ? window.localStorage : undefined,
  }
})

export const getRedirectUrl = () => `${siteUrl}/auth/callback`
