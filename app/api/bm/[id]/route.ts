// app/api/bm/[id]/route.ts
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { bmUpdateSchema } from '@/lib/bm-zod'
import { normalizeSaleStatus, normalizeStatus, normalizeType } from '@/lib/bm-normalizers'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

type Params = { params: { id: string } }

// (opcional) GET /api/bm/:id
export async function GET(_req: Request, { params }: Params) {
  try {
    const item = await prisma.bMAccount.findUnique({ where: { id: params.id } })
    if (!item) return NextResponse.json({ message: 'Not found' }, { status: 404 })
    return NextResponse.json(item)
  } catch (error) {
    console.error(`Error in GET /api/bm/${params.id}:`, error)
    return NextResponse.json({ message: 'Failed to fetch' }, { status: 500 })
  }
}

/**
 * PUT /api/bm/:id
 * Semântica clássica de PUT: aceita payload “completo”.
 * Mas aqui suportamos parcial também (igual PATCH) para praticidade.
 */
export async function PUT(req: Request, { params }: Params) {
  try {
    const raw = await req.json()
    const parsed = bmUpdateSchema.parse(raw)

    const data: any = {}
    if (parsed.title !== undefined) data.title = parsed.title
    if (parsed.description !== undefined) data.description = parsed.description
    if (parsed.priceBRL !== undefined) data.priceBRL = parsed.priceBRL
    if (parsed.status !== undefined) data.status = normalizeStatus(parsed.status)
    if (parsed.type !== undefined) data.type = normalizeType(parsed.type)
    if (parsed.platform !== undefined) data.platform = normalizeType(parsed.platform)
    if (parsed.saleStatus !== undefined) data.saleStatus = normalizeSaleStatus(parsed.saleStatus)
    if (parsed.hash !== undefined) data.hash = parsed.hash ?? null

    const updated = await prisma.bMAccount.update({
      where: { id: params.id },
      data,
    })
    return NextResponse.json(updated)
  } catch (error: any) {
    console.error(`Error in PUT /api/bm/${params.id}:`, error)
    if (error?.code === 'P2025') {
      return NextResponse.json({ message: 'BM account not found' }, { status: 404 })
    }
    const isZod = !!error?.issues
    return NextResponse.json(
      { message: isZod ? 'Invalid data' : 'Failed to update BM account', error: String(error.message ?? error) },
      { status: isZod ? 400 : 500 },
    )
  }
}

/**
 * PATCH /api/bm/:id (opcional)
 * Idêntico ao PUT acima (parcial). Mantive por ergonomia REST.
 */
export async function PATCH(req: Request, ctx: Params) {
  return PUT(req, ctx)
}

// DELETE /api/bm/:id
export async function DELETE(_req: Request, { params }: Params) {
  try {
    await prisma.bMAccount.delete({ where: { id: params.id } })
    return new NextResponse(null, { status: 204 })
  } catch (error: any) {
    console.error(`Error in DELETE /api/bm/${params.id}:`, error)
    if (error?.code === 'P2025') {
      return NextResponse.json({ message: 'BM account not found' }, { status: 404 })
    }
    return NextResponse.json({ message: 'Failed to delete BM account' }, { status: 500 })
  }
}
