"use client"

import type React from "react"

import { useState, useRef } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { X, ChevronLeft, ChevronRight, Download, ZoomIn, ZoomOut } from "lucide-react"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"

interface GalleryImage {
  id: string
  src: string
  alt: string
  category: "campus" | "events" | "alumni" | "sports"
  year: string
  caption?: string
  metadata?: {
    date: string
    location?: string
    photographer?: string
  }
}

// Mock data for gallery images
const GALLERY_DATA: GalleryImage[] = [
  {
    id: "1",
    src: "/placeholder.svg?height=800&width=1200",
    alt: "Alumni Hall Reception",
    category: "events",
    year: "2024",
    caption: "Alumni networking at the Welcome Reception",
    metadata: {
      date: "October 15, 2024",
      location: "Alumni Hall",
      photographer: "John Smith",
    },
  },
  {
    id: "2",
    src: "/placeholder.svg?height=800&width=1200",
    alt: "Campus Quad",
    category: "campus",
    year: "2024",
    caption: "Autumn on the main quad",
    metadata: {
      date: "October 16, 2024",
      location: "Main Quad",
    },
  },
  {
    id: "3",
    src: "/placeholder.svg?height=800&width=1200",
    alt: "Distinguished Alumni Panel",
    category: "events",
    year: "2024",
    caption: "Panel discussion with industry leaders",
    metadata: {
      date: "October 16, 2024",
      location: "University Auditorium",
      photographer: "Jane Doe",
    },
  },
  {
    id: "4",
    src: "/placeholder.svg?height=800&width=1200",
    alt: "Alumni Group Photo",
    category: "alumni",
    year: "2024",
    caption: "Class of 2010 reunion",
    metadata: {
      date: "October 17, 2024",
      location: "Alumni Center",
    },
  },
  {
    id: "5",
    src: "/placeholder.svg?height=800&width=1200",
    alt: "Homecoming Game",
    category: "sports",
    year: "2024",
    caption: "Winning touchdown at the homecoming game",
    metadata: {
      date: "October 17, 2024",
      location: "University Stadium",
      photographer: "Sports Media Team",
    },
  },
  {
    id: "6",
    src: "/placeholder.svg?height=800&width=1200",
    alt: "Gala Dinner",
    category: "events",
    year: "2024",
    caption: "Annual Alumni Gala Dinner",
    metadata: {
      date: "October 16, 2024",
      location: "Grand Ballroom",
      photographer: "Event Photography Inc.",
    },
  },
  {
    id: "7",
    src: "/placeholder.svg?height=800&width=1200",
    alt: "Science Building",
    category: "campus",
    year: "2024",
    caption: "The new Science Complex",
    metadata: {
      date: "October 16, 2024",
      location: "North Campus",
    },
  },
  {
    id: "8",
    src: "/placeholder.svg?height=800&width=1200",
    alt: "Alumni Award Ceremony",
    category: "alumni",
    year: "2024",
    caption: "Distinguished Alumni Award presentation",
    metadata: {
      date: "October 16, 2024",
      location: "Alumni Center",
      photographer: "University Media",
    },
  },
  {
    id: "9",
    src: "/placeholder.svg?height=800&width=1200",
    alt: "Campus Tour",
    category: "campus",
    year: "2023",
    caption: "Alumni exploring the renovated library",
    metadata: {
      date: "October 15, 2023",
      location: "University Library",
    },
  },
  {
    id: "10",
    src: "/placeholder.svg?height=800&width=1200",
    alt: "Homecoming Parade",
    category: "events",
    year: "2023",
    caption: "Annual homecoming parade down University Avenue",
    metadata: {
      date: "October 14, 2023",
      location: "University Avenue",
      photographer: "City News",
    },
  },
  {
    id: "11",
    src: "/placeholder.svg?height=800&width=1200",
    alt: "Alumni Basketball Game",
    category: "sports",
    year: "2023",
    caption: "Alumni vs. Faculty basketball game",
    metadata: {
      date: "October 15, 2023",
      location: "Sports Complex",
      photographer: "Athletics Department",
    },
  },
  {
    id: "12",
    src: "/placeholder.svg?height=800&width=1200",
    alt: "Class Reunion",
    category: "alumni",
    year: "2023",
    caption: "Class of 2000 25-year reunion",
    metadata: {
      date: "October 14, 2023",
      location: "Alumni Center",
    },
  },
]

