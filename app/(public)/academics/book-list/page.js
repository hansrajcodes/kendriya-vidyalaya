import PageHero from '@/components/pagehero/pagehero'
import { prisma } from '@/lib/prisma'
import { getCurrentSession } from '@/lib/session-year'
import styles from './book-list.module.css'

export const revalidate = 60

export const metadata = {
  title: 'Book List | Kendriya Vidyalaya, Moga',
  description:
    'Download the prescribed book list and stationery requirements for all classes at Kendriya Vidyalaya, Moga.',
}

export default async function BookListPage() {
  const bookList = await prisma.bookList.findMany({ orderBy: { sortOrder: 'asc' } })
  return (
    <main>
      <PageHero
        title="Book List"
        breadcrumbs={[
          { label: 'Academics', href: '/academics' },
          { label: 'Book List' },
        ]}
      />

      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.centered}>
            <span className={styles.label}>Session {getCurrentSession()}</span>
            <h2 className={styles.heading}>Prescribed Books & Stationery</h2>
            <p className={styles.intro}>
              Download the complete list of prescribed textbooks, notebooks, and stationery
              for each class. Books are available at the school book store and select retailers in Moga.
            </p>
          </div>

          <div className={styles.grid}>
            {bookList.map((b, i) => (
              <div key={b.id} className={styles.card}>
                <span className={styles.cardNum} aria-hidden="true">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className={styles.cardTitle}>{b.className}</h3>
                {b.pdfUrl ? (
                  <a href={b.pdfUrl} target="_blank" rel="noopener noreferrer" className={styles.downloadBtn}>Download ↓</a>
                ) : (
                  <span className={styles.downloadBtn} style={{ opacity: 0.4 }}>Pending</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
