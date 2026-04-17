import PageHero from '@/components/pagehero/pagehero'
import { prisma } from '@/lib/prisma'
import CircularsClient from './circulars-client'
import styles from './circulars.module.css'

export const revalidate = 60

export const metadata = {
  title: 'Circulars & Notices | Kendriya Vidyalaya, Moga',
  description:
    'Latest school circulars, notices, and announcements from Kendriya Vidyalaya, Moga.',
}

export default async function CircularsPage() {
  const circulars = await prisma.circular.findMany({ orderBy: { date: 'desc' } })
  return (
    <main>
      <PageHero
        title="Circulars & Notices"
        breadcrumbs={[
          { label: 'Academics', href: '/academics' },
          { label: 'Circulars' },
        ]}
      />

      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.centered}>
            <span className={styles.label}>Announcements</span>
            <h2 className={styles.heading}>Latest Circulars</h2>
            <p className={styles.intro}>
              Stay updated with the latest announcements, notices, and circulars from
              the school administration. Download PDFs for detailed information.
            </p>
          </div>

          <CircularsClient circulars={JSON.parse(JSON.stringify(circulars))} />
        </div>
      </section>
    </main>
  )
}
