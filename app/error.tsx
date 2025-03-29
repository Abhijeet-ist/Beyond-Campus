"use client"

import { useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { AlertTriangle, RefreshCw } from "lucide-react"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 text-center">
      <div className="w-16 h-16 rounded-full bg-destructive/20 flex items-center justify-center mb-6">
        <AlertTriangle className="h-8 w-8 text-destructive" />
      </div>
      <h2 className="text-2xl font-heading font-bold mb-4">Something went wrong!</h2>
      <p className="text-muted-foreground mb-8 max-w-md">
        We apologize for the inconvenience. Please try again or return to the home page.
      </p>
      <div className="flex flex-col sm:flex-row gap-4">
        <Button variant="outline" onClick={reset} className="flex items-center gap-2">
          <RefreshCw className="h-4 w-4" /> Try Again
        </Button>
        <Button asChild className="gradient-primary">
          <Link href="/">Return to Home</Link>
        </Button>
      </div>
    </div>
  )
}

