import { serve } from "https://deno.land/std@0.177.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const SENDCLOUD_PUBLIC_KEY = Deno.env.get("SENDCLOUD_PUBLIC_KEY")!;
    const SENDCLOUD_SECRET_KEY = Deno.env.get("SENDCLOUD_SECRET_KEY")!;

    const url = new URL(req.url);
    const postalCode = url.searchParams.get("postalCode") || "";
    const country = url.searchParams.get("country") || "FR";
    const carrier = url.searchParams.get("carrier") || "mondial_relay";

    if (postalCode.length < 4) {
      return new Response(
        JSON.stringify({ error: "Code postal invalide", points: [] }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const credentials = btoa(`${SENDCLOUD_PUBLIC_KEY}:${SENDCLOUD_SECRET_KEY}`);
    const apiUrl = `https://panel.sendcloud.sc/api/v2/service-points/?country=${country}&postal_code=${postalCode}&carrier=${carrier}&radius=10`;

    const res = await fetch(apiUrl, {
      headers: { Authorization: `Basic ${credentials}` },
    });

    if (!res.ok) {
      return new Response(
        JSON.stringify({ points: [] }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const data = await res.json();
    const points = Array.isArray(data) ? data.slice(0, 10) : [];

    return new Response(
      JSON.stringify({ points }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error: any) {
    console.error("service-points error:", error);
    return new Response(
      JSON.stringify({ points: [], error: error.message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
