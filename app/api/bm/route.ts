// app/api/bm/route.ts
import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import jwt from "jsonwebtoken"

// Middleware para verificar autenticação e role
async function authenticateUser(request: NextRequest) {
  try {
    const authHeader = request.headers.get("authorization")
    
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return { error: "Token não fornecido", status: 401 }
    }

    const token = authHeader.substring(7)
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "fallback-secret") as any
    
    if (!decoded.userId || !decoded.role) {
      return { error: "Token inválido", status: 401 }
    }

    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      select: { id: true, email: true, name: true, role: true }
    })

    if (!user) {
      return { error: "Usuário não encontrado", status: 401 }
    }

    return { user }
  } catch (error) {
    return { error: "Token inválido", status: 401 }
  }
}

// GET - Listar BM accounts (apenas ADMIN pode ver todas, USER vê apenas as suas)
export async function GET(request: NextRequest) {
  try {
    const auth = await authenticateUser(request)
    if ('error' in auth) {
      return NextResponse.json({ error: auth.error }, { status: auth.status })
    }

    const { user } = auth

    // Se for ADMIN, pode ver todas as BM accounts
    if (user.role === "ADMIN") {
      const bmAccounts = await prisma.bMAccount.findMany({
        orderBy: { createdAt: 'desc' }
      })

      return NextResponse.json(bmAccounts)
    }

    return NextResponse.json({ error: "Acesso negado. Apenas administradores podem ver todas as BM accounts." }, { status: 403 })
  } catch (error) {
    console.error("Erro ao listar BM accounts:", error)
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    )
  }
}

// POST - Criar nova BM account (apenas ADMIN pode criar)
export async function POST(request: NextRequest) {
  try {
    const auth = await authenticateUser(request)
    if ('error' in auth) {
      return NextResponse.json({ error: auth.error }, { status: auth.status })
    }

    const { user } = auth

    // Apenas ADMIN pode criar BM accounts
    if (user.role !== "ADMIN") {
      return NextResponse.json(
        { error: "Acesso negado. Apenas administradores podem criar BM accounts." },
        { status: 403 }
      )
    }

    const body = await request.json()
    const { title, description, priceBRL, status, type, platform, hash } = body

    const bmAccount = await prisma.bMAccount.create({
      data: {
        title,
        description,
        priceBRL: parseFloat(priceBRL),
        status,
        type,
        platform,
        hash
      }
    })

    return NextResponse.json(bmAccount, { status: 201 })
  } catch (error) {
    console.error("Erro ao criar BM account:", error)
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    )
  }
}

// PUT - Atualizar BM account (apenas ADMIN pode atualizar)
export async function PUT(request: NextRequest) {
  try {
    const auth = await authenticateUser(request)
    if ('error' in auth) {
      return NextResponse.json({ error: auth.error }, { status: auth.status })
    }

    const { user } = auth

    // Apenas ADMIN pode atualizar BM accounts
    if (user.role !== "ADMIN") {
      return NextResponse.json(
        { error: "Acesso negado. Apenas administradores podem atualizar BM accounts." },
        { status: 403 }
      )
    }

    const body = await request.json()
    const { id, title, description, priceBRL, status, type, platform, saleStatus, hash } = body

    const bmAccount = await prisma.bMAccount.update({
      where: { id },
      data: {
        title,
        description,
        priceBRL: parseFloat(priceBRL),
        status,
        type,
        platform,
        saleStatus,
        hash
      }
    })

    return NextResponse.json(bmAccount)
  } catch (error) {
    console.error("Erro ao atualizar BM account:", error)
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    )
  }
}

// DELETE - Deletar BM account (apenas ADMIN pode deletar)
export async function DELETE(request: NextRequest) {
  try {
    const auth = await authenticateUser(request)
    if ('error' in auth) {
      return NextResponse.json({ error: auth.error }, { status: auth.status })
    }

    const { user } = auth

    // Apenas ADMIN pode deletar BM accounts
    if (user.role !== "ADMIN") {
      return NextResponse.json(
        { error: "Acesso negado. Apenas administradores podem deletar BM accounts." },
        { status: 403 }
      )
    }

    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json(
        { error: "ID da BM account é obrigatório" },
        { status: 400 }
      )
    }

    await prisma.bMAccount.delete({
      where: { id }
    })

    return NextResponse.json({ message: "BM account deletada com sucesso" })
  } catch (error) {
    console.error("Erro ao deletar BM account:", error)
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    )
  }
}
