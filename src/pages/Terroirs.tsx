import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { MapPin, Leaf, Sun, Droplets, Wind, ThermometerSun } from 'lucide-react';
import AnimatedSection from '../components/ui/AnimatedSection';

interface Region {
  id: string;
  name: string;
  x: number;
  y: number;
  specialty: string;
  description: string;
  climate: string;
  icon: React.ReactNode;
  products: string[];
}

const regions: Region[] = [
  { id: 'alsace', name: 'Alsace', x: 85, y: 28, specialty: 'Fleurs CBD Indoor', description: "Serres high-tech en Alsace produisant des fleurs CBD indoor d'exception. Contrôle climatique optimal pour des terpènes complexes.", climate: '🌡️ Continental', icon: <Leaf size={16} />, products: ['Amnesia Haze Premium', 'Purple Haze CBD'] },
  { id: 'provence', name: 'Provence', x: 72, y: 72, specialty: 'Huiles CBD Bio', description: "Sous le soleil provençal, nos partenaires cultivent un chanvre bio riche en cannabinoïdes, distillé en huiles full-spectrum.", climate: '☀️ Méditerranéen', icon: <Sun size={16} />, products: ['Huile CBD 10%', 'Huile CBD 30%'] },
  { id: 'bretagne', name: 'Bretagne', x: 18, y: 32, specialty: 'Chanvre Outdoor', description: "Le climat océanique breton est idéal pour le chanvre outdoor. Sol riche et pluies régulières produisent des fleurs naturellement robustes.", climate: '🌊 Océanique', icon: <Droplets size={16} />, products: ['Tropical Punch', 'Mango Kush'] },
  { id: 'auvergne', name: 'Auvergne', x: 55, y: 55, specialty: 'Résines artisanales', description: "Au cœur des volcans, nos artisans produisent des résines D10 concentrées selon des méthodes traditionnelles revisitées.", climate: '🏔️ Semi-continental', icon: <Wind size={16} />, products: ['Afghan Gold D10', 'Moroccan Hash D10'] },
  { id: 'occitanie', name: 'Occitanie', x: 52, y: 78, specialty: 'Fleurs Greenhouse', description: "Entre mer et montagne, les serres d'Occitanie offrent un microclimat unique pour des variétés greenhouse exceptionnelles.", climate: '🌞 Méditerranéen', icon: <ThermometerSun size={16} />, products: ['Gelato D10', 'Runtz D10'] },
];

