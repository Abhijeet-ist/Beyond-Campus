// app/api/register/route.ts
import { NextResponse } from 'next/server'
import clientPromise from '@/lib/mongodb'
import bcrypt from 'bcryptjs'

export async function POST(request: Request) {
    try {
        const body = await request.json()
        const { firstName, lastName, email, password, graduationYear, degree, studentId, agreeTerms } = body

        // Validate the required fields
        if (!firstName || !lastName || !email || !password || !graduationYear || !degree || !agreeTerms) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
        }

        // Connect to MongoDB
        const client = await clientPromise
        const db = client.db("alumniDB")

        // Check if user already exists
        const existingUser = await db.collection("users").findOne({ email })
        if (existingUser) {
            return NextResponse.json({ error: 'User with this email already exists' }, { status: 409 })
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        // Create the user object
        const user = {
            firstName,
            lastName,
            email,
            password: hashedPassword,
            graduationYear,
            degree,
            studentId: studentId || null,
            agreeTerms,
            verificationStatus: "pending",
            createdAt: new Date(),
            updatedAt: new Date()
        }

        // Insert the user into the database
        const result = await db.collection("users").insertOne(user)

        // Return success response without exposing the password
        const { password: _, ...userWithoutPassword } = user

        return NextResponse.json({
            message: 'User registered successfully',
            user: userWithoutPassword,
            id: result.insertedId
        }, { status: 201 })

    } catch (error) {
        console.error('Registration error:', error)
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }
}
