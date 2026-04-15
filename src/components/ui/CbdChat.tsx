import { useState, useRef, useEffect, useCallback } from 'react';
import { MessageCircle, X, Send, Leaf, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { products } from '../../data/products';
import type { Product } from '../../data/products';

interface Message {
  id: number;
  text: string;
  isBot: boolean;
  matchedProducts?: Product[];
}

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

const quickQuestions = [
  "C'est quoi le CBD ?",
  "Je cherche quelque chose pour dormir",
  "Quel produit pour débutant ?",
  "Quelles sont vos fleurs D10 ?",
  "Livraison et paiement ?",
  "Comparez Gelato et Amnesia",
];

function findMatchingProducts(text: string): Product[] {
  const lower = text.toLowerCase();
  const matched: Product[] = [];
  const seen = new Set<number>();

  for (const p of products) {
    if (seen.has(p.id)) continue;
    const nameWords = p.name.toLowerCase().split(/[\s\-–—®]+/).filter(w => w.length > 3);
    const nameMatch = nameWords.some(w => lower.includes(w));
    if (nameMatch) {
      seen.add(p.id);
      matched.push(p);
    }
  }

  return matched.slice(0, 4);
}

export default function CbdChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: 0, text: "Bonjour ! 🌿 Je suis l'assistant IA de CannaZen. Posez-moi vos questions sur le CBD, nos produits ou la livraison — je suis là pour vous conseiller !", isBot: true },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const conversationRef = useRef<ChatMessage[]>([]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const sendToAI = useCallback(async (userText: string): Promise<string> => {
    conversationRef.current.push({ role: 'user', content: userText });

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ messages: conversationRef.current }),
      });

      if (!response.ok) {
        const err = await response.json().catch(() => ({}));
        throw new Error(err.error || `API error: ${response.status}`);
      }

      const data = await response.json();
      const botText = data.text || "Désolé, je n'ai pas pu répondre.";

      conversationRef.current.push({ role: 'assistant', content: botText });
      return botText;
    } catch (error) {
      console.error('Chat error:', error);
      conversationRef.current.pop();
      return "Oups, je rencontre un petit souci technique 🌿 Réessayez dans un instant, ou contactez-nous à contact@cannazen.space !";
    }
  }, []);

  const handleSend = useCallback(async (text?: string) => {
    const msg = text || input.trim();
    if (!msg || isTyping) return;

    setHasInteracted(true);
    const userMsg: Message = { id: Date.now(), text: msg, isBot: false };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    const botText = await sendToAI(msg);
    const matchedProducts = findMatchingProducts(botText);

    const botMsg: Message = {
      id: Date.now() + 1,
      text: botText,
      isBot: true,
      matchedProducts: matchedProducts.length > 0 ? matchedProducts : undefined,
    };
    setMessages(prev => [...prev, botMsg]);
    setIsTyping(false);
  }, [input, isTyping, sendToAI]);

  const handleOpen = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  };

  return (
    <>
      <button
        onClick={handleOpen}
        className="fixed bottom-6 right-6 z-[80] w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110 group"
        style={{
          background: 'linear-gradient(135deg, #1a2f23, #2d4a3e)',
          color: '#e8c49a',
          boxShadow: '0 8px 32px rgba(26,47,35,0.25)',
        }}
        aria-label="Assistant CannaZen"
      >
        {isOpen ? <X size={22} /> : <MessageCircle size={22} className="group-hover:scale-110 transition-transform" />}
      </button>

      {isOpen && (
        <div
          className="fixed bottom-24 right-6 z-[80] w-[360px] sm:w-[400px] max-w-[calc(100vw-2rem)] rounded-2xl overflow-hidden shadow-2xl animate-slide-up flex flex-col"
          style={{
            background: 'var(--bg-surface)',
            border: '1px solid var(--border-color)',
            maxHeight: 'min(80vh, 600px)',
          }}
        >
          <div className="p-4 flex items-center gap-3 shrink-0" style={{ background: 'linear-gradient(135deg, #1a2f23, #2d4a3e)' }}>
            <div className="w-9 h-9 rounded-full flex items-center justify-center shrink-0" style={{ background: 'rgba(232,196,154,0.15)' }}>
              <Leaf size={18} className="text-[#e8c49a]" />
            </div>
            <div className="flex-1">
              <h3 className="text-sm font-semibold text-white">Assistant CannaZen</h3>
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                <p className="text-[10px] text-[#e8c49a]/70">IA • En ligne</p>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-white/50 hover:text-white transition-colors">
              <X size={18} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-3 space-y-3 scrollbar-hide min-h-0">
            {messages.map(msg => (
              <div key={msg.id}>
                <div className={`flex gap-2 ${msg.isBot ? 'justify-start' : 'justify-end'}`}>
                  {msg.isBot && (
                    <div className="w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-1" style={{ background: 'rgba(26,47,35,0.08)' }}>
                      <Leaf size={11} className="text-[#2d4a3e] dark:text-[#c4956a]" />
                    </div>
                  )}
                  <div
                    className={`max-w-[82%] px-3.5 py-2.5 text-[13px] leading-relaxed ${
                      msg.isBot
                        ? 'rounded-2xl rounded-tl-sm'
                        : 'rounded-2xl rounded-tr-sm text-white'
                    }`}
                    style={
                      msg.isBot
                        ? { background: 'var(--bg-card)', color: 'var(--text-primary)', border: '1px solid var(--border-light)' }
                        : { background: 'linear-gradient(135deg, #1a2f23, #2d4a3e)' }
                    }
                  >
                    {msg.text}
                  </div>
                </div>

                {msg.matchedProducts && msg.matchedProducts.length > 0 && (
                  <div className="ml-8 mt-2 space-y-1.5">
                    {msg.matchedProducts.map(p => (
                      <Link
                        key={p.id}
                        to={`/boutique/${p.slug}`}
                        onClick={() => setIsOpen(false)}
                        className="flex items-center gap-3 rounded-xl p-2 hover:scale-[1.01] transition-all"
                        style={{
                          background: 'var(--bg-card)',
                          border: '1px solid var(--border-color)',
                        }}
                        onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(196,149,106,0.4)'; }}
                        onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'var(--border-color)'; }}
                      >
                        <div className="w-10 h-10 rounded-lg overflow-hidden shrink-0" style={{ background: 'var(--border-color)' }}>
                          <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-[11px] font-medium truncate" style={{ color: 'var(--text-primary)' }}>{p.name}</p>
                          <p className="text-[11px] font-medium text-[#c4956a]">
                            {p.prices.length > 1
                              ? `Dès ${Math.min(...p.prices.map(pr => pr.amount)).toFixed(2)}€`
                              : `${p.prices[0].amount.toFixed(2)}€`}
                          </p>
                        </div>
                        <span className="text-[9px] px-2 py-0.5 rounded-full shrink-0" style={{ background: 'rgba(196,149,106,0.1)', color: '#c4956a' }}>
                          Voir
                        </span>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {isTyping && (
              <div className="flex gap-2 justify-start">
                <div className="w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-1" style={{ background: 'rgba(26,47,35,0.08)' }}>
                  <Leaf size={11} className="text-[#2d4a3e] dark:text-[#c4956a]" />
                </div>
                <div
                  className="px-4 py-3 rounded-2xl rounded-tl-sm flex items-center gap-2"
                  style={{ background: 'var(--bg-card)', border: '1px solid var(--border-light)' }}
                >
                  <Loader2 size={14} className="text-[#c4956a] animate-spin" />
                  <span className="text-[12px] italic" style={{ color: 'var(--text-muted)' }}>En train d'écrire...</span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {!hasInteracted && (
            <div className="px-3 pb-2 flex flex-wrap gap-1.5 shrink-0">
              {quickQuestions.map(q => (
                <button
                  key={q}
                  onClick={() => handleSend(q)}
                  disabled={isTyping}
                  className="text-[11px] px-3 py-1.5 rounded-full border transition-all duration-200 hover:scale-[1.03] disabled:opacity-50"
                  style={{ color: 'var(--text-secondary)', background: 'var(--bg-card)', borderColor: 'var(--border-color)' }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(196,149,106,0.4)'; e.currentTarget.style.color = '#c4956a'; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border-color)'; e.currentTarget.style.color = 'var(--text-secondary)'; }}
                >
                  {q}
                </button>
              ))}
            </div>
          )}

          <div className="p-3 shrink-0" style={{ borderTop: '1px solid var(--border-color)' }}>
            <form onSubmit={e => { e.preventDefault(); handleSend(); }} className="flex gap-2">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={e => setInput(e.target.value)}
                placeholder="Posez votre question sur le CBD..."
                disabled={isTyping}
                className="flex-1 px-3.5 py-2.5 rounded-xl text-[13px] focus:outline-none focus:ring-1 focus:ring-[#c4956a]/30 disabled:opacity-60 transition-all"
                style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', color: 'var(--text-primary)' }}
              />
              <button
                type="submit"
                disabled={isTyping || !input.trim()}
                className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-all duration-200 disabled:opacity-40 hover:scale-105"
                style={{
                  background: input.trim() && !isTyping ? 'linear-gradient(135deg, #1a2f23, #2d4a3e)' : 'var(--border-color)',
                  color: input.trim() && !isTyping ? '#e8c49a' : 'var(--text-muted)',
                }}
                aria-label="Envoyer"
              >
                <Send size={14} />
              </button>
            </form>
            <p className="text-[9px] text-center mt-1.5 font-light" style={{ color: 'var(--text-muted)' }}>
              Propulsé par IA • Pas un avis médical
            </p>
          </div>
        </div>
      )}
    </>
  );
}
