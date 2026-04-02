-- Products table
create table if not exists public.products (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  description text,
  price decimal(10,2) not null,
  stock integer default 0,
  images text[],
  category text,
  weight_grams integer,
  cbd_percentage decimal(5,2),
  is_active boolean default true,
  created_at timestamp with time zone default now()
);

-- Orders table
create table if not exists public.orders (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id),
  status text default 'pending',
  total_amount decimal(10,2) not null,
  shipping_method text not null,
  shipping_cost decimal(10,2) not null,
  shipping_address jsonb not null,
  items jsonb not null,
  payment_status text default 'pending',
  payment_id text,
  paygreen_order_id text,
  ecwid_order_id text,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- Cart table
create table if not exists public.carts (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) unique,
  items jsonb default '[]',
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- Enable RLS
alter table public.products enable row level security;
alter table public.orders enable row level security;
alter table public.carts enable row level security;

-- RLS Policies
create policy "Products are viewable by everyone"
  on public.products for select using (is_active = true);

create policy "Users can view own orders"
  on public.orders for select using (auth.uid() = user_id);

create policy "Users can insert own orders"
  on public.orders for insert with check (auth.uid() = user_id);

create policy "Users can view own cart"
  on public.carts for select using (auth.uid() = user_id);

create policy "Users can manage own cart"
  on public.carts for all using (auth.uid() = user_id);
