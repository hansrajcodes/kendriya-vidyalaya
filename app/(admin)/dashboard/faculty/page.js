import { prisma } from '@/lib/prisma'
import FacultyClient from './client'

export const dynamic = 'force-dynamic'

export default async function FacultyPage() {
  const items = await prisma.faculty.findMany({ orderBy: { sortOrder: 'asc' } })
  return <FacultyClient items={JSON.parse(JSON.stringify(items))} />
}
