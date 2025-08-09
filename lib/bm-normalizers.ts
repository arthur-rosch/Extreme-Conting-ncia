// lib/bm-normalizers.ts
import { BmStatus, BmType, BmSaleStatus } from '@prisma/client'

const statusMap: Record<string, BmStatus> = {
  '1-10k': 'ONE_10K',
  '10k-30k': 'TENK_30K',
  '30k-70k': 'THIRTYK_70K',
  '70k-100k': 'SEVENTYK_100K',
  '100k-500k': 'HUNDREDK_500K',
  '500k+': 'FIVEHUNDREDK_PLUS',

  // também aceitar nomes internos, em qualquer casing
  one_10k: 'ONE_10K',
  tenk_30k: 'TENK_30K',
  thirtyk_70k: 'THIRTYK_70K',
  seventyk_100k: 'SEVENTYK_100K',
  hundredk_500k: 'HUNDREDK_500K',
  fivehundredk_plus: 'FIVEHUNDREDK_PLUS',
}

export function normalizeStatus(input: string): BmStatus {
  const key = input.trim().toLowerCase()
  const mapped = statusMap[key]
  if (mapped) return mapped
  // tenta direto se vier exatamente o enum
  if ((Object.values(BmStatus) as string[]).includes(input as any)) return input as BmStatus
  throw new Error(`Invalid status: "${input}"`)
}

export function normalizeType(input: string): BmType {
  const v = input.trim().toLowerCase()
  if (v === 'meta' || v === 'google') return v as BmType
  throw new Error(`Invalid type: "${input}"`)
}

export function normalizeSaleStatus(input?: string | null): BmSaleStatus {
  const v = (input ?? 'available').trim().toLowerCase()
  if (v === 'available' || v === 'sold') return v as BmSaleStatus
  throw new Error(`Invalid saleStatus: "${input}"`)
}
