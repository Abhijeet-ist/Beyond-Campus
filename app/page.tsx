"use client"


import { useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion, useScroll, useTransform } from "framer-motion"
import { ArrowRight, Calendar, MapPin, Users } from "lucide-react"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ParticleBackground } from "@/components/particle-background"
import { TextReveal } from "@/components/text-reveal"
import { CountdownTimer } from "@/components/countdown-timer"
import { MagneticButton } from "@/components/magnetic-button"
import { AlumniSpotlight } from "@/components/alumni-spotlight"
import { SpotlightEffect } from "@/components/spotlight-effect"
import { cn } from "@/lib/utils"
import { useEffect, useState } from "react"

export default function Home() {
  const targetRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "40%"])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  // Set homecoming date to 3 months from now
  const homecomingDate = new Date()
  homecomingDate.setMonth(homecomingDate.getMonth() + 3)

  return (
    <>
      <ParticleBackground />
      <Navbar />

      <main className="relative">
        {/* Hero Section */}
        <SpotlightEffect size={400} intensity="medium" className="w-full">
          <section
            ref={targetRef}
            className="relative min-h-screen flex items-center justify-center overflow-hidden gradient-hero"
          >
            <motion.div className="absolute inset-0 z-0" style={{ y, opacity }} />

            <div className="container relative z-10 pt-20 pb-16 md:py-24 lg:py-32">
              <div className="max-w-4xl mx-auto text-center">
                  <motion.div 
                  initial={{ opacity: 0, y: 20 }} 
                  animate={{ opacity: 1, y: 0 }} 
                  transition={{ duration: 0.5 }}
                  >
                  <span className="inline-block px-6 py-2.5 mb-8 rounded-full text-sm font-semibold uppercase tracking-wider bg-gradient-to-r from-primary/40 to-primary/70 text-white border border-primary/50 shadow-glow backdrop-blur-sm">
                    Alumni Homecoming 2025
                  </span>
                  </motion.div>

                  <TextReveal
                  text="Reconnect, Reminisce, and Celebrate Your Legacy"
                  className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-6 text-center"
                  delay={0.2}
                  />

                <motion.p
                  className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6, duration: 0.5 }}
                >
                  Join fellow alumni for an unforgettable weekend of nostalgia, networking, and new memories at our
                  exclusive homecoming celebration.
                </motion.p>

                <motion.div
                  className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8, duration: 0.5 }}
                >
                  <MagneticButton className="gradient-primary text-white px-8 py-3 rounded-full">
                    <Link href="/register" className="flex items-center gap-2">
                      Register Now <ArrowRight className="h-4 w-4" />
                    </Link>
                  </MagneticButton>

                  <MagneticButton className="glass-pane px-8 py-3 rounded-full">
                    <Link href="/events">View Schedule</Link>
                  </MagneticButton>
                </motion.div>

                  <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1, duration: 0.5 }}
                  >
                  <h2 className="text-xl md:text-2xl font-heading font-bold mb-6">Homecoming Countdown</h2>
                  <CountdownTimer targetDate={new Date("2025-04-10")} />
                  </motion.div>
              </div>
            </div>
          </section>
        </SpotlightEffect>

        {/* Event Highlights */}
        <SpotlightEffect size={350} intensity="medium" className="w-full">
          <section className="py-16 md:py-24 lg:py-32">
            <div className="container">
              <div className="text-center mb-12 md:mb-16">
                <span className="inline-block px-4 py-1.5 mb-4 rounded-full text-xs font-medium uppercase tracking-wider bg-primary/10 text-primary">
                  What to Expect
                </span>
                <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">Event Highlights</h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  From nostalgic campus tours to exclusive networking opportunities, our homecoming weekend is packed with
                  memorable experiences.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {[
                  {
                    title: "Alumni Homecoming 2023",
                    description: "The event emphasized the enduring bonds between alumni and LPU, showcasing the university's role in shaping successful careers across diverse fields",
                    icon: <Users className="h-6 w-6" />,
                    date: "March 25, 2023",
                    location: "Shanti Devi Mittal Auditorium",
                  },
                  {
                    title: "Alumni Homecoming 2024",
                    description: "The event concluded with an Alumni Tree Plantation Drive at Uniplaza, symbolizing the deep-rooted connection between alumni and LPU.",
                    icon: <MapPin className="h-6 w-6" />,
                    date: "April 2024",
                    location: "Shanti Devi Mittal Auditorium",
                  },
                  {
                    title: "Alumni Homecoming 2025",
                    description: "LPU continues to host alumni-centric activities such as virtual meets for various schools and chapters worldwide. The next major Alumni Homecoming is scheduled for April 2025",
                    icon: <Calendar className="h-6 w-6" />,
                    date: "April 10, 2025",
                    location: "Shanti Devi Mittal Auditorium",
                  },
                ].map((event, index) => (
                  <Card key={index} className="overflow-hidden border-none glass-pane">
                    <CardContent className="p-6">
                      <div className="w-12 h-12 rounded-full gradient-primary flex items-center justify-center mb-4">
                        {event.icon}
                      </div>
                      <h3 className="text-xl font-heading font-bold mb-2">{event.title}</h3>
                      <p className="text-muted-foreground mb-4">{event.description}</p>
                      <div className="flex flex-col gap-2 text-sm">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-primary" />
                          <span>{event.date}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-primary" />
                          <span>{event.location}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="text-center mt-10">
                <Button asChild variant="outline" className="rounded-full">
                  <Link href="/events">
                    View Full Schedule <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </section>
        </SpotlightEffect>

        {/* Alumni Spotlight */}
        <SpotlightEffect size={350} intensity="medium" className="w-full">
          <section className="py-16 md:py-24 lg:py-32 bg-muted">
            <div className="container">
              <div className="text-center mb-12 md:mb-16">
                <span className="inline-block px-4 py-1.5 mb-4 rounded-full text-xs font-medium uppercase tracking-wider bg-primary/10 text-primary">
                  Alumni Stories
                </span>
                <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">Alumni Spotlight</h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Hear from distinguished alumni about their journey since graduation and the impact of their university
                  experience.
                </p>
              </div>

              <AlumniSpotlight />

              <div className="text-center mt-10">
                <Button asChild variant="outline" className="rounded-full">
                  <Link href="/directory">
                    Explore Alumni Directory <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </section>
        </SpotlightEffect>

        {/* Registration CTA */}
        {/* <section className="py-16 md:py-24 lg:py-32 relative overflow-hidden">
          <div className="absolute inset-0 z-0 gradient-primary opacity-10" />

          <div className="container relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <span className="inline-block px-4 py-1.5 mb-4 rounded-full text-xs font-medium uppercase tracking-wider bg-primary/20 text-primary">
          Limited Spots Available
              </span>
              <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">Secure Your Place at Homecoming 2025</h2>
              <p className="text-muted-foreground mb-8">
          Registration includes access to all events, exclusive alumni merchandise, and special campus privileges
          during the homecoming weekend.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {[
            {
              title: "Early Bird",
              price: "$149",
              description: "Available until June 30",
              features: ["All Events Access", "Welcome Package", "Digital Memories Book"],
            },
            {
              title: "Standard",
              price: "$199",
              description: "Available until September 15",
              features: ["All Events Access", "Welcome Package", "Digital Memories Book", "Campus Tour"],
            },
            {
              title: "Premium",
              price: "$299",
              description: "Limited availability",
              features: [
                "All Events Access",
                "Deluxe Welcome Package",
                "Printed Memories Book",
                "VIP Campus Tour",
                "Reserved Gala Seating",
              ],
            },
          ].map((tier, index) => (
            <Card
              key={index}
              className={cn(
                "overflow-hidden border-none",
                index === 1 ? "gradient-primary text-white" : "glass-pane",
              )}
            >
              <CardContent className="p-6">
                <h3 className="text-xl font-heading font-bold mb-1">{tier.title}</h3>
                <div className="flex items-end gap-1 mb-2">
            <span className="text-3xl font-bold">{tier.price}</span>
            <span className="text-sm text-muted-foreground mb-1">per person</span>
                </div>
                <p className="text-sm mb-4">{tier.description}</p>
                <ul className="space-y-2 mb-6">
            {tier.features.map((feature, i) => (
              <li key={i} className="flex items-center gap-2 text-sm">
                <svg
                  className="h-4 w-4 flex-shrink-0"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
              d="M5 13L9 17L19 7"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
                  />
                </svg>
                {feature}
              </li>
            ))}
                </ul>
                <Button
            asChild
            className={cn(
              "w-full rounded-full",
              index === 1 ? "bg-white text-primary hover:bg-white/90" : "gradient-primary",
            )}
                >
            <Link href="/register">Register Now</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
              </div>

              <p className="text-sm text-muted-foreground">
          Need help with registration?{" "}
          <Link href="/contact" className="text-primary underline">
            Contact our alumni team
          </Link>
              </p>
            </div>
          </div>
        </section> */}

        {/* Photo Gallery Preview */}
        <section className="py-16 md:py-24 lg:py-32">
          <div className="container">
            <div className="text-center mb-12 md:mb-16">
              <span className="inline-block px-4 py-1.5 mb-4 rounded-full text-xs font-medium uppercase tracking-wider bg-primary/10 text-primary">
          Memories
              </span>
              <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">Previous Homecomings</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
          Take a look at the wonderful moments from our past homecoming celebrations.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[...Array(6)].map((_, index) => (
          <div
            key={index}
            className={cn(
              "relative overflow-hidden rounded-lg",
              index === 0 || index === 3 ? "md:col-span-2 md:row-span-2" : "",
            )}
          >
            <Image
              src={`/placeholder.svg?height=${index === 0 || index === 3 ? 600 : 300}&width=${index === 0 || index === 3 ? 600 : 300}`}
              alt={`Gallery image ${index + 1}`}
              width={index === 0 || index === 3 ? 600 : 300}
              height={index === 0 || index === 3 ? 600 : 300}
              className="w-full h-full object-cover aspect-square transition-transform duration-500 hover:scale-110"
            />
          </div>
              ))}
            </div>

            <div className="text-center mt-10">
              <Button asChild variant="outline" className="rounded-full">
          <Link href="/gallery">
            View Full Gallery <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}

