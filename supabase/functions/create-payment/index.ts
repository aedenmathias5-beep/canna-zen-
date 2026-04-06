import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

function generateOrderNumber(): string {
  const d = new Date();
  const y = d.getFullYear().toString().slice(-2);
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  const r = Math.floor(Math.random() * 9999).toString().padStart(4, "0");
  return `CZ-${y}${m}${day}-${r}`;
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const MOLLIE_API_KEY = Deno.env.get("MOLLIE_API_KEY")!;
    const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
    const SUPABASE_SERVICE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const SITE_URL = Deno.env.get("SITE_URL") || "https://cannazen.fun";

    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

    const body = await req.json();
    const { items, shipping, userEmail, userId, paymentMethod } = body;

    if (!items?.length || !shipping || !userEmail) {
      return new Response(
        JSON.stringify({ error: "Données manquantes" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const allowedMethods = ["creditcard", "applepay"];
    const validatedMethod = paymentMethod && allowedMethods.includes(paymentMethod) ? paymentMethod : undefined;

    const subtotal = items.reduce(
      (acc: number, item: any) => {
        const price = typeof item.unitPrice === "number" ? item.unitPrice : Math.round((item.price || 0) * 100);
        return acc + price * item.quantity;
      },
      0
    );
    const shippingCost = subtotal >= 4900 ? 0 : shipping.cost;
    const total = subtotal + shippingCost;
    const totalEuros = (total / 100).toFixed(2);
    const orderNumber = generateOrderNumber();

    const { data: order, error: orderError } = await supabase
      .from("orders")
      .insert({
        order_number: orderNumber,
        user_id: userId || null,
        user_email: userEmail,
        status: "pending",
        items: items.map((item: any) => ({
          ...item,
          totalPrice: item.unitPrice * item.quantity,
        })),
        shipping_first_name: shipping.firstName,
        shipping_last_name: shipping.lastName,
        shipping_address: shipping.address,
        shipping_address2: shipping.address2 || null,
        shipping_city: shipping.city,
        shipping_postal_code: shipping.postalCode,
        shipping_country: shipping.country || "FR",
        shipping_phone: shipping.phone,
        shipping_method: shipping.method,
        shipping_carrier: shipping.carrier,
        shipping_cost: shippingCost,
        service_point_id: shipping.servicePointId || null,
        service_point_name: shipping.servicePointName || null,
        service_point_address: shipping.servicePointAddress || null,
        subtotal,
        total,
        mollie_payment_id: null,
        mollie_checkout_url: null,
      })
      .select("id")
      .single();

    if (orderError) throw new Error(`DB error: ${orderError.message}`);

    const mollieRes = await fetch("https://api.mollie.com/v2/payments", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${MOLLIE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount: { currency: "EUR", value: totalEuros },
        description: `CannaZen — Commande ${orderNumber}`,
        redirectUrl: `${SITE_URL}/checkout/confirmation/${order.id}`,
        webhookUrl: `${SUPABASE_URL}/functions/v1/mollie-webhook`,
        metadata: { orderId: order.id, userEmail },
        ...(validatedMethod ? { method: validatedMethod } : {}),
        billingAddress: {
          streetAndNumber: shipping.address,
          postalCode: shipping.postalCode,
          city: shipping.city,
          country: shipping.country || "FR",
          givenName: shipping.firstName,
          familyName: shipping.lastName,
          email: userEmail,
        },
      }),
    });

    if (!mollieRes.ok) {
      const err = await mollieRes.text();
      throw new Error(`Mollie error: ${err}`);
    }

    const payment = await mollieRes.json();

    await supabase
      .from("orders")
      .update({
        mollie_payment_id: payment.id,
        mollie_checkout_url: payment._links?.checkout?.href || null,
      })
      .eq("id", order.id);

    return new Response(
      JSON.stringify({
        success: true,
        orderId: order.id,
        checkoutUrl: payment._links?.checkout?.href,
        paymentId: payment.id,
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error: any) {
    console.error("create-payment error:", error);
    return new Response(
      JSON.stringify({ error: error.message || "Erreur serveur" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
