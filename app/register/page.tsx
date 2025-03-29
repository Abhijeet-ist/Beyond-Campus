"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Eye, EyeOff, ArrowRight, Check } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    graduationYear: "",
    degree: "",
    studentId: "",
    agreeTerms: false,
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const nextStep = () => {
    setStep((prev) => prev + 1)
  }

  const prevStep = () => {
    setStep((prev) => prev - 1)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log(formData)
  }

  return (
    <>
      <Navbar />

      <main className="flex-1 flex items-center justify-center py-16 px-4">
        <div className="w-full max-w-md">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div className="text-center mb-8">
              <h1 className="text-3xl font-heading font-bold mb-2">Create Your Account</h1>
              <p className="text-muted-foreground">Join our alumni community to access exclusive benefits</p>
            </div>

            <div className="mb-8">
              <div className="flex justify-between">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex flex-col items-center">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${
                        step > i
                          ? "bg-primary text-white"
                          : step === i
                            ? "border-2 border-primary text-primary"
                            : "border-2 border-muted-foreground text-muted-foreground"
                      }`}
                    >
                      {step > i ? <Check className="h-5 w-5" /> : i}
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {i === 1 ? "Account" : i === 2 ? "Profile" : "Verification"}
                    </span>
                  </div>
                ))}
              </div>
              <div className="mt-2 grid grid-cols-2 gap-2">
                <div className={`h-1 rounded-full ${step > 1 ? "bg-primary" : "bg-muted"}`} />
                <div className={`h-1 rounded-full ${step > 2 ? "bg-primary" : "bg-muted"}`} />
              </div>
            </div>

            <form onSubmit={handleSubmit}>
              {step === 1 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-4"
                >
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input id="lastName" name="lastName" value={formData.lastName} onChange={handleChange} required />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="your.email@example.com"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <div className="relative">
                      <Input
                        id="password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        value={formData.password}
                        onChange={handleChange}
                        required
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute right-0 top-0 h-full px-3"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4 text-muted-foreground" />
                        ) : (
                          <Eye className="h-4 w-4 text-muted-foreground" />
                        )}
                        <span className="sr-only">{showPassword ? "Hide password" : "Show password"}</span>
                      </Button>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Password must be at least 8 characters long and include a number and special character.
                    </p>
                  </div>

                  <Button type="button" className="w-full gradient-primary" onClick={nextStep}>
                    Continue <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-4"
                >
                  <div className="space-y-2">
                    <Label htmlFor="graduationYear">Graduation Year</Label>
                    <Select
                      value={formData.graduationYear}
                      onValueChange={(value) => handleSelectChange("graduationYear", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select year" />
                      </SelectTrigger>
                      <SelectContent>
                        {Array.from({ length: 50 }, (_, i) => new Date().getFullYear() - i).map((year) => (
                          <SelectItem key={year} value={year.toString()}>
                            {year}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="degree">Degree Earned</Label>
                    <Select value={formData.degree} onValueChange={(value) => handleSelectChange("degree", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select degree" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="bachelor">Bachelor's Degree</SelectItem>
                        <SelectItem value="master">Master's Degree</SelectItem>
                        <SelectItem value="doctorate">Doctorate</SelectItem>
                        <SelectItem value="associate">Associate Degree</SelectItem>
                        <SelectItem value="certificate">Certificate Program</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="studentId">Student ID (if known)</Label>
                    <Input
                      id="studentId"
                      name="studentId"
                      placeholder="Optional"
                      value={formData.studentId}
                      onChange={handleChange}
                    />
                    <p className="text-xs text-muted-foreground">
                      Your student ID helps us verify your alumni status more quickly.
                    </p>
                  </div>

                  <div className="flex justify-between gap-4">
                    <Button type="button" variant="outline" onClick={prevStep}>
                      Back
                    </Button>
                    <Button type="button" className="flex-1 gradient-primary" onClick={nextStep}>
                      Continue <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-4"
                >
                  <div className="p-4 border rounded-lg">
                    <h3 className="font-medium mb-2">Verify Your Information</h3>
                    <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                      <div className="text-muted-foreground">Name:</div>
                      <div>
                        {formData.firstName} {formData.lastName}
                      </div>

                      <div className="text-muted-foreground">Email:</div>
                      <div>{formData.email}</div>

                      <div className="text-muted-foreground">Graduation Year:</div>
                      <div>{formData.graduationYear}</div>

                      <div className="text-muted-foreground">Degree:</div>
                      <div>
                        {formData.degree === "bachelor"
                          ? "Bachelor's Degree"
                          : formData.degree === "master"
                            ? "Master's Degree"
                            : formData.degree === "doctorate"
                              ? "Doctorate"
                              : formData.degree === "associate"
                                ? "Associate Degree"
                                : formData.degree === "certificate"
                                  ? "Certificate Program"
                                  : ""}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start space-x-2 pt-2">
                    <Checkbox
                      id="agreeTerms"
                      name="agreeTerms"
                      checked={formData.agreeTerms}
                      onCheckedChange={(checked) =>
                        setFormData((prev) => ({ ...prev, agreeTerms: checked as boolean }))
                      }
                      required
                    />
                    <Label htmlFor="agreeTerms" className="text-sm font-normal">
                      I agree to the{" "}
                      <Link href="/terms" className="text-primary hover:underline">
                        Terms of Service
                      </Link>{" "}
                      and{" "}
                      <Link href="/privacy" className="text-primary hover:underline">
                        Privacy Policy
                      </Link>
                    </Label>
                  </div>

                  <div className="flex justify-between gap-4">
                    <Button type="button" variant="outline" onClick={prevStep}>
                      Back
                    </Button>
                    <Button type="submit" className="flex-1 gradient-primary" disabled={!formData.agreeTerms}>
                      Create Account
                    </Button>
                  </div>
                </motion.div>
              )}
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-muted-foreground">
                Already have an account?{" "}
                <Link href="/login" className="text-primary hover:underline">
                  Sign in
                </Link>
              </p>
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </>
  )
}

