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
  status: "upcoming" | "ongoing" | "past"
  category: "social" | "academic" | "networking" | "special"
}

// Mock data for events
const EVENTS_DATA: Event[] = [
  {
    id: "1",
    title: "Welcome Reception",
    date: "October 15, 2025",
    time: "7:00 PM - 10:00 PM",
    location: "Alumni Hall, Main Campus",
    description:
      "Kick off the homecoming weekend with cocktails, hors d'oeuvres, and reconnect with old friends in the beautifully renovated Alumni Hall. This casual reception is the perfect opportunity to break the ice and start the weekend's festivities.",
    image: "/placeholder.svg?height=400&width=800",
    capacity: 200,
    registered: 145,
    status: "upcoming",
    category: "social",
  },
  {
    id: "2",
    title: "Campus Tours",
    date: "October 16, 2025",
    time: "10:00 AM - 12:00 PM",
    location: "Visitor Center, Main Campus",
    description:
      "Explore how your alma mater has evolved with guided tours of new facilities and renovated spaces. Tours will be led by current students and will include visits to the new Science Complex, Arts Center, and Athletic Facilities.",
    image: "/placeholder.svg?height=400&width=800",
    capacity: 100,
    registered: 78,
    status: "upcoming",
    category: "academic",
  },
  {
    id: "3",
    title: "Industry Networking Lunch",
    date: "October 16, 2025",
    time: "12:30 PM - 2:30 PM",
    location: "Business School Atrium",
    description:
      "Connect with fellow alumni in your industry during this structured networking lunch. Tables will be organized by industry sector, allowing for meaningful conversations and potential professional collaborations.",
    image: "/placeholder.svg?height=400&width=800",
    capacity: 150,
    registered: 132,
    status: "upcoming",
    category: "networking",
  },
  {
    id: "4",
    title: "Distinguished Alumni Panel",
    date: "October 16, 2025",
    time: "3:00 PM - 5:00 PM",
    location: "University Auditorium",
    description:
      "Hear from accomplished alumni as they share insights from their professional journeys and discuss how their university experience shaped their careers. Q&A session will follow the panel discussion.",
    image: "/placeholder.svg?height=400&width=800",
    capacity: 300,
    registered: 210,
    status: "upcoming",
    category: "academic",
  },
  {
    id: "5",
    title: "Homecoming Gala Dinner",
    date: "October 16, 2025",
    time: "7:00 PM - 11:00 PM",
    location: "Grand Ballroom, Alumni Center",
    description:
      "An elegant evening celebrating distinguished alumni and university achievements. The gala will feature a three-course dinner, live entertainment, and the presentation of the annual Alumni Achievement Awards.",
    image: "/placeholder.svg?height=400&width=800",
    capacity: 250,
    registered: 220,
    status: "upcoming",
    category: "special",
  },
  {
    id: "6",
    title: "Alumni Sports Tournament",
    date: "October 17, 2025",
    time: "9:00 AM - 12:00 PM",
    location: "University Sports Complex",
    description:
      "Participate in friendly competition with fellow alumni in various sports including basketball, volleyball, and tennis. Teams will be formed on-site, and all skill levels are welcome to join.",
    image: "/placeholder.svg?height=400&width=800",
    capacity: 120,
    registered: 85,
    status: "upcoming",
    category: "social",
  },
  {
    id: "7",
    title: "Homecoming Football Game",
    date: "October 17, 2025",
    time: "2:00 PM - 5:00 PM",
    location: "University Stadium",
    description:
      "Cheer on the university team as they take on their rivals in the annual homecoming football game. Special seating section reserved for alumni attendees. Pre-game tailgate included with registration.",
    image: "/placeholder.svg?height=400&width=800",
    capacity: 500,
    registered: 450,
    status: "upcoming",
    category: "special",
  },
  {
    id: "8",
    title: "Farewell Brunch",
    date: "October 18, 2025",
    time: "10:00 AM - 12:00 PM",
    location: "University Gardens",
    description:
      "Conclude the homecoming weekend with a relaxed brunch in the beautiful University Gardens. Share memories from the weekend and exchange contact information with new and old friends before departing.",
    image: "/placeholder.svg?height=400&width=800",
    capacity: 200,
    registered: 160,
    status: "upcoming",
    category: "social",
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
                <Button variant="outline" size="sm" className="flex items-center gap-2">
                  <Download className="h-4 w-4" />
                  Download Schedule
                </Button>
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
                            <Button variant="outline" onClick={() => setSelectedEvent(event)}>
                              View Details
                            </Button>
                            <Button
                              className="gradient-primary"
                              onClick={() => {
                                setSelectedEvent(event)
                                setIsRSVPDialogOpen(true)
                              }}
                              disabled={event.registered >= event.capacity}
                            >
                              {event.registered >= event.capacity ? "Fully Booked" : "RSVP Now"}
                            </Button>
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
                            <Button variant="outline" onClick={() => setSelectedEvent(event)}>
                              View Details
                            </Button>
                            <Button
                              className="gradient-primary"
                              onClick={() => {
                                setSelectedEvent(event)
                                setIsRSVPDialogOpen(true)
                              }}
                              disabled={event.registered >= event.capacity}
                            >
                              {event.registered >= event.capacity ? "Fully Booked" : "RSVP Now"}
                            </Button>
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
                            <Button variant="outline" onClick={() => setSelectedEvent(event)}>
                              View Details
                            </Button>
                            <Button
                              className="gradient-primary"
                              onClick={() => {
                                setSelectedEvent(event)
                                setIsRSVPDialogOpen(true)
                              }}
                              disabled={event.registered >= event.capacity}
                            >
                              {event.registered >= event.capacity ? "Fully Booked" : "RSVP Now"}
                            </Button>
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
                            <Button variant="outline" onClick={() => setSelectedEvent(event)}>
                              View Details
                            </Button>
                            <Button
                              className="gradient-primary"
                              onClick={() => {
                                setSelectedEvent(event)
                                setIsRSVPDialogOpen(true)
                              }}
                              disabled={event.registered >= event.capacity}
                            >
                              {event.registered >= event.capacity ? "Fully Booked" : "RSVP Now"}
                            </Button>
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
                            <Button variant="outline" onClick={() => setSelectedEvent(event)}>
                              View Details
                            </Button>
                            <Button
                              className="gradient-primary"
                              onClick={() => {
                                setSelectedEvent(event)
                                setIsRSVPDialogOpen(true)
                              }}
                              disabled={event.registered >= event.capacity}
                            >
                              {event.registered >= event.capacity ? "Fully Booked" : "RSVP Now"}
                            </Button>
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

              <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-sm font-medium">Capacity</p>
                    <p className="text-sm text-muted-foreground">
                      {selectedEvent.registered} registered out of {selectedEvent.capacity} spots
                    </p>
                  </div>
                </div>
                <div className="w-32 h-2 bg-muted-foreground/20 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary rounded-full"
                    style={{ width: `${(selectedEvent.registered / selectedEvent.capacity) * 100}%` }}
                  />
                </div>
              </div>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setSelectedEvent(null)}>
                Close
              </Button>
              <Button
                className="gradient-primary"
                onClick={() => setIsRSVPDialogOpen(true)}
                disabled={selectedEvent.registered >= selectedEvent.capacity}
              >
                {selectedEvent.registered >= selectedEvent.capacity ? "Fully Booked" : "RSVP Now"}
              </Button>
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

