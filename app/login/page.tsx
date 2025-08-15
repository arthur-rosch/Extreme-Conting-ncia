"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

import { toast } from "@/hooks/use-toast"
import { Eye, EyeOff } from "lucide-react"
import { loginSchema, registerSchema, authResponseSchema, errorResponseSchema, type LoginFormData, type RegisterFormData } from "@/lib/auth-schemas"

export default function LoginPage() {
  const router = useRouter()
  const [isLogin, setIsLogin] = useState(true)
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)

  // Form para login
  const loginForm = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: ""
    }
  })

  // Form para registro
  const registerForm = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: ""
    }
  })

  // Verificar se já está logado
  useEffect(() => {
    const token = localStorage.getItem("token")
    const user = localStorage.getItem("user")
    
    if (token && user) {
      // Verificar se o token ainda é válido fazendo uma requisição
      fetch("/api/auth/verify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        }
      })
      .then(response => {
        if (response.ok) {
          router.push("/2fa")
        } else {
          // Token inválido, limpar dados
          localStorage.removeItem("token")
          localStorage.removeItem("user")
          document.cookie = "auth-token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT"
        }
      })
      .catch(() => {
        // Erro na verificação, limpar dados
        localStorage.removeItem("token")
        localStorage.removeItem("user")
        document.cookie = "auth-token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT"
      })
    }
  }, [router])

  const onSubmit = async (data: LoginFormData | RegisterFormData) => {
    setLoading(true)

    try {
      const response = await fetch("/api/auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          action: isLogin ? "login" : "register",
          ...data
        }),
      })

      const responseData = await response.json()

      if (!response.ok) {
        // Validar resposta de erro
        const errorData = errorResponseSchema.safeParse(responseData)
        if (errorData.success) {
          throw new Error(errorData.data.error)
        } else {
          throw new Error("Erro na autenticação")
        }
      }

      // Validar resposta de sucesso
      const authData = authResponseSchema.safeParse(responseData)
      if (!authData.success) {
        throw new Error("Resposta inválida do servidor")
      }

      // Salvar token no localStorage e cookies
      localStorage.setItem("token", authData.data.token)
      localStorage.setItem("user", JSON.stringify(authData.data.user))
      
      // Salvar token em cookie para o middleware
      document.cookie = `auth-token=${authData.data.token}; path=/; max-age=${7 * 24 * 60 * 60}`

      toast({
        title: "Sucesso!",
        description: isLogin ? "Login realizado com sucesso" : "Conta criada com sucesso",
      })

      // Redirecionar para 2FA
      router.push("/2fa")   
    } catch (error: any) {
      console.error("Erro no login:", error)
      
      toast({
        title: "Erro",
        description: error.message || "Erro na autenticação. Tente novamente.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{ backgroundColor: '#010B18' }}>
      <div className="w-full max-w-md">
        <Card className="bg-white/[0.02] border border-white/[0.05] rounded-2xl backdrop-blur-sm shadow-card text-white">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-semibold text-white/95">
              {isLogin ? "Entrar" : "Criar Conta"}
            </CardTitle>
            <CardDescription className="text-white/60">
              {isLogin ? "Entre com suas credenciais" : "Crie sua conta para começar"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={isLogin ? loginForm.handleSubmit(onSubmit) : registerForm.handleSubmit(onSubmit)} className="space-y-4">
              {!isLogin && (
                <div className="grid gap-2">
                  <Label htmlFor="name" className="text-white/90">Nome</Label>
                  <Input
                    id="name"
                    type="text"
                    {...registerForm.register("name")}
                    placeholder="Seu nome completo"
                    className="bg-white/[0.02] border-white/[0.05] text-white placeholder:text-white/40 hover:bg-white/[0.04] focus:bg-white/[0.04] focus:border-white/10"
                  />
                  {registerForm.formState.errors.name && (
                    <p className="text-red-400 text-sm">{registerForm.formState.errors.name.message}</p>
                  )}
                </div>
              )}

              <div className="grid gap-2">
                <Label htmlFor="email" className="text-white/90">Email</Label>
                <Input
                  id="email"
                  type="email"
                  {...(isLogin ? loginForm.register("email") : registerForm.register("email"))}
                  placeholder="seu@email.com"
                  className="bg-white/[0.02] border-white/[0.05] text-white placeholder:text-white/40 hover:bg-white/[0.04] focus:bg-white/[0.04] focus:border-white/10"
                />
                {(isLogin ? loginForm.formState.errors.email : registerForm.formState.errors.email) && (
                  <p className="text-red-400 text-sm">{(isLogin ? loginForm.formState.errors.email : registerForm.formState.errors.email)?.message}</p>
                )}
              </div>

              <div className="grid gap-2">
                <Label htmlFor="password" className="text-white/90">Senha</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    {...(isLogin ? loginForm.register("password") : registerForm.register("password"))}
                    placeholder="Sua senha"
                    className="bg-white/[0.02] border-white/[0.05] text-white placeholder:text-white/40 hover:bg-white/[0.04] focus:bg-white/[0.04] focus:border-white/10 pr-10"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 text-white/60 hover:text-white hover:bg-white/5"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </Button>
                </div>
                {(isLogin ? loginForm.formState.errors.password : registerForm.formState.errors.password) && (
                  <p className="text-red-400 text-sm">{(isLogin ? loginForm.formState.errors.password : registerForm.formState.errors.password)?.message}</p>
                )}
              </div>

              <Button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white hover:text-white font-medium rounded-2xl h-12 transition-all duration-300"
                disabled={loading || (isLogin ? loginForm.formState.isSubmitting : registerForm.formState.isSubmitting)}
              >
                {loading ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                    {isLogin ? "Entrando..." : "Criando conta..."}
                  </div>
                ) : (
                  <div className="flex items-center">
                    {isLogin ? "Entrar com Email" : "Criar Conta"}
                  </div>
                )}
              </Button>
            </form>
          </CardContent>
          <CardFooter>
            <div className="text-center w-full">
              <p className="text-white/60 text-sm">
                {isLogin ? "Não tem uma conta?" : "Já tem uma conta?"}{" "}
                <Button
                  variant="link"
                  onClick={() => {
                    setIsLogin(!isLogin)
                    // Limpar formulários
                    loginForm.reset()
                    registerForm.reset()
                  }}
                  className="text-white/80 hover:text-white p-0 h-auto text-sm"
                >
                  {isLogin ? "Criar conta" : "Fazer login"}
                </Button>
              </p>
            </div>
          </CardFooter>
        </Card>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-white/40 text-sm">
            Extreme Contingência © 2024
          </p>
        </div>
      </div>
    </div>
  )
}
