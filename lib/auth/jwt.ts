import { SignJWT, jwtVerify } from "jose"
import type { User, Session } from "./types"

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || "your-secret-key"
)

const JWT_ISSUER = "player-pulse"
const JWT_AUDIENCE = "player-pulse-app"

export async function createSessionToken(user: User): Promise<string> {
  const token = await new SignJWT({
    sub: user.id,
    role: user.role,
  })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setIssuer(JWT_ISSUER)
    .setAudience(JWT_AUDIENCE)
    .setExpirationTime("24h")
    .sign(JWT_SECRET)

  return token
}

export async function verifySessionToken(token: string) {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET, {
      issuer: JWT_ISSUER,
      audience: JWT_AUDIENCE,
    })
    return payload
  } catch (error) {
    return null
  }
}