import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { auth } from '@/auth'

export async function GET(request) {
  const session = await auth()
  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { searchParams } = new URL(request.url)
  const id = searchParams.get('id')

  if (!id) {
    return NextResponse.json({ error: 'Missing application ID' }, { status: 400 })
  }

  const application = await prisma.careerApplication.findUnique({
    where: { id },
    select: { resumeUrl: true, name: true },
  })

  if (!application?.resumeUrl) {
    return NextResponse.json({ error: 'No resume found' }, { status: 404 })
  }

  const buffer = Buffer.from(application.resumeUrl, 'base64')
  const filename = `resume-${application.name.replace(/[^a-zA-Z0-9]/g, '-')}.pdf`

  return new NextResponse(buffer, {
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename="${filename}"`,
    },
  })
}
