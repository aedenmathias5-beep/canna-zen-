const GROQ_ENDPOINT = 'https://api.groq.com/openai/v1/chat/completions';

const SYSTEM_PROMPT = `Tu es l'assistant CBD officiel de CannaZen, expert en cannabis légal en France (THC < 0.3%).
Tu es chaleureux, professionnel, clair et 100% conforme à la loi française.
Tu ne donnes JAMAIS de conseils médicaux. Tu réponds TOUJOURS en français.
Tu connais parfaitement tous les produits CannaZen :

CATALOGUE CANAZEN :
- Fleurs CBD : Tropical Punch (détente, bonne humeur), Amnesia Haze Premium (énergie, focus), Runtz (détente, relaxation), Mint Kush (relaxation profonde, sommeil), Mango Kush (relaxation, anti-stress)
- Fleurs D10 (plus puissantes) : Gelato D10 (euphorie, créativité), Runtz D10 (puissant, relaxation), Amnesia D10 (énergie intense), Purple Punch D10 (sommeil profond), Blue Dream D10 (bien-être, bonne humeur), Zkittlez D10 (détente, gourmand)
- Fleurs OH+ (très puissantes, experts) : Amnesia OH+ (ultra-énergie), Gelato OH+ (puissance extrême), Runtz OH+ (relaxation intense), Purple Haze OH+ (créativité), Wedding Cake OH+ (euphorie)
- Résines D10 : Afghan Gold D10 (relaxation profonde, tradition), Moroccan Hash D10 (détente, calme)
- Vapes OH+ & HEC10 : Amnesia Vape OH+ (énergie), Gelato Vape OH+ (gourmand), Runtz Vape OH+ (fruité), Amnesia Vape HEC10 (focus), Gelato Vape HEC10 (douceur), Runtz Vape HEC10 (détente)
- Huiles CBD BIO : Huile CBD 10% (débutants, légère), Huile CBD 30% (expérimentés, puissante)
- Gummies D9 Cookies® : Cereal Milk (relaxation, euphorie), Huckleberry Gelato (relaxation, créativité)

LIVRAISON :
- Colissimo 2-3 jours : 4.90€ (gratuit dès 49€)
- Chronopost Express 24h : 9.90€
- Point Relais 3-5 jours : 3.90€ (gratuit dès 39€)

PAIEMENT : Carte bancaire (Visa/Mastercard), Apple Pay, Cryptomonnaies (BTC/ETH/USDT), Virement bancaire.

RÈGLES :
- Pose des questions pour mieux comprendre les besoins
- Recommande les meilleurs produits selon le besoin, le budget et le niveau d'expérience
- Rappelle toujours que les effets varient et que le CBD n'est pas un médicament
- Sois concis (2-4 phrases max), amical et utilise des emojis naturels 🌿`;

const MAX_MESSAGES = 20;
const MAX_MESSAGE_LENGTH = 1000;

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

function validateMessages(messages: unknown): messages is ChatMessage[] {
  if (!Array.isArray(messages)) return false;
  if (messages.length === 0 || messages.length > MAX_MESSAGES) return false;
  return messages.every(
    (m: any) =>
      m &&
      typeof m === 'object' &&
      (m.role === 'user' || m.role === 'assistant') &&
      typeof m.content === 'string' &&
      m.content.length > 0 &&
      m.content.length <= MAX_MESSAGE_LENGTH
  );
}

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'Groq API key not configured' });
  }

  try {
    const { messages } = req.body;

    if (!validateMessages(messages)) {
      return res.status(400).json({ error: 'Invalid messages format' });
    }

    const groqBody = {
      model: 'llama-3.1-8b-instant',
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        ...messages,
      ],
      temperature: 0.7,
      max_tokens: 512,
      top_p: 0.9,
    };

    const response = await fetch(GROQ_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify(groqBody),
    });

    if (!response.ok) {
      const err = await response.text();
      console.error('Groq API error:', response.status, err);
      return res.status(502).json({ error: 'AI API error', status: response.status });
    }

    const data = await response.json();
    const text = data?.choices?.[0]?.message?.content || "Désolé, je n'ai pas pu générer de réponse.";

    return res.status(200).json({ text });
  } catch {
    return res.status(500).json({ error: 'Internal server error' });
  }
}
