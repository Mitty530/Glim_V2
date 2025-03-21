import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useInView } from 'framer-motion';

// Register ScrollTrigger plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export type ScrollAnimationOptions = {
  threshold?: number;
  rootMargin?: string;
  once?: boolean;
  start?: string;
  end?: string;
  scrub?: boolean | number;
  markers?: boolean;
  toggleActions?: string;
  delay?: number;
  duration?: number;
  ease?: string;
  from?: Record<string, any>;
  to?: Record<string, any>;
};

export const useScrollAnimation = (
  options: ScrollAnimationOptions = {}
) => {
  const {
    threshold = 0.2,
    rootMargin = '0px',
    once = true,
    start = 'top bottom',
    end = 'bottom top',
    scrub = false,
    markers = false,
    toggleActions = 'play none none none',
    delay = 0,
    duration = 0.8,
    ease = 'power2.out',
    from = { opacity: 0, y: 50 },
    to = { opacity: 1, y: 0 },
  } = options;

  const element = useRef<HTMLElement>(null);
  const animation = useRef<gsap.core.Timeline | null>(null);
  const isInView = useInView(element, { once, amount: threshold, margin: rootMargin });
  const [hasAnimated, setHasAnimated] = useState(false);

  // For simple animations using Framer Motion's useInView
  const simpleAnimation = () => {
    if (element.current && isInView && !hasAnimated) {
      gsap.fromTo(
        element.current,
        { ...from },
        { ...to, delay, duration, ease }
      );
      if (once) {
        setHasAnimated(true);
      }
    }
  };

  // For scroll-triggered animations using GSAP ScrollTrigger
  const scrollTriggerAnimation = () => {
    if (element.current && !animation.current) {
      animation.current = gsap.timeline({
        scrollTrigger: {
          trigger: element.current,
          start,
          end,
          scrub,
          markers,
          toggleActions,
        },
      });

      animation.current.fromTo(
        element.current,
        { ...from },
        { ...to, duration }
      );
    }
  };

  useEffect(() => {
    if (typeof window === 'undefined') return;

    if (scrub !== false) {
      scrollTriggerAnimation();
    } else {
      simpleAnimation();
    }

    return () => {
      if (animation.current) {
        animation.current.kill();
        animation.current = null;
      }
    };
  }, [isInView, scrollTriggerAnimation, scrub, simpleAnimation]);

  return { ref: element, isInView, hasAnimated };
};

// Preset animations
export const fadeUp = {
  from: { opacity: 0, y: 50 },
  to: { opacity: 1, y: 0 },
  duration: 0.8,
};

export const fadeIn = {
  from: { opacity: 0 },
  to: { opacity: 1 },
  duration: 0.6,
};

export const slideInLeft = {
  from: { opacity: 0, x: -100 },
  to: { opacity: 1, x: 0 },
  duration: 0.8,
};

export const slideInRight = {
  from: { opacity: 0, x: 100 },
  to: { opacity: 1, x: 0 },
  duration: 0.8,
};

export const zoomIn = {
  from: { opacity: 0, scale: 0.8 },
  to: { opacity: 1, scale: 1 },
  duration: 0.8,
};

export const rotateIn = {
  from: { opacity: 0, rotation: -5, scale: 0.9 },
  to: { opacity: 1, rotation: 0, scale: 1 },
  duration: 1,
};

export const bounceIn = {
  from: { opacity: 0, scale: 0.3 },
  to: { opacity: 1, scale: 1, ease: "elastic.out(1, 0.3)" },
  duration: 1.2,
}; 