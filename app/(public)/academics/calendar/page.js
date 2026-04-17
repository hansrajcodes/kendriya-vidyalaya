import PageHero from '@/components/pagehero/pagehero'
import { prisma } from '@/lib/prisma'
import { getCurrentSession } from '@/lib/session-year'
import CalendarGrid from './calendar-client'
import DownloadBtn from './download-btn'
import styles from './calendar.module.css'

export const revalidate = 60

export const metadata = {
  title: 'Academic Calendar | Kendriya Vidyalaya, Moga',
  description:
    'Academic calendar and yearly planner at Kendriya Vidyalaya, Moga — important dates, holidays, examinations, and events.',
}

export default async function CalendarPage() {
  // Auto-calculate session range: April 1 of start year → March 31 of next year
  const now = new Date()
  const startYear = now.getMonth() < 3 ? now.getFullYear() - 1 : now.getFullYear()
  const sessionStart = new Date(startYear, 3, 1) // April 1
  const sessionEnd = new Date(startYear + 1, 2, 31, 23, 59, 59) // March 31

  const events = await prisma.calendarEvent.findMany({
    where: { date: { gte: sessionStart, lte: sessionEnd } },
    orderBy: { date: 'asc' },
  })

  return (
    <main>
      <PageHero
        title="Academic Calendar"
        breadcrumbs={[
          { label: 'Academics', href: '/academics' },
          { label: 'Calendar' },
        ]}
      />

      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.centered}>
            <span className={styles.label}>Session {getCurrentSession()}</span>
            <h2 className={styles.heading}>Yearly Planner</h2>
            <p className={styles.intro}>
              Key dates, holidays, examinations, and events for the current academic session.
              This calendar is updated annually — please check for any mid-session amendments
              via school circulars.
            </p>
            <DownloadBtn events={JSON.parse(JSON.stringify(events))} session={getCurrentSession()} />
          </div>

          <CalendarGrid events={JSON.parse(JSON.stringify(events))} startYear={startYear} />
        </div>
      </section>
    </main>
  )
}
