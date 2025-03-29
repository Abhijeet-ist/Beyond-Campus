import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 text-center">
      <h1 className="text-6xl font-heading font-bold mb-4">404</h1>
      <h2 className="text-2xl font-heading mb-6">Page Not Found</h2>
      <p className="text-muted-foreground mb-8 max-w-md">
        The page you are looking for doesn't exist or has been moved.
      </p>
      <Button asChild className="gradient-primary">
        <Link href="/" className="flex items-center gap-2">
          <ArrowLeft className="h-4 w-4" /> Return to Home
        </Link>
      </Button>
    </div>
  )
}

