'use client'

import { generateFeePdf } from '@/lib/generate-fee-pdf'
import styles from './fee-structure.module.css'

export default function DownloadBtn({ groups, notes }) {
  return (
    <button
      className={styles.downloadBtn}
      onClick={() => generateFeePdf(groups, notes)}
    >
      Download PDF
    </button>
  )
}
