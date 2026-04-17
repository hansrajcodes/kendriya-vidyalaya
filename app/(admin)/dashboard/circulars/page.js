import { prisma } from '@/lib/prisma'
import CircularsClient from './client'

export const dynamic = 'force-dynamic'

export default async function CircularsPage() {
  const items = await prisma.circular.findMany({ orderBy: { date: 'desc' } })
  return <CircularsClient items={JSON.parse(JSON.stringify(items))} />
}
