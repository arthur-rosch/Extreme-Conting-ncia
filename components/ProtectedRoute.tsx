"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

interface ProtectedRouteProps {
  children: React.ReactNode
  requireAdmin?: boolean
  redirectTo?: string
}

export function ProtectedRoute({ children, requireAdmin = false, redirectTo }: ProtectedRouteProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [isAuthorized, setIsAuthorized] = useState(false)

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("token")
      const user = localStorage.getItem("user")

      if (!token || !user) {
        console.log("No token or user found, redirecting to login")
        router.push(redirectTo || "/admin/login")
        return
      }

      try {
        // Verificar token via API
        const response = await fetch("/api/auth/check", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ token }),
        })

        const data = await response.json()

        if (!response.ok || !data.valid) {
          console.log("Invalid token, redirecting to login")
          localStorage.removeItem("token")
          localStorage.removeItem("user")
          router.push(redirectTo || "/admin/login")
          return
        }

        // Se requer admin, verificar role
        if (requireAdmin && data.user.role !== "ADMIN") {
          console.log("User is not admin, redirecting to login")
          router.push(redirectTo || "/admin/login")
          return
        }

        console.log("User authorized:", data.user)
        setIsAuthorized(true)
      } catch (error) {
        console.log("Token verification failed:", error)
        localStorage.removeItem("token")
        localStorage.removeItem("user")
        router.push(redirectTo || "/admin/login")
      } finally {
        setIsLoading(false)
      }
    }

    checkAuth()
  }, [router, requireAdmin, redirectTo])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#010B18' }}>
        <div className="text-white">Carregando...</div>
      </div>
    )
  }

  if (!isAuthorized) {
    return null
  }

  return <>{children}</>
}
