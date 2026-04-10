import { ReactNode, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

export function PageTransition({ children }: { children: ReactNode }) {
  const location = useLocation();
  const [displayChildren, setDisplayChildren] = useState(children);
  const [transitionStage, setTransitionStage] = useState<'enter' | 'visible' | 'exit'>('visible');

  useEffect(() => {
    setTransitionStage('exit');
    const timer = setTimeout(() => {
      setDisplayChildren(children);
      setTransitionStage('enter');
      requestAnimationFrame(() => {
        setTimeout(() => setTransitionStage('visible'), 20);
      });
    }, 200);
    return () => clearTimeout(timer);
  }, [location.pathname]);

  return (
    <div
      style={{
        opacity: transitionStage === 'visible' ? 1 : 0,
        transform: transitionStage === 'enter' ? 'translateY(8px)' : 'translateY(0)',
        transition: 'opacity 0.35s cubic-bezier(0.16,1,0.3,1), transform 0.35s cubic-bezier(0.16,1,0.3,1)',
      }}
    >
      {displayChildren}
    </div>
  );
}
