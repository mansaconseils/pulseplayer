import { z } from "zod"

export const userSchema = z.object({
  id: z.string(),
  email: z.string().email(),
  name: z.string(),
  role: z.enum(["admin", "scout", "analyst"]),
  createdAt: z.date(),
  lastLogin: z.date().optional(),
  active: z.boolean(),
  profileImage: z.string().optional(),
})

export const sessionSchema = z.object({
  id: z.string(),
  userId: z.string(),
  token: z.string(),
  expiresAt: z.date(),
  createdAt: z.date(),
})

export type User = z.infer<typeof userSchema>
export type Session = z.infer<typeof sessionSchema>