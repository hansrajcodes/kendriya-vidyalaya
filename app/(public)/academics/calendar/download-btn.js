'use client'

import { generateCalendarPdf } from '@/lib/generate-calendar-pdf'
import styles from './calendar.module.css'

export default function DownloadBtn({ events, session }) {
  return (
    <button
      className={styles.downloadBtn}
      onClick={() => generateCalendarPdf(events, session)}
    >
      Download PDF
    </button>
  )
}
