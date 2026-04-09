import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Leaf } from 'lucide-react';

interface Message {
  id: number;
  text: string;
  isBot: boolean;
}

const faqData: { keywords: string[]; answer: string }[] = [
  { keywords: ['thc', 'légal', 'legal', 'loi', 'interdit'], answer: "Tous nos produits contiennent moins de 0.3% de THC, conformément à la législation française. Ils sont 100% légaux en France." },
  { keywords: ['cbd', 'quoi', 'c\'est quoi', 'définition'], answer: "Le CBD (cannabidiol) est un cannabinoïde naturel du chanvre. Contrairement au THC, il n'a pas d'effet psychoactif et est reconnu pour ses propriétés relaxantes et apaisantes." },
  { keywords: ['effet', 'ressent', 'sensation', 'fait quoi'], answer: "Le CBD peut favoriser la relaxation, réduire le stress et l'anxiété, améliorer le sommeil et soulager certaines douleurs. Les effets varient selon les personnes et les produits." },
  { keywords: ['dosage', 'dose', 'combien', 'quantité'], answer: "Commencez avec une petite dose et augmentez progressivement. Pour les huiles, 2-3 gouttes sous la langue. Pour les fleurs, 0.3-0.5g par session. Écoutez votre corps !" },
  { keywords: ['livraison', 'délai', 'envoi', 'recevoir'], answer: "Expédition sous 24h ! Colissimo (2-3 jours, gratuit dès 49€), Chronopost Express 24h (9.90€), ou Point Relais (3-5 jours, gratuit dès 39€)." },
  { keywords: ['paiement', 'payer', 'carte', 'crypto'], answer: "Nous acceptons la carte bancaire (Visa, Mastercard via Mollie), Apple Pay, les cryptomonnaies (BTC, ETH, USDT) et le virement bancaire." },
  { keywords: ['fleur', 'fumer', 'vapo', 'consommer'], answer: "Les fleurs CBD se consomment en vaporisation (recommandé), en infusion ou en cuisine. La vaporisation entre 180-210°C préserve les terpènes et cannabinoïdes." },
  { keywords: ['huile', 'goutte', 'sublingual'], answer: "Les huiles CBD se prennent sous la langue (sublingual) pour une absorption rapide. Maintenez 30-60 secondes avant d'avaler. Effet en 15-30 minutes." },
  { keywords: ['gummies', 'comestible', 'manger'], answer: "Les gummies D9 se consomment comme des bonbons. Attendez 45-90 min pour ressentir les effets. Ne dépassez pas la dose recommandée (1 gummy pour commencer)." },
  { keywords: ['d10', 'delta', 'oh+', 'puissant'], answer: "Le D10 et OH+ sont des variantes plus puissantes du CBD. Ils offrent des effets plus intenses tout en restant légaux. Recommandés pour les consommateurs expérimentés." },
  { keywords: ['bonjour', 'salut', 'hello', 'coucou', 'hey'], answer: "Bonjour ! 🌿 Je suis l'assistant CannaZen. Posez-moi vos questions sur le CBD, nos produits, la livraison ou la législation !" },
  { keywords: ['merci', 'thanks', 'super'], answer: "Avec plaisir ! 🌿 N'hésitez pas si vous avez d'autres questions. Bonne découverte du CBD !" },
];

const quickQuestions = [
  "C'est quoi le CBD ?",
  "C'est légal ?",
  "Quel dosage ?",
  "Livraison ?",
];

function findAnswer(input: string): string {
  const lower = input.toLowerCase();
  for (const faq of faqData) {
    if (faq.keywords.some(k => lower.includes(k))) {
      return faq.answer;
    }
  }
  return "Je ne suis pas sûr de comprendre votre question. Essayez de poser une question sur le CBD, nos produits, la livraison ou la législation. Vous pouvez aussi nous contacter à contact@cannazen.space !";
}

export default function CbdChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: 0, text: "Bonjour ! 🌿 Je suis l'assistant CBD CannaZen. Posez-moi vos questions !", isBot: true },
  ]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = (text?: string) => {
    const msg = text || input.trim();
    if (!msg) return;

    const userMsg: Message = { id: Date.now(), text: msg, isBot: false };
    setMessages(prev => [...prev, userMsg]);
    setInput('');

    setTimeout(() => {
      const answer = findAnswer(msg);
      const botMsg: Message = { id: Date.now() + 1, text: answer, isBot: true };
      setMessages(prev => [...prev, botMsg]);
    }, 600);
  };

  return (
    <>
      <button
        onClick={() => { setIsOpen(!isOpen); setTimeout(() => inputRef.current?.focus(), 100); }}
        className="fixed bottom-6 left-6 z-[80] w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110"
        style={{
          background: 'linear-gradient(135deg, #1a2f23, #2d4a3e)',
          color: '#e8c49a',
          boxShadow: '0 4px 20px rgba(26,47,35,0.3)',
        }}
        aria-label="Chat CBD éducatif"
      >
        {isOpen ? <X size={20} /> : <MessageCircle size={20} />}
      </button>

      {isOpen && (
        <div className="fixed bottom-20 left-6 z-[80] w-80 sm:w-96 rounded-2xl overflow-hidden shadow-2xl border border-[var(--border-color)] animate-slide-up" style={{ background: 'var(--bg-surface)', maxHeight: '70vh' }}>
          <div className="p-4 flex items-center gap-3" style={{ background: 'linear-gradient(135deg, #1a2f23, #2d4a3e)' }}>
            <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: 'rgba(232,196,154,0.15)' }}>
              <Leaf size={16} className="text-[#e8c49a]" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-white">Question CBD ?</h3>
              <p className="text-[10px] text-[#e8c49a]/70">Réponses instantanées</p>
            </div>
          </div>

          <div className="h-64 overflow-y-auto p-3 space-y-3 scrollbar-hide">
            {messages.map(msg => (
              <div key={msg.id} className={`flex ${msg.isBot ? 'justify-start' : 'justify-end'}`}>
                <div
                  className={`max-w-[85%] px-3.5 py-2.5 rounded-xl text-xs leading-relaxed ${
                    msg.isBot
                      ? 'rounded-tl-sm'
                      : 'rounded-tr-sm text-white'
                  }`}
                  style={msg.isBot ? { background: 'var(--border-color)', color: 'var(--text-primary)' } : { background: 'linear-gradient(135deg, #1a2f23, #2d4a3e)' }}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {messages.length <= 2 && (
            <div className="px-3 pb-2 flex flex-wrap gap-1.5">
              {quickQuestions.map(q => (
                <button
                  key={q}
                  onClick={() => handleSend(q)}
                  className="text-[10px] px-2.5 py-1.5 rounded-full border border-[var(--border-color)] hover:border-[#c4956a]/40 transition-colors"
                  style={{ color: 'var(--text-secondary)', background: 'var(--bg-card)' }}
                >
                  {q}
                </button>
              ))}
            </div>
          )}

          <div className="p-3 border-t border-[var(--border-color)]/50">
            <form onSubmit={e => { e.preventDefault(); handleSend(); }} className="flex gap-2">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={e => setInput(e.target.value)}
                placeholder="Posez votre question..."
                className="flex-1 px-3 py-2 rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-[#c4956a]/30"
                style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', color: 'var(--text-primary)' }}
              />
              <button type="submit" className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 btn-vivid" aria-label="Envoyer">
                <Send size={14} />
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
