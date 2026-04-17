import { prisma } from '@/lib/prisma'
import CareerAppsClient from './client'

export const dynamic = 'force-dynamic'

export default async function CareerApplicationsPage() {
  const applications = await prisma.careerApplication.findMany({
    include: { career: { select: { title: true } } },
    orderBy: { createdAt: 'desc' },
  })

  return <CareerAppsClient applications={JSON.parse(JSON.stringify(applications))} />
}
