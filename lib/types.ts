import { z } from 'zod';

const bmStatusSchema = z.enum(["1-10k", "10k-30k", "30k-70k", "70k-100k", "100k-500k", "500k+"]);
const bmTypeSchema = z.enum(["meta", "google"]);
const bmSaleStatusSchema = z.enum(["available", "sold"]);

export const BMAccountSchema = z.object({
  id: z.string().uuid(),
  title: z.string(),
  description: z.string(),
  priceBRL: z.number(),
  limitBRL: z.number(),
  status: bmStatusSchema,
  type: bmTypeSchema,
  platform: z.enum(['google', 'meta']).default('meta'),
  saleStatus: bmSaleStatusSchema.default('available'),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
  hash: z.string().optional(),
});

export type BMAccount = z.infer<typeof BMAccountSchema>;