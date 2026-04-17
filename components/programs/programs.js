import Link   from 'next/link'
import styles from './programs.module.css'

const programs = [
  { title: 'Pre-Primary (Nursery – UKG)',                  text: 'A play-based curriculum that builds foundational language, cognitive, and motor skills — giving every child a confident and joyful start to school life.' },
  { title: 'Primary School (Class I – V)',                  text: 'Strong conceptual foundations in English, Hindi, Mathematics, and Environmental Science through activity-based learning that prioritizes understanding.' },
  { title: 'Middle School (Class VI – VIII)',               text: 'Dedicated subject teachers, laboratory sessions, and structured assessments that prepare students thoroughly for the demands of the secondary years.' },
  { title: 'Secondary School (Class IX – X)',               text: 'Rigorous preparation for CBSE Board Examinations with structured assessments, mock tests, and personalized guidance for every student.' },
  { title: 'Senior Secondary — Science (Class XI – XII)',   text: 'In-depth instruction in Physics, Chemistry, Biology, and Mathematics, with lab work and guidance for JEE and NEET examinations.' },
  { title: 'Senior Secondary — Commerce (Class XI – XII)',  text: 'A thorough grounding in Accountancy, Business Studies, and Economics, preparing students for finance, management, and entrepreneurship careers.' },
  { title: 'Senior Secondary — Arts (Class XI – XII)',      text: 'History, Political Science, Geography, Psychology, and English — ideal for careers in law, civil services, journalism, and the liberal arts.' },
]

export default function Programs() {
  return (
    <section className={styles.section} aria-labelledby="programs-heading">
      <div className={styles.container}>

        <div className={styles.sectionTop}>
          <span className={styles.label}>What We Offer</span>
          <h2 id="programs-heading" className={styles.heading}>
            Academic Programmes
          </h2>
          <p className={styles.intro}>
            A complete academic journey from Pre-Primary through Class XII,
            structured under the CBSE curriculum and delivered by subject-specialized educators.
          </p>
        </div>

        {/* Decorative full-width rule */}
        <span className={styles.decoRule} aria-hidden="true" />

        <span className="sr-only">
          Kendriya Vidyalaya in Moga offers Pre-Primary, Primary, Middle, Secondary, and Senior
          Secondary programmes under CBSE affiliation.
        </span>

        <ul className={styles.grid}>
          {programs.map((p, i) => (
            <li key={i} className={styles.card}>
              {/* Decorative faint number */}
              <span className={styles.decoNum} aria-hidden="true">
                {String(i + 1).padStart(2, '0')}
              </span>
              <h3 className={styles.cardTitle}>{p.title}</h3>
              <p className={styles.cardText}>{p.text}</p>
            </li>
          ))}
        </ul>

        <div className={styles.cta}>
          <Link href="/academics" className={styles.link}
            aria-label="View all academic programmes at Kendriya Vidyalaya">
            Know More <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </section>
  )
}
