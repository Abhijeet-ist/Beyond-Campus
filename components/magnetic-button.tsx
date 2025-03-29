"use client"

import type React from "react"

import { useState, useRef } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface MagneticButtonProps {
  children: React.ReactNode
  className?: string
  onClick?: () => void
}

export function MagneticButton({ children, className, onClick }: MagneticButtonProps) {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)
  const ref = useRef<HTMLButtonElement>(null)

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!ref.current) return

    const { clientX, clientY } = e
    const { left, top, width, height } = ref.current.getBoundingClientRect()

    const x = (clientX - (left + width / 2)) * 0.3
    const y = (clientY - (top + height / 2)) * 0.3

    setPosition({ x, y })
  }

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 })
    setIsHovered(false)
  }

  const handleMouseEnter = () => {
    setIsHovered(true)
  }

  const handleClick = () => {
    if (onClick) onClick()
  }

  return (
    <motion.button
      ref={ref}
      className={cn("relative overflow-hidden rounded-full font-medium transition-all", className)}
      animate={{
        x: position.x,
        y: position.y,
        scale: isHovered ? 1.05 : 1,
      }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      onClick={handleClick}
    >
      {children}
      <span className="absolute inset-0 pointer-events-none" />
    </motion.button>
  )
}

