import { prisma } from '@/lib/prisma'
import NotificationsClient from './client'

export const dynamic = 'force-dynamic'

export default async function NotificationsPage() {
  const notifications = await prisma.notification.findMany({
    orderBy: { createdAt: 'desc' },
  })

  return <NotificationsClient items={JSON.parse(JSON.stringify(notifications))} />
}
