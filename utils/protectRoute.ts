import { getServerSession } from 'next-auth'
import { authOptions } from '@/utils/authoptions'
import { NextResponse } from 'next/server'

export async function protect(request: Request) {
  const session = await getServerSession(authOptions)

  if (!session) {
    return new NextResponse(
      JSON.stringify({ status: 'fail', message: 'You are not logged in' }),
      { status: 401 }
    )
  }
  const response = NextResponse.next()

  return response
}
