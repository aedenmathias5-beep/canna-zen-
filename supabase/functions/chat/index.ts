import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const SYSTEM_PROMPT = `Tu es l'assistant IA de CannaZen, une boutique en ligne premium de CBD, D10 et OH+ légal en France.

Ton rôle :
- Conseiller les clients sur les produits adaptés à leurs besoins : détente, sommeil, énergie, confort, bien-être, concentration, routine quotidienne.
- Expliquer les différences entre les catégories (Fleurs CBD, Fleurs D10, Fleurs OH+, Résines, Vapes, Gummies, Huiles).
- Rester neutre, bienveillant et orienté conseil produit.
- Ne JAMAIS promettre d'effets médicaux ou thérapeutiques.
- Répondre en français, de manière concise et chaleureuse.
- Si on te pose une question hors sujet, ramène poliment la conversation vers les produits CannaZen.

Produits phares à recommander selon les besoins :
- Détente/Relaxation : Tropical Punch, Runtz, Fat Banana (Fleurs CBD), Soul Assassin D10
- Sommeil : Mint Kush (CBD), Early Girl OH+
- Énergie/Focus : Amnesia Haze Premium (CBD), Wapanga D10, White Widow D10
- Euphorie/Créativité : Zoap D10, Snow White D10, Oreoz OH+
- Bon plan/Quotidien : Small Buds Double Cinnamon, Royal Dwarf D10
- Portabilité/Discrétion : Vape Pens OH+ (Cherry Sour, Cotton Candy, Kiwi Sorbet, Lemon Cheese)
- Gourmandise : Cookies® D9 Gummies (Cereal Milk, Huckleberry Gelato)

Quand tu recommandes un produit, mentionne son nom exact pour que le système puisse afficher la fiche produit.`;

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages } = await req.json();
    const GROQ_API_KEY = Deno.env.get("GROQ_API_KEY");
    if (!GROQ_API_KEY) {
      throw new Error("GROQ_API_KEY is not configured");
    }

    const response = await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${GROQ_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "llama-3.1-8b-instant",
          messages: [
            { role: "system", content: SYSTEM_PROMPT },
            ...messages,
          ],
          stream: false,
        }),
      }
    );

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({
            error: "Trop de requêtes, réessayez dans un instant.",
          }),
          {
            status: 429,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "Service temporairement indisponible." }),
          {
            status: 402,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      }
      const t = await response.text();
      console.error("Groq API error:", response.status, t);
      return new Response(
        JSON.stringify({ error: "Erreur du service IA" }),
        {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    const data = await response.json();
    const text =
      data.choices?.[0]?.message?.content ||
      "Désolé, je n'ai pas pu répondre.";

    return new Response(JSON.stringify({ text }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("chat error:", e);
    return new Response(
      JSON.stringify({
        error: e instanceof Error ? e.message : "Unknown error",
      }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
