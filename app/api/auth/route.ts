import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { z } from "zod"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { loginSchema, registerSchema, authResponseSchema, errorResponseSchema } from "@/lib/auth-schemas"



export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { action, ...data } = body

    if (action === "login") {
      return await handleLogin(data)
    } else if (action === "register") {
      return await handleRegister(data)
    } else {
      return NextResponse.json(
        { error: "Ação inválida" },
        { status: 400 }
      )
    }
      } catch (error) {
      console.error("Erro na autenticação:", error)
      
      // Tratamento específico de erros
      if (error instanceof Error) {
        if (error.message.includes("bcrypt")) {
          return NextResponse.json(
            { error: "Erro na criptografia da senha" },
            { status: 500 }
          )
        }
        if (error.message.includes("jwt")) {
          return NextResponse.json(
            { error: "Erro na geração do token" },
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

async function handleLogin(data: any) {
  try {
    const validatedData = loginSchema.parse(data)

    const user = await prisma.user.findUnique({
      where: { email: validatedData.email }
    }) as any

    if (!user) {
      return NextResponse.json(
        { error: "Email ou senha incorretos. Verifique suas credenciais." },
        { status: 401 }
      )
    }

    const isPasswordValid = await bcrypt.compare(validatedData.password, user.password)

    if (!isPasswordValid) {
      return NextResponse.json(
        { error: "Email ou senha incorretos. Verifique suas credenciais." },
        { status: 401 }
      )
    }



    const token = jwt.sign(
      { userId: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET || "fallback-secret",
      { expiresIn: "7d" }
    )

    return NextResponse.json({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
      },
      token
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      const fieldErrors = error.errors.map(err => err.message).join(", ")
      return NextResponse.json(
        { error: `Dados inválidos: ${fieldErrors}` },
        { status: 400 }
      )
    }
    throw error
  }
}

async function handleRegister(data: any) {
  try {
    const validatedData = registerSchema.parse(data)

    const existingUser = await prisma.user.findUnique({
      where: { email: validatedData.email }
    })

    if (existingUser) {
      return NextResponse.json(
        { error: "Este email já está cadastrado. Tente fazer login ou use outro email." },
        { status: 409 }
      )
    }

    const hashedPassword = await bcrypt.hash(validatedData.password, 12)

    const user = await prisma.user.create({
      data: {
        name: validatedData.name,
        email: validatedData.email,
        password: hashedPassword,
        role: "USER"
      } as any
    }) as any

    const token = jwt.sign(
      { userId: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET || "fallback-secret",
      { expiresIn: "7d" }
    )

    return NextResponse.json({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
      },
      token
    }, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Dados inválidos", details: error.errors },
        { status: 400 }
      )
    }
    throw error
  }
}
