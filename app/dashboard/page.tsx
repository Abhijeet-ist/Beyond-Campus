"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { Calendar, Clock, MapPin, Users, Briefcase, GraduationCap, Calendar as CalendarIcon, Clock as ClockIcon, User, Book, Bell } from "lucide-react"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { SpotlightEffect } from "@/components/spotlight-effect"

// Types for our dashboard data
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

interface AlumniProfile {
  id: string
  name: string
  graduation: string
  role: string
  company: string
  image: string
  location: string
  degree: string
}

interface Booking {
  id: string
  alumniId: string
  alumni: AlumniProfile
  date: string
  time: string
  duration: string
  topic: string
  status: "scheduled" | "completed" | "cancelled"
  meetingLink?: string
}

// Mock data for registered events
const USER_EVENTS: Event[] = [
  {
    id: "2",
    title: "Spectra 2024 – Inter-School Youth Festival",
    date: "November 11, 2024",
    time: "Week-long event",
    location: "LPU Campus​",
    description:
      "The 17th edition of 'Spectra' ignited the campus with vibrant expressions of youth talent and social consciousness.",
    image: "/LPU alumini.jpg",
    capacity: 100,
    registered: 78,
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
      "Cognitia'25' celebrated technical challenges and innovations, featuring 14 specialized competitions.",
    image: "/LPU alumini.jpg",
    capacity: 300,
    registered: 210,
    status: "upcoming",
    category: "academic",
  },
  {
    id: "1",
    title: "One India-2024 Cultural Fest",
    date: "April 18, 2024​",
    time: "Throughout the Day",
    location: "Main Campus",
    description:
      "The 12th edition of 'One India' transformed the campus into a vibrant tapestry of Indian culture and heritage.",
    image: "/LPU alumini.jpg",
    capacity: 200,
    registered: 145,
    attendees: "25,000+",
    status: "past",
    category: "social",
  },
];

// Mock data for alumni bookings
const USER_BOOKINGS: Booking[] = [
  {
    id: "1",
    alumniId: "1",
    alumni: {
      id: "1",
      name: "Sarah Johnson",
      graduation: "2015",
      role: "Senior Product Manager",
      company: "Google",
      image: "/placeholder.svg?height=400&width=400",
      location: "San Francisco, CA",
      degree: "B.Tech in Computer Science"
    },
    date: "May 15, 2024",
    time: "10:00 AM - 11:00 AM",
    duration: "1 hour",
    topic: "Career Guidance in Product Management",
    status: "scheduled",
    meetingLink: "https://meet.google.com/abc-defg-hij"
  },
  {
    id: "2",
    alumniId: "2",
    alumni: {
      id: "2",
      name: "Michael Chen",
      graduation: "2012",
      role: "Chief Technology Officer",
      company: "TechStart Inc.",
      image: "/placeholder.svg?height=400&width=400",
      location: "New York, NY",
      degree: "B.Tech in Computer Engineering"
    },
    date: "May 20, 2024",
    time: "2:00 PM - 3:00 PM",
    duration: "1 hour",
    topic: "Tech Startup Mentorship Session",
    status: "scheduled",
    meetingLink: "https://zoom.us/j/12345678"
  },
  {
    id: "3",
    alumniId: "4",
    alumni: {
      id: "4",
      name: "James Wilson",
      graduation: "2010",
      role: "Neurosurgeon",
      company: "Memorial Hospital",
      image: "/placeholder.svg?height=400&width=400",
      location: "Boston, MA",
      degree: "M.D. in Neurosurgery"
    },
    date: "April 5, 2024",
    time: "1:00 PM - 2:00 PM",
    duration: "1 hour",
    topic: "Medical School Application Guidance",
    status: "completed",
    meetingLink: "https://teams.microsoft.com/l/meetup-join/abcdef"
  }
];

// Upcoming events data
const UPCOMING_EVENTS: Event[] = [
  {
    id: "5",
    title: "38th AIU Inter-University National Youth Festival",
    date: "March 10, 2025",
    time: "7:00 PM - 11:00 PM",
    location: "LPU Campus​",
    description:
      "LPU clinched the overall championship for the second consecutive year at this prestigious festival.",
    image: "/LPU alumini.jpg",
    capacity: 250,
    registered: 220,
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
      "LPU had the honor of hosting the 65th Annual NASA (National Association of Students of Architecture) Convention.",
    image: "/LPU alumini.jpg",
    capacity: 500,
    registered: 450,
    status: "upcoming",
    category: "networking",
  },
];

