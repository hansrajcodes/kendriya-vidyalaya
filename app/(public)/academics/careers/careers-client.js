'use client'

import { useState } from 'react'
import CareerApplyForm from './apply-form'
import styles from './careers.module.css'

export default function CareersClient({ openings }) {
  const [applyingTo, setApplyingTo] = useState(null)

  return (
    <>
      <div className={styles.list}>
        {openings.map((o) => (
          <article key={o.id} className={styles.card}>
            <div className={styles.cardMain}>
              <span className={styles.badge}>{o.type}</span>
              <h3 className={styles.cardTitle}>{o.title}</h3>
              <div className={styles.meta}>
                <span className={styles.metaItem}>Qualification: {o.qualification}</span>
                <span className={styles.metaItem}>Experience: {o.experience}</span>
              </div>
            </div>
            <div className={styles.cardAction}>
              <button
                type="button"
                className={styles.applyBtn}
                onClick={() => setApplyingTo(o)}
              >
                Apply
              </button>
            </div>
          </article>
        ))}
      </div>

      {applyingTo && (
        <CareerApplyForm
          careerId={applyingTo.id}
          careerTitle={applyingTo.title}
          onClose={() => setApplyingTo(null)}
        />
      )}
    </>
  )
}
