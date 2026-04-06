create table if not exists public.orders (
  id uuid default gen_random_uuid() primary key,
  order_number text not null unique,
  user_id uuid references auth.users(id),
  user_email text not null,
  status text not null default 'pending',
  items jsonb not null default '[]',
  shipping_first_name text,
  shipping_last_name text,
  shipping_address text,
  shipping_address2 text,
  shipping_city text,
  shipping_postal_code text,
  shipping_country text default 'FR',
  shipping_phone text,
  shipping_method text,
  shipping_carrier text,
  shipping_cost integer default 0,
  service_point_id text,
  service_point_name text,
  service_point_address text,
  subtotal integer not null default 0,
  total integer not null default 0,
  payment_method text,
  mollie_payment_id text,
  mollie_checkout_url text,
  paid_at timestamptz,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

alter table public.orders enable row level security;

create policy "Users can view their own orders"
  on public.orders for select
  using (auth.uid() = user_id);

create policy "Service role can do everything"
  on public.orders for all
  using (true)
  with check (true);

create policy "Authenticated users can insert orders"
  on public.orders for insert
  with check (auth.uid() = user_id);
