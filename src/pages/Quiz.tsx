import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowLeft, Sparkles, Leaf, Moon, Sun, Brain, Zap, Heart, RefreshCw } from 'lucide-react';
import { products } from '../data/products';
import type { Product } from '../data/products';
import ProductCard from '../components/shop/ProductCard';

interface QuizStep {
  question: string;
  options: { label: string; icon: React.ReactNode; value: string; color: string }[];
}

const quizSteps: QuizStep[] = [
  {
    question: "Quel effet recherchez-vous principalement ?",
    options: [
      { label: "Relaxation", icon: <Moon size={28} />, value: "relax", color: "from-[#2d4a3e] to-[#1a2f23]" },
      { label: "Énergie & Focus", icon: <Zap size={28} />, value: "energy", color: "from-[#c4956a] to-[#d4a574]" },
      { label: "Sommeil profond", icon: <Leaf size={28} />, value: "sleep", color: "from-[#1a2f23] to-[#0a110e]" },
      { label: "Bien-être général", icon: <Heart size={28} />, value: "wellness", color: "from-[#c9a96e] to-[#c4956a]" },
    ],
  },
  {
    question: "Quelle intensité préférez-vous ?",
    options: [
      { label: "Douce & subtile", icon: <span className="text-2xl">🌱</span>, value: "low", color: "from-[#2d4a3e] to-[#3d6050]" },
      { label: "Modérée", icon: <span className="text-2xl">🌿</span>, value: "medium", color: "from-[#c4956a] to-[#d4a574]" },
      { label: "Puissante", icon: <span className="text-2xl">⚡</span>, value: "high", color: "from-[#1a2f23] to-[#2d4a3e]" },
    ],
  },
  {
    question: "Quel format vous attire le plus ?",
    options: [
      { label: "Fleurs à fumer", icon: <span className="text-2xl">🌸</span>, value: "flowers", color: "from-[#2d4a3e] to-[#1a2f23]" },
      { label: "Vapes & cartouches", icon: <span className="text-2xl">💨</span>, value: "vapes", color: "from-[#c4956a] to-[#c9a96e]" },
      { label: "Huiles & gouttes", icon: <span className="text-2xl">💧</span>, value: "oils", color: "from-[#1a2f23] to-[#2d4a3e]" },
      { label: "Gummies & comestibles", icon: <span className="text-2xl">🍬</span>, value: "edibles", color: "from-[#c9a96e] to-[#d4a574]" },
      { label: "Résines", icon: <span className="text-2xl">🧱</span>, value: "resins", color: "from-[#8b7355] to-[#c4956a]" },
    ],
  },
  {
    question: "Quel est votre moment préféré pour consommer ?",
    options: [
      { label: "Matin / Journée", icon: <Sun size={28} />, value: "morning", color: "from-[#c4956a] to-[#d4a574]" },
      { label: "Après-midi", icon: <Brain size={28} />, value: "afternoon", color: "from-[#2d4a3e] to-[#3d6050]" },
      { label: "Soirée / Nuit", icon: <Moon size={28} />, value: "evening", color: "from-[#1a2f23] to-[#0a110e]" },
    ],
  },
];

const effectKeywords: Record<string, string[]> = {
  relax: ["Relaxation", "Détente", "Anti-stress", "Relaxation profonde", "Calme"],
  energy: ["Énergie", "Focus", "Créativité", "Euphorie"],
  sleep: ["Sommeil", "Relaxation profonde", "Calme", "Détente"],
  wellness: ["Bien-être", "Anti-douleur", "Relaxation", "Bonne humeur"],
};

const formatMap: Record<string, string[]> = {
  flowers: ["fleurs-cbd", "fleurs-d10", "fleurs-oh"],
  vapes: ["vapes"],
  oils: ["huiles-cbd"],
  edibles: ["gummies-d9"],
  resins: ["resines-d10"],
};

