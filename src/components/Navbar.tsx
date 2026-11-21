"use client"

import Link from "next/link"
import { useAuth } from "./AuthProvider"

export default function Navbar(){
    const {user, logout} = useAuth()
    return (
        <nav className="flex justify-between items-center p-4 border-b">
            <Link href="/">InvestSync</Link>

            <div className="flex items-center gap-4">
                <Link href="/team">Team</Link>
                <Link href="/events">Events</Link>
                <Link href="/research">Research</Link>
                <Link href="/slides">Slides Archive</Link>
                <Link href="/companies">Companies</Link>
            </div>

            {user ? (
                <div className="flex items-center gap-3">
                    <span>{user.name}</span>
                    <button onClick={logout}>Logout</button>
                </div>
            ) : (
                <Link href="/login">Admin Login</Link>
            )}
        </nav>
    )
}