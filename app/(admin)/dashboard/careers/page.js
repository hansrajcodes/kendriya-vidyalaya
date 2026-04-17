import { prisma } from '@/lib/prisma'
import CareersClient from './client'

export const dynamic = 'force-dynamic'

export default async function CareersPage() {
  const items = await prisma.career.findMany({ orderBy: { createdAt: 'desc' } })
  return <CareersClient items={JSON.parse(JSON.stringify(items))} />
}
