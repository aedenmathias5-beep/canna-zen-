UPDATE public.orders
SET status = 'confirmed', payment_status = 'paid'
WHERE payment_status = 'test_mode'
OR status = 'pending';
