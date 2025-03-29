"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface CountdownTimerProps {
  targetDate: Date
  className?: string
}

interface TimeLeft {
  days: number
  hours: number
  minutes: number
  seconds: number
}

export function CountdownTimer({ targetDate, className }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 })
  const [progress, setProgress] = useState(100)

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = targetDate.getTime() - new Date().getTime()
      const totalDuration = targetDate.getTime() - new Date().getTime() + 30 * 24 * 60 * 60 * 1000 // Assuming 30 days total countdown
      const progressPercent = Math.max(0, Math.min(100, (difference / totalDuration) * 100))

      setProgress(progressPercent)

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        })
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })
      }
    }

    calculateTimeLeft()
    const timer = setInterval(calculateTimeLeft, 1000)

    return () => clearInterval(timer)
  }, [targetDate])

  const timeUnits = [
    { label: "Days", value: timeLeft.days },
    { label: "Hours", value: timeLeft.hours },
    { label: "Minutes", value: timeLeft.minutes },
    { label: "Seconds", value: timeLeft.seconds },
  ]

  return (
    <div className={cn("flex flex-col items-center", className)}>
      <div className="flex flex-wrap justify-center gap-4 md:gap-6">
        {timeUnits.map((unit, index) => (
          <div key={unit.label} className="flex flex-col items-center">
            <motion.div
              className="relative w-20 h-20 md:w-24 md:h-24 flex items-center justify-center rounded-full glass-pane"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <svg className="absolute inset-0 w-full h-full -rotate-90">
                <circle cx="50%" cy="50%" r="45%" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="5%" />
                <motion.circle
                  cx="50%"
                  cy="50%"
                  r="45%"
                  fill="none"
                  stroke={`url(#gradient-primary-${unit.label})`}
                  strokeWidth="5%"
                  strokeLinecap="round"
                  strokeDasharray={`${2 * Math.PI * 45}`}
                  strokeDashoffset={`${2 * Math.PI * 45 * (1 - progress / 100)}`}
                  initial={{ strokeDashoffset: `${2 * Math.PI * 45}` }}
                  animate={{ strokeDashoffset: `${2 * Math.PI * 45 * (1 - progress / 100)}` }}
                  transition={{ duration: 1.5, ease: "easeInOut" }}
                />
                <defs>
                  <linearGradient id={`gradient-primary-${unit.label}`} x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#FF6B00" />
                    <stop offset="100%" stopColor="#FFA800" />
                  </linearGradient>
                </defs>
              </svg>
              <span className="font-heading text-2xl md:text-3xl font-bold z-10">
                {unit.value.toString().padStart(2, "0")}
              </span>
            </motion.div>
            <span className="mt-2 text-sm text-muted-foreground">{unit.label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

