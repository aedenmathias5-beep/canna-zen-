import type { VercelRequest, VercelResponse } from "@vercel/node";

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

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === "OPTIONS") {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const GROQ_API_KEY = process.env.GROQ_API_KEY;
  if (!GROQ_API_KEY) {
    return res.status(500).json({ error: "GROQ_API_KEY is not configured" });
  }

  const { messages } = req.body;
  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: "Invalid request: messages array required" });
  }

  try {
    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${GROQ_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "llama-3.1-8b-instant",
        messages: [{ role: "system", content: SYSTEM_PROMPT }, ...messages],
        stream: false,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return res.status(429).json({ error: "Trop de requêtes, réessayez dans un instant." });
      }
      if (response.status === 402) {
        return res.status(402).json({ error: "Service temporairement indisponible." });
      }
      const t = await response.text();
      console.error("Groq API error:", response.status, t);
      return res.status(500).json({ error: "Erreur du service IA" });
    }

    const data = await response.json();
    const text = data.choices?.[0]?.message?.content || "Désolé, je n'ai pas pu répondre.";
    return res.json({ text });
  } catch (e: any) {
    console.error("chat error:", e);
    return res.status(500).json({ error: e?.message || "Unknown error" });
  }
}