function getRecommendations(answers: string[]): Product[] {
  const [effect, intensity, format] = answers;
  const keywords = effectKeywords[effect] || [];
  const categories = formatMap[format] || [];
  const intensityValue = intensity === "low" ? 1 : intensity === "medium" ? 2 : 3;

  let scored = products.map(p => {
    let score = 0;
    const effectMatch = p.effects.filter(e => keywords.some(k => e.toLowerCase().includes(k.toLowerCase())));
    score += effectMatch.length * 3;
    if (categories.includes(p.categorySlug)) score += 5;
    if (Math.abs(p.intensity - intensityValue) <= 1) score += 2;
    if (p.intensity === intensityValue) score += 2;
    if (p.isBestSeller) score += 1;
    if (p.inStock) score += 1;
    return { product: p, score };
  });

  scored.sort((a, b) => b.score - a.score);
  return scored.slice(0, 4).map(s => s.product);
}

function EffectSimulator({ effect }: { effect: string }) {
  const configs: Record<string, { bg: string; particles: string; label: string; emoji: string }> = {
    relax: { bg: "from-[#1a2f23]/10 via-[#2d4a3e]/5 to-[#1a2f23]/10", particles: "bg-[#2d4a3e]/20", label: "Relaxation", emoji: "🧘" },
    energy: { bg: "from-[#c4956a]/10 via-[#d4a574]/5 to-[#c9a96e]/10", particles: "bg-[#c4956a]/25", label: "Énergie", emoji: "⚡" },
    sleep: { bg: "from-[#0a110e]/15 via-[#1a2f23]/8 to-[#0a110e]/15", particles: "bg-[#1a2f23]/15", label: "Sommeil", emoji: "🌙" },
    wellness: { bg: "from-[#c9a96e]/10 via-[#c4956a]/5 to-[#d4a574]/10", particles: "bg-[#c9a96e]/20", label: "Bien-être", emoji: "✨" },
  };
  const config = configs[effect] || configs.relax;

  return (
    <div className={`relative rounded-2xl overflow-hidden h-32 bg-gradient-to-r ${config.bg} border border-[var(--border-color)]`}>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center">
          <span className="text-4xl block mb-1 animate-float">{config.emoji}</span>
          <span className="text-xs font-medium text-[var(--text-secondary)]">Effet : {config.label}</span>
        </div>
      </div>
      {Array.from({ length: 12 }, (_, i) => (
        <div
          key={i}
          className={`absolute rounded-full ${config.particles} effect-particle`}
          style={{
            width: `${4 + Math.random() * 8}px`,
            height: `${4 + Math.random() * 8}px`,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${i * 0.4}s`,
            animationDuration: `${3 + Math.random() * 4}s`,
          }}
        />
      ))}
    </div>
  );
}

export default function Quiz() {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const handleSelect = (value: string) => {
    setSelectedOption(value);
    setTimeout(() => {
      const newAnswers = [...answers, value];
      setAnswers(newAnswers);
      setSelectedOption(null);
      if (currentStep < quizSteps.length - 1) {
        setCurrentStep(currentStep + 1);
      } else {
        setShowResults(true);
      }
    }, 400);
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      setAnswers(answers.slice(0, -1));
    }
  };

  const handleReset = () => {
    setCurrentStep(0);
    setAnswers([]);
    setShowResults(false);
    setSelectedOption(null);
  };

  const recommendations = showResults ? getRecommendations(answers) : [];
  const progress = ((currentStep + (showResults ? 1 : 0)) / quizSteps.length) * 100;

  return (
    <div className="min-h-[80vh] py-8">
      <Helmet>
        <title>Quiz CBD — Trouvez votre produit idéal | CannaZen</title>
        <meta name="description" content="Répondez à quelques questions et découvrez les produits CBD parfaits pour vous." />
      </Helmet>

      <div className="max-w-3xl mx-auto px-4">
        {!showResults ? (
          <div className="fade-in-up">
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 text-[10px] font-medium px-4 py-2 rounded-full mb-4 tracking-[0.2em] uppercase" style={{ background: 'rgba(196,149,106,0.08)', color: '#c4956a', border: '1px solid rgba(196,149,106,0.15)' }}>
                <Sparkles size={11} /> Quiz personnalisé
              </div>
              <h1 className="font-['Cormorant_Garamond'] text-3xl sm:text-4xl font-semibold italic mb-2" style={{ color: 'var(--text-primary)' }}>
                Quel <span className="text-gradient-vivid">CBD</span> est fait pour vous ?
              </h1>
              <p className="text-sm font-light" style={{ color: 'var(--text-secondary)' }}>
                Question {currentStep + 1} sur {quizSteps.length}
              </p>
            </div>

            <div className="relative h-1 rounded-full bg-[var(--border-color)] mb-8 overflow-hidden">
              <div
                className="absolute left-0 top-0 h-full rounded-full transition-all duration-700 ease-out"
                style={{ width: `${progress}%`, background: 'linear-gradient(90deg, #1a2f23, #c4956a)' }}
              />
            </div>

            <div className="glass-card rounded-2xl p-6 sm:p-8">
              <h2 className="font-['Cormorant_Garamond'] text-xl sm:text-2xl font-semibold italic mb-6 text-center" style={{ color: 'var(--text-primary)' }}>
                {quizSteps[currentStep].question}
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {quizSteps[currentStep].options.map(option => (
                  <button
                    key={option.value}
                    onClick={() => handleSelect(option.value)}
                    className={`group relative p-5 rounded-xl border text-left transition-all duration-400 overflow-hidden ${
                      selectedOption === option.value
                        ? 'border-[#c4956a] scale-[0.97]'
                        : 'border-[var(--border-color)] hover:border-[#c4956a]/40 hover:shadow-lg'
                    }`}
                    style={{ background: selectedOption === option.value ? 'rgba(196,149,106,0.06)' : 'var(--bg-card)' }}
                  >
                    <div className={`absolute inset-0 bg-gradient-to-br ${option.color} opacity-0 group-hover:opacity-[0.03] transition-opacity duration-500`} />
                    <div className="relative flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition-all duration-300 group-hover:scale-110" style={{ background: 'rgba(196,149,106,0.06)', color: '#c4956a' }}>
                        {option.icon}
                      </div>
                      <span className="font-medium text-sm" style={{ color: 'var(--text-primary)' }}>{option.label}</span>
                    </div>
                    {selectedOption === option.value && (
                      <div className="absolute inset-0 rounded-xl border-2 border-[#c4956a] animate-pulse-glow" />
                    )}
                  </button>
                ))}
              </div>

              {currentStep > 0 && (
                <button onClick={handleBack} className="mt-6 flex items-center gap-1.5 text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors mx-auto">
                  <ArrowLeft size={14} /> Question précédente
                </button>
              )}
            </div>
          </div>
        ) : (
          <div className="fade-in-up">
            <div className="text-center mb-6">
              <div className="inline-flex items-center gap-2 text-[10px] font-medium px-4 py-2 rounded-full mb-4 tracking-[0.2em] uppercase" style={{ background: 'rgba(196,149,106,0.08)', color: '#c4956a', border: '1px solid rgba(196,149,106,0.15)' }}>
                <Sparkles size={11} /> Vos résultats
              </div>
              <h2 className="font-['Cormorant_Garamond'] text-3xl sm:text-4xl font-semibold italic mb-3" style={{ color: 'var(--text-primary)' }}>
                Votre sélection <span className="text-gradient-vivid">sur mesure</span>
              </h2>
              <p className="text-sm font-light max-w-md mx-auto" style={{ color: 'var(--text-secondary)' }}>
                Basée sur vos préférences, voici les produits qui vous correspondent le mieux.
              </p>
            </div>

            <EffectSimulator effect={answers[0]} />

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 stagger-child">
              {recommendations.map(p => <ProductCard key={p.id} product={p} />)}
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10">
              <button onClick={handleReset} className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-medium text-sm border border-[var(--border-color)] hover:border-[#c4956a]/40 transition-colors" style={{ color: 'var(--text-primary)', background: 'var(--bg-card)' }}>
                <RefreshCw size={16} /> Refaire le quiz
              </button>
              <Link to="/boutique" className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm text-white btn-vivid">
                Voir toute la boutique <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
