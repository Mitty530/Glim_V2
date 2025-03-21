declare module 'lenis' {
  export interface LenisOptions {
    duration?: number;
    easing?: (t: number) => number;
    smooth?: boolean;
    smoothTouch?: boolean;
    touchMultiplier?: number;
    [key: string]: any; // Allow any other properties
  }

  export default class Lenis {
    constructor(options?: LenisOptions);
    raf(time: number): void;
    destroy(): void;
    on(event: string, callback: (e: any) => void): void;
    scrollTo(target: string | HTMLElement, options?: any): void;
  }
} 