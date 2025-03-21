'use client'

import React, { useRef, useEffect, ReactNode } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

type ParallaxEffectProps = {
  children: ReactNode;
  speed?: number; // Speed of parallax effect (negative values move opposite to scroll)
  className?: string;
  yOffset?: number; // Initial Y offset
  direction?: 'vertical' | 'horizontal';
  opacity?: [number, number]; // Fade effect [start, end]
  scale?: [number, number]; // Scale effect [start, end]
};

export function ParallaxEffect({
  children,
  speed = 0.5,
  className = '',
  yOffset = 0,
  direction = 'vertical',
  opacity,
  scale,
}: ParallaxEffectProps) {
  const ref = useRef<HTMLDivElement>(null);
  const tl = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    if (!ref.current) return;

    // Create a timeline for the animation
    tl.current = gsap.timeline({
      scrollTrigger: {
        trigger: ref.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    });

    // Calculate movement amount based on element height and speed
    const yMove = direction === 'vertical' ? ref.current.offsetHeight * speed : 0;
    const xMove = direction === 'horizontal' ? ref.current.offsetWidth * speed : 0;

    // Build animation
    const animProps: gsap.TweenVars = {};
    
    // Movement
    if (direction === 'vertical') {
      animProps.y = yOffset - yMove;
    } else {
      animProps.x = yOffset - xMove;
    }
    
    // Opacity
    if (opacity) {
      animProps.opacity = opacity[1];
      gsap.set(ref.current, { opacity: opacity[0] });
    }
    
    // Scale
    if (scale) {
      animProps.scale = scale[1];
      gsap.set(ref.current, { scale: scale[0] });
    }

    tl.current.to(ref.current, animProps);

    return () => {
      if (tl.current) {
        tl.current.kill();
        tl.current = null;
      }
    };
  }, [speed, yOffset, direction, opacity, scale]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

// Usage example:
// <ParallaxEffect speed={0.1}>
//   <div className="bg-image"></div>
// </ParallaxEffect> 