import { NextResponse } from 'next/server'
import crypto from 'crypto'

const MAX_SIZE = 5 * 1024 * 1024 // 5 MB
const ALLOWED_TYPES = ['application/pdf']

export async function POST(request) {
  const formData = await request.formData()
  const file = formData.get('file')

  if (!file) {
    return NextResponse.json({ error: 'No file provided' }, { status: 400 })
  }

  if (!ALLOWED_TYPES.includes(file.type)) {
    return NextResponse.json({ error: 'Only PDF files are allowed' }, { status: 400 })
  }

  if (file.size > MAX_SIZE) {
    return NextResponse.json({ error: 'File size must be under 5 MB' }, { status: 400 })
  }

  const bytes = await file.arrayBuffer()
  const buffer = Buffer.from(bytes)

  const cloudName = process.env.CLOUDINARY_CLOUD_NAME
  const apiKey = process.env.CLOUDINARY_API_KEY
  const apiSecret = process.env.CLOUDINARY_API_SECRET

  const timestamp = Math.floor(Date.now() / 1000)
  const folder = 'kendriya-vidyalaya/resumes'

  const paramString = `folder=${folder}&timestamp=${timestamp}`
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
  uploadForm.append('folder', folder)

  try {
    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/auto/upload`,
      { method: 'POST', body: uploadForm }
    )

    if (!res.ok) {
      const err = await res.json()
      console.error('Resume upload error:', err)
      return NextResponse.json({ error: 'Upload failed' }, { status: 500 })
    }

    const result = await res.json()
    return NextResponse.json({ url: result.secure_url })
  } catch (error) {
    console.error('Resume upload error:', error)
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 })
  }
}
