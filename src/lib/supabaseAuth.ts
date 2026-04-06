import { supabase, isSupabaseConfigured, getRedirectUrl } from './supabase';
import { createUserProfile, getUserProfile } from './supabaseDb';

function requireSupabase() {
  if (!isSupabaseConfigured || !supabase) {
    throw new Error('Supabase non configuré. Ajoutez VITE_SUPABASE_URL et VITE_SUPABASE_ANON_KEY dans les Secrets.');
  }
  return supabase;
}

export async function signInWithGoogle(): Promise<void> {
  const client = requireSupabase();
  const { data, error } = await client.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: getRedirectUrl()
    }
  });
  if (error) throw error;
  if (data?.url) window.location.href = data.url;
}

export async function signInWithEmail(email: string, password: string): Promise<void> {
  const client = requireSupabase();
  const { error } = await client.auth.signInWithPassword({ email, password });
  if (error) throw error;
}

export async function registerWithEmail(
  email: string,
  password: string,
  displayName: string
): Promise<void> {
  const client = requireSupabase();
  const { data, error } = await client.auth.signUp({
    email,
    password,
    options: {
      data: { full_name: displayName },
      emailRedirectTo: getRedirectUrl(),
    },
  });
  if (error) throw error;

  if (data.user) {
    const existing = await getUserProfile(data.user.id);
    if (!existing) {
      await createUserProfile(data.user, 'email');
    }
  }
}

export async function resetPassword(email: string): Promise<void> {
  const client = requireSupabase();
  const { error } = await client.auth.resetPasswordForEmail(email, {
    redirectTo: getRedirectUrl(),
  });
  if (error) throw error;
}

export async function supabaseSignOut(): Promise<void> {
  const client = requireSupabase();
  const { error } = await client.auth.signOut();
  if (error) throw error;
}
