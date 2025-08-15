import { z } from "zod"

// Schema para login
export const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Email é obrigatório")
    .email("Digite um email válido"),
  password: z
    .string()
    .min(1, "Senha é obrigatória")
    .min(6, "A senha deve ter pelo menos 6 caracteres"),
})

// Schema para registro
export const registerSchema = z.object({
  name: z
    .string()
    .min(1, "Nome é obrigatório")
    .min(2, "Nome deve ter pelo menos 2 caracteres")
    .max(100, "Nome deve ter no máximo 100 caracteres"),
  email: z
    .string()
    .min(1, "Email é obrigatório")
    .email("Digite um email válido"),
  password: z
    .string()
    .min(1, "Senha é obrigatória")
    .min(6, "A senha deve ter pelo menos 6 caracteres")
    .max(100, "Senha deve ter no máximo 100 caracteres"),
})

// Schema para formulário 2FA (sem userId)
export const twoFactorAuthFormSchema = z.object({
  name: z
    .string()
    .min(1, "Nome do serviço é obrigatório")
    .min(2, "Nome deve ter pelo menos 2 caracteres")
    .max(50, "Nome deve ter no máximo 50 caracteres"),
  issuer: z
    .string()
    .optional()
    .refine((val) => !val || val.length >= 2, "Emissor deve ter pelo menos 2 caracteres")
    .refine((val) => !val || val.length <= 50, "Emissor deve ter no máximo 50 caracteres"),
  secret: z
    .string()
    .min(1, "Chave secreta é obrigatória")
    .min(16, "A chave secreta deve ter pelo menos 16 caracteres")
    .max(100, "Chave secreta deve ter no máximo 100 caracteres")
    .regex(/^[A-Z2-7]+=*$/, "Chave secreta deve conter apenas letras maiúsculas, números 2-7 e ="),
})

// Schema para API 2FA (com userId)
export const twoFactorAuthSchema = twoFactorAuthFormSchema.extend({
  userId: z.string().min(1, "ID do usuário é obrigatório"),
})

// Tipos derivados dos schemas
export type LoginFormData = z.infer<typeof loginSchema>
export type RegisterFormData = z.infer<typeof registerSchema>
export type TwoFactorAuthFormData = z.infer<typeof twoFactorAuthFormSchema>

// Schema para resposta da API de autenticação
export const authResponseSchema = z.object({
  user: z.object({
    id: z.string(),
    name: z.string(),
    email: z.string().email(),
    role: z.enum(["USER", "ADMIN"]),
  }),
  token: z.string().min(1, "Token é obrigatório"),
})

// Schema para resposta de erro da API
export const errorResponseSchema = z.object({
  error: z.string().min(1, "Mensagem de erro é obrigatória"),
  details: z.array(z.any()).optional(),
})

// Schema para resposta de verificação de token
export const tokenVerificationSchema = z.object({
  valid: z.boolean(),
  user: z.object({
    id: z.string(),
    email: z.string().email(),
    name: z.string(),
    role: z.enum(["USER", "ADMIN"]),
  }),
})
