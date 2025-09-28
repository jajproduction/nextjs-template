import { NextRequest, NextResponse } from 'next/server'
import { decrypt } from '@/session'

const protectedRoutes = ['/dashboard']
const publicRoutes = ['/login', '/']

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname
  const isProtectedRoute = protectedRoutes.includes(path)
  const isPublicRoute = publicRoutes.includes(path)

  const sessionCookie = req.cookies.get('session')?.value
  const session = await decrypt(sessionCookie)

  if (isProtectedRoute && !session?.userId) {
    return NextResponse.redirect(new URL('/login', req.nextUrl))
  }

  if (isPublicRoute && session?.userId) {
    return NextResponse.redirect(new URL('/dashboard', req.nextUrl))
  }

  return NextResponse.next()
}
