import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

serve(async (req) => {
  try {
    const MOLLIE_API_KEY = Deno.env.get("MOLLIE_API_KEY")!;
    const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
    const SUPABASE_SERVICE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY")!;
    const RESEND_FROM = Deno.env.get("RESEND_FROM") || "commandes@cannazen.fun";

    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

    const formData = await req.formData();
    const paymentId = formData.get("id") as string;
    if (!paymentId) return new Response("ok", { status: 200 });

    const mollieRes = await fetch(`https://api.mollie.com/v2/payments/${paymentId}`, {
      headers: { Authorization: `Bearer ${MOLLIE_API_KEY}` },
    });
    if (!mollieRes.ok) return new Response("ok", { status: 200 });

    const payment = await mollieRes.json();
    const orderId = payment.metadata?.orderId;
    if (!orderId) return new Response("ok", { status: 200 });

    const { data: order } = await supabase
      .from("orders")
      .select("*")
      .eq("id", orderId)
      .single();
    if (!order) return new Response("ok", { status: 200 });

    const isPaid = payment.status === "paid";
    const isCancelled = ["canceled", "expired", "failed"].includes(payment.status);

    if (isPaid && order.status !== "paid") {
      await supabase
        .from("orders")
        .update({ status: "paid", paid_at: new Date().toISOString() })
        .eq("id", orderId);

      const items = order.items || [];
      const itemsHtml = items.map((item: any) =>
        `<tr>
          <td style="padding:10px;border-bottom:1px solid #222;color:#ccc;">${item.productName} — ${item.grammage}</td>
          <td style="padding:10px;border-bottom:1px solid #222;color:#ccc;text-align:center;">×${item.quantity}</td>
          <td style="padding:10px;border-bottom:1px solid #222;color:#fff;text-align:right;font-weight:600;">${((item.totalPrice || 0) / 100).toFixed(2)}€</td>
        </tr>`
      ).join("");

      const totalDisplay = ((order.total || 0) / 100).toFixed(2);
      const shippingDisplay = order.shipping_cost === 0 ? "Gratuite" : `${((order.shipping_cost || 0) / 100).toFixed(2)}€`;

      await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${RESEND_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: RESEND_FROM,
          to: order.user_email,
          subject: `✅ Commande ${order.order_number} confirmée — CannaZen`,
          html: `
<!DOCTYPE html>
<html>
<body style="margin:0;padding:40px 20px;background:#0a0a0a;font-family:Arial,sans-serif;">
  <div style="max-width:600px;margin:0 auto;">
    <p style="font-size:28px;font-weight:900;color:#fff;text-align:center;margin:0 0 8px;">Canna<span style="color:#9333EA;">Zen</span></p>
    <p style="color:#666;text-align:center;font-size:12px;margin:0 0 32px;">Cannabis CBD Premium</p>
    <div style="background:#111;border:1px solid #222;border-radius:16px;padding:32px;text-align:center;margin-bottom:24px;">
      <div style="width:56px;height:56px;background:linear-gradient(135deg,#7C3AED,#9333EA);border-radius:50%;display:inline-flex;align-items:center;justify-content:center;color:#fff;font-size:24px;margin-bottom:16px;">✓</div>
      <h1 style="color:#fff;font-size:22px;margin:0 0 8px;">Commande confirmée !</h1>
      <p style="color:#888;margin:0 0 20px;font-size:14px;">Merci ${order.shipping_first_name}, ton paiement a bien été reçu.</p>
      <div style="background:#0a0a0a;border:1px solid #222;border-radius:10px;padding:16px;">
        <p style="color:#888;font-size:11px;margin:0 0 4px;text-transform:uppercase;letter-spacing:1px;">Numéro de commande</p>
        <p style="color:#9333EA;font-size:18px;font-weight:800;margin:0;font-family:monospace;">${order.order_number}</p>
      </div>
    </div>
    <div style="background:#111;border:1px solid #222;border-radius:16px;padding:24px;margin-bottom:24px;">
      <h2 style="color:#fff;font-size:16px;margin:0 0 16px;">Récapitulatif</h2>
      <table style="width:100%;border-collapse:collapse;">${itemsHtml}
        <tr><td colspan="2" style="padding:12px 10px 4px;color:#888;font-size:13px;">Livraison</td><td style="padding:12px 10px 4px;color:#ccc;text-align:right;font-size:13px;">${shippingDisplay}</td></tr>
        <tr><td colspan="2" style="padding:12px 10px;color:#fff;font-weight:700;border-top:1px solid #333;font-size:15px;">Total payé</td><td style="padding:12px 10px;color:#9333EA;text-align:right;font-weight:800;border-top:1px solid #333;font-size:16px;">${totalDisplay}€</td></tr>
      </table>
    </div>
    <div style="background:#111;border:1px solid #222;border-radius:16px;padding:24px;margin-bottom:24px;">
      <h2 style="color:#fff;font-size:16px;margin:0 0 12px;">📦 Livraison</h2>
      <p style="color:#ccc;font-size:14px;margin:0 0 8px;">${order.shipping_address}, ${order.shipping_postal_code} ${order.shipping_city}</p>
      <p style="color:#888;font-size:13px;margin:0;">Tu recevras un email avec ton numéro de suivi dès expédition.</p>
    </div>
    <p style="color:#444;font-size:11px;text-align:center;line-height:1.6;">Produits CBD • THC &lt; 0,3% • Réservé aux +18 ans<br>© 2025 CannaZen — cannazen.fun</p>
  </div>
</body>
</html>`,
        }),
      });

    } else if (isCancelled && order.status === "pending") {
      await supabase
        .from("orders")
        .update({ status: "cancelled" })
        .eq("id", orderId);
    }

    return new Response("ok", { status: 200 });
  } catch (error) {
    console.error("mollie-webhook error:", error);
    return new Response("ok", { status: 200 });
  }
});
