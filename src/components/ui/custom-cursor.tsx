'use client'

import React, { useRef, useState, useEffect } from 'react'
import { motion } from 'framer-motion'

const CustomCursor: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [visible, setVisible] = useState(false)
  const [active, setActive] = useState(false)
  const [isPointerHover, setIsPointerHover] = useState(false)
  
  // Check if device is mobile
  const isMobile = () => {
    if (typeof window !== 'undefined') {
      return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      ) || window.innerWidth <= 768;
    }
    return false;
  };

  useEffect(() => {
    if (isMobile()) return;

    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setVisible(true);
    };

    const handleMouseDown = () => {
      setActive(true);
    };

    const handleMouseUp = () => {
      setActive(false);
    };

    const handleMouseEnter = () => {
      setVisible(true);
    };

    const handleMouseLeave = () => {
      setVisible(false);
    };

    // Check for hover over buttons and links
    const handleElementHover = () => {
      const elements = document.querySelectorAll('a, button, [role="button"], .cursor-pointer');
      
      elements.forEach(el => {
        el.addEventListener('mouseenter', () => {
          setIsPointerHover(true);
        });
        
        el.addEventListener('mouseleave', () => {
          setIsPointerHover(false);
        });
      });
    };

    // Add event listeners
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);
    
    handleElementHover();

    // Remove event listeners on cleanup
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
      
      const elements = document.querySelectorAll('a, button, [role="button"], .cursor-pointer');
      elements.forEach(el => {
        el.removeEventListener('mouseenter', () => setIsPointerHover(true));
        el.removeEventListener('mouseleave', () => setIsPointerHover(false));
      });
    };
  }, []);

  // Don't render on mobile
  if (typeof window !== 'undefined' && isMobile()) {
    return null;
  }

  return (
    <motion.div
      ref={cursorRef}
      className={`custom-cursor ${visible ? 'visible' : ''} ${active ? 'active' : ''} ${isPointerHover ? 'cursor-pointer-style' : ''}`}
      animate={{
        x: position.x,
        y: position.y,
        opacity: visible ? 1 : 0,
        scale: active ? 0.8 : isPointerHover ? 1.5 : 1,
        backgroundColor: isPointerHover ? 'rgba(16, 185, 129, 0.15)' : 'rgba(16, 185, 129, 0.1)',
        boxShadow: isPointerHover ? '0 0 20px 5px rgba(16, 185, 129, 0.25)' : '0 0 15px 2px rgba(16, 185, 129, 0.15)',
        borderColor: 'rgba(16, 185, 129, 0.5)',
        borderWidth: isPointerHover ? '2px' : '1px',
      }}
      transition={{
        duration: 0.15,
        ease: [0.16, 1, 0.3, 1],
      }}
    />
  )
}

export default CustomCursor 