"use client"

import {useState} from "react"
import { useRouter } from "next/navigation"
import { login } from "@/lib/auth"

export default function LoginPage(){
    const[email, setEmail] = useState("")
    const[password, setPassword] = useState("")
    const[error, setError] = useState("")

    const router = useRouter()

    function handleSubmit(e){
        e.preventDefault()
        const user = login(email, password)
        if(!user){
            setError("Wrong email or password")
            return
        }

        router.push("/")
    }

    return(
        <form onSubmit={handleSubmit} className="flex flex-col gap-3 max-w-sm mx-auto mt-20">
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e)=>{
                    setEmail(e.target.value);
                    setError("");
                }}
                className="border rounded p-2"
            />

            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
                className="border rounded p-2"
            />
            <button 
                type="submit"
                className="border hover:shadow-2xl hover:font-bold"
            >
                Login
            </button>
            {error && (<p>{error}</p>)}
        </form>
    )
}