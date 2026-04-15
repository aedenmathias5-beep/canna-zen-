import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ZoomIn, ZoomOut, ChevronLeft, ChevronRight } from 'lucide-react';

interface ProductGalleryProps {
  mainImage: string;
  images?: string[];
  productName: string;
  badge?: string;
  isNew?: boolean;
}

export default function ProductGallery({ mainImage, images: extraImages, productName, badge, isNew }: ProductGalleryProps) {
  const images = [mainImage, ...(extraImages || []).slice(0, 3)];
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomPos, setZoomPos] = useState({ x: 50, y: 50 });
  const imageRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isZoomed || !imageRef.current) return;
    const rect = imageRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setZoomPos({ x, y });
  };

  const goTo = (dir: 'prev' | 'next') => {
    setSelectedIndex(prev => {
      if (dir === 'prev') return prev === 0 ? images.length - 1 : prev - 1;
      return prev === images.length - 1 ? 0 : prev + 1;
    });
    setIsZoomed(false);
  };

  return (
    <div className="flex flex-col gap-3">
      {/* Main Image */}
      <div
        ref={imageRef}
        className="relative aspect-square rounded-2xl overflow-hidden glass-card group"
        onMouseMove={handleMouseMove}
        onClick={() => setIsZoomed(!isZoomed)}
        style={{ cursor: isZoomed ? 'zoom-out' : 'zoom-in' }}
      >
        <AnimatePresence mode="wait">
          <motion.img
            key={selectedIndex}
            src={images[selectedIndex]}
            alt={`${productName} - vue ${selectedIndex + 1}`}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className="w-full h-full object-cover"
            style={isZoomed ? {
              transform: `scale(2)`,
              transformOrigin: `${zoomPos.x}% ${zoomPos.y}%`,
              transition: 'transform-origin 0.1s ease',
            } : undefined}
          />
        </AnimatePresence>

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent pointer-events-none" />

        {/* Navigation arrows */}
        <button
          onClick={(e) => { e.stopPropagation(); goTo('prev'); }}
          className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full glass opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110"
          style={{ color: 'var(--text-primary)' }}
          aria-label="Image précédente"
        >
          <ChevronLeft size={18} />
        </button>
        <button
          onClick={(e) => { e.stopPropagation(); goTo('next'); }}
          className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full glass opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110"
          style={{ color: 'var(--text-primary)' }}
          aria-label="Image suivante"
        >
          <ChevronRight size={18} />
        </button>

        {/* Zoom indicator */}
        <div className="absolute bottom-3 right-3 p-2 rounded-full glass opacity-0 group-hover:opacity-70 transition-opacity pointer-events-none" style={{ color: 'var(--text-primary)' }}>
          {isZoomed ? <ZoomOut size={14} /> : <ZoomIn size={14} />}
        </div>

        {/* Badges */}
        {badge && (
          <motion.span
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="absolute top-4 left-4 px-3 py-1.5 text-[10px] font-bold rounded-full tracking-wider"
            style={{ background: 'linear-gradient(135deg, #1a2f23, #2d4a3e)', color: '#e8c49a' }}
          >
            {badge}
          </motion.span>
        )}
        {isNew && (
          <motion.span
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="absolute top-4 right-4 px-3 py-1.5 text-[10px] font-bold rounded-full text-white"
            style={{ background: 'linear-gradient(135deg, #c4956a, #d4a574)' }}
          >
            NOUVEAU
          </motion.span>
        )}

        {/* Dots indicator */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={(e) => { e.stopPropagation(); setSelectedIndex(i); setIsZoomed(false); }}
              className={`rounded-full transition-all duration-300 ${
                i === selectedIndex ? 'w-6 h-2' : 'w-2 h-2 opacity-50 hover:opacity-80'
              }`}
              style={{ background: i === selectedIndex ? '#c4956a' : 'rgba(255,255,255,0.7)' }}
              aria-label={`Image ${i + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Thumbnails */}
      <div className="flex gap-2">
        {images.map((img, i) => (
          <motion.button
            key={i}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => { setSelectedIndex(i); setIsZoomed(false); }}
            className={`relative flex-1 aspect-square rounded-xl overflow-hidden transition-all duration-300 ${
              i === selectedIndex
                ? 'ring-2 ring-[#c4956a] ring-offset-2 shadow-md'
                : 'opacity-60 hover:opacity-90'
            }`}
            style={{ ['--tw-ring-offset-color' as string]: 'var(--bg-primary)' } as React.CSSProperties}
          >
            <img src={img} alt={`${productName} miniature ${i + 1}`} className="w-full h-full object-cover" />
            {i === selectedIndex && (
              <motion.div
                layoutId="thumb-highlight"
                className="absolute inset-0 rounded-xl"
                style={{ border: '2px solid #c4956a' }}
              />
            )}
          </motion.button>
        ))}
      </div>
    </div>
  );
}
