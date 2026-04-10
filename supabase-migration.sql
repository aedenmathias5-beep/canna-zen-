-- CannaZen — Migration Supabase
-- Exécutez ce script dans l'éditeur SQL de votre projet Supabase
-- (Dashboard → SQL Editor → New query)

-- 1. Table des profils utilisateurs
create table if not exists public.profiles (
  id uuid references auth.users on delete cascade primary key,
  email text,
  display_name text,
  photo_url text,
  provider text not null default 'email',
  role text not null default 'customer',
  age_verified boolean not null default false,
  age_verified_at timestamptz,
  phone text,
  addresses jsonb not null default '[]',
  wishlist text[] not null default '{}',
  preferences jsonb not null default '{"newsletter": true, "smsNotifications": false, "language": "fr"}',
  stats jsonb not null default '{"totalOrders": 0, "totalSpent": 0, "loyaltyPoints": 0}',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  last_login_at timestamptz not null default now()
);

-- 2. Table des paniers
create table if not exists public.carts (
  user_id uuid references auth.users on delete cascade primary key,
  items jsonb not null default '[]',
  updated_at timestamptz not null default now()
);

-- 3. Activer Row Level Security
alter table public.profiles enable row level security;
alter table public.carts enable row level security;

-- 4. Policies profiles : chaque utilisateur accède uniquement à son propre profil
create policy "Users can view own profile"
  on public.profiles for select
  using (auth.uid() = id);

create policy "Users can insert own profile"
  on public.profiles for insert
  with check (auth.uid() = id);

create policy "Users can update own profile"
  on public.profiles for update
  using (auth.uid() = id);

-- 5. Policies carts
create policy "Users can view own cart"
  on public.carts for select
  using (auth.uid() = user_id);

create policy "Users can upsert own cart"
  on public.carts for insert
  with check (auth.uid() = user_id);

create policy "Users can update own cart"
  on public.carts for update
  using (auth.uid() = user_id);

create policy "Users can delete own cart"
  on public.carts for delete
  using (auth.uid() = user_id);

-- 6. Trigger pour mettre à jour updated_at automatiquement
create or replace function public.handle_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger profiles_updated_at
  before update on public.profiles
  for each row execute procedure public.handle_updated_at();

create trigger carts_updated_at
  before update on public.carts
  for each row execute procedure public.handle_updated_at();

-- =====================================================
-- Products & Loyalty Points tables (CannaZen v2)
-- =====================================================

-- 7. Table produits (catalogue Supabase — schéma enrichi v3)
create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text unique,
  description text,
  short_desc text,
  price numeric(10,2) not null,
  stock integer not null default 50,
  images text[],
  category text not null,
  category_slug text,
  weight_grams integer,
  cbd_percentage numeric(4,1),
  badge text,
  rating numeric(3,1) default 4.5,
  review_count integer default 0,
  intensity smallint default 3,
  effects text[],
  smokellier_quote text,
  is_new boolean default false,
  is_best_seller boolean default false,
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

-- RLS: tout le monde peut lire les produits actifs
alter table public.products enable row level security;
create policy "Products are public" on public.products
  for select using (is_active = true);

-- 8. Table points de fidélité
create table if not exists public.loyalty_points (
  user_id uuid references auth.users(id) on delete cascade primary key,
  points bigint not null default 0,
  updated_at timestamptz not null default now()
);

-- RLS: chaque utilisateur voit et modifie ses propres points
alter table public.loyalty_points enable row level security;
create policy "Users read own loyalty points" on public.loyalty_points
  for select using (auth.uid() = user_id);
create policy "Users update own loyalty points" on public.loyalty_points
  for update using (auth.uid() = user_id);
create policy "Users insert own loyalty points" on public.loyalty_points
  for insert with check (auth.uid() = user_id);

-- Trigger updated_at
create trigger loyalty_points_updated_at
  before update on public.loyalty_points
  for each row execute procedure public.handle_updated_at();

-- =====================================================
-- Reviews & Subscribers tables (CannaZen v3)
-- =====================================================

-- 9. Table avis produits
create table if not exists public.reviews (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  product_slug text not null,
  author_name text not null,
  rating smallint not null check (rating between 1 and 5),
  comment text not null check (char_length(comment) >= 10 and char_length(comment) <= 500),
  created_at timestamptz not null default now(),
  unique(user_id, product_slug)
);
alter table public.reviews enable row level security;
create policy "Reviews are public" on public.reviews for select using (true);
create policy "Authenticated users can insert reviews" on public.reviews
  for insert with check (auth.uid() = user_id);
create policy "Users can delete own reviews" on public.reviews
  for delete using (auth.uid() = user_id);

-- 10. Table abonnés newsletter
create table if not exists public.subscribers (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  subscribed_at timestamptz not null default now(),
  active boolean not null default true
);
alter table public.subscribers enable row level security;
create policy "Anyone can subscribe" on public.subscribers
  for insert with check (true);
create policy "Subscribers can unsubscribe" on public.subscribers
  for update using (true);
