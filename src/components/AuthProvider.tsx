"use client"

import { useState, createContext, useContext, useEffect, type ReactNode } from "react"
import { login, logout, getCurrentUser, type User } from "@/lib/auth"

// The shape of what useAuth() hands out.
type AuthContextValue = {
    user: User | null
    login: (email: string, password: string) => User | null
    logout: () => void
}

const AuthContext = createContext<AuthContextValue | null>(null)

export function AuthProvider({ children }: { children: ReactNode }){
    const [user, setUser] = useState<User | null>(null)
    // Load the saved login once, in the browser only (the server has no localStorage).
    // eslint-disable-next-line react-hooks/set-state-in-effect -- intentional: localStorage can only be read after the page loads
    useEffect(()=>{setUser(getCurrentUser())}, [])

    function handleLogin(email: string, password: string){
        const user = login(email, password)
        if (user){
            setUser(user)
        }
        return user
    }

    function handleLogout(){
        logout()
        setUser(null)
    }

    return (<AuthContext.Provider value={{
        user,
        login : handleLogin,
        logout : handleLogout
    }}>
        {children}
    </AuthContext.Provider>)
}

export function useAuth() {
    const context = useContext(AuthContext)
    // Only happens if a component calls useAuth() outside <AuthProvider>.
    if (!context) {
        throw new Error("useAuth must be used inside <AuthProvider>")
    }
    return context
}
