import { ReactNode } from 'react';

interface Props { children: ReactNode; }

export function SmoothScroll({ children }: Props) {
  return <>{children}</>;
}
