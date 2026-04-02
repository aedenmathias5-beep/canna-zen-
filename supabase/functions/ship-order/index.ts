import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

function getShippingMethodId(carrier: string, weightGrams: number): number {
  if (carrier === "mondial_relay") {
    if (weightGrams <= 250) return 28035;
    if (weightGrams <= 500) return 28036;
    if (weightGrams <= 1000) return 28037;
    return 28038;
  }
  if (weightGrams <= 250) return 371;
  if (weightGrams <= 500) return 366;
  if (weightGrams <= 1000) return 367;
  return 1066;
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const SENDCLOUD_PUBLIC_KEY = Deno.env.get("SENDCLOUD_PUBLIC_KEY")!;
    const SENDCLOUD_SECRET_KEY = Deno.env.get("SENDCLOUD_SECRET_KEY")!;
    const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
    const SUPABASE_SERVICE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY")!;
    const RESEND_FROM = Deno.env.get("RESEND_FROM") || "commandes@cannazen.fun";

    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);
    const { orderId, weightGrams = 250 } = await req.json();

    if (!orderId) {
      return new Response(
        JSON.stringify({ error: "orderId manquant" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const { data: order, error: orderError } = await supabase
      .from("orders")
      .select("*")
      .eq("id", orderId)
      .single();

    if (orderError || !order) {
      return new Response(
        JSON.stringify({ error: "Commande introuvable" }),
        { status: 404, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    if (order.status !== "paid") {
      return new Response(
        JSON.stringify({ error: "Commande non payée" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const shippingMethodId = getShippingMethodId(order.shipping_carrier, weightGrams);
    const credentials = btoa(`${SENDCLOUD_PUBLIC_KEY}:${SENDCLOUD_SECRET_KEY}`);

    const parcelBody: any = {
      parcel: {
        name: `${order.shipping_first_name} ${order.shipping_last_name}`,
        address: order.shipping_address,
        city: order.shipping_city,
        postal_code: order.shipping_postal_code,
        country: order.shipping_country,
        email: order.user_email,
        telephone: order.shipping_phone,
        weight: (weightGrams / 1000).toFixed(3),
        order_number: order.order_number,
        shipment: { id: shippingMethodId },
        request_label: true,
      },
    };

    if (order.service_point_id) {
      parcelBody.parcel.to_service_point = parseInt(order.service_point_id);
    }

    const sendcloudRes = await fetch("https://panel.sendcloud.sc/api/v2/parcels", {
      method: "POST",
      headers: {
        Authorization: `Basic ${credentials}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(parcelBody),
    });

    if (!sendcloudRes.ok) {
      const err = await sendcloudRes.text();
      throw new Error(`Sendcloud error: ${err}`);
    }

    const sendcloudData = await sendcloudRes.json();
    const parcel = sendcloudData.parcel;

    await supabase
      .from("orders")
      .update({
        status: "shipped",
        sendcloud_parcel_id: parcel.id,
        tracking_number: parcel.tracking_number,
        tracking_url: parcel.tracking_url,
        label_url: parcel.label?.label_printer || null,
        shipped_at: new Date().toISOString(),
      })
      .eq("id", orderId);

    const carrierName = order.shipping_carrier === "mondial_relay" ? "Mondial Relay" : "Colissimo";
    await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: RESEND_FROM,
        to: order.user_email,
        subject: `🚚 Ta commande ${order.order_number} est expédiée !`,
        html: `
<!DOCTYPE html>
<html>
<body style="margin:0;padding:40px 20px;background:#0a0a0a;font-family:Arial,sans-serif;">
  <div style="max-width:600px;margin:0 auto;text-align:center;">
    <p style="font-size:28px;font-weight:900;color:#fff;margin:0 0 32px;">Canna<span style="color:#9333EA;">Zen</span></p>
    <div style="background:#111;border:1px solid #222;border-radius:16px;padding:40px;">
      <div style="font-size:56px;margin-bottom:16px;">🚚</div>
      <h1 style="color:#fff;font-size:22px;margin:0 0 12px;">Ton colis est en route !</h1>
      <p style="color:#888;margin:0 0 28px;font-size:14px;">Salut ${order.shipping_first_name}, ton colis a été remis à ${carrierName}.</p>
      <p style="color:#888;font-size:12px;margin:0 0 4px;text-transform:uppercase;letter-spacing:1px;">Numéro de suivi</p>
      <p style="color:#9333EA;font-size:20px;font-weight:800;font-family:monospace;margin:0 0 28px;">${parcel.tracking_number}</p>
      <a href="${parcel.tracking_url}" style="background:linear-gradient(135deg,#7C3AED,#9333EA);color:#fff;text-decoration:none;padding:16px 36px;border-radius:12px;font-weight:700;font-size:15px;display:inline-block;">
        Suivre mon colis →
      </a>
    </div>
    <p style="color:#444;font-size:11px;margin-top:24px;">© 2025 CannaZen — cannazen.fun</p>
  </div>
</body>
</html>`,
      }),
    });

    return new Response(
      JSON.stringify({
        success: true,
        trackingNumber: parcel.tracking_number,
        trackingUrl: parcel.tracking_url,
        labelUrl: parcel.label?.label_printer || null,
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error: any) {
    console.error("ship-order error:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
