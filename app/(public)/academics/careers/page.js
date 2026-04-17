import PageHero from '@/components/pagehero/pagehero'
import { prisma } from '@/lib/prisma'
import CareersClient from './careers-client'
import styles from './careers.module.css'

export const revalidate = 60

export const metadata = {
  title: 'Careers | Kendriya Vidyalaya, Moga',
  description:
    'Current teaching and non-teaching job openings at Kendriya Vidyalaya, Moga. Join our team of dedicated educators.',
}

export default async function CareersPage() {
  const openings = await prisma.career.findMany({ where: { isActive: true }, orderBy: { createdAt: 'desc' } })
  return (
    <main>
      <PageHero
        title="Careers"
        breadcrumbs={[
          { label: 'Academics', href: '/academics' },
          { label: 'Careers' },
        ]}
      />

      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.centered}>
            <span className={styles.label}>Join Our Team</span>
            <h2 className={styles.heading}>Current Openings</h2>
            <p className={styles.intro}>
              We are always looking for passionate, qualified educators and staff to join the
              Kendriya Vidyalaya family. Review the current openings below and apply online.
            </p>
          </div>

          <CareersClient openings={JSON.parse(JSON.stringify(openings))} />

          <div className={styles.note}>
            <p className={styles.noteText}>
              Interested candidates may also send their resume to{' '}
              <strong>careers@kendriyavidyalaya.com</strong> or visit the school office
              in person with original documents.
            </p>
          </div>
        </div>
      </section>
    </main>
  )
}
