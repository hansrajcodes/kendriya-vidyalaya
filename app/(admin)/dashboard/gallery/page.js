import { prisma } from '@/lib/prisma'
import GalleryClient from './client'

export const dynamic = 'force-dynamic'

export default async function GalleryPage() {
  const [items, albums] = await Promise.all([
    prisma.galleryImage.findMany({
      where: { albumId: null },
      orderBy: { createdAt: 'desc' },
    }),
    prisma.galleryAlbum.findMany({
      orderBy: { createdAt: 'desc' },
      include: { images: { orderBy: { createdAt: 'desc' } } },
    }),
  ])

  return (
    <GalleryClient
      items={JSON.parse(JSON.stringify(items))}
      albums={JSON.parse(JSON.stringify(albums))}
    />
  )
}
