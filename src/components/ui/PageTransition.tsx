import { ReactNode, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

export function PageTransition({ children }: { children: ReactNode }) {
  const location = useLocation();
  const [displayLocation, setDisplayLocation] = useState(location);
  const [transitionStage, setTransitionStage] = useState<'idle' | 'enter' | 'exit'>('idle');

  useEffect(() => {
    if (location !== displayLocation) {
      setTransitionStage('exit');
    }
  }, [location, displayLocation]);

  const handleAnimationEnd = () => {
    if (transitionStage === 'exit') {
      setDisplayLocation(location);
      setTransitionStage('enter');
    } else if (transitionStage === 'enter') {
      setTransitionStage('idle');
    }
  };

  return (
    <div
      onAnimationEnd={handleAnimationEnd}
      style={{
        animation: transitionStage === 'exit'
          ? 'page-exit 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards'
          : transitionStage === 'enter'
          ? 'page-enter 0.45s cubic-bezier(0.16, 1, 0.3, 1) forwards'
          : 'none',
      }}
    >
      <style>{`
        @keyframes page-exit {
          from { opacity: 1; transform: translateY(0); }
          to { opacity: 0; transform: translateY(-16px); }
        }
        @keyframes page-enter {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
      {children}
    </div>
  );
}
