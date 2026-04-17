import Image from 'next/image'
import Link  from 'next/link'
import { prisma } from '@/lib/prisma'
import styles from './gallery.module.css'

const fallbackImages = [
  { src: '/images/gallery-1.webp', alt: 'Annual Day celebration at Kendriya Vidyalaya' },
  { src: '/images/gallery-2.webp', alt: 'Sports Day activities at Kendriya Vidyalaya' },
  { src: '/images/gallery-3.webp', alt: 'Students in smart classroom at Kendriya Vidyalaya' },
  { src: '/images/gallery-4.webp', alt: 'Science fair at Kendriya Vidyalaya, Moga' },
  { src: '/images/gallery-5.webp', alt: 'Cultural programme at Kendriya Vidyalaya' },
  { src: '/images/gallery-6.webp', alt: 'Library reading area at Kendriya Vidyalaya' },
  { src: '/images/gallery-7.webp', alt: 'Sports facilities at Kendriya Vidyalaya campus' },
  { src: '/images/gallery-8.webp', alt: 'Auditorium event at Kendriya Vidyalaya, Moga' },
]

export default async function Gallery() {
  let dbImages = []
  try {
    dbImages = await prisma.galleryImage.findMany({
      where: { albumId: null },
      orderBy: { createdAt: 'desc' },
      take: 8,
    })
  } catch {
    // DB unavailable — use fallback
  }

  const images = dbImages.length > 0
    ? dbImages.map((img) => ({ src: img.imageUrl, alt: img.title }))
    : fallbackImages

  return (
    <section className={styles.section} aria-labelledby="gallery-heading">
      <div className={styles.container}>

        {/* Rule — Heading — Rule layout */}
        <div className={styles.sectionTop}>
          <span className={styles.decoRuleLine} aria-hidden="true" />
          <div className={styles.headingCenter}>
            <span className={styles.label}>Campus Life</span>
            <h2 id="gallery-heading" className={styles.heading}>
              Life at Kendriya Vidyalaya
            </h2>
          </div>
          <span className={styles.decoRuleLine} aria-hidden="true" />
        </div>

        <p className={styles.intro}>
          A glimpse into the vibrant school life at Kendriya Vidyalaya, Moga.
        </p>

        <span className="sr-only">
          Photo gallery showcasing campus life, events, classrooms, and sports activities
          at Kendriya Vidyalaya in Moga.
        </span>

        <ul className={styles.grid} role="list"
          aria-label="Gallery of school life at Kendriya Vidyalaya">
          {images.map((img, i) => (
            <li key={i} className={styles.item}>
              <figure className={styles.figure}>
                <div className={styles.imageWrapper}>
                  <Image
                    src={img.src} alt={img.alt} fill
                    style={{ objectFit: 'cover' }}
                    sizes="(max-width: 640px) 50vw, 25vw"
                  />
                  <div className={styles.hoverOverlay} aria-hidden="true" />
                  {/* Decorative corner mark */}
                  <span className={styles.cornerMark} aria-hidden="true" />
                </div>
                <figcaption className="sr-only">{img.alt}</figcaption>
              </figure>
            </li>
          ))}
        </ul>

        <div className={styles.cta}>
          <Link href="/gallery" className={styles.btn}
            aria-label="View full photo gallery of Kendriya Vidyalaya">
            View More
          </Link>
        </div>
      </div>
    </section>
  )
}
