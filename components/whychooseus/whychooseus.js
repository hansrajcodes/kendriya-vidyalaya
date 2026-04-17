import Link   from 'next/link'
import styles from './whychooseus.module.css'

const features = [
  { icon: '🎓', title: 'Experienced Faculty',        text: 'Our qualified educators bring years of experience and genuine dedication to every classroom, ensuring each student receives the attention they deserve.' },
  { icon: '📚', title: 'CBSE Curriculum',             text: 'Affiliated with CBSE, New Delhi, we deliver a structured, nationally recognized academic framework that prepares students thoroughly for board examinations and higher education.' },
  { icon: '🏫', title: 'Modern Infrastructure',       text: 'Smart classrooms, advanced laboratories, a well-stocked library, and sports facilities — everything a student needs to learn, grow, and excel on a single campus.' },
  { icon: '🛡️', title: 'Safe & Secure Campus',        text: '24/7 CCTV surveillance, controlled entry points, trained security staff, and an on-campus medical room ensure every child is always in safe hands.' },
  { icon: '🌱', title: 'Holistic Development',        text: 'Sports, performing arts, debate, robotics, and community service are woven into school life — nurturing well-rounded individuals, not just high scorers.' },
  { icon: '🤝', title: 'Transparent Communication',  text: 'Regular parent-teacher meetings, detailed progress reports, and a real-time portal keep every family informed and involved at each step of their child\'s journey.' },
]

export default function WhyChooseUs() {
  return (
    <section className={styles.section} aria-labelledby="why-heading">

      {/* Decorative: large faint background shape */}
      <span className={styles.decoBgShape} aria-hidden="true" />

      <div className={styles.container}>
        <div className={styles.sectionTop}>
          {/* Decorative: vertical bar beside heading group */}
          <span className={styles.decoBar} aria-hidden="true" />
          <div className={styles.headingGroup}>
            <span className={styles.label}>Our Difference</span>
            <h2 id="why-heading" className={styles.heading}>
              Why Choose Kendriya Vidyalaya?
            </h2>
            <p className={styles.intro}>
              Parents across Moga choose Kendriya Vidyalaya for our quality of education,
              safe environment, and the genuine care our faculty extends to every child.
            </p>
          </div>
        </div>

        <span className="sr-only">
          Kendriya Vidyalaya in Moga is distinguished by experienced CBSE faculty, modern
          infrastructure, a safe campus, and holistic programmes.
        </span>

        <ul className={styles.grid}>
          {features.map((f, i) => (
            <li key={i} className={styles.card}>
              <span className={styles.icon} aria-hidden="true">{f.icon}</span>
              <h3 className={styles.cardTitle}>{f.title}</h3>
              <p className={styles.cardText}>{f.text}</p>
            </li>
          ))}
        </ul>

        <div className={styles.cta}>
          <Link href="/about" className={styles.link}
            aria-label="Learn why Kendriya Vidyalaya is among the best schools in Moga">
            Know More <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </section>
  )
}