export default function GalleryPage() {
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null)
  const [activeCategory, setActiveCategory] = useState("all")
  const [activeYear, setActiveYear] = useState("all")
  const [zoomLevel, setZoomLevel] = useState(1)
  const lightboxRef = useRef<HTMLDivElement>(null)

  const years = [...new Set(GALLERY_DATA.map((img) => img.year))].sort((a, b) => Number(b) - Number(a))

  const filteredImages = GALLERY_DATA.filter((img) => {
    if (activeCategory !== "all" && img.category !== activeCategory) return false
    if (activeYear !== "all" && img.year !== activeYear) return false
    return true
  })

  const handleImageClick = (image: GalleryImage) => {
    setSelectedImage(image)
    setZoomLevel(1)
    document.body.style.overflow = "hidden"
  }

  const closeLightbox = () => {
    setSelectedImage(null)
    document.body.style.overflow = "auto"
  }

  const navigateImages = (direction: "next" | "prev") => {
    if (!selectedImage) return

    const currentIndex = filteredImages.findIndex((img) => img.id === selectedImage.id)
    let newIndex

    if (direction === "next") {
      newIndex = (currentIndex + 1) % filteredImages.length
    } else {
      newIndex = (currentIndex - 1 + filteredImages.length) % filteredImages.length
    }

    setSelectedImage(filteredImages[newIndex])
    setZoomLevel(1)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      closeLightbox()
    } else if (e.key === "ArrowRight") {
      navigateImages("next")
    } else if (e.key === "ArrowLeft") {
      navigateImages("prev")
    }
  }

  const zoomIn = () => {
    setZoomLevel((prev) => Math.min(prev + 0.5, 3))
  }

  const zoomOut = () => {
    setZoomLevel((prev) => Math.max(prev - 0.5, 1))
  }

  return (
    <>
      <Navbar />

      <main className="pt-24 pb-16">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-heading font-bold mb-4">Media Gallery</h1>
            <p className="text-muted-foreground">
              Browse photos from past homecoming events, campus tours, and alumni gatherings.
            </p>
          </div>

          <div className="mb-8">
            <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
              <Tabs defaultValue="all" onValueChange={setActiveCategory}>
                <TabsList>
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="events">Events</TabsTrigger>
                  <TabsTrigger value="campus">Campus</TabsTrigger>
                  <TabsTrigger value="alumni">Alumni</TabsTrigger>
                  <TabsTrigger value="sports">Sports</TabsTrigger>
                </TabsList>
              </Tabs>

              <Tabs defaultValue="all" onValueChange={setActiveYear}>
                <TabsList>
                  <TabsTrigger value="all">All Years</TabsTrigger>
                  {years.map((year) => (
                    <TabsTrigger key={year} value={year}>
                      {year}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </Tabs>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredImages.map((image) => (
              <motion.div
                key={image.id}
                layoutId={`image-${image.id}`}
                className="relative aspect-square overflow-hidden rounded-lg cursor-pointer group"
                onClick={() => handleImageClick(image)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Image
                  src={image.src || "/placeholder.svg"}
                  alt={image.alt}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                  <p className="text-white text-sm font-medium">{image.caption}</p>
                  <p className="text-white/70 text-xs">{image.metadata?.date}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {filteredImages.length === 0 && (
            <div className="text-center py-12">
              <h3 className="text-lg font-medium mb-2">No images found</h3>
              <p className="text-muted-foreground mb-4">Try selecting a different category or year</p>
              <Button
                onClick={() => {
                  setActiveCategory("all")
                  setActiveYear("all")
                }}
              >
                Reset Filters
              </Button>
            </div>
          )}
        </div>
      </main>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-background/95 backdrop-blur-sm flex items-center justify-center"
            onClick={closeLightbox}
            onKeyDown={handleKeyDown}
            tabIndex={0}
            ref={lightboxRef}
          >
            <div className="absolute top-4 right-4 z-10 flex gap-2" onClick={(e) => e.stopPropagation()}>
              <Button variant="outline" size="icon" onClick={zoomOut} disabled={zoomLevel <= 1}>
                <ZoomOut className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" onClick={zoomIn} disabled={zoomLevel >= 3}>
                <ZoomIn className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" asChild>
                <a href={selectedImage.src} download target="_blank" rel="noopener noreferrer">
                  <Download className="h-4 w-4" />
                </a>
              </Button>
              <Button variant="outline" size="icon" onClick={closeLightbox}>
                <X className="h-4 w-4" />
              </Button>
            </div>

            <Button
              variant="outline"
              size="icon"
              className="absolute left-4 top-1/2 -translate-y-1/2 z-10 rounded-full"
              onClick={(e) => {
                e.stopPropagation()
                navigateImages("prev")
              }}
            >
              <ChevronLeft className="h-6 w-6" />
            </Button>

            <Button
              variant="outline"
              size="icon"
              className="absolute right-4 top-1/2 -translate-y-1/2 z-10 rounded-full"
              onClick={(e) => {
                e.stopPropagation()
                navigateImages("next")
              }}
            >
              <ChevronRight className="h-6 w-6" />
            </Button>

            <div
              className="relative w-full h-full flex items-center justify-center overflow-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div
                className={cn(
                  "relative transition-transform duration-300",
                  zoomLevel > 1 ? "cursor-move" : "cursor-zoom-in",
                )}
                style={{ transform: `scale(${zoomLevel})` }}
              >
                <Image
                  src={selectedImage.src || "/placeholder.svg"}
                  alt={selectedImage.alt}
                  width={1200}
                  height={800}
                  className="max-h-[80vh] w-auto object-contain"
                />
              </div>
            </div>

            <div
              className="absolute bottom-0 left-0 right-0 bg-background/80 backdrop-blur-sm p-4 text-center"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-lg font-heading font-semibold mb-1">{selectedImage.caption}</h3>
              <div className="flex flex-wrap justify-center gap-x-6 gap-y-1 text-sm text-muted-foreground">
                {selectedImage.metadata?.date && <span>{selectedImage.metadata.date}</span>}
                {selectedImage.metadata?.location && <span>{selectedImage.metadata.location}</span>}
                {selectedImage.metadata?.photographer && <span>Photo by: {selectedImage.metadata.photographer}</span>}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </>
  )
}

