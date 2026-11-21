"use client"

import { useState, createContext, useContext, useEffect } from "react"
import { login, logout, getCurrentUser } from "@/lib/auth"

const AuthContext = createContext(null)

export function AuthProvider({children}){
    const [user, setUser] = useState(null)
    useEffect(()=>{setUser(getCurrentUser())}, [])
    
    function handleLogin(email, password){
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
    return useContext(AuthContext)
}