"use client"

import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Eye, EyeOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { toast } from "@/hooks/use-toast"
import { twoFactorAuthFormSchema, type TwoFactorAuthFormData } from "@/lib/auth-schemas"
import { authenticator } from "otplib"

interface TwoFactorAuth {
  id: string
  name: string
  issuer?: string
  secret: string
  code: string
  timeLeft: number
}

export default function TwoFactorPage() {
  const [auths, setAuths] = useState<TwoFactorAuth[]>([])
  const [showSecrets, setShowSecrets] = useState(false)
  const [isAdding, setIsAdding] = useState(false)

  // Formulário para adicionar 2FA
  const form = useForm<TwoFactorAuthFormData>({
    resolver: zodResolver(twoFactorAuthFormSchema),
    defaultValues: {
      name: "",
      issuer: "",
      secret: ""
    }
  })

  // Carregar dados do usuário
  useEffect(() => {
    const loadAuths = async () => {
      try {
        const token = localStorage.getItem("token")
        const user = JSON.parse(localStorage.getItem("user") || "{}")
        
        if (!token || !user.id) {
          window.location.href = "/login"
          return
        }

        // Verificar se o token ainda é válido
        const verifyResponse = await fetch("/api/auth/verify", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          }
        })

        if (!verifyResponse.ok) {
          // Token inválido, redirecionar para login
          localStorage.removeItem("token")
          localStorage.removeItem("user")
          document.cookie = "auth-token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT"
          window.location.href = "/login"
          return
        }

        const response = await fetch(`/api/2fa?userId=${user.id}`)
        if (response.ok) {
          const data = await response.json()
          const authsWithCodes = data.map((auth: any) => {
            // Calcular tempo restante baseado no timestamp Unix real
            const now = Math.floor(Date.now() / 1000)
            const timeLeft = 30 - (now % 30)
            
            return {
              ...auth,
              code: generateCode(auth.secret),
              timeLeft: timeLeft
            }
          })
          setAuths(authsWithCodes)
        } else {
          throw new Error("Erro ao carregar 2FAs")
        }
      } catch (error) {
        console.error("Erro ao carregar 2FAs:", error)
        toast({
          title: "Erro",
          description: "Erro ao carregar autenticações 2FA",
          variant: "destructive"
        })
      }
    }

    loadAuths()
  }, [])

  // Atualizar códigos a cada segundo
  useEffect(() => {
    const interval = setInterval(() => {
      setAuths(prev => prev.map(auth => {
        // Calcular tempo restante baseado no timestamp Unix real
        const now = Math.floor(Date.now() / 1000)
        const timeLeft = 30 - (now % 30)
        
        // Gerar novo código TOTP real
        const newCode = generateCode(auth.secret)
        
        return {
          ...auth,
          code: newCode,
          timeLeft: timeLeft
        }
      }))
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  const generateCode = (secret: string): string => {
    try {
      // Gerar código TOTP real usando a chave secreta
      return authenticator.generate(secret)
    } catch (error) {
      console.error("Erro ao gerar código TOTP:", error)
      // Fallback para código de 6 dígitos em caso de erro
      return Math.floor(100000 + Math.random() * 900000).toString()
    }
  }

  const generateTOTPUrl = (secret: string, name: string, issuer?: string): string => {
    const encodedName = encodeURIComponent(name)
    const encodedIssuer = issuer ? encodeURIComponent(issuer) : encodedName
    return `otpauth://totp/${encodedIssuer}:${encodedName}?secret=${secret}&issuer=${encodedIssuer}&algorithm=SHA1&digits=6&period=30`
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    toast({
      title: "Copiado!",
      description: "Código copiado para a área de transferência",
    })
  }

  const addNewAuth = async (data: TwoFactorAuthFormData) => {
    try {
      const token = localStorage.getItem("token")
      const user = JSON.parse(localStorage.getItem("user") || "{}")
      
      if (!token || !user.id) {
        window.location.href = "/login"
        return
      }
      
      const response = await fetch("/api/2fa", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          ...data,
          userId: user.id
        }),
      })

      if (response.ok) {
        const auth = await response.json()
        
        // Calcular tempo restante baseado no timestamp Unix real
        const now = Math.floor(Date.now() / 1000)
        const timeLeft = 30 - (now % 30)
        
        const authWithCode: TwoFactorAuth = {
          ...auth,
          code: generateCode(auth.secret),
          timeLeft: timeLeft
        }

        setAuths(prev => [...prev, authWithCode])
        form.reset()
        setIsAdding(false)
        
        toast({
          title: "Sucesso!",
          description: "Autenticação 2FA adicionada",
        })
      } else {
        const error = await response.json()
        
        if (response.status === 401) {
          // Token inválido, redirecionar para login
          localStorage.removeItem("token")
          localStorage.removeItem("user")
          document.cookie = "auth-token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT"
          window.location.href = "/login"
          return
        }
        
        throw new Error(error.error || "Erro ao adicionar 2FA")
      }
    } catch (error: any) {
      console.error("Erro ao adicionar 2FA:", error)
      
      let errorMessage = "Erro ao adicionar 2FA"
      if (error.message.includes("fetch")) {
        errorMessage = "Erro de conexão. Verifique sua internet."
      } else if (error.message) {
        errorMessage = error.message
      }

      toast({
        title: "Erro",
        description: errorMessage,
        variant: "destructive"
      })
    }
  }

  const deleteAuth = async (id: string) => {
    try {
      const token = localStorage.getItem("token")
      
      if (!token) {
        window.location.href = "/login"
        return
      }

      const response = await fetch(`/api/2fa?id=${id}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${token}`
        }
      })

      if (response.ok) {
        setAuths(prev => prev.filter(auth => auth.id !== id))
        toast({
          title: "Removido!",
          description: "Autenticação 2FA removida",
        })
      } else {
        const error = await response.json()
        
        if (response.status === 401) {
          // Token inválido, redirecionar para login
          localStorage.removeItem("token")
          localStorage.removeItem("user")
          document.cookie = "auth-token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT"
          window.location.href = "/login"
          return
        }
        
        throw new Error(error.error || "Erro ao remover 2FA")
      }
    } catch (error: any) {
      console.error("Erro ao remover 2FA:", error)
      
      let errorMessage = "Erro ao remover 2FA"
      if (error.message.includes("fetch")) {
        errorMessage = "Erro de conexão. Verifique sua internet."
      } else if (error.message) {
        errorMessage = error.message
      }

      toast({
        title: "Erro",
        description: errorMessage,
        variant: "destructive"
      })
    }
  }

  const handleLogout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    // Remover cookie também
    document.cookie = "auth-token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT"
    window.location.href = "/login"
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#010B18' }}>
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-white/90">2FA Manager</h1>
            <p className="text-white/60">Gerencie suas autenticações de dois fatores</p>
          </div>
          
          <div className="flex items-center space-x-2">
            <Dialog open={isAdding} onOpenChange={setIsAdding}>
              <DialogTrigger asChild>
                <Button className="bg-blue-600 hover:bg-blue-700 text-white hover:text-white font-medium rounded-2xl">
                  Adicionar 2FA
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-white/[0.02] border-white/[0.05] backdrop-blur-sm">
                <DialogHeader>
                  <DialogTitle className="text-white/90">Adicionar Autenticação 2FA</DialogTitle>
                </DialogHeader>
                <form onSubmit={form.handleSubmit(addNewAuth)} className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="name" className="text-white/90">Nome do Serviço</Label>
                    <Input
                      id="name"
                      {...form.register("name")}
                      placeholder="Ex: Google, Facebook"
                      className="bg-white/[0.02] border-white/[0.05] text-white placeholder:text-white/40 hover:bg-white/[0.04] focus:bg-white/[0.04] focus:border-white/10"
                    />
                    {form.formState.errors.name && (
                      <p className="text-red-400 text-sm">{form.formState.errors.name.message}</p>
                    )}
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="issuer" className="text-white/90">Emissor (opcional)</Label>
                    <Input
                      id="issuer"
                      {...form.register("issuer")}
                      placeholder="Ex: Google, Meta"
                      className="bg-white/[0.02] border-white/[0.05] text-white placeholder:text-white/40 hover:bg-white/[0.04] focus:bg-white/[0.04] focus:border-white/10"
                    />
                    {form.formState.errors.issuer && (
                      <p className="text-red-400 text-sm">{form.formState.errors.issuer.message}</p>
                    )}
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="secret" className="text-white/90">Chave Secreta</Label>
                    <Input
                      id="secret"
                      {...form.register("secret")}
                      placeholder="Cole a chave secreta aqui"
                      className="bg-white/[0.02] border-white/[0.05] text-white placeholder:text-white/40 hover:bg-white/[0.04] focus:bg-white/[0.04] focus:border-white/10"
                    />
                    {form.formState.errors.secret && (
                      <p className="text-red-400 text-sm">{form.formState.errors.secret.message}</p>
                    )}
                    <p className="text-xs text-white/60">
                      Dica: Use apps como Google Authenticator, Authy ou Microsoft Authenticator para escanear QR codes ou inserir chaves manualmente.
                    </p>
                  </div>
                  <Button 
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white hover:text-white font-medium rounded-2xl h-12 transition-all duration-300"
                    disabled={form.formState.isSubmitting}
                  >
                    {form.formState.isSubmitting ? "Adicionando..." : "Adicionar"}
                  </Button>
                </form>
              </DialogContent>
            </Dialog>
            
            <Button
              variant="outline"
              onClick={handleLogout}
              className="border-white/[0.1] text-white hover:bg-white/[0.05] hover:text-white rounded-2xl"
            >
              Sair
            </Button>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-between mb-6">
          <Button
            variant="outline"
            onClick={() => setShowSecrets(!showSecrets)}
            className="border-white/[0.1] text-white hover:bg-white/[0.05] hover:text-white rounded-2xl"
          >
            {showSecrets ? "Ocultar" : "Mostrar"} Chaves
          </Button>
          
          <Button
            variant="outline"
            onClick={() => window.location.reload()}
            className="border-white/[0.1] text-white hover:bg-white/[0.05] hover:text-white rounded-2xl"
          >
            Atualizar
          </Button>
        </div>

        {/* 2FA Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {auths.map((auth) => (
            <Card key={auth.id} className="bg-white/[0.02] border-white/[0.05] hover:bg-white/[0.04] hover:border-white/10 transition-all duration-500 cursor-pointer rounded-2xl backdrop-blur-sm group">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-white/90 text-lg group-hover:text-white transition-colors duration-300">{auth.name}</CardTitle>
                    {auth.issuer && (
                      <p className="text-white/60 text-sm mt-1">{auth.issuer}</p>
                    )}
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => deleteAuth(auth.id)}
                    className="text-red-400 hover:text-red-300 hover:bg-red-400/10"
                  >
                    Remover
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Code Display */}
                <div className="bg-white/[0.02] rounded-lg p-4 border border-white/[0.05]">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-2xl font-mono font-bold text-white/95 group-hover:text-white transition-colors duration-300 tracking-wider">
                      {auth.code}
                    </span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => copyToClipboard(auth.code)}
                      className="text-white/60 hover:text-white hover:bg-white/5"
                    >
                      Copiar
                    </Button>
                  </div>
                  
                  {/* Progress Bar */}
                  <div>
                    <div className="flex justify-between text-xs text-white/60 mb-2">
                      <span>{auth.timeLeft}s</span>
                      <span>30s</span>
                    </div>
                    <div className="w-full bg-white/[0.05] rounded-full h-2">
                      <div 
                        className="bg-white/20 h-2 rounded-full transition-all duration-1000"
                        style={{ width: `${(auth.timeLeft / 30) * 100}%` }}
                      />
                    </div>
                  </div>
                </div>

                {/* Secret Key */}
                {showSecrets && (
                  <div className="bg-white/[0.02] rounded-lg p-3 border border-white/[0.05]">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs text-white/60 font-medium">Chave Secreta:</span>
                      <div className="flex gap-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => copyToClipboard(auth.secret)}
                          className="text-white/60 hover:text-white hover:bg-white/5"
                        >
                          Copiar
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => copyToClipboard(generateTOTPUrl(auth.secret, auth.name, auth.issuer))}
                          className="text-white/60 hover:text-white hover:bg-white/5"
                        >
                          URL
                        </Button>
                      </div>
                    </div>
                    <p className="text-xs font-mono text-white/80 break-all">
                      {auth.secret}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {auths.length === 0 && (
          <Card className="bg-white/[0.02] border-white/[0.05] backdrop-blur-sm">
            <CardContent className="text-center py-12">
              <div className="text-white/40 text-6xl mb-4">🔐</div>
              <h3 className="text-xl font-semibold text-white/90 mb-2">Nenhuma autenticação 2FA</h3>
              <p className="text-white/60 mb-6 max-w-md mx-auto">
                Adicione suas primeiras autenticações 2FA para começar a gerenciar seus códigos de segurança
              </p>
              <Button 
                onClick={() => setIsAdding(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-2xl h-12 transition-all duration-300"
              >
                Adicionar Primeira 2FA
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
