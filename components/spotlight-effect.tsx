"use client"

import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"

interface SpotlightProps {
  children: React.ReactNode
  className?: string
  size?: number
  intensity?: 'low' | 'medium' | 'high'
}

export function SpotlightEffect({ 
  children, 
  className = "", 
  size = 300,
  intensity = 'medium'
}: SpotlightProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isVisible, setIsVisible] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  // Set intensity level with increased values
  const intensityMap = {
    low: 0.2,
    medium: 0.35,
    high: 0.5
  }
  
  const intensityValue = intensityMap[intensity]

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect()
        const x = e.clientX - rect.left
        const y = e.clientY - rect.top
        setMousePosition({ x, y })
      }
    }

    const handleMouseEnter = () => {
      setIsVisible(true)
    }

    const handleMouseLeave = () => {
      setIsVisible(false)
    }

    const container = containerRef.current
    if (container) {
      container.addEventListener('mousemove', handleMouseMove)
      container.addEventListener('mouseenter', handleMouseEnter)
      container.addEventListener('mouseleave', handleMouseLeave)
      
      return () => {
        container.removeEventListener('mousemove', handleMouseMove)
        container.removeEventListener('mouseenter', handleMouseEnter)
        container.removeEventListener('mouseleave', handleMouseLeave)
      }
    }
  }, [])

  return (
    <div ref={containerRef} className={`relative overflow-hidden ${className}`}>
      <motion.div 
        className="pointer-events-none absolute -inset-px z-30 opacity-0"
        initial={{ opacity: 0 }}
        animate={{
          opacity: isVisible ? intensityValue : 0,
          transition: { duration: 0.2 }
        }}
        style={{
          background: `radial-gradient(${size}px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(255, 107, 0, 0.35), transparent 70%)`,
          pointerEvents: 'none',
        }}
      />
      {children}
    </div>
  )
} 