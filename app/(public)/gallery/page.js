import PageHero from '@/components/pagehero/pagehero'
import { prisma } from '@/lib/prisma'
import GalleryClient from './gallery-client'
import styles from './gallery.module.css'

export const revalidate = 60

const fallbackImages = [
  { src: '/images/gallery-1.webp', alt: 'Annual Day celebration at Kendriya Vidyalaya', caption: 'Annual Day 2024', category: 'General' },
  { src: '/images/gallery-2.webp', alt: 'Sports Day activities at Kendriya Vidyalaya', caption: 'Sports Day', category: 'General' },
  { src: '/images/gallery-3.webp', alt: 'Students in smart classroom', caption: 'Smart Classroom', category: 'General' },
  { src: '/images/gallery-4.webp', alt: 'Science fair at Kendriya Vidyalaya', caption: 'Science Exhibition', category: 'General' },
  { src: '/images/gallery-5.webp', alt: 'Cultural programme at Kendriya Vidyalaya', caption: 'Cultural Programme', category: 'General' },
  { src: '/images/gallery-6.webp', alt: 'Library reading area', caption: 'Library', category: 'General' },
  { src: '/images/gallery-7.webp', alt: 'Sports facilities at Kendriya Vidyalaya', caption: 'Sports Ground', category: 'General' },
  { src: '/images/gallery-8.webp', alt: 'Auditorium event at Kendriya Vidyalaya', caption: 'Auditorium', category: 'General' },
]

export const metadata = {
  title: 'Gallery | Kendriya Vidyalaya, Moga',
  description:
    'Photo gallery of campus life, events, classrooms, and sports at Kendriya Vidyalaya, Moga.',
}

export default async function GalleryPage() {
  const [dbImages, dbAlbums] = await Promise.all([
    prisma.galleryImage.findMany({
      where: { albumId: null },
      orderBy: { createdAt: 'desc' },
    }),
    prisma.galleryAlbum.findMany({
      orderBy: { createdAt: 'desc' },
      include: { images: { orderBy: { createdAt: 'desc' } } },
    }),
  ])

  const hasContent = dbImages.length > 0 || dbAlbums.length > 0

  const images = hasContent
    ? dbImages.map((img) => ({ src: img.imageUrl, alt: img.title, caption: img.title, category: img.category, createdAt: img.createdAt.toISOString() }))
    : fallbackImages

  const albums = dbAlbums.map((album) => ({
    id: album.id,
    title: album.title,
    category: album.category,
    createdAt: album.createdAt.toISOString(),
    coverSrc: album.images[0]?.imageUrl || '/images/gallery-1.webp',
    imageCount: album.images.length,
    images: album.images.map((img) => ({
      src: img.imageUrl,
      alt: img.title || album.title,
      caption: img.title || album.title,
      category: album.category,
    })),
  }))

  const allCategories = [
    ...dbImages.map((img) => img.category),
    ...dbAlbums.map((a) => a.category),
  ]
  const categories = [...new Set(allCategories)].sort()

  return (
    <main>
      <PageHero
        title="Gallery"
        breadcrumbs={[{ label: 'Gallery' }]}
      />

      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.centered}>
            <span className={styles.label}>Campus Life</span>
            <h2 className={styles.heading}>Life at Kendriya Vidyalaya</h2>
            <p className={styles.intro}>
              A glimpse into the vibrant school life — from classrooms and laboratories to
              sports days and cultural celebrations.
            </p>
          </div>

          <GalleryClient images={images} albums={albums} categories={categories} />
        </div>
      </section>
    </main>
  )
}
