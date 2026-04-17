import PageHero from '@/components/pagehero/pagehero'
import { prisma } from '@/lib/prisma'
import HomeworkClient from './homework-client'
import styles from './homework.module.css'

export const revalidate = 60

export const metadata = {
  title: 'Holidays Homework | Kendriya Vidyalaya, Moga',
  description:
    'Download holiday homework PDFs for all classes at Kendriya Vidyalaya, Moga — summer and winter vacation assignments.',
}

export default async function HomeworkPage() {
  const homeworkItems = await prisma.homework.findMany({ orderBy: { createdAt: 'desc' } })
  return (
    <main>
      <PageHero
        title="Holidays Homework"
        breadcrumbs={[
          { label: 'Academics', href: '/academics' },
          { label: 'Homework' },
        ]}
      />

      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.centered}>
            <span className={styles.label}>Assignments</span>
            <h2 className={styles.heading}>Holiday Homework</h2>
            <p className={styles.intro}>
              Download holiday homework for each class below. Assignments are designed to
              reinforce learning during vacation and must be submitted on the first day
              of school after the break.
            </p>
          </div>

          <HomeworkClient items={JSON.parse(JSON.stringify(homeworkItems))} />
        </div>
      </section>
    </main>
  )
}
