import { NextResponse } from 'next/server'
import { protect } from '@/utils/protectRoute'
import * as fs from 'fs'
import * as path from 'path'
import { revalidateTag } from 'next/cache'

type Payload = {
  twitterLink: string
  telegramLink: string
  contractAddress: string
}

export async function GET(request: Request) {
  const filePath = path.join(process.cwd(), 'variables.json') // Adjust the path as necessary

  // Check if the file exists
  if (!fs.existsSync(filePath)) {
    return NextResponse.json({
      status: 404,
      message: 'No variables found',
    })
  }

  // Read the file
  const fileContent = fs.readFileSync(filePath, 'utf-8')
  const data = JSON.parse(fileContent)

  return NextResponse.json(data, { status: 200 })
}

export async function POST(request: Request) {
  protect(request)

  const data: Payload = await request.json()
  //   const { twitterLink, telegramLink, contractAddress } = data

  // Write to variables.json
  const filePath = path.join(process.cwd(), 'variables.json') // Adjust the path as necessary
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2)) // 2 spaces for indentation

  revalidateTag('update')

  return NextResponse.json({
    status: 200,
    message: 'Variables saved successfully',
  })
}
