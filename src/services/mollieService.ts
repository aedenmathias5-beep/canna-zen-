const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const createPayment = async (
  items: Array<{ name: string; price: number; quantity: number; label?: string; image?: string }>,
  shipping: {
    method: string;
    cost: number;
    firstName: string;
    lastName: string;
    address: string;
    city: string;
    postalCode: string;
    country?: string;
    phone: string;
    servicePointId?: string;
    servicePointName?: string;
  },
  userEmail: string,
  userId?: string,
  paymentMethod?: string
): Promise<{
  success: boolean;
  testMode?: boolean;
  orderId?: string;
  orderNumber?: string;
  checkoutUrl?: string;
  redirectUrl?: string;
  error?: string;
}> => {
  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    return { success: false, testMode: true, error: 'DIRECT_MODE' };
  }

  try {
    const res = await fetch(`${SUPABASE_URL}/functions/v1/create-payment`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
      },
      body: JSON.stringify({ items, shipping, userEmail, userId, paymentMethod }),
    });

    if (!res.ok) {
      const text = await res.text().catch(() => '');
      console.warn('[Payment] Edge Function unavailable, using direct mode.', res.status, text);
      return { success: false, testMode: true, error: 'DIRECT_MODE' };
    }

    return await res.json();
  } catch (err) {
    console.warn('[Payment] Edge Function unreachable, using direct mode.', err);
    return { success: false, testMode: true, error: 'DIRECT_MODE' };
  }
};

export const searchServicePoints = async (
  postalCode: string,
  country = 'FR',
  carrier = 'mondial_relay'
): Promise<Array<{
  id: number;
  name: string;
  street: string;
  houseNumber: string;
  city: string;
  postalCode: string;
  carrier: string;
}>> => {
  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) return [];

  try {
    const res = await fetch(
      `${SUPABASE_URL}/functions/v1/service-points?postalCode=${postalCode}&country=${country}&carrier=${carrier}`,
      { headers: { 'Authorization': `Bearer ${SUPABASE_ANON_KEY}` } }
    );
    if (!res.ok) return [];
    const data = await res.json();
    return data.points || [];
  } catch {
    return [];
  }
};
