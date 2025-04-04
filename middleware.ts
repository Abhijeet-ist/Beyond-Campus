// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { verify } from 'jsonwebtoken'

// Define which routes require authentication
const protectedRoutes = ['/dashboard', '/profile', '/events']

export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl

    // Check if the route should be protected
    const isProtectedRoute = protectedRoutes.some(route =>
        pathname.startsWith(route) || pathname === route
    )

    if (isProtectedRoute) {
        // Get token from cookies
        const token = request.cookies.get('token')?.value

        // If no token exists, redirect to login
        if (!token) {
            const url = new URL('/login', request.url)
            url.searchParams.set('from', pathname)
            return NextResponse.redirect(url)
        }

        try {
            // Verify the token
            const JWT_SECRET = process.env.JWT_SECRET || 'your-default-jwt-secret-key'
            verify(token, JWT_SECRET)

            // Token is valid, continue
            return NextResponse.next()
        } catch (error) {
            // Invalid token, redirect to login
            const url = new URL('/login', request.url)
            url.searchParams.set('from', pathname)
            return NextResponse.redirect(url)
        }
    }

    // For non-protected routes, continue
    return NextResponse.next()
}

// Configure middleware to only run on specific paths
export const config = {
    matcher: [
        '/dashboard/:path*',
        '/profile/:path*',
        '/events/:path*',
        '/api/protected/:path*'
    ],
}
