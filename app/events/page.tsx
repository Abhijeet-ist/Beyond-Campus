"use client"

import { useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { Calendar, Clock, MapPin, Users, Download, Check, AlertCircle } from "lucide-react"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

interface Event {
  id: string
  title: string
  date: string
  time: string
  location: string
  description: string
  image: string
  capacity: number
  registered: number
  attendees?: string
  status: "upcoming" | "ongoing" | "past"
  category: "social" | "academic" | "networking" | "special"
}

// Mock data for events
const EVENTS_DATA: Event[] = [
  {
    id: "1",
    title: "One India-2024 Cultural Fest",
    date: "April 18, 2024​",
    time: "Throughout the Day",
    location: "Main Campus",
    description:
      "The 12th edition of 'One India' transformed the campus into a vibrant tapestry of Indian culture and heritage. Embracing the theme \"Equality, Diversity, and Inclusivity,\" over 4,000 students from various states and union territories showcased festivals, rituals, dances, and songs, fostering a spirit of unity amidst diversity. The event featured 29 exhibition stalls and a 3 km-long cultural procession.",
    image: "/LPU alumini.jpg",
    capacity: 200,
    registered: 145,
    attendees: "25,000+",
    status: "past",
    category: "social",
  },
  {
    id: "2",
    title: "Spectra 2024 – Inter-School Youth Festival",
    date: "November 11, 2024",
    time: "Week-long event",
    location: "LPU Campus​",
    description:
      "The 17th edition of 'Spectra' ignited the campus with vibrant expressions of youth talent and social consciousness. Thousands of students from over 25 disciplines participated in more than 30 competitions across music, dance, drama, visual arts, and technology. Performances addressed pressing social issues, blending art with activism and inspiring change.",
    image: "/LPU alumini.jpg",
    capacity: 100,
    registered: 78,
    status: "upcoming",
    category: "social",
  },
  {
    id: "3",
    title: "Magnitude 2024 – Intra-University Competition",
    date: "November 6, 2024",
    time: "Throughout the day",
    location: "LPU Campus",
    description:
      "Magnitude 2024' provided a platform for students to exhibit creativity and innovation across categories like Literary, Technical, Fine Arts, Cultural, and Lifestyle. The event introduced a mentorship program with eight dynamic teams and featured competitions such as Soundscape, Voice of Magnitude, and Mag Gala. The grand finale was graced by renowned singer Swati Mishra.​",
    image: "/LPU alumini.jpg",
    capacity: 150,
    registered: 132,
    status: "upcoming",
    category: "social",
  },
  {
    id: "4",
    title: "Cognitia'25 – Annual Technical Fest",
    date: "March 13, 2025",
    time: "Three-day event",
    location: "University Auditorium",
    description:
      "Cognitia'25' celebrated technical challenges and innovations, featuring 14 specialized competitions. Highlights included 'Ignition Quest' (Model Rocketry Competition) and 'Aero Rush' (Drone Racing Competition). Over 450 teams showcased engineering prowess, problem-solving skills, and creative ingenuity.​ The event fostered collaboration and networking among students, faculty, and industry experts, making it a hub of knowledge exchange and inspiration.",
    image: "/LPU alumini.jpg",
    capacity: 300,
    registered: 210,
    status: "upcoming",
    category: "academic",
  },
  {
    id: "5",
    title: "38th AIU Inter-University National Youth Festival",
    date: "March 10, 2025",
    time: "7:00 PM - 11:00 PM",
    location: "LPU Campus​",
    description:
      "LPU clinched the overall championship for the second consecutive year at this prestigious festival. The event saw participation from over 2,400 students representing 148 universities, competing in 28 events across theatre, music, literary, and fine arts categories. LPU's stellar performances earned 18 medals, including 10 golds. The festival was inaugurated by the Chief Minister of Punjab, Bhagwant Mann, and featured a grand cultural evening with performances by renowned artists.",
    image: "/LPU alumini.jpg",
    capacity: 250,
    registered: 220,
    status: "upcoming",
    category: "academic",
  },
  {
    id: "6",
    title: "Neo-International Conference on Habitable Environments (NICHE IPM-2023)",
    date: "October 19, 2023",
    time: "Two-day conference​",
    location: "Shanti Devi Mittal Auditorium, LPU",
    description:
      "The fifth edition of NICHE brought together over 25 global and national leaders in architecture from countries like the USA, UK, and Spain. The conference aimed to converge fields of planning, architecture, and design, fostering discussions on sustainable and habitable environments. The event featured keynote speeches, panel discussions, and workshops, providing a platform for knowledge exchange and collaboration among professionals and students.",
    image: "/LPU alumini.jpg",
    capacity: 120,
    registered: 85,
    status: "upcoming",
    category: "academic",
  },
  {
    id: "7",
    title: "Annual NASA Convention 2023",
    date: "June 9 to 12, 2023​",
    time: "Four-day event",
    location: "LPU Campus",
    description:
      "LPU had the honor of hosting the 65th Annual NASA (National Association of Students of Architecture) Convention, a prestigious gathering that brought together architecture students and professionals from across the nation. The convention featured a series of workshops, lectures by eminent architects, design competitions, and exhibitions, fostering a collaborative environment for innovation and learning in the field of architecture. The event aimed to inspire and empower the next generation of architects, encouraging them to explore new ideas and approaches in design and sustainability.",
    image: "/LPU alumini.jpg",
    capacity: 500,
    registered: 450,
    status: "upcoming",
    category: "networking",
  },
  {
    id: "8",
    title: "NOSPlan Convention 2025 - National Conference on Sustainable Planning",
    date: "January 10, 2025",
    time: "Three-day convention",
    location: "LPU Campus​",
    description:
      " Hosting the 26th Annual NOSPlan Convention, LPU welcomed over 600 participants from 19 top institutes. Themed Dakshatva, the convention focused on sustainability and innovation in urban development, featuring over 20 events that fostered collaboration and competition among future urban planners. The event included workshops, panel discussions, and competitions, providing a platform for students to showcase their skills and knowledge in sustainable planning. The convention aimed to inspire the next generation of planners to address pressing urban challenges and promote sustainable practices.",
    image: "/LPU alumini.jpg",
    capacity: 200,
    registered: 160,
    status: "upcoming",
    category: "networking",
  },
  {
    id: "9",
    title: "Gear Up Season-3 Hackathon",
    date: "October 1, 2024",
    time: "36-hour event​",
    location: "LPU Campus​",
    description:
      "Organized by the Department of Student Research and Projects, this hackathon aimed to inspire innovation and address societal challenges. With 250 teams participating, the event served as a precursor to the Smart India Hackathon 2024, encouraging students to develop novel solutions in categories like healthcare, sustainability, and education technology. The event featured workshops, mentorship sessions, and networking opportunities with industry experts, fostering collaboration and knowledge exchange.",
    image: "/LPU alumini.jpg",
    capacity: 200,
    registered: 160,
    status: "upcoming",
    category: "special",
  },
  {
    id: "10",
    title: "Social Responsibility & Sustainability Events ",
    date: "October 18, 2025",
    time: "10:00 AM - 12:00 PM",
    location: "University Gardens",
    description:
      "Conclude the homecoming weekend with a relaxed brunch in the beautiful University Gardens. Share memories from the weekend and exchange contact information with new and old friends before departing.",
    image: "/LPU alumini.jpg",
    capacity: 200,
    registered: 160,
    status: "upcoming",
    category: "special",
  },
]

export default function EventsPage() {
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null)
  const [isRSVPDialogOpen, setIsRSVPDialogOpen] = useState(false)
  const [rsvpSuccess, setRsvpSuccess] = useState(false)
  const [activeTab, setActiveTab] = useState("all")

  const filteredEvents = activeTab === "all" ? EVENTS_DATA : EVENTS_DATA.filter((event) => event.category === activeTab)

  const handleRSVP = () => {
    // Simulate API call
    setTimeout(() => {
      setRsvpSuccess(true)
    }, 1000)
  }

  const closeRSVPDialog = () => {
    setIsRSVPDialogOpen(false)
    // Reset after closing
    setTimeout(() => {
      setRsvpSuccess(false)
    }, 300)
  }

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  }

  return (
    <>
      <Navbar />

      <main className="pt-24 pb-16">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-heading font-bold mb-4">Homecoming Events</h1>
            <p className="text-muted-foreground">
              Explore our lineup of exciting events for the homecoming weekend. From social gatherings to academic
              panels, there's something for everyone.
            </p>
          </div>

          <Tabs defaultValue="all" className="mb-8" onValueChange={setActiveTab}>
            <div className="flex justify-center">
              <TabsList>
                <TabsTrigger value="all">All Events</TabsTrigger>
                <TabsTrigger value="social">Social</TabsTrigger>
                <TabsTrigger value="academic">Academic</TabsTrigger>
                <TabsTrigger value="networking">Networking</TabsTrigger>
                <TabsTrigger value="special">Special</TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="all" className="mt-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-heading font-semibold">All Homecoming Events</h2>
                {/* <Button variant="outline" size="sm" className="flex items-center gap-2"> */}
                  {/* <Download className="h-4 w-4" /> */}
                  
                {/* </Button> */}
              </div>

              <motion.div className="space-y-6" variants={container} initial="hidden" animate="show">
                {filteredEvents.map((event) => (
                  <motion.div key={event.id} variants={item}>
                    <Card className="overflow-hidden">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="relative h-48 md:h-full md:col-span-1">
                          <Image
                            src={event.image || "/placeholder.svg"}
                            alt={event.title}
                            fill
                            className="object-cover"
                          />
                          <Badge
                            className="absolute top-2 left-2"
                            variant={
                              event.category === "social"
                                ? "default"
                                : event.category === "academic"
                                  ? "secondary"
                                  : event.category === "networking"
                                    ? "outline"
                                    : "destructive"
                            }
                          >
                            {event.category.charAt(0).toUpperCase() + event.category.slice(1)}
                          </Badge>
                        </div>

                        <div className="p-6 md:col-span-2">
                          <div className="flex flex-col md:flex-row justify-between gap-4 mb-4">
                            <h3 className="font-heading text-xl font-bold">{event.title}</h3>
                            <div className="flex items-center gap-1 text-sm">
                              <Users className="h-4 w-4 text-muted-foreground" />
                                <span>
                                {event.registered}
                                </span>
                              <span className="text-muted-foreground ml-1">registered</span>
                            </div>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
                            <div className="flex items-center gap-2">
                              <Calendar className="h-4 w-4 text-primary flex-shrink-0" />
                              <span className="text-sm">{event.date}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Clock className="h-4 w-4 text-primary flex-shrink-0" />
                              <span className="text-sm">{event.time}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <MapPin className="h-4 w-4 text-primary flex-shrink-0" />
                              <span className="text-sm">{event.location}</span>
                            </div>
                          </div>

                          <p className="text-muted-foreground mb-6 line-clamp-2">{event.description}</p>

                          <div className="flex flex-col sm:flex-row gap-3">
                            <Button variant="outline" onClick={() => setSelectedEvent(event)} className="gradient-primary">
                              View Details
                            </Button>
                            {/* <Button
                              className="gradient-primary"
                              onClick={() => {
                                setSelectedEvent(event)
                                setIsRSVPDialogOpen(true)
                              }}
                              disabled={event.registered >= event.capacity}
                            >
                              {event.registered >= event.capacity ? "Fully Booked" : "RSVP Now"}
                            </Button> */}
                          </div>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
            </TabsContent>

            <TabsContent value="social" className="mt-6">
              <h2 className="text-xl font-heading font-semibold mb-6">Social Events</h2>
              <motion.div className="space-y-6" variants={container} initial="hidden" animate="show">
                {filteredEvents.map((event) => (
                  <motion.div key={event.id} variants={item}>
                    <Card className="overflow-hidden">
                      {/* Same card content as above */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="relative h-48 md:h-full md:col-span-1">
                          <Image
                            src={event.image || "/placeholder.svg"}
                            alt={event.title}
                            fill
                            className="object-cover"
                          />
                          <Badge className="absolute top-2 left-2" variant="default">
                            Social
                          </Badge>
                        </div>

                        <div className="p-6 md:col-span-2">
                          <div className="flex flex-col md:flex-row justify-between gap-4 mb-4">
                            <h3 className="font-heading text-xl font-bold">{event.title}</h3>
                            <div className="flex items-center gap-1 text-sm">
                              <Users className="h-4 w-4 text-muted-foreground" />
                              <span>
                                {event.registered}/{event.capacity}
                              </span>
                              <span className="text-muted-foreground ml-1">registered</span>
                            </div>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
                            <div className="flex items-center gap-2">
                              <Calendar className="h-4 w-4 text-primary flex-shrink-0" />
                              <span className="text-sm">{event.date}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Clock className="h-4 w-4 text-primary flex-shrink-0" />
                              <span className="text-sm">{event.time}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <MapPin className="h-4 w-4 text-primary flex-shrink-0" />
                              <span className="text-sm">{event.location}</span>
                            </div>
                          </div>

                          <p className="text-muted-foreground mb-6 line-clamp-2">{event.description}</p>

                          <div className="flex flex-col sm:flex-row gap-3">
                            <Button variant="outline" onClick={() => setSelectedEvent(event)} className="gradient-primary">
                              View Details
                            </Button>
                            {/* <Button
                              className="gradient-primary"
                              onClick={() => {
                                setSelectedEvent(event)
                                setIsRSVPDialogOpen(true)
                              }}
                              disabled={event.registered >= event.capacity}
                            >
                              {event.registered >= event.capacity ? "Fully Booked" : "RSVP Now"}
                            </Button> */}
                          </div>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
            </TabsContent>

            {/* Similar TabsContent for other categories */}
            <TabsContent value="academic" className="mt-6">
              <h2 className="text-xl font-heading font-semibold mb-6">Academic Events</h2>
              <motion.div className="space-y-6" variants={container} initial="hidden" animate="show">
                {filteredEvents.map((event) => (
                  <motion.div key={event.id} variants={item}>
                    <Card className="overflow-hidden">
                      {/* Card content */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="relative h-48 md:h-full md:col-span-1">
                          <Image
                            src={event.image || "/placeholder.svg"}
                            alt={event.title}
                            fill
                            className="object-cover"
                          />
                          <Badge className="absolute top-2 left-2" variant="secondary">
                            Academic
                          </Badge>
                        </div>

                        <div className="p-6 md:col-span-2">
                          <div className="flex flex-col md:flex-row justify-between gap-4 mb-4">
                            <h3 className="font-heading text-xl font-bold">{event.title}</h3>
                            <div className="flex items-center gap-1 text-sm">
                              <Users className="h-4 w-4 text-muted-foreground" />
                              <span>
                                {event.registered}/{event.capacity}
                              </span>
                              <span className="text-muted-foreground ml-1">registered</span>
                            </div>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
                            <div className="flex items-center gap-2">
                              <Calendar className="h-4 w-4 text-primary flex-shrink-0" />
                              <span className="text-sm">{event.date}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Clock className="h-4 w-4 text-primary flex-shrink-0" />
                              <span className="text-sm">{event.time}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <MapPin className="h-4 w-4 text-primary flex-shrink-0" />
                              <span className="text-sm">{event.location}</span>
                            </div>
                          </div>

                          <p className="text-muted-foreground mb-6 line-clamp-2">{event.description}</p>

                          <div className="flex flex-col sm:flex-row gap-3">
                            <Button variant="outline" onClick={() => setSelectedEvent(event)} className="gradient-primary">
                              View Details
                            </Button>
                            {/* <Button
                              className="gradient-primary"
                              onClick={() => {
                                setSelectedEvent(event)
                                setIsRSVPDialogOpen(true)
                              }}
                              disabled={event.registered >= event.capacity}
                            >
                              {event.registered >= event.capacity ? "Fully Booked" : "RSVP Now"}
                            </Button> */}
                          </div>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
            </TabsContent>

            <TabsContent value="networking" className="mt-6">
              <h2 className="text-xl font-heading font-semibold mb-6">Networking Events</h2>
              <motion.div className="space-y-6" variants={container} initial="hidden" animate="show">
                {filteredEvents.map((event) => (
                  <motion.div key={event.id} variants={item}>
                    <Card className="overflow-hidden">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="relative h-48 md:h-full md:col-span-1">
                          <Image
                            src={event.image || "/placeholder.svg"}
                            alt={event.title}
                            fill
                            className="object-cover"
                          />
                          <Badge className="absolute top-2 left-2" variant="outline">
                            Networking
                          </Badge>
                        </div>

                        <div className="p-6 md:col-span-2">
                          <div className="flex flex-col md:flex-row justify-between gap-4 mb-4">
                            <h3 className="font-heading text-xl font-bold">{event.title}</h3>
                            <div className="flex items-center gap-1 text-sm">
                              <Users className="h-4 w-4 text-muted-foreground" />
                              <span>
                                {event.registered}/{event.capacity}
                              </span>
                              <span className="text-muted-foreground ml-1">registered</span>
                            </div>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
                            <div className="flex items-center gap-2">
                              <Calendar className="h-4 w-4 text-primary flex-shrink-0" />
                              <span className="text-sm">{event.date}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Clock className="h-4 w-4 text-primary flex-shrink-0" />
                              <span className="text-sm">{event.time}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <MapPin className="h-4 w-4 text-primary flex-shrink-0" />
                              <span className="text-sm">{event.location}</span>
                            </div>
                          </div>

                          <p className="text-muted-foreground mb-6 line-clamp-2">{event.description}</p>

                          <div className="flex flex-col sm:flex-row gap-3">
                            <Button variant="outline" onClick={() => setSelectedEvent(event)} className="gradient-primary">
                              View Details
                            </Button>
                            {/* <Button
                              className="gradient-primary"
                              onClick={() => {
                                setSelectedEvent(event)
                                setIsRSVPDialogOpen(true)
                              }}
                              disabled={event.registered >= event.capacity}
                            >
                              {event.registered >= event.capacity ? "Fully Booked" : "RSVP Now"}
                            </Button> */}
                          </div>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
            </TabsContent>

            <TabsContent value="special" className="mt-6">
              <h2 className="text-xl font-heading font-semibold mb-6">Special Events</h2>
              <motion.div className="space-y-6" variants={container} initial="hidden" animate="show">
                {filteredEvents.map((event) => (
                  <motion.div key={event.id} variants={item}>
                    <Card className="overflow-hidden">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="relative h-48 md:h-full md:col-span-1">
                          <Image
                            src={event.image || "/placeholder.svg"}
                            alt={event.title}
                            fill
                            className="object-cover"
                          />
                          <Badge className="absolute top-2 left-2" variant="destructive">
                            Special
                          </Badge>
                        </div>

                        <div className="p-6 md:col-span-2">
                          <div className="flex flex-col md:flex-row justify-between gap-4 mb-4">
                            <h3 className="font-heading text-xl font-bold">{event.title}</h3>
                            <div className="flex items-center gap-1 text-sm">
                              <Users className="h-4 w-4 text-muted-foreground" />
                              <span>
                                {event.registered}/{event.capacity}
                              </span>
                              <span className="text-muted-foreground ml-1">registered</span>
                            </div>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
                            <div className="flex items-center gap-2">
                              <Calendar className="h-4 w-4 text-primary flex-shrink-0" />
                              <span className="text-sm">{event.date}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Clock className="h-4 w-4 text-primary flex-shrink-0" />
                              <span className="text-sm">{event.time}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <MapPin className="h-4 w-4 text-primary flex-shrink-0" />
                              <span className="text-sm">{event.location}</span>
                            </div>
                          </div>

                          <p className="text-muted-foreground mb-6 line-clamp-2">{event.description}</p>

                          <div className="flex flex-col sm:flex-row gap-3">
                            <Button variant="outline" onClick={() => setSelectedEvent(event)} className="gradient-primary">
                              View Details
                            </Button>
                            {/* <Button
                              className="gradient-primary"
                              onClick={() => {
                                setSelectedEvent(event)
                                setIsRSVPDialogOpen(true)
                              }}
                              disabled={event.registered >= event.capacity}
                            >
                              {event.registered >= event.capacity ? "Fully Booked" : "RSVP Now"}
                            </Button> */}
                          </div>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      {/* Event Details Dialog */}
      <Dialog open={!!selectedEvent && !isRSVPDialogOpen} onOpenChange={(open) => !open && setSelectedEvent(null)}>
        {selectedEvent && (
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle className="text-2xl font-heading">{selectedEvent.title}</DialogTitle>
              <DialogDescription>Event details and information</DialogDescription>
            </DialogHeader>

            <div className="grid grid-cols-1 gap-6">
              <div className="relative h-64 overflow-hidden rounded-lg">
                <Image
                  src={selectedEvent.image || "/placeholder.svg"}
                  alt={selectedEvent.title}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-muted rounded-lg">
                <div className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-primary flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium">Date</p>
                    <p className="text-sm text-muted-foreground">{selectedEvent.date}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-primary flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium">Time</p>
                    <p className="text-sm text-muted-foreground">{selectedEvent.time}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-primary flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium">Location</p>
                    <p className="text-sm text-muted-foreground">{selectedEvent.location}</p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-heading font-semibold mb-2">About This Event</h3>
                <p className="text-muted-foreground">{selectedEvent.description}</p>
              </div>

              {/* <div className="flex items-center justify-between p-4 bg-muted rounded-lg"> */}
                {/* <div className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-primary" />
                  <div>
                  <p className="text-sm font-medium">Capacity</p>
                  <p className="text-sm text-muted-foreground">
                    {selectedEvent.registered} registered out of {selectedEvent.capacity} spots
                  </p>
                  </div>
                </div> */}
                {/* <div className="w-32 h-2 bg-muted-foreground/20 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary rounded-full"
                    style={{ width: `${(selectedEvent.registered / selectedEvent.capacity) * 100}%` }}
                  />
                </div> */}
              {/* </div> */}
            </div>

            <DialogFooter>
              {/* <Button variant="outline" onClick={() => setSelectedEvent(null)}>
                Close
              </Button>
              <Button
                className="gradient-primary"
                onClick={() => setIsRSVPDialogOpen(true)}
                disabled={selectedEvent.registered >= selectedEvent.capacity}
              >
                {selectedEvent.registered >= selectedEvent.capacity ? "Fully Booked" : "RSVP Now"}
              </Button> */}
            </DialogFooter>
          </DialogContent>
        )}
      </Dialog>

      {/* RSVP Dialog */}
      <Dialog open={isRSVPDialogOpen} onOpenChange={closeRSVPDialog}>
        {selectedEvent && (
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle className="text-xl font-heading">
                {rsvpSuccess ? "RSVP Confirmed!" : `RSVP for ${selectedEvent.title}`}
              </DialogTitle>
              <DialogDescription>
                {rsvpSuccess
                  ? "Your spot has been reserved for this event."
                  : "Confirm your attendance for this event."}
              </DialogDescription>
            </DialogHeader>

            {rsvpSuccess ? (
              <div className="flex flex-col items-center py-6">
                <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mb-4">
                  <Check className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-lg font-medium mb-2">You're all set!</h3>
                <p className="text-center text-muted-foreground mb-4">
                  We've sent a confirmation email with all the details. Looking forward to seeing you!
                </p>
                <div className="grid grid-cols-1 gap-2 w-full">
                  <Button variant="outline" className="w-full">
                    Add to Calendar
                  </Button>
                  <Button variant="outline" className="w-full">
                    View My RSVPs
                  </Button>
                </div>
              </div>
            ) : (
              <>
                <div className="space-y-4">
                  <div className="flex items-center gap-2 p-3 bg-muted rounded-lg">
                    <Calendar className="h-5 w-5 text-primary flex-shrink-0" />
                    <div>
                      <p className="text-sm font-medium">{selectedEvent.date}</p>
                      <p className="text-sm text-muted-foreground">{selectedEvent.time}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 p-3 bg-muted rounded-lg">
                    <MapPin className="h-5 w-5 text-primary flex-shrink-0" />
                    <p className="text-sm">{selectedEvent.location}</p>
                  </div>

                  <div className="flex items-center gap-2 p-3 bg-yellow-500/10 rounded-lg">
                    <AlertCircle className="h-5 w-5 text-yellow-500 flex-shrink-0" />
                    <p className="text-sm">
                      {selectedEvent.capacity - selectedEvent.registered} spots remaining out of{" "}
                      {selectedEvent.capacity}
                    </p>
                  </div>
                </div>

                <DialogFooter>
                  <Button variant="outline" onClick={closeRSVPDialog}>
                    Cancel
                  </Button>
                  <Button className="gradient-primary" onClick={handleRSVP}>
                    Confirm RSVP
                  </Button>
                </DialogFooter>
              </>
            )}
          </DialogContent>
        )}
      </Dialog>

      <Footer />
    </>
  )
}

