import { useState, useRef, useEffect, useCallback } from 'react';
import { MessageCircle, X, Send, Leaf, Loader2 } from 'lucide-react';

interface Message {
  id: number;
  text: string;
  isBot: boolean;
}

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

const quickQuestions = [
  "C'est quoi le CBD ?",
  "Je cherche quelque chose pour dormir",
  "Quel produit pour débutant ?",
  "C'est légal en France ?",
  "Livraison et paiement ?",
];

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
    conversationRef.current.push({
      role: 'user',
      content: userText,
    });

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: conversationRef.current }),
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const data = await response.json();
      const botText = data.text || "Désolé, je n'ai pas pu répondre.";

      conversationRef.current.push({
        role: 'assistant',
        content: botText,
      });

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

    const botMsg: Message = { id: Date.now() + 1, text: botText, isBot: true };
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
        className="fixed bottom-6 left-6 z-[80] w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110 group"
        style={{
          background: 'linear-gradient(135deg, #1a2f23, #2d4a3e)',
          color: '#e8c49a',
          boxShadow: '0 4px 20px rgba(26,47,35,0.3)',
        }}
        aria-label="Chat CBD IA"
      >
        {isOpen ? <X size={20} /> : <MessageCircle size={20} className="group-hover:scale-110 transition-transform" />}
      </button>

      {isOpen && (
        <div
          className="fixed bottom-20 left-6 z-[80] w-[340px] sm:w-[400px] rounded-2xl overflow-hidden shadow-2xl animate-slide-up flex flex-col"
          style={{
            background: 'var(--bg-surface)',
            border: '1px solid var(--border-color)',
            maxHeight: 'min(75vh, 560px)',
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
          </div>

          <div className="flex-1 overflow-y-auto p-3 space-y-3 scrollbar-hide min-h-0">
            {messages.map(msg => (
              <div key={msg.id} className={`flex gap-2 ${msg.isBot ? 'justify-start' : 'justify-end'}`}>
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
