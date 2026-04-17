import PageHero from '@/components/pagehero/pagehero'
import { prisma } from '@/lib/prisma'
import { getCurrentSession } from '@/lib/session-year'
import DownloadBtn from './download-btn'
import styles from './fee-structure.module.css'

export const revalidate = 60

export const metadata = {
  title: 'Fee Structure | Kendriya Vidyalaya, Moga',
  description:
    'Class-wise fee structure for the current academic session at Kendriya Vidyalaya, Moga — tuition, annual charges, and payment guidelines.',
}

function fmt(n) {
  return Number(n).toLocaleString('en-IN')
}

export default async function FeeStructurePage() {
  const groups = await prisma.feeGroup.findMany({ orderBy: { sortOrder: 'asc' } })
  const notes = await prisma.feeNote.findMany({ orderBy: { sortOrder: 'asc' } })

  return (
    <main>
      <PageHero
        title="Fee Structure"
        breadcrumbs={[
          { label: 'Academics', href: '/academics' },
          { label: 'Fee Structure' },
        ]}
      />

      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.centered}>
            <span className={styles.label}>Session {getCurrentSession()}</span>
            <h2 className={styles.heading}>KPS Fee Chart</h2>
            <p className={styles.intro}>
              Below is the class-wise fee breakdown for the current academic session.
              All amounts are in INR (₹).
            </p>
            <DownloadBtn groups={groups} notes={notes} />
          </div>

          <div className={styles.feeGrid}>
            {groups.map((g) => {
              const totalNew = g.idCardNew + g.registrationNew + g.admissionNew + g.tuitionNew
              const totalOld = g.idCardOld + g.registrationOld + g.admissionOld + g.tuitionOld
              return (
                <div key={g.id} className={styles.feeCard}>
                  <div className={styles.cardHeader}>
                    <h3 className={styles.cardTitle}>{g.classRange}</h3>
                    <span className={styles.cardBadge}>{g.siblingDiscount}% Sibling Discount</span>
                  </div>

                  <table className={styles.cardTable}>
                    <thead>
                      <tr>
                        <th className={styles.cth}>Fees</th>
                        <th className={styles.cth}>New Student</th>
                        <th className={styles.cth}>Old Student</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className={styles.ctr}>
                        <td className={styles.ctd}>Id Card</td>
                        <td className={styles.ctdNum}>{fmt(g.idCardNew)}</td>
                        <td className={styles.ctdNum}>{fmt(g.idCardOld)}</td>
                      </tr>
                      <tr className={styles.ctr}>
                        <td className={styles.ctd}>Registration Fee</td>
                        <td className={styles.ctdNum}>{fmt(g.registrationNew)}</td>
                        <td className={styles.ctdNum}>{fmt(g.registrationOld)}</td>
                      </tr>
                      <tr className={styles.ctr}>
                        <td className={styles.ctd}>Admission Fee</td>
                        <td className={styles.ctdNum}>{fmt(g.admissionNew)}</td>
                        <td className={styles.ctdNum}>{fmt(g.admissionOld)}</td>
                      </tr>
                      <tr className={styles.ctr}>
                        <td className={styles.ctd}>
                          Tuition Fee
                          <span className={styles.ctdSub}>(1 Month @{fmt(g.monthlyTuition)})</span>
                        </td>
                        <td className={styles.ctdNum}>{fmt(g.tuitionNew)}</td>
                        <td className={styles.ctdNum}>{fmt(g.tuitionOld)}</td>
                      </tr>
                    </tbody>
                    <tfoot>
                      <tr className={styles.totalRow}>
                        <td className={styles.ctdTotal}>TOTAL</td>
                        <td className={styles.ctdTotalNum}>{fmt(totalNew)}</td>
                        <td className={styles.ctdTotalNum}>{fmt(totalOld)}</td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              )
            })}
          </div>

          {notes.length > 0 && (
            <div className={styles.notes}>
              <h3 className={styles.notesTitle}>Important Notes</h3>
              <ul className={styles.notesList}>
                {notes.map((n) => (
                  <li key={n.id}>{n.content}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </section>
    </main>
  )
}
