import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { z } from "zod"
import { twoFactorAuthSchema, errorResponseSchema } from "@/lib/auth-schemas"



export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get("userId")

    if (!userId) {
      return NextResponse.json(
        { error: "Usuário não identificado. Faça login novamente." },
        { status: 400 }
      )
    }

    const auths = await prisma.twoFactorAuth.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" }
    })

    return NextResponse.json(auths)
  } catch (error) {
    console.error("Erro ao buscar 2FAs:", error)
    
    // Tratamento específico de erros
    if (error instanceof Error) {
      if (error.message.includes("prisma")) {
        return NextResponse.json(
          { error: "Erro na conexão com o banco de dados" },
          { status: 500 }
        )
      }
    }
    
    return NextResponse.json(
      { error: "Erro interno do servidor. Tente novamente." },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const validatedData = twoFactorAuthSchema.parse(body)

    const auth = await prisma.twoFactorAuth.create({
      data: {
        name: validatedData.name,
        issuer: validatedData.issuer,
        secret: validatedData.secret,
        userId: validatedData.userId
      }
    })

    return NextResponse.json(auth, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      const fieldErrors = error.errors.map(err => err.message).join(", ")
      return NextResponse.json(
        { error: `Dados inválidos: ${fieldErrors}` },
        { status: 400 }
      )
    }

    console.error("Erro ao criar 2FA:", error)
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    )
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { id, ...updateData } = body

    if (!id) {
      return NextResponse.json(
        { error: "ID é obrigatório" },
        { status: 400 }
      )
    }

    const auth = await prisma.twoFactorAuth.update({
      where: { id },
      data: updateData
    })

    return NextResponse.json(auth)
  } catch (error) {
    console.error("Erro ao atualizar 2FA:", error)
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    )
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get("id")

    if (!id) {
      return NextResponse.json(
        { error: "ID é obrigatório" },
        { status: 400 }
      )
    }

    await prisma.twoFactorAuth.delete({
      where: { id }
    })

    return NextResponse.json({ message: "2FA removido com sucesso" })
  } catch (error) {
    console.error("Erro ao deletar 2FA:", error)
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    )
  }
}
