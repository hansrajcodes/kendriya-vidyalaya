import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { auth } from '@/auth'

// GET — serve the stored PDF to parents
export async function GET() {
  const setting = await prisma.siteSetting.findUnique({
    where: { key: 'admissionFormPdf' },
  })

  if (!setting?.value) {
    return NextResponse.json({ error: 'No form available' }, { status: 404 })
  }

  const buffer = Buffer.from(setting.value, 'base64')

  return new NextResponse(buffer, {
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'attachment; filename="kendriya-vidyalaya-admission-form.pdf"',
      'Cache-Control': 'public, max-age=3600',
    },
  })
}

// POST — admin uploads PDF, stored as base64 in database
export async function POST(request) {
  const session = await auth()
  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const formData = await request.formData()
  const file = formData.get('file')

  if (!file) {
    return NextResponse.json({ error: 'No file provided' }, { status: 400 })
  }

  if (file.type !== 'application/pdf') {
    return NextResponse.json({ error: 'Only PDF files are allowed' }, { status: 400 })
  }

  const bytes = await file.arrayBuffer()
  const base64 = Buffer.from(bytes).toString('base64')

  await prisma.siteSetting.upsert({
    where: { key: 'admissionFormPdf' },
    update: { value: base64 },
    create: { key: 'admissionFormPdf', value: base64 },
  })

  return NextResponse.json({ success: true })
}
