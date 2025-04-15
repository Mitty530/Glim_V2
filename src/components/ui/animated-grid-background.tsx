'use client'

import React, { useEffect, useRef } from 'react'

interface AnimatedGridBackgroundProps {
  color?: string;
  opacity?: number;
  density?: number;
  speed?: number;
  rounded?: boolean;
}

const AnimatedGridBackground: React.FC<AnimatedGridBackgroundProps> = ({ 
  color = 'rgba(255,255,255,0.25)',
  opacity = 0.15,
  density = 30,
  speed = 0.5,
  rounded = false
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const contextRef = useRef<CanvasRenderingContext2D | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return
    
    contextRef.current = ctx
    
    // Set canvas dimensions to match window
    const resizeCanvas = () => {
      const { innerWidth, innerHeight } = window
      const dpr = window.devicePixelRatio || 1
      
      canvas.width = innerWidth * dpr
      canvas.height = innerHeight * dpr
      
      canvas.style.width = `${innerWidth}px`
      canvas.style.height = `${innerHeight}px`
      
      ctx.scale(dpr, dpr)
      
      // Clear canvas on resize
      ctx.clearRect(0, 0, canvas.width, canvas.height)
    }

    // Initial resize
    resizeCanvas()
    
    // Handle window resize
    window.addEventListener('resize', resizeCanvas)
    
    // Grid properties
    const gridSpacing = Math.max(10, Math.min(40, Math.floor(window.innerWidth / density)))
    const gridSize = {
      width: Math.ceil(window.innerWidth / gridSpacing) + 1,
      height: Math.ceil(window.innerHeight / gridSpacing) + 1
    }
    
    // Points for grid animation
    const points: { x: number; y: number; originalX: number; originalY: number; vx: number; vy: number }[] = []
    
    // Initialize grid points
    for (let x = 0; x < gridSize.width; x++) {
      for (let y = 0; y < gridSize.height; y++) {
        const posX = x * gridSpacing
        const posY = y * gridSpacing
        
        points.push({
          x: posX,
          y: posY,
          originalX: posX,
          originalY: posY,
          vx: (Math.random() - 0.5) * speed,
          vy: (Math.random() - 0.5) * speed
        })
      }
    }
    
    // Animation function
    let animationId: number
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      // Update point positions
      points.forEach(point => {
        // Apply movement
        point.x += point.vx
        point.y += point.vy
        
        // Elastic return to original position
        const dx = point.originalX - point.x
        const dy = point.originalY - point.y
        
        point.vx += dx * 0.01
        point.vy += dy * 0.01
        
        // Dampen velocity
        point.vx *= 0.985
        point.vy *= 0.985
        
        // Add subtle randomness
        if (Math.random() > 0.98) {
          point.vx += (Math.random() - 0.5) * 0.5
          point.vy += (Math.random() - 0.5) * 0.5
        }
      })
      
      // Draw grid connections with circles at points
      if (rounded) {
        // Draw circles at each point
        points.forEach(point => {
          ctx.beginPath();
          ctx.arc(point.x, point.y, 2, 0, Math.PI * 2);
          ctx.fillStyle = color;
          ctx.globalAlpha = opacity * 1.5;
          ctx.fill();
        });

        // Draw curved connections between points
        ctx.beginPath();
        ctx.strokeStyle = color;
        ctx.globalAlpha = opacity * 0.7;
        ctx.lineWidth = 1;
        
        // Connect nearby points with lines
        for (let i = 0; i < points.length; i++) {
          for (let j = i + 1; j < points.length; j++) {
            const dx = points[i].x - points[j].x;
            const dy = points[i].y - points[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            // Only connect points that are close to each other
            const maxDistance = gridSpacing * 1.5;
            if (distance < maxDistance) {
              // Make the opacity proportional to the distance
              const opacity = 1 - distance / maxDistance;
              ctx.globalAlpha = opacity * 0.2;
              
              ctx.beginPath();
              ctx.moveTo(points[i].x, points[i].y);
              ctx.lineTo(points[j].x, points[j].y);
              ctx.stroke();
            }
          }
        }
      } else {
        // Draw traditional grid lines
        ctx.beginPath()
        ctx.strokeStyle = color
        ctx.globalAlpha = opacity
        ctx.lineWidth = 1.5
        
        // Draw horizontal lines
        for (let y = 0; y < gridSize.height; y++) {
          const rowStartIdx = y * gridSize.width
          
          ctx.moveTo(points[rowStartIdx].x, points[rowStartIdx].y)
          
          for (let x = 1; x < gridSize.width; x++) {
            const point = points[rowStartIdx + x]
            ctx.lineTo(point.x, point.y)
          }
        }
        
        // Draw vertical lines
        for (let x = 0; x < gridSize.width; x++) {
          ctx.moveTo(points[x].x, points[x].y)
          
          for (let y = 1; y < gridSize.height; y++) {
            const point = points[y * gridSize.width + x]
            ctx.lineTo(point.x, point.y)
          }
        }
        
        ctx.stroke()
      }
      
      ctx.globalAlpha = 1
      
      animationId = requestAnimationFrame(animate)
    }
    
    // Start animation
    animate()
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', resizeCanvas)
      cancelAnimationFrame(animationId)
    }
  }, [color, opacity, density, speed, rounded])
  
  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-10 grid-background"
      style={{ zIndex: 1 }}
      aria-hidden="true"
    />
  )
}

export default AnimatedGridBackground 