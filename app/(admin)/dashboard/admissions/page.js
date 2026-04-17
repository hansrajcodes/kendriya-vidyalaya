import { prisma } from '@/lib/prisma'
import AdmissionsClient from './client'

export const dynamic = 'force-dynamic'

export default async function AdmissionsPage() {
  const [applications, formSetting] = await Promise.all([
    prisma.admissionApplication.findMany({ orderBy: { createdAt: 'desc' } }),
    prisma.siteSetting.findUnique({ where: { key: 'admissionFormPdf' } }),
  ])

  return (
    <AdmissionsClient
      applications={JSON.parse(JSON.stringify(applications))}
      hasAdmissionForm={!!formSetting?.value}
    />
  )
}
