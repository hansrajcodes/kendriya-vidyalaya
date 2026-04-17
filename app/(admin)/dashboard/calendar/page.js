import { prisma } from '@/lib/prisma'
import CalendarClient from './client'

export const dynamic = 'force-dynamic'

export default async function CalendarPage() {
  const items = await prisma.calendarEvent.findMany({ orderBy: { date: 'asc' } })
  return <CalendarClient items={JSON.parse(JSON.stringify(items))} />
}
