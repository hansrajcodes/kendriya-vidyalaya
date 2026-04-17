import { auth } from '@/auth'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import DashboardShell from '@/components/dashboard/dashboard-shell'

export default async function DashboardLayout({ children }) {
  const session = await auth()

  if (!session?.user) {
    redirect('/')
  }

  const notificationCount = await prisma.notification.count({
    where: { isRead: false },
  })

  return (
    <DashboardShell user={session.user} notificationCount={notificationCount}>
      {children}
    </DashboardShell>
  )
}
