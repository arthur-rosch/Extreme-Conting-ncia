import { NextRequest, NextResponse } from "next/server"
import jwt from "jsonwebtoken"
import { prisma } from "@/lib/prisma"

export async function POST(request: NextRequest) {
  try {
    const authHeader = request.headers.get("authorization")
    
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json(
        { error: "Token não fornecido" },
        { status: 401 }
      )
    }

    const token = authHeader.substring(7) // Remove "Bearer "
    
    // Verificar token
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "fallback-secret") as any
    
    if (!decoded.userId) {
      return NextResponse.json(
        { error: "Token inválido" },
        { status: 401 }
      )
    }

    // Verificar se o usuário ainda existe no banco
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      select: { id: true, email: true, name: true, role: true }
    })

    if (!user) {
      return NextResponse.json(
        { error: "Usuário não encontrado" },
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
    
    if (error instanceof jwt.JsonWebTokenError) {
      return NextResponse.json(
        { error: "Token inválido" },
        { status: 401 }
      )
    }
    
    if (error instanceof jwt.TokenExpiredError) {
      return NextResponse.json(
        { error: "Token expirado" },
        { status: 401 }
      )
    }

    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    )
  }
}

