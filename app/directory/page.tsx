"use client"

import { useState, useEffect } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import Image from "next/image"
import { motion } from "framer-motion"
import { Search, Filter, X, Briefcase, MapPin, GraduationCap, ExternalLink } from "lucide-react"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"

interface AlumniProfile {
  id: string
  name: string
  image: string
  graduation: string
  degree: string
  role: string
  company: string
  location: string
  industry: string
  bio: string
  social: {
    linkedin?: string
    twitter?: string
    website?: string
    instgram?: string
    facebook?: string
    github?: string
    link?: string
  }
}

// Mock data for alumni profiles
const ALUMNI_DATA: AlumniProfile[] = [
  {
    id: "1",
    name: "Sarah Johnson",
    image: "/placeholder.svg?height=400&width=400",
    graduation: "2015",
    degree: "B.Sc. Computer Science",
    role: "Senior Product Manager",
    company: "Google",
    location: "San Francisco, CA",
    industry: "Technology",
    bio: "Sarah is a product leader with expertise in AI and machine learning applications. After graduating, she joined a startup before moving to Google where she now leads a team developing innovative search features. Sarah is a product leader with expertise in AI and machine learning applications. After graduating, she joined a startup before moving to Google where she now leads a team developing innovative search features.Sarah is a product leader with expertise in AI and machine learning applications. After graduating, she joined a startup before moving to Google where she now leads a team developing innovative search features.Sarah is a product leader with expertise in AI and machine learning applications. After graduating, she joined a startup before moving to Google where she now leads a team developing innovative search features.",
    social: {
      linkedin: "https://linkedin.com",
      twitter: "https://twitter.com",
      website: "https://example.com",
    },
  },
  {
    id: "2",
    name: "Michael Chen",
    image: "/placeholder.svg?height=400&width=400",
    graduation: "2012",
    degree: "B.Eng. Software Engineering",
    role: "Chief Technology Officer",
    company: "TechStart Inc.",
    location: "Austin, TX",
    industry: "Technology",
    bio: "Michael co-founded TechStart after graduation, growing it from a small team to over 200 employees. His company specializes in developing enterprise software solutions for healthcare organizations.",
    social: {
      linkedin: "https://linkedin.com",
      website: "https://example.com",
    },
  },
  {
    id: "3",
    name: "Priya Patel",
    image: "/placeholder.svg?height=400&width=400",
    graduation: "2018",
    degree: "M.Sc. Environmental Science",
    role: "Environmental Scientist",
    company: "Global Climate Initiative",
    location: "Washington, DC",
    industry: "Environmental",
    bio: "Priya's research on sustainable urban development has influenced policy decisions at both local and national levels. She currently leads research projects focused on climate resilience in coastal communities.",
    social: {
      linkedin: "https://linkedin.com",
      twitter: "https://twitter.com",
    },
  },
  {
    id: "4",
    name: "James Wilson",
    image: "/placeholder.svg?height=400&width=400",
    graduation: "2010",
    degree: "M.D. Medicine",
    role: "Neurosurgeon",
    company: "Memorial Hospital",
    location: "Boston, MA",
    industry: "Healthcare",
    bio: "Dr. Wilson specializes in minimally invasive neurosurgical procedures. His research has been published in leading medical journals, and he regularly speaks at international conferences on advances in neurosurgery.",
    social: {
      linkedin: "https://linkedin.com",
      website: "https://example.com",
    },
  },
  {
    id: "5",
    name: "Elena Rodriguez",
    image: "/placeholder.svg?height=400&width=400",
    graduation: "2016",
    degree: "B.F.A. Graphic Design",
    role: "Creative Director",
    company: "Design Studio NYC",
    location: "New York, NY",
    industry: "Creative Arts",
    bio: "Elena's design work has been recognized with multiple industry awards. She leads a team of designers creating brand identities for Fortune 500 companies and cultural institutions across the country.",
    social: {
      linkedin: "https://linkedin.com",
      twitter: "https://twitter.com",
      website: "https://example.com",
    },
  },
  {
    id: "6",
    name: "David Kim",
    image: "/placeholder.svg?height=400&width=400",
    graduation: "2014",
    degree: "MBA Business Administration",
    role: "Investment Analyst",
    company: "Global Ventures",
    location: "Chicago, IL",
    industry: "Finance",
    bio: "David specializes in evaluating technology investments with a focus on sustainability. His analytical approach has helped his firm identify several unicorn startups before they reached mainstream recognition.",
    social: {
      linkedin: "https://linkedin.com",
    },
  },
  {
    id: "7",
    name: "Olivia Martinez",
    image: "/placeholder.svg?height=400&width=400",
    graduation: "2019",
    degree: "B.A. International Relations",
    role: "Policy Advisor",
    company: "United Nations",
    location: "Geneva, Switzerland",
    industry: "International Development",
    bio: "Olivia works on humanitarian initiatives across multiple countries, focusing on education access for displaced populations. Her field experience includes projects in East Africa and Southeast Asia.",
    social: {
      linkedin: "https://linkedin.com",
      twitter: "https://twitter.com",
    },
  },
  {
    id: "8",
    name: "Robert Taylor",
    image: "/placeholder.svg?height=400&width=400",
    graduation: "2013",
    degree: "Ph.D. Physics",
    role: "Research Scientist",
    company: "National Laboratory",
    location: "Berkeley, CA",
    industry: "Research",
    bio: "Dr. Taylor leads quantum computing research initiatives that bridge theoretical physics and practical applications. His team has made significant breakthroughs in quantum error correction algorithms.",
    social: {
      linkedin: "https://linkedin.com",
      website: "https://example.com",
    },
  },
]

