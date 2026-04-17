import PageHero from '@/components/pagehero/pagehero'
import { prisma } from '@/lib/prisma'
import FacultyList from './faculty-list'
import styles from './faculty.module.css'

export const revalidate = 60

export const metadata = {
  title: 'Faculty | Kendriya Vidyalaya, Moga',
  description:
    'Meet the experienced and qualified teaching faculty at Kendriya Vidyalaya, Moga — PGT, TGT, and PRT teachers across all subjects.',
}

export default async function FacultyPage() {
  const faculty = await prisma.faculty.findMany({ orderBy: { sortOrder: 'asc' } })
  return (
    <main>
      <PageHero
        title="Our Faculty"
        breadcrumbs={[{ label: 'Faculty' }]}
      />

      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.centered}>
            <span className={styles.label}>Our Team</span>
            <h2 className={styles.heading}>Experienced & Dedicated Educators</h2>
            <p className={styles.intro}>
              Our faculty comprises qualified, CBSE-experienced teachers who bring subject
              expertise and genuine dedication to every classroom. Together, they form the
              backbone of the Kendriya Vidyalaya academic experience.
            </p>
          </div>

          <FacultyList faculty={faculty} />
        </div>
      </section>
    </main>
  )
}
