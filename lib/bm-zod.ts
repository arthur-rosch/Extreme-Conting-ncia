// lib/bm-zod.ts
import { z } from 'zod'

export const bmCreateSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  priceBRL: z.number().finite(),
  status: z.string().min(1),     // será normalizado
  type: z.string().min(1),       // será normalizado
  platform: z.string().min(1),   // será normalizado
  saleStatus: z.string().optional().nullable(), // opcional, default available
  hash: z.string().optional().nullable(),
})

export const bmUpdateSchema = z.object({
  title: z.string().min(1).optional(),
  description: z.string().min(1).optional(),
  priceBRL: z.number().finite().optional(),
  status: z.string().min(1).optional(),
  type: z.string().min(1).optional(),
  platform: z.string().min(1).optional(),
  saleStatus: z.string().optional().nullable(),
  hash: z.string().optional().nullable(),
})
