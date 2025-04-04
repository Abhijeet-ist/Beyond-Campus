// app/api/user/route.ts
import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { verify } from 'jsonwebtoken'
import clientPromise from '@/lib/mongodb'
import { ObjectId } from 'mongodb'

const JWT_SECRET = process.env.JWT_SECRET || 'your-default-jwt-secret-key'

export async function GET() {
    try {
        // Get token from cookies
        const token = cookies().get('token')?.value

        if (!token) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        // Verify the token
        const decoded: any = verify(token, JWT_SECRET)

        // Connect to MongoDB
        const client = await clientPromise
        const db = client.db("alumniDB")

        // Fetch the user
        const user = await db.collection("users").findOne({
            _id: new ObjectId(decoded.userId)
        })

        if (!user) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 })
        }

        // Return user data without sensitive information
        const { password, ...userWithoutPassword } = user

        return NextResponse.json({ user: userWithoutPassword })

    } catch (error) {
        console.error('Error fetching user:', error)
        return NextResponse.json({ error: 'Failed to authenticate user' }, { status: 401 })
    }
}
