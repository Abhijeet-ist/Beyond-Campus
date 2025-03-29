"use client"

import { useRef, useEffect } from "react"
import { useTheme } from "next-themes"

interface Particle {
  x: number
  y: number
  size: number
  speedX: number
  speedY: number
  color: string
}

export function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { resolvedTheme } = useTheme()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animationFrameId: number
    let particles: Particle[] = []
    let mouseX = 0
    let mouseY = 0
    let isMouseMoving = false

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      initParticles()
    }

    const initParticles = () => {
      particles = []
      const particleCount = Math.min(Math.floor(window.innerWidth * 0.05), 100)

      for (let i = 0; i < particleCount; i++) {
        const size = Math.random() * 2 + 1
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size,
          speedX: (Math.random() - 0.5) * 0.5,
          speedY: (Math.random() - 0.5) * 0.5,
          color:
            resolvedTheme === "dark"
              ? `rgba(255, ${Math.floor(Math.random() * 100) + 107}, 0, ${Math.random() * 0.5 + 0.1})`
              : `rgba(255, ${Math.floor(Math.random() * 100) + 107}, 0, ${Math.random() * 0.3 + 0.05})`,
        })
      }
    }

    const drawParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particles.forEach((particle, i) => {
        // Update position
        particle.x += particle.speedX
        particle.y += particle.speedY

        // Boundary check
        if (particle.x < 0 || particle.x > canvas.width) particle.speedX *= -1
        if (particle.y < 0 || particle.y > canvas.height) particle.speedY *= -1

        // Draw particle
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fillStyle = particle.color
        ctx.fill()

        // Connect particles
        connectParticles(particle, i)

        // Mouse interaction
        if (isMouseMoving) {
          const dx = mouseX - particle.x
          const dy = mouseY - particle.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 100) {
            const angle = Math.atan2(dy, dx)
            const force = (100 - distance) / 1500

            particle.speedX += Math.cos(angle) * force
            particle.speedY += Math.sin(angle) * force

            // Limit speed
            const speed = Math.sqrt(particle.speedX * particle.speedX + particle.speedY * particle.speedY)
            if (speed > 2) {
              particle.speedX = (particle.speedX / speed) * 2
              particle.speedY = (particle.speedY / speed) * 2
            }
          }
        }
      })

      animationFrameId = requestAnimationFrame(drawParticles)
    }

    const connectParticles = (particle: Particle, index: number) => {
      for (let i = index + 1; i < particles.length; i++) {
        const otherParticle = particles[i]
        const dx = particle.x - otherParticle.x
        const dy = particle.y - otherParticle.y
        const distance = Math.sqrt(dx * dx + dy * dy)

        if (distance < 150) {
          ctx.beginPath()
          ctx.strokeStyle = `rgba(255, 107, 0, ${0.1 * (1 - distance / 150)})`
          ctx.lineWidth = 0.5
          ctx.moveTo(particle.x, particle.y)
          ctx.lineTo(otherParticle.x, otherParticle.y)
          ctx.stroke()
        }
      }
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY
      isMouseMoving = true

      // Reset mouse moving state after a delay
      setTimeout(() => {
        isMouseMoving = false
      }, 100)
    }

    // Initialize
    resizeCanvas()
    drawParticles()

    // Event listeners
    window.addEventListener("resize", resizeCanvas)
    window.addEventListener("mousemove", handleMouseMove)

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      window.removeEventListener("mousemove", handleMouseMove)
      cancelAnimationFrame(animationFrameId)
    }
  }, [resolvedTheme])

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0" />
}

