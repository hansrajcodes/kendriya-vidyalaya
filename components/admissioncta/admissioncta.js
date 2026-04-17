import Link   from 'next/link'
import styles from './admissioncta.module.css'

const steps = [
  { num: '01', label: 'Fill Online Application' },
  { num: '02', label: 'Student Interaction' },
  { num: '03', label: 'Document Verification' },
  { num: '04', label: 'Confirm Enrollment' },
]

export default function AdmissionCTA() {
  return (
    <section className={styles.section} aria-labelledby="admissions-heading">

      {/* Decorative: diagonal stripe bg */}
      <span className={styles.decoStripes} aria-hidden="true" />

      <div className={styles.container}>

        <div className={styles.headingBlock}>
          {/* Decorative: outlined rectangle behind heading */}
          <span className={styles.decoOutlineRect} aria-hidden="true" />

          <span className={styles.label}>Enroll Your Child</span>
          <h2 id="admissions-heading" className={styles.heading}>
            Admissions Open at Kendriya Vidyalaya — Moga
          </h2>
          <p className={styles.subtext}>
            Give your child the best start in life. Join the Kendriya Vidyalaya family
            and be part of Moga&apos;s most trusted CBSE school community.
          </p>
        </div>

        <span className="sr-only">
          Apply now for admissions at Kendriya Vidyalaya, Moga for the academic year 2025–2026.
          Limited seats available across all classes.
        </span>

        {/* Decorative rule above steps */}
        <span className={styles.decoRule} aria-hidden="true" />

        <ul className={styles.steps} aria-label="Admission process steps">
          {steps.map((s, i) => (
            <li key={i} className={styles.step}>
              <span className={styles.stepNum} aria-hidden="true">{s.num}</span>
              <span className={styles.stepLabel}>{s.label}</span>
            </li>
          ))}
        </ul>

        {/* Decorative rule below steps */}
        <span className={styles.decoRule} aria-hidden="true" />

        <div className={styles.btnContainer}>
          <div className={styles.btnBox}>
            <Link href="/admission" className={styles.btnPrimary}
              aria-label="Apply now for admissions at Kendriya Vidyalaya, Moga">
              Apply Now
            </Link>
            <Link href="/contact" className={styles.btnSecondary}
              aria-label="Enquire about admissions at Kendriya Vidyalaya">
              Enquire Now
            </Link>
          </div>
        </div>

      </div>
    </section>
  )
}