export default function DashboardPage() {
  const [activeEventTab, setActiveEventTab] = useState<"upcoming" | "past">("upcoming")
  
  // Filter events based on active tab
  const upcomingUserEvents = USER_EVENTS.filter(event => event.status === "upcoming");
  const pastUserEvents = USER_EVENTS.filter(event => event.status === "past");
  
  // Filter bookings
  const scheduledBookings = USER_BOOKINGS.filter(booking => booking.status === "scheduled");
  const pastBookings = USER_BOOKINGS.filter(booking => booking.status === "completed" || booking.status === "cancelled");
  
  return (
    <>
      <Navbar />
      
      <main className="flex-1 py-10 px-4">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-3xl font-heading font-bold mb-2">Dashboard</h1>
            <p className="text-muted-foreground mb-8">Welcome back! Here's what's happening with your alumni account.</p>
            
            {/* Summary Cards */}
            <SpotlightEffect intensity="medium" size={300} className="w-full">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                <Card className="border-none glass-pane">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="font-heading text-lg font-semibold">My Events</h3>
                      <div className="w-10 h-10 rounded-full gradient-primary flex items-center justify-center">
                        <Calendar className="h-5 w-5 text-white" />
                      </div>
                    </div>
                    <div className="text-3xl font-bold mb-1">{upcomingUserEvents.length}</div>
                    <p className="text-muted-foreground text-sm">Upcoming registered events</p>
                  </CardContent>
                </Card>
                
                <Card className="border-none glass-pane">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="font-heading text-lg font-semibold">Bookings</h3>
                      <div className="w-10 h-10 rounded-full gradient-primary flex items-center justify-center">
                        <Book className="h-5 w-5 text-white" />
                      </div>
                    </div>
                    <div className="text-3xl font-bold mb-1">{scheduledBookings.length}</div>
                    <p className="text-muted-foreground text-sm">Upcoming alumni sessions</p>
                  </CardContent>
                </Card>
                
                <Card className="border-none glass-pane">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="font-heading text-lg font-semibold">Notifications</h3>
                      <div className="w-10 h-10 rounded-full gradient-primary flex items-center justify-center">
                        <Bell className="h-5 w-5 text-white" />
                      </div>
                    </div>
                    <div className="text-3xl font-bold mb-1">3</div>
                    <p className="text-muted-foreground text-sm">New notifications</p>
                  </CardContent>
                </Card>
              </div>
            </SpotlightEffect>
            
            {/* Alumni Booking Section */}
            <SpotlightEffect intensity="medium" size={350} className="w-full">
              <div className="mb-12">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-heading font-bold">Alumni Bookings</h2>
                  <Button asChild variant="outline" className="rounded-full">
                    <Link href="/directory">
                      Book a Session
                    </Link>
                  </Button>
                </div>
                
                {scheduledBookings.length > 0 ? (
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {scheduledBookings.map((booking) => (
                      <Card key={booking.id} className="overflow-hidden border-none glass-pane">
                        <CardContent className="p-0">
                          <div className="flex flex-col md:flex-row">
                            <div className="md:w-1/3 p-6 gradient-primary flex flex-col justify-center items-center text-white">
                              <div className="mb-4">
                                <Avatar className="h-20 w-20 border-2 border-white">
                                  <AvatarImage src={booking.alumni.image} alt={booking.alumni.name} />
                                  <AvatarFallback>{booking.alumni.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                              </div>
                              <h4 className="font-heading text-lg font-bold text-center mb-1">{booking.alumni.name}</h4>
                              <p className="text-sm text-center opacity-90 mb-2">{booking.alumni.role}</p>
                              <p className="text-xs text-center opacity-80">{booking.alumni.company}</p>
                            </div>
                            
                            <div className="md:w-2/3 p-6">
                              <div className="mb-4">
                                <h3 className="font-heading text-xl font-bold mb-2">{booking.topic}</h3>
                                <Badge className="bg-green-500/10 text-green-500 hover:bg-green-500/20 hover:text-green-500">
                                  {booking.status === "scheduled" ? "Upcoming" : booking.status}
                                </Badge>
                              </div>
                              
                              <div className="grid grid-cols-1 gap-3 mb-6">
                                <div className="flex items-center gap-2">
                                  <CalendarIcon className="h-4 w-4 text-primary flex-shrink-0" />
                                  <span className="text-sm">{booking.date}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <ClockIcon className="h-4 w-4 text-primary flex-shrink-0" />
                                  <span className="text-sm">{booking.time} ({booking.duration})</span>
                                </div>
                              </div>
                              
                              <div className="flex gap-3">
                                {booking.meetingLink && (
                                  <Button className="gradient-primary">
                                    <Link href={booking.meetingLink} target="_blank">
                                      Join Meeting
                                    </Link>
                                  </Button>
                                )}
                                <Button variant="outline">Reschedule</Button>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <Card className="border-none glass-pane">
                    <CardContent className="p-6 text-center">
                      <p className="text-muted-foreground">You don't have any upcoming alumni sessions.</p>
                      <Button className="mt-4 gradient-primary">
                        <Link href="/directory">
                          Book Your First Session
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                )}
              </div>
            </SpotlightEffect>
            
            {/* Events Section */}
            <SpotlightEffect intensity="medium" size={350} className="w-full">
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-heading font-bold">My Events</h2>
                  <Button asChild variant="outline" className="rounded-full">
                    <Link href="/events">
                      Explore Events
                    </Link>
                  </Button>
                </div>
                
                <Tabs defaultValue="upcoming" className="w-full">
                  <TabsList className="grid w-full md:w-60 grid-cols-2 mb-6">
                    <TabsTrigger value="upcoming" onClick={() => setActiveEventTab("upcoming")}>Upcoming</TabsTrigger>
                    <TabsTrigger value="past" onClick={() => setActiveEventTab("past")}>Past</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="upcoming">
                    {upcomingUserEvents.length > 0 ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {upcomingUserEvents.map((event) => (
                          <Card key={event.id} className="overflow-hidden border-none glass-pane">
                            <CardContent className="p-0">
                              <div className="grid grid-cols-1 md:grid-cols-3">
                                <div className="relative aspect-video md:aspect-square md:h-full">
                                  <Image 
                                    src={event.image} 
                                    alt={event.title}
                                    fill
                                    className="object-cover"
                                  />
                                  <Badge className="absolute top-2 right-2 bg-green-500/80 hover:bg-green-500">
                                    Registered
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
                                    <Button variant="outline">View Details</Button>
                                    <Button className="gradient-primary">Add to Calendar</Button>
                                  </div>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    ) : (
                      <Card className="border-none glass-pane">
                        <CardContent className="p-6 text-center">
                          <p className="text-muted-foreground">You haven't registered for any upcoming events.</p>
                          <Button className="mt-4 gradient-primary">
                            <Link href="/events">
                              Browse Events
                            </Link>
                          </Button>
                        </CardContent>
                      </Card>
                    )}
                  </TabsContent>
                  
                  <TabsContent value="past">
                    {pastUserEvents.length > 0 ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {pastUserEvents.map((event) => (
                          <Card key={event.id} className="overflow-hidden border-none glass-pane">
                            <CardContent className="p-0">
                              <div className="grid grid-cols-1 md:grid-cols-3">
                                <div className="relative aspect-video md:aspect-square md:h-full">
                                  <Image 
                                    src={event.image} 
                                    alt={event.title}
                                    fill
                                    className="object-cover"
                                  />
                                  <Badge className="absolute top-2 right-2 bg-gray-500/80 hover:bg-gray-500">
                                    Past
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
                                    <Button variant="outline">View Details</Button>
                                    <Button variant="outline">View Photos</Button>
                                  </div>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    ) : (
                      <Card className="border-none glass-pane">
                        <CardContent className="p-6 text-center">
                          <p className="text-muted-foreground">You haven't attended any past events yet.</p>
                          <Button className="mt-4 gradient-primary">
                            <Link href="/events">
                              Browse Events
                            </Link>
                          </Button>
                        </CardContent>
                      </Card>
                    )}
                  </TabsContent>
                </Tabs>
              </div>
            </SpotlightEffect>
            
            {/* Recommended Events */}
            <SpotlightEffect intensity="medium" size={350} className="w-full">
              <div className="mt-12">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-heading font-bold">Recommended Events</h2>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {UPCOMING_EVENTS.map((event) => (
                    <Card key={event.id} className="overflow-hidden border-none glass-pane">
                      <CardContent className="p-0">
                        <div className="grid grid-cols-1 md:grid-cols-3">
                          <div className="relative aspect-video md:aspect-square md:h-full">
                            <Image 
                              src={event.image} 
                              alt={event.title}
                              fill
                              className="object-cover"
                            />
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
                              <Button variant="outline">View Details</Button>
                              <Button className="gradient-primary">Register Now</Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </SpotlightEffect>
          </motion.div>
        </div>
      </main>
      
      <Footer />
    </>
  )
} 