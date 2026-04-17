import styles from './stats.module.css'

const stats = [
  { value: '35+', label: 'Years of Excellence' },
  { value: '15000+', label: 'Students Enrolled' },
  { value: '150+', label: 'Qualified Teachers' },
  { value: '100%', label: 'Board Pass Rate' },
  { value: '9865',  label: 'Sq. Mtr Campus' },
]

export default function Stats() {
  return (
    <section className={styles.section} aria-labelledby="stats-heading">

      {/* Decorative: horizontal rules */}
      <span className={styles.decoLineTop}   aria-hidden="true" />
      <span className={styles.decoLineBottom} aria-hidden="true" />

      <div className={styles.container}>
        <h2 id="stats-heading" className={styles.heading}>
          Kendriya Vidyalaya by the Numbers
        </h2>

        <span className="sr-only">
          Since 1989, Kendriya Vidyalaya has served thousands of students in Moga
          with outstanding academic results and award-winning faculty.
        </span>

        <div className={styles.statsWrapper}>
          {/* Decorative ghost rectangle behind numbers */}
          <span className={styles.decoGhostRect} aria-hidden="true" />

          <dl className={styles.grid}>
            {stats.map((s, i) => (
              <div className={styles.item} key={i}>
                <dt className="sr-only">{s.label}</dt>
                <dd className={styles.value} aria-label={`${s.value} ${s.label}`}>
                  <span className={styles.number} aria-hidden="true">{s.value}</span>
                  <span className={styles.label}>{s.label}</span>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  )
}
