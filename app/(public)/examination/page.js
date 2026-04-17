import PageHero from '@/components/pagehero/pagehero'
import { prisma } from '@/lib/prisma'
import ExaminationClient from './examination-client'
import styles from './examination.module.css'

export const revalidate = 60

export const metadata = {
  title: 'Examination | Kendriya Vidyalaya, Moga',
  description:
    'Download syllabus and datesheet for all classes at Kendriya Vidyalaya, Moga. Examination schedule for CBSE Pre-Primary to Senior Secondary.',
}

export default async function ExaminationPage() {
  const [syllabusClasses, datesheets] = await Promise.all([
    prisma.syllabus.findMany({ orderBy: { sortOrder: 'asc' } }),
    prisma.datesheet.findMany({ orderBy: { sortOrder: 'asc' } }),
  ])
  return (
    <main>
      <PageHero
        title="Examination"
        breadcrumbs={[{ label: 'Examination' }]}
      />

      {/* Syllabus Section */}
      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.centered}>
            <span className={styles.label}>Curriculum</span>
            <h2 className={styles.heading}>Syllabus</h2>
            <p className={styles.intro}>
              Download the CBSE-prescribed syllabus for each class. Syllabus documents are
              updated at the beginning of every academic session.
            </p>
          </div>

          <div className={styles.syllabusGrid}>
            {syllabusClasses.map((s, i) => (
              <div key={s.id} className={styles.syllabusCard}>
                <div className={styles.syllabusInfo}>
                  <span className={styles.syllabusNum} aria-hidden="true">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <h3 className={styles.syllabusTitle}>{s.className}</h3>
                </div>
                {s.pdfUrl ? (
                  <a href={s.pdfUrl} target="_blank" rel="noopener noreferrer" className={styles.downloadBtn}>Download ↓</a>
                ) : (
                  <span className={styles.downloadBtn} style={{ opacity: 0.4 }}>Pending</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Datesheet Section */}
      <section className={`${styles.section} ${styles.altBg}`}>
        <div className={styles.container}>
          <div className={styles.centered}>
            <span className={styles.label}>Schedule</span>
            <h2 className={styles.heading}>Examination Datesheet</h2>
            <p className={styles.intro}>
              The academic year is divided into four examination cycles. Datesheets are
              published two weeks prior to each examination and can be downloaded below.
            </p>
          </div>

          <ExaminationClient datesheets={JSON.parse(JSON.stringify(datesheets))} />
        </div>
      </section>

      {/* Exam Guidelines */}
      <section className={styles.section}>
        <div className={styles.container}>
          <span className={styles.label}>Important</span>
          <h2 className={styles.heading}>Examination Guidelines</h2>
          <ul className={styles.ruleList}>
            <li className={styles.ruleItem}>
              <span className={styles.bullet} aria-hidden="true">&#9670;</span>
              Students must carry their school identity card and admit card to every examination.
            </li>
            <li className={styles.ruleItem}>
              <span className={styles.bullet} aria-hidden="true">&#9670;</span>
              Use of unfair means, including mobile phones, is strictly prohibited and will lead to immediate disqualification.
            </li>
            <li className={styles.ruleItem}>
              <span className={styles.bullet} aria-hidden="true">&#9670;</span>
              Students arriving more than 15 minutes late will not be permitted to enter the examination hall.
            </li>
            <li className={styles.ruleItem}>
              <span className={styles.bullet} aria-hidden="true">&#9670;</span>
              Minimum 75% attendance is required to be eligible to sit for examinations as per CBSE norms.
            </li>
            <li className={styles.ruleItem}>
              <span className={styles.bullet} aria-hidden="true">&#9670;</span>
              Re-examination will be conducted only in exceptional cases with a valid medical certificate, subject to the Principal&apos;s approval.
            </li>
          </ul>
        </div>
      </section>
    </main>
  )
}
