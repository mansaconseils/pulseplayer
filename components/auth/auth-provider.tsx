"use client"

import { useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"
import { useAuthStore } from "@/lib/auth/store"

const PUBLIC_PATHS = ["/login", "/register"]

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { user, session } = useAuthStore()
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    const isPublicPath = PUBLIC_PATHS.includes(pathname)
    const isAuthenticated = user && session

    if (!isAuthenticated && !isPublicPath) {
      router.push("/login")
    } else if (isAuthenticated && isPublicPath) {
      router.push("/")
    }
  }, [user, session, pathname, router])

  return <>{children}</>
}