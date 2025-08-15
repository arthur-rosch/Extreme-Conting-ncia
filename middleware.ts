import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import jwt from 'jsonwebtoken'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Rotas que precisam de autenticação
  const protectedRoutes = ['/2fa', '/admin']
  
  // Rotas de login (não são protegidas)
  const loginRoutes = ['/login', '/admin/login']
  
  // Rotas que precisam de role ADMIN
  const adminRoutes = ['/admin']
  
  // Verificar se está acessando uma rota protegida (excluindo rotas de login)
  const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route)) && 
                          !loginRoutes.some(route => pathname === route)
  
  if (isProtectedRoute) {
    // Para rotas protegidas, deixar o frontend verificar o token
    // O middleware não pode acessar localStorage, então vamos deixar passar
    return NextResponse.next()
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}