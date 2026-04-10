import type { IncomingMessage, ServerResponse } from 'http';

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

RÈGLES IMPORTANTES :
- Tu poses des questions pour mieux comprendre les besoins (effet recherché : relax, sommeil, focus, énergie, douleur, etc.)
- Tu recommandes les meilleurs produits selon le besoin, le budget et le niveau d'expérience
- Tu rappelles toujours que les effets varient d'une personne à l'autre et que le CBD n'est pas un médicament
- Pour les débutants : recommande fleurs CBD ou huile 10%
- Pour les expérimentés : D10 ou OH+
- Pour le sommeil : Mint Kush, Purple Punch D10
- Pour l'énergie : Amnesia Haze, Amnesia D10
- Pour la relaxation : Tropical Punch, Runtz
- Sois concis (2-4 phrases max par réponse), amical et utilise des emojis naturels 🌿
- Si on te pose une question hors-sujet, ramène poliment la conversation vers le CBD et les produits CannaZen`;

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

const MAX_BODY_SIZE = 32_000;
const MAX_MESSAGES = 20;
const MAX_MESSAGE_LENGTH = 1000;
const RATE_LIMIT_WINDOW = 60_000;
const RATE_LIMIT_MAX = 15;

const ipRequests = new Map<string, { count: number; resetAt: number }>();

function getClientIp(req: IncomingMessage): string {
  const forwarded = req.headers['x-forwarded-for'];
  if (typeof forwarded === 'string') return forwarded.split(',')[0].trim();
  return req.socket.remoteAddress || 'unknown';
}

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = ipRequests.get(ip);
  if (!entry || now > entry.resetAt) {
    ipRequests.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW });
    return true;
  }
  entry.count++;
  return entry.count <= RATE_LIMIT_MAX;
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

function parseBody(req: IncomingMessage): Promise<string> {
  return new Promise((resolve, reject) => {
    let body = '';
    let size = 0;
    req.on('data', (chunk: Buffer | string) => {
      size += typeof chunk === 'string' ? chunk.length : chunk.byteLength;
      if (size > MAX_BODY_SIZE) {
        reject(new Error('Body too large'));
        req.destroy();
        return;
      }
      body += chunk;
    });
    req.on('end', () => resolve(body));
    req.on('error', reject);
  });
}

export async function handleGeminiChat(req: IncomingMessage, res: ServerResponse) {
  if (req.method !== 'POST') {
    res.writeHead(405, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Method not allowed' }));
    return;
  }

  const clientIp = getClientIp(req);
  if (!checkRateLimit(clientIp)) {
    res.writeHead(429, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Trop de requêtes. Réessayez dans un instant.' }));
    return;
  }

  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Groq API key not configured' }));
    return;
  }

  try {
    const rawBody = await parseBody(req);
    let parsed: any;
    try {
      parsed = JSON.parse(rawBody);
    } catch {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Invalid JSON' }));
      return;
    }

    const { messages } = parsed;
    if (!validateMessages(messages)) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Invalid messages format' }));
      return;
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
      res.writeHead(502, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'AI API error', status: response.status }));
      return;
    }

    const data = await response.json() as any;
    const text = data?.choices?.[0]?.message?.content || "Désolé, je n'ai pas pu générer de réponse.";

    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ text }));
  } catch (err: any) {
    if (err?.message === 'Body too large') {
      res.writeHead(413, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Request body too large' }));
      return;
    }
    console.error('Chat handler error:', err);
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Internal server error' }));
  }
}
