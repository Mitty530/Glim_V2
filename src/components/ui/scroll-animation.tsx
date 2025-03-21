'use client'

import React, { ReactNode } from 'react';
import { useScrollAnimation, ScrollAnimationOptions } from '@/hooks/useScrollAnimation';

interface ScrollAnimationProps extends ScrollAnimationOptions {
  children: ReactNode;
  className?: string;
  as?: React.ElementType;
}

export function ScrollAnimation({
  children,
  className = '',
  as: Component = 'div',
  ...options
}: ScrollAnimationProps) {
  const { ref } = useScrollAnimation(options);

  return (
    <Component ref={ref} className={className}>
      {children}
    </Component>
  );
}

// Usage examples:
// <ScrollAnimation {...fadeUp}>Content</ScrollAnimation>
// <ScrollAnimation from={{ opacity: 0, y: 100 }} to={{ opacity: 1, y: 0 }}>Content</ScrollAnimation>
// <ScrollAnimation scrub={0.5} start="top bottom" end="bottom top">Parallax content</ScrollAnimation> 