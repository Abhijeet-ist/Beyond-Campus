"use client"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface AlumniProfile {
  id: string
  name: string
  graduation: string
  role: string
  company: string
  image: string
  quote: string
}

const ALUMNI_DATA: AlumniProfile[] = [
  {
    id: "1",
    name: "Sarah Johnson",
    graduation: "Class of 2015",
    role: "Senior Product Manager",
    company: "Google",
    image: "/placeholder.svg?height=400&width=400",
    quote: "The connections I made during my time at university continue to shape my career path today.",
  },
  {
    id: "2",
    name: "Michael Chen",
    graduation: "Class of 2012",
    role: "Chief Technology Officer",
    company: "TechStart Inc.",
    image: "/placeholder.svg?height=400&width=400",
    quote: "My university experience gave me the foundation to build innovative solutions that impact millions.",
  },
  {
    id: "3",
    name: "Priya Patel",
    graduation: "Class of 2018",
    role: "Environmental Scientist",
    company: "Global Climate Initiative",
    image: "/placeholder.svg?height=400&width=400",
    quote: "The research opportunities I had as a student directly led to my work in climate policy today.",
  },
  {
    id: "4",
    name: "James Wilson",
    graduation: "Class of 2010",
    role: "Neurosurgeon",
    company: "Memorial Hospital",
    image: "/placeholder.svg?height=400&width=400",
    quote: "The mentorship I received from faculty members inspired me to pursue a career in medicine.",
  },
  {
    id: "5",
    name: "Elena Rodriguez",
    graduation: "Class of 2016",
    role: "Creative Director",
    company: "Design Studio NYC",
    image: "/placeholder.svg?height=400&width=400",
    quote: "The collaborative projects in my program taught me how to lead creative teams effectively.",
  },
]

interface AlumniSpotlightProps {
  className?: string
}

export function AlumniSpotlight({ className }: AlumniSpotlightProps) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const nextSlide = () => {
    setActiveIndex((prev) => (prev + 1) % ALUMNI_DATA.length)
  }

  const prevSlide = () => {
    setActiveIndex((prev) => (prev - 1 + ALUMNI_DATA.length) % ALUMNI_DATA.length)
  }

  useEffect(() => {
    if (isPaused) return

    const interval = setInterval(() => {
      nextSlide()
    }, 5000)

    return () => clearInterval(interval)
  }, [isPaused])

  return (
    <div
      className={cn("relative", className)}
      ref={containerRef}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="overflow-hidden">
        <div
          className="flex transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${activeIndex * 100}%)` }}
        >
          {ALUMNI_DATA.map((alumni) => (
            <div key={alumni.id} className="min-w-full px-4">
              <div className="glass-pane rounded-xl p-6 md:p-8 flex flex-col md:flex-row gap-6 md:gap-10 items-center">
                <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden flex-shrink-0">
                  <Image src={alumni.image || "/placeholder.svg"} alt={alumni.name} fill className="object-cover" />
                </div>
                <div className="flex flex-col text-center md:text-left">
                  <blockquote className="text-lg md:text-xl italic mb-4">"{alumni.quote}"</blockquote>
                  <div>
                    <h3 className="font-heading text-xl font-bold">{alumni.name}</h3>
                    <p className="text-muted-foreground">
                      {alumni.role} at {alumni.company}
                    </p>
                    <p className="text-sm text-primary">{alumni.graduation}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-center mt-6 gap-2">
        {ALUMNI_DATA.map((_, index) => (
          <button
            key={index}
            className={cn(
              "w-2.5 h-2.5 rounded-full transition-all",
              index === activeIndex ? "bg-primary w-6" : "bg-muted",
            )}
            onClick={() => setActiveIndex(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      <Button
        variant="ghost"
        size="icon"
        className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-background/50 backdrop-blur-sm"
        onClick={prevSlide}
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-5 w-5" />
      </Button>

      <Button
        variant="ghost"
        size="icon"
        className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-background/50 backdrop-blur-sm"
        onClick={nextSlide}
        aria-label="Next slide"
      >
        <ChevronRight className="h-5 w-5" />
      </Button>
    </div>
  )
}

