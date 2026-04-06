import { useInView } from '../../hooks/useInView';

type Animation = 'fade-up' | 'fade-left' | 'fade-right' | 'scale-in' | 'fade-in';

interface Props {
  children: React.ReactNode;
  animation?: Animation;
  delay?: number;
  className?: string;
  as?: keyof JSX.IntrinsicElements;
}

const animationStyles: Record<Animation, { hidden: React.CSSProperties; visible: React.CSSProperties }> = {
  'fade-up': {
    hidden: { opacity: 0, transform: 'translateY(30px)' },
    visible: { opacity: 1, transform: 'translateY(0)' },
  },
  'fade-left': {
    hidden: { opacity: 0, transform: 'translateX(-30px)' },
    visible: { opacity: 1, transform: 'translateX(0)' },
  },
  'fade-right': {
    hidden: { opacity: 0, transform: 'translateX(30px)' },
    visible: { opacity: 1, transform: 'translateX(0)' },
  },
  'scale-in': {
    hidden: { opacity: 0, transform: 'scale(0.95)' },
    visible: { opacity: 1, transform: 'scale(1)' },
  },
  'fade-in': {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  },
};

export default function AnimatedSection({ children, animation = 'fade-up', delay = 0, className = '', as: Tag = 'div' }: Props) {
  const { ref, isVisible } = useInView(0.1);
  const styles = animationStyles[animation];

  return (
    <Tag
      ref={ref as any}
      className={className}
      style={{
        ...(isVisible ? styles.visible : styles.hidden),
        transition: `opacity 0.7s cubic-bezier(0.22, 1, 0.36, 1) ${delay}ms, transform 0.7s cubic-bezier(0.22, 1, 0.36, 1) ${delay}ms`,
        willChange: 'opacity, transform',
      }}
    >
      {children}
    </Tag>
  );
}
