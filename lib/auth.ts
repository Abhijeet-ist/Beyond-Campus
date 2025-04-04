// lib/auth.ts
"use client"

import { useRouter } from 'next/navigation'
import { useState, useEffect, createContext, useContext } from 'react'

type User = {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    graduationYear: string;
    degree: string;
}

type AuthContextType = {
    user: User | null;
    loading: boolean;
    login: (data: any) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
    user: null,
    loading: true,
    login: () => { },
    logout: () => { },
})

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null)
    const [loading, setLoading] = useState(true)
    const router = useRouter()

    // Check if user is logged in on mount
    useEffect(() => {
        const fetchCurrentUser = async () => {
            try {
                const res = await fetch('/api/user')
                if (res.ok) {
                    const userData = await res.json()
                    setUser(userData.user)
                }
            } catch (error) {
                console.error('Failed to fetch user:', error)
            } finally {
                setLoading(false)
            }
        }

        fetchCurrentUser()
    }, [])

    const login = (userData: User) => {
        setUser(userData)
    }

    const logout = async () => {
        try {
            const res = await fetch('/api/logout', {
                method: 'POST',
            })

            if (res.ok) {
                setUser(null)
                router.push('/login')
            }
        } catch (error) {
            console.error('Logout failed:', error)
        }
    }

    return (
        <AuthContext.Provider value= {{ user, loading, login, logout }
}>
    { children }
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
