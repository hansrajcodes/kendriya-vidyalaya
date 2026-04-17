import { prisma } from '@/lib/prisma'
import HomeworkClient from './client'

export const dynamic = 'force-dynamic'

export default async function HomeworkPage() {
  const items = await prisma.homework.findMany({ orderBy: { createdAt: 'desc' } })
  return <HomeworkClient items={JSON.parse(JSON.stringify(items))} />
}