export default function Terroirs() {
  const [activeRegion, setActiveRegion] = useState<Region | null>(null);

  return (
    <div className="py-8">
      <Helmet>
        <title>Nos Terroirs — Cannabis CBD cultivé en France | CannaZen</title>
        <meta name="description" content="Découvrez les terroirs français de CannaZen. Chanvre CBD cultivé en Alsace, Provence, Bretagne, Auvergne et Occitanie." />
      </Helmet>

      <div className="max-w-6xl mx-auto px-4">
        <AnimatedSection className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-[10px] font-medium px-4 py-2 rounded-full mb-4 tracking-[0.2em] uppercase" style={{ background: 'rgba(196,149,106,0.08)', color: '#c4956a', border: '1px solid rgba(196,149,106,0.15)' }}>
            <MapPin size={11} /> Made in France
          </div>
          <h1 className="font-['Cormorant_Garamond'] text-3xl sm:text-5xl font-semibold italic mb-3" style={{ color: 'var(--text-primary)' }}>
            Nos <span className="text-gradient-vivid">Terroirs</span>
          </h1>
          <p className="text-sm sm:text-base font-light max-w-xl mx-auto" style={{ color: 'var(--text-secondary)' }}>
            Du sol au produit fini, chaque région apporte son savoir-faire unique à notre collection.
          </p>
        </AnimatedSection>

        <div className="grid lg:grid-cols-2 gap-8 items-start">
          <AnimatedSection animation="fade-left">
            <div className="relative glass-card rounded-2xl p-6 sm:p-8 overflow-hidden" style={{ aspectRatio: '1/1.15' }}>
              <svg viewBox="0 0 100 100" className="w-full h-full" style={{ filter: 'drop-shadow(0 4px 12px rgba(26,47,35,0.08))' }}>
                <path d="M50 5 C35 8, 20 15, 15 25 C10 35, 8 45, 12 55 C14 62, 18 68, 22 72 C28 78, 35 82, 40 88 C42 92, 48 95, 52 95 C56 94, 62 90, 65 85 C70 78, 78 72, 82 65 C86 58, 88 50, 86 42 C84 34, 80 26, 72 20 C64 14, 56 8, 50 5Z" fill="var(--bg-surface)" stroke="var(--border-color)" strokeWidth="0.5" />
                {regions.map(region => (
                  <g key={region.id} className="cursor-pointer" onClick={() => setActiveRegion(region)}>
                    <circle cx={region.x} cy={region.y} r={activeRegion?.id === region.id ? 4 : 2.5} fill={activeRegion?.id === region.id ? '#c4956a' : '#1a2f23'} className="transition-all duration-300" style={{ filter: activeRegion?.id === region.id ? 'drop-shadow(0 0 6px rgba(196,149,106,0.5))' : 'none' }}>
                      {activeRegion?.id === region.id && <animate attributeName="r" values="3.5;4.5;3.5" dur="2s" repeatCount="indefinite" />}
                    </circle>
                    <text x={region.x} y={region.y - 5} textAnchor="middle" fontSize="3" fontWeight="600" fill="var(--text-primary)" className="pointer-events-none select-none" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                      {region.name}
                    </text>
                  </g>
                ))}
              </svg>
            </div>
          </AnimatedSection>

          <AnimatedSection animation="fade-right" className="space-y-4">
            {activeRegion ? (
              <div className="glass-card rounded-2xl p-6 border-[#c4956a]/20 fade-in-up" key={activeRegion.id}>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'rgba(196,149,106,0.1)', color: '#c4956a' }}>
                    {activeRegion.icon}
                  </div>
                  <div>
                    <h3 className="font-['Cormorant_Garamond'] text-xl font-semibold italic" style={{ color: 'var(--text-primary)' }}>{activeRegion.name}</h3>
                    <p className="text-xs font-medium text-[#c4956a]">{activeRegion.specialty}</p>
                  </div>
                </div>
                <p className="text-sm font-light leading-relaxed mb-4" style={{ color: 'var(--text-secondary)' }}>{activeRegion.description}</p>
                <div className="flex items-center gap-2 text-xs mb-4 px-3 py-2 rounded-lg" style={{ background: 'rgba(196,149,106,0.04)', color: 'var(--text-secondary)' }}>
                  {activeRegion.climate}
                </div>
                <div>
                  <p className="text-[10px] font-medium uppercase tracking-wider mb-2" style={{ color: 'var(--text-muted)' }}>Produits phares</p>
                  <div className="flex flex-wrap gap-2">
                    {activeRegion.products.map(p => (
                      <span key={p} className="text-xs px-3 py-1 rounded-full border border-[var(--border-color)]" style={{ color: 'var(--text-primary)', background: 'var(--bg-surface)' }}>
                        {p}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="glass-card rounded-2xl p-8 text-center">
                <MapPin size={32} className="mx-auto mb-3 text-[#c4956a]/40" />
                <p className="text-sm font-light" style={{ color: 'var(--text-secondary)' }}>
                  Cliquez sur une région de la carte pour découvrir son terroir
                </p>
              </div>
            )}

            <div className="grid grid-cols-1 gap-3">
              {regions.map(region => (
                <button
                  key={region.id}
                  onClick={() => setActiveRegion(region)}
                  className={`flex items-center gap-3 p-4 rounded-xl border text-left transition-all duration-300 ${
                    activeRegion?.id === region.id ? 'border-[#c4956a] shadow-md' : 'border-[var(--border-color)] hover:border-[#c4956a]/30'
                  }`}
                  style={{ background: activeRegion?.id === region.id ? 'rgba(196,149,106,0.04)' : 'var(--bg-card)' }}
                >
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0" style={{ background: 'rgba(196,149,106,0.08)', color: '#c4956a' }}>
                    {region.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>{region.name}</p>
                    <p className="text-xs font-light" style={{ color: 'var(--text-muted)' }}>{region.specialty}</p>
                  </div>
                </button>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </div>
    </div>
  );
}
