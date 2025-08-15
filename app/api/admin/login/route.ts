import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { serialize } from 'cookie';

export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json();

    // Buscar usuário pelo email (username)
    const user = await prisma.user.findUnique({
      where: { email: username }
    }) as any;

    if (!user) {
      return NextResponse.json(
        { message: 'Credenciais inválidas' },
        { status: 401 }
      );
    }

    // Verificar se é ADMIN
    if (user.role !== 'ADMIN') {
      return NextResponse.json(
        { message: 'Acesso negado. Apenas administradores podem fazer login.' },
        { status: 403 }
      );
    }

    // Verificar senha
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return NextResponse.json(
        { message: 'Credenciais inválidas' },
        { status: 401 }
      );
    }

    // Gerar JWT token
    const token = jwt.sign(
      { userId: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET || "fallback-secret",
      { expiresIn: "7d" }
    );

    // Salvar token em cookie
    const cookie = serialize('auth-token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: '/',
      sameSite: 'lax',
    });

    return new NextResponse(JSON.stringify({ 
      message: 'Login successful',
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
      },
      token
    }), {
      status: 200,
      headers: { 'Set-Cookie': cookie },
    });
  } catch (error) {
    console.error('Erro no login admin:', error);
    return NextResponse.json(
      { message: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}

export const dynamic = "force-dynamic";