// app/api/login/route.ts
import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import bcrypt from 'bcryptjs';
import { cookies } from 'next/headers';
import { sign } from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-default-jwt-secret-key';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { loginType, email, alumniId, password, remember } = body;

        // Validate required fields
        if ((!email && !alumniId) || !password) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        // Connect to MongoDB
        const client = await clientPromise;
        const db = client.db("alumniDB");
        const usersCollection = db.collection("users");

        // Find user by email or alumni ID
        const query = loginType === 'email'
            ? { email: email.toLowerCase() }
            : { studentId: alumniId };

        const user = await usersCollection.findOne(query);

        // Check if user exists
        if (!user) {
            return NextResponse.json({
                error: loginType === 'email'
                    ? 'No account found with this email address'
                    : 'No account found with this Alumni ID'
            }, { status: 404 });
        }

        // Verify password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return NextResponse.json({ error: 'Invalid password' }, { status: 401 });
        }

        // Generate JWT token
        const token = sign(
            {
                userId: user._id,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName
            },
            JWT_SECRET,
            { expiresIn: remember ? '30d' : '24h' }
        );

        // Set cookie
        const cookieOptions = {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict' as const,
            maxAge: remember ? 30 * 24 * 60 * 60 : 24 * 60 * 60, // 30 days or 24 hours in seconds
            path: '/',
        };

        // Set cookie in the response
        cookies().set('token', token, cookieOptions);

        // Return success response
        return NextResponse.json({
            message: 'Login successful',
            user: {
                id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                graduationYear: user.graduationYear,
                degree: user.degree
            }
        });

    } catch (error) {
        console.error('Login error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
