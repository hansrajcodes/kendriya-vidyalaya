import { prisma } from '@/lib/prisma'
import BookListClient from './client'

export const dynamic = 'force-dynamic'

export default async function BookListPage() {
  const items = await prisma.bookList.findMany({ orderBy: { sortOrder: 'asc' } })
  return <BookListClient items={JSON.parse(JSON.stringify(items))} />
}
