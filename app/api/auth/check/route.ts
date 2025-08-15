import { NextRequest, NextResponse } from "next/server"
import jwt from "jsonwebtoken"
import { prisma } from "@/lib/prisma"

export async function POST(request: NextRequest) {
  try {
    const { token } = await request.json()

    if (!token) {
      return NextResponse.json(
        { valid: false, error: "Token não fornecido" },
        { status: 401 }
      )
    }

    // Verificar token
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "fallback-secret") as any
    
    if (!decoded.userId || !decoded.role) {
      return NextResponse.json(
        { valid: false, error: "Token inválido" },
        { status: 401 }
      )
    }

    // Verificar se o usuário ainda existe no banco
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId }
    }) as any

    if (!user) {
      return NextResponse.json(
        { valid: false, error: "Usuário não encontrado" },
        { status: 401 }
      )
    }

    return NextResponse.json({
      valid: true,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role
      }
    })
  } catch (error) {
    console.error("Erro na verificação do token:", error)
    return NextResponse.json(
      { valid: false, error: "Token inválido" },
      { status: 401 }
    )
  }
}