const industries = [...new Set(ALUMNI_DATA.map((alumni) => alumni.industry))]
const graduationYears = [...new Set(ALUMNI_DATA.map((alumni) => alumni.graduation))].sort(
  (a, b) => Number(b) - Number(a),
)

export default function DirectoryPage() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [searchQuery, setSearchQuery] = useState(searchParams.get("q") || "")
  const [selectedIndustries, setSelectedIndustries] = useState<string[]>(
    searchParams.get("industries")?.split(",").filter(Boolean) || [],
  )
  const [selectedYears, setSelectedYears] = useState<string[]>(
    searchParams.get("years")?.split(",").filter(Boolean) || [],
  )
  const [filteredAlumni, setFilteredAlumni] = useState<AlumniProfile[]>(ALUMNI_DATA)
  const [selectedProfile, setSelectedProfile] = useState<AlumniProfile | null>(null)
  const [isFilterOpen, setIsFilterOpen] = useState(false)

  // Update URL with search parameters
  useEffect(() => {
    const params = new URLSearchParams()

    if (searchQuery) params.set("q", searchQuery)
    if (selectedIndustries.length) params.set("industries", selectedIndustries.join(","))
    if (selectedYears.length) params.set("years", selectedYears.join(","))

    const newUrl = `${window.location.pathname}${params.toString() ? `?${params.toString()}` : ""}`
    router.replace(newUrl, { scroll: false })

    // Apply filters
    let results = [...ALUMNI_DATA]

    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      results = results.filter(
        (alumni) =>
          alumni.name.toLowerCase().includes(query) ||
          alumni.company.toLowerCase().includes(query) ||
          alumni.role.toLowerCase().includes(query) ||
          alumni.bio.toLowerCase().includes(query),
      )
    }

    if (selectedIndustries.length) {
      results = results.filter((alumni) => selectedIndustries.includes(alumni.industry))
    }

    if (selectedYears.length) {
      results = results.filter((alumni) => selectedYears.includes(alumni.graduation))
    }

    setFilteredAlumni(results)
  }, [searchQuery, selectedIndustries, selectedYears, router])

  const toggleIndustry = (industry: string) => {
    setSelectedIndustries((prev) =>
      prev.includes(industry) ? prev.filter((i) => i !== industry) : [...prev, industry],
    )
  }

  const toggleYear = (year: string) => {
    setSelectedYears((prev) => (prev.includes(year) ? prev.filter((y) => y !== year) : [...prev, year]))
  }

  const clearFilters = () => {
    setSearchQuery("")
    setSelectedIndustries([])
    setSelectedYears([])
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
            <h1 className="text-3xl md:text-4xl font-heading font-bold mb-4">Alumni Directory</h1>
            <p className="text-muted-foreground">
              Connect with fellow alumni from around the world. Explore where your classmates are now and rediscover old
              connections.
            </p>
          </div>

          <div className="mb-8 flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by name, company, or role..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <Button
              variant="outline"
              className="md:w-auto flex items-center gap-2"
              onClick={() => setIsFilterOpen(!isFilterOpen)}
            >
              <Filter className="h-4 w-4" />
              Filters
              {(selectedIndustries.length > 0 || selectedYears.length > 0) && (
                <Badge variant="secondary" className="ml-1">
                  {selectedIndustries.length + selectedYears.length}
                </Badge>
              )}
            </Button>

            {(searchQuery || selectedIndustries.length > 0 || selectedYears.length > 0) && (
              <Button variant="ghost" onClick={clearFilters} className="md:w-auto">
                Clear All
              </Button>
            )}
          </div>

          {isFilterOpen && (
            <div className="mb-8 p-4 border rounded-lg">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-heading font-semibold">Filter Alumni</h3>
                <Button variant="ghost" size="sm" onClick={() => setIsFilterOpen(false)}>
                  <X className="h-4 w-4" />
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-sm font-medium mb-2">Industry</h4>
                  <div className="flex flex-wrap gap-2">
                    {industries.map((industry) => (
                      <Badge
                        key={industry}
                        variant={selectedIndustries.includes(industry) ? "default" : "outline"}
                        className="cursor-pointer"
                        onClick={() => toggleIndustry(industry)}
                      >
                        {industry}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium mb-2">Graduation Year</h4>
                  <div className="flex flex-wrap gap-2">
                    {graduationYears.map((year) => (
                      <Badge
                        key={year}
                        variant={selectedYears.includes(year) ? "default" : "outline"}
                        className="cursor-pointer"
                        onClick={() => toggleYear(year)}
                      >
                        {year}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="mb-4 flex justify-between items-center">
            <p className="text-sm text-muted-foreground">Showing {filteredAlumni.length} alumni</p>
          </div>

          {filteredAlumni.length > 0 ? (
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
              variants={container}
              initial="hidden"
              animate="show"
            >
              {filteredAlumni.map((alumni) => (
                <motion.div key={alumni.id} variants={item}>
                  <Card
                    className="h-full overflow-hidden hover:shadow-lg transition-shadow cursor-pointer group"
                    onClick={() => setSelectedProfile(alumni)}
                  >
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={alumni.image || "/placeholder.svg"}
                        alt={alumni.name}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>
                    <CardContent className="p-5">
                      <h3 className="font-heading text-xl font-bold mb-1">{alumni.name}</h3>
                      <p className="text-primary text-sm mb-2">Class of {alumni.graduation}</p>

                      <div className="flex flex-col gap-2 mb-4">
                        <div className="flex items-start gap-2">
                          <Briefcase className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                          <span className="text-sm">
                            {alumni.role} at {alumni.company}
                          </span>
                        </div>
                        <div className="flex items-start gap-2">
                          <MapPin className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                          <span className="text-sm">{alumni.location}</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <GraduationCap className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                          <span className="text-sm">{alumni.degree}</span>
                        </div>
                      </div>

                      <Badge variant="outline">{alumni.industry}</Badge>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <div className="text-center py-12">
              <h3 className="text-lg font-medium mb-2">No alumni found</h3>
              <p className="text-muted-foreground mb-4">Try adjusting your search or filters</p>
              <Button onClick={clearFilters}>Clear All Filters</Button>
            </div>
          )}
        </div>
      </main>

      <Dialog open={!!selectedProfile} onOpenChange={(open) => !open && setSelectedProfile(null)}>
        {selectedProfile && (
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle className="text-2xl font-heading">Alumni Profile</DialogTitle>
              <DialogDescription>Connect with your fellow alumni</DialogDescription>
            </DialogHeader>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-1">
                <div className="relative aspect-square overflow-hidden rounded-lg mb-4">
                  <Image
                    src={selectedProfile.image || "/placeholder.svg"}
                    alt={selectedProfile.name}
                    fill
                    className="object-cover"
                  />
                </div>

                <h3 className="font-heading text-xl font-bold">{selectedProfile.name}</h3>
                <p className="text-primary text-sm mb-4">Class of {selectedProfile.graduation}</p>

                <div className="flex flex-col gap-3 mb-6">
                  <div className="flex items-start gap-2">
                    <Briefcase className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                    <span className="text-sm">
                      {selectedProfile.role} at {selectedProfile.company}
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <MapPin className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                    <span className="text-sm">{selectedProfile.location}</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <GraduationCap className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                    <span className="text-sm">{selectedProfile.degree}</span>
                  </div>
                </div>

                <div className="flex gap-2">
                  {selectedProfile.social.linkedin && (
                    <Button size="sm" variant="outline" asChild className="w-full">
                      <a href={selectedProfile.social.linkedin} target="_blank" rel="noopener noreferrer">
                        LinkedIn <ExternalLink className="ml-1 h-3 w-3" />
                      </a>
                    </Button>
                  )}
                  {selectedProfile.social.twitter && (
                    <Button size="sm" variant="outline" asChild className="w-full">
                      <a href={selectedProfile.social.twitter} target="_blank" rel="noopener noreferrer">
                        Twitter <ExternalLink className="ml-1 h-3 w-3" />
                      </a>
                    </Button>
                  )}
                </div>

                {selectedProfile.social.website && (
                  <Button size="sm" variant="outline" asChild className="w-full mt-2">
                    <a href={selectedProfile.social.website} target="_blank" rel="noopener noreferrer">
                      Website <ExternalLink className="ml-1 h-3 w-3" />
                    </a>
                  </Button>
                )}
              </div>

              <div className="md:col-span-2">
                <h4 className="font-heading text-lg font-semibold mb-3">About</h4>
                <p className="text-muted-foreground mb-6">{selectedProfile.bio}</p>

                <div className="flex justify-end gap-3">
                  {/* <Button variant="outline">Message</Button>
                  <Button className="gradient-primary">Connect</Button> */}
                </div>
              </div>
            </div>
          </DialogContent>
        )}
      </Dialog>

      <Footer />
    </>
  )
}

