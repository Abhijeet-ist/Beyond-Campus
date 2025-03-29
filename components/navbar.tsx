"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { ModeToggle } from "@/components/mode-toggle"

const navItems = [
  { name: "Home", path: "/" },
  { name: "Alumni Directory", path: "/directory" },
  { name: "Events", path: "/events" },
  { name: "Media Gallery", path: "/gallery" },
]

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-300",
        scrolled 
          ? "bg-black/50 backdrop-blur-lg py-3" 
          : "bg-transparent py-5"
      )}
    >
      <div className="container flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <span className="font-heading text-xl md:text-2xl font-bold relative py-1 px-3 rounded-md">
            <span className="absolute inset-0 bg-gradient-primary opacity-90 rounded-md -z-10"></span>
            <span className="text-white drop-shadow-sm">Beyond Campus</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              className={cn(
          "text-base font-medium transition-colors hover:text-primary hover:scale-105",
          pathname === item.path 
            ? "text-primary font-semibold border-b-2 border-primary px-1 py-0.5" 
            : "text-foreground/80"
              )}
            >
              {item.name}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-4">
          <ModeToggle />
          <Button asChild variant="ghost" className="hover:bg-primary/10">
            <Link href="/login">Log In</Link>
          </Button>
          <Button asChild className="gradient-primary">
            <Link href="/register">Register</Link>
          </Button>
        </div>

        {/* Mobile Navigation Toggle */}
        <div className="flex md:hidden items-center gap-4">
          <ModeToggle />
          <Button variant="ghost" size="icon" onClick={() => setIsOpen(!isOpen)} aria-label="Toggle Menu">
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="md:hidden absolute top-full left-0 right-0 bg-black/60 backdrop-blur-md border-b"
          >
            <div className="container py-4 flex flex-col gap-4">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  href={item.path}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "text-sm font-medium transition-colors hover:text-primary py-2",
                    pathname === item.path ? "text-primary" : "text-muted-foreground",
                  )}
                >
                  {item.name}
                </Link>
              ))}
              <div className="flex flex-col gap-2 pt-2 border-t">
                <Button asChild variant="ghost" className="justify-start">
                  <Link href="/login">Log In</Link>
                </Button>
                <Button asChild className="gradient-primary justify-start">
                  <Link href="/register">Register</Link>
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
