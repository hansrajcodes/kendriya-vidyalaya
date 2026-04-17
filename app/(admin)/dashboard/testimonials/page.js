import { prisma } from '@/lib/prisma'
import TestimonialsClient from './client'

export const dynamic = 'force-dynamic'

export default async function TestimonialsPage() {
  const items = await prisma.testimonial.findMany({ orderBy: { sortOrder: 'asc' } })
  return <TestimonialsClient items={JSON.parse(JSON.stringify(items))} />
}
