import { prisma } from '@/lib/prisma'
import ExaminationClient from './client'

export const dynamic = 'force-dynamic'

export default async function ExaminationPage() {
  const [syllabus, datesheets] = await Promise.all([
    prisma.syllabus.findMany({ orderBy: { sortOrder: 'asc' } }),
    prisma.datesheet.findMany({ orderBy: { sortOrder: 'asc' } }),
  ])

  return (
    <ExaminationClient
      syllabus={JSON.parse(JSON.stringify(syllabus))}
      datesheets={JSON.parse(JSON.stringify(datesheets))}
    />
  )
}
