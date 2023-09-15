import { getServerSession } from 'next-auth'
import { authOptions } from '@/utils/authoptions'
import { NextResponse } from 'next/server'
import { protect } from '@/utils/protectRoute'

export async function GET(request: Request) {
  const session = await getServerSession(authOptions)

  protect(request)

  return NextResponse.json({
    authenticated: !!session,
    session,
  })
}
