alter table public.orders
add column if not exists payment_provider text default 'ovri';

alter table public.orders
add column if not exists payment_provider_data jsonb;
