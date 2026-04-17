import { prisma } from '@/lib/prisma'
import FeeStructureClient from './client'

export const dynamic = 'force-dynamic'

export default async function FeeStructurePage() {
  const groups = await prisma.feeGroup.findMany({ orderBy: { sortOrder: 'asc' } })
  const notes = await prisma.feeNote.findMany({ orderBy: { sortOrder: 'asc' } })
  return (
    <FeeStructureClient
      groups={JSON.parse(JSON.stringify(groups))}
      notes={JSON.parse(JSON.stringify(notes))}
    />
  )
}
