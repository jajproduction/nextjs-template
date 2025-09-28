'use server'

import { SignJWT, jwtVerify } from 'jose'
import { cookies } from 'next/headers'

const secretKey = process.env.SESSION_SECRET
const encodedKey = new TextEncoder().encode(secretKey)

type SessionPayload = {
  userId: string
  name: string
  username: string
  branch_id: string
  role: 'superadmin' | 'admin' | 'user'
  expiresAt: Date
}

export async function encrypt(payload: SessionPayload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('1d')
    .sign(encodedKey)
}

export async function decrypt(session: string | undefined = '') {
  try {
    const { payload } = await jwtVerify(session, encodedKey, {
      algorithms: ['HS256']
    })
    return payload
  } catch (error) {
    console.log('Failed to verify session')
    return null
  }
}

export async function createSession(
  userId: string,
  name: string,
  username: string,
  branch_id: string,
  role: 'superadmin' | 'admin' | 'user'
) {
  const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000)
  const session = await encrypt({ userId, name, username, branch_id, role, expiresAt })

  const cookie = await cookies()
  cookie.set('session', session, {
    httpOnly: true,
    secure: true,
    expires: expiresAt
  })
}

export async function deleteSession() {
  const cookieStore = await cookies()
  cookieStore.delete('session')
}

export async function getSession() {
  const cookie = await cookies()
  const session = await decrypt(cookie.get('session')?.value)
  if (!session) return null

  if (!session || typeof session !== 'object') return null

  return {
    userId: session.userId,
    name: session.name,
    username: session.username,
    branch_id: session.branch_id,
    role: session.role,
    expiresAt: session.expiresAt
  }
}
