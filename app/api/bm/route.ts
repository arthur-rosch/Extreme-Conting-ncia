// app/api/bm/route.ts
import { NextResponse } from 'next/server'
import { prisma, } from '@/lib/prisma'
import { bmCreateSchema } from '@/lib/bm-zod'
import { normalizeSaleStatus, normalizeStatus, normalizeType } from '@/lib/bm-normalizers'
import { Prisma } from '@prisma/client'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const search = searchParams.get('search')?.trim() || undefined
    const page = Number(searchParams.get('page') ?? 1)
    const pageSize = Math.min(Number(searchParams.get('pageSize') ?? 20), 100)
    const skip = (page - 1) * pageSize

    // 🔧 força o tipo correto do Prisma
    let where: Prisma.BMAccountWhereInput = {}

    if (search) {
      const ci: Prisma.QueryMode = 'insensitive' // ou: const ci = 'insensitive' as const
      where = {
        OR: [
          { title: { contains: search, mode: ci } },
          { description: { contains: search, mode: ci } },
          { hash: { contains: search, mode: ci } }, // hash é String? no schema; o filtro funciona igual
        ],
      }
    }

    const [items, total] = await Promise.all([
      prisma.bMAccount.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip,
        take: pageSize,
      }),
      prisma.bMAccount.count({ where }),
    ])

    return NextResponse.json({
      items,
      page,
      pageSize,
      total,
      totalPages: Math.ceil(total / pageSize),
    })
  } catch (error) {
    console.error('Error in GET /api/bm:', error)
    return NextResponse.json({ message: 'Failed to fetch BM accounts' }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const raw = await req.json()
    const parsed = bmCreateSchema.parse(raw)

    const data = {
      title: parsed.title,
      description: parsed.description,
      priceBRL: parsed.priceBRL,
      status: normalizeStatus(parsed.status),
      type: normalizeType(parsed.type),
      platform: normalizeType(parsed.platform),
      saleStatus: normalizeSaleStatus(parsed.saleStatus),
      hash: parsed.hash ?? null,
    }

    const created = await prisma.bMAccount.create({ data })
    return NextResponse.json(created, { status: 201 })
  } catch (error: any) {
    console.error('Error in POST /api/bm:', error)
    const isZod = !!error?.issues
    return NextResponse.json(
      { message: isZod ? 'Invalid data' : 'Failed to create BM account', error: String(error.message ?? error) },
      { status: isZod ? 400 : 500 },
    )
  }
}
