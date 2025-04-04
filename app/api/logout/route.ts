// app/api/logout/route.ts
import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export async function POST() {
    try {
        // Clear the authentication cookie
        cookies().delete('token')

        return NextResponse.json({ message: 'Logged out successfully' })
    } catch (error) {
        console.error('Logout error:', error)
        return NextResponse.json({ error: 'Failed to logout' }, { status: 500 })
    }
}
