import { NextResponse } from 'next/server'
import crypto from 'crypto'
import { auth } from '@/auth'

export async function POST(request) {
  const session = await auth()
  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const formData = await request.formData()
  const file = formData.get('file')
  const folder = formData.get('folder') || 'pdfs'

  if (!file) {
    return NextResponse.json({ error: 'No file provided' }, { status: 400 })
  }

  const bytes = await file.arrayBuffer()
  const buffer = Buffer.from(bytes)

  const cloudName = process.env.CLOUDINARY_CLOUD_NAME
  const apiKey = process.env.CLOUDINARY_API_KEY
  const apiSecret = process.env.CLOUDINARY_API_SECRET

  const timestamp = Math.floor(Date.now() / 1000)
  const fullFolder = `kendriya-vidyalaya/${folder}`

  // Generate signed upload signature
  const paramString = `folder=${fullFolder}&timestamp=${timestamp}`
  const signature = crypto
    .createHash('sha1')
    .update(paramString + apiSecret)
    .digest('hex')

  const blob = new Blob([buffer], { type: file.type })
  const uploadForm = new FormData()
  uploadForm.append('file', blob, file.name)
  uploadForm.append('api_key', apiKey)
  uploadForm.append('timestamp', timestamp.toString())
  uploadForm.append('signature', signature)
  uploadForm.append('folder', fullFolder)

  try {
    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/auto/upload`,
      { method: 'POST', body: uploadForm }
    )

    if (!res.ok) {
      const err = await res.json()
      console.error('Cloudinary upload error:', err)
      return NextResponse.json({ error: 'Upload failed' }, { status: 500 })
    }

    const result = await res.json()
    return NextResponse.json({ url: result.secure_url })
  } catch (error) {
    console.error('Cloudinary upload error:', error)
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 })
  }
}
