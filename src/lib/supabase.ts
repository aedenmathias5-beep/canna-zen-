// Supabase stub - will be connected via Lovable Cloud later
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || '';
const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const isSupabaseConfigured = !!(SUPABASE_URL && SUPABASE_KEY);

// Chainable stub that resolves to empty data
function chainable(resolveValue = { data: [], error: null }): any {
  const promise = Promise.resolve(resolveValue);
  const chain: any = { then: promise.then.bind(promise), catch: promise.catch.bind(promise) };
  const methods = ['select', 'insert', 'upsert', 'update', 'delete', 'eq', 'neq', 'gt', 'lt', 'gte', 'lte', 'like', 'ilike', 'is', 'in', 'contains', 'containedBy', 'order', 'limit', 'range', 'single', 'maybeSingle', 'match', 'not', 'or', 'filter', 'textSearch'];
  for (const m of methods) chain[m] = (..._args: any[]) => chain;
  return chain;
}

export const supabase = {
  from: (_table: string) => chainable(),
  auth: {
    getSession: () => Promise.resolve({ data: { session: null }, error: null }),
    onAuthStateChange: (cb: any) => ({ data: { subscription: { unsubscribe: () => {} } } }),
    signInWithPassword: (creds: any) => Promise.resolve({ data: null, error: null }),
    signUp: (creds: any) => Promise.resolve({ data: null, error: null }),
    signOut: () => Promise.resolve({ error: null }),
    signInWithOAuth: (opts: any) => Promise.resolve({ data: null, error: null }),
    resetPasswordForEmail: (email: string, opts?: any) => Promise.resolve({ data: null, error: null }),
  },
} as any;

export const getRedirectUrl = () => `${window.location.origin}/auth/callback`;
