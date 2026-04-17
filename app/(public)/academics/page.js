import Link from 'next/link'
import PageHero from '@/components/pagehero/pagehero'
import styles from './academics.module.css'

const programs = [
  {
    title: 'Pre-Primary (Nursery – UKG)',
    text: 'A play-based curriculum that builds foundational language, cognitive, and motor skills — giving every child a confident and joyful start to school life.',
  },
  {
    title: 'Primary School (Class I – V)',
    text: 'Strong conceptual foundations in English, Hindi, Mathematics, and Environmental Science through activity-based learning that prioritizes understanding.',
  },
  {
    title: 'Middle School (Class VI – VIII)',
    text: 'Dedicated subject teachers, laboratory sessions, and structured assessments that prepare students thoroughly for the demands of the secondary years.',
  },
  {
    title: 'Secondary School (Class IX – X)',
    text: 'Rigorous preparation for CBSE Board Examinations with structured assessments, mock tests, and personalized guidance for every student.',
  },
  {
    title: 'Senior Secondary — Science (Class XI – XII)',
    text: 'In-depth instruction in Physics, Chemistry, Biology, and Mathematics, with lab work and guidance for JEE and NEET examinations.',
  },
  {
    title: 'Senior Secondary — Commerce (Class XI – XII)',
    text: 'A thorough grounding in Accountancy, Business Studies, and Economics, preparing students for finance, management, and entrepreneurship careers.',
  },
  {
    title: 'Senior Secondary — Arts (Class XI – XII)',
    text: 'History, Political Science, Geography, Psychology, and English — ideal for careers in law, civil services, journalism, and the liberal arts.',
  },
]

const approaches = [
  {
    icon: '\u{1F4AC}',
    title: 'Interactive Learning',
    text: 'Classroom sessions designed around student participation, discussion, and hands-on activities that build deep conceptual understanding.',
  },
  {
    icon: '\u{1F9EA}',
    title: 'Activity-Based Education',
    text: 'Projects, experiments, and creative assignments that make learning engaging and relevant to real-world contexts.',
  },
  {
    icon: '\u{1F4BB}',
    title: 'Technology Integration',
    text: 'Smart classrooms, digital learning resources, and computer labs that prepare students for the modern world.',
  },
  {
    icon: '\u{1F4CA}',
    title: 'Continuous Assessment',
    text: 'Regular tests, assignments, and evaluations that track progress and ensure no student falls behind.',
  },
  {
    icon: '\u{1F3AF}',
    title: 'Competitive Preparation',
    text: 'Focused coaching for Olympiads, NTSE, JEE, NEET, and other national-level competitive examinations.',
  },
  {
    icon: '\u{1F331}',
    title: 'Holistic Development',
    text: 'Equal emphasis on sports, arts, moral values, and co-curricular activities alongside academics.',
  },
]

const quickLinks = [
  { label: 'Fee Structure', href: '/academics/fee-structure', desc: 'Class-wise fee details for the current academic session.' },
  { label: 'Academic Calendar', href: '/academics/calendar', desc: 'Annual calendar, yearly planner, and important dates.' },
  { label: 'Circulars & Notices', href: '/academics/circulars', desc: 'Latest school circulars, notifications, and announcements.' },
  { label: 'Holidays Homework', href: '/academics/homework', desc: 'Vacation homework PDFs for each class.' },
  { label: 'Book List', href: '/academics/book-list', desc: 'Prescribed textbooks and stationery for each class.' },
  { label: 'Careers', href: '/academics/careers', desc: 'Current teaching and non-teaching job openings.' },
]

export const metadata = {
  title: 'Academics | Kendriya Vidyalaya, Moga',
  description:
    'Explore academic programmes from Pre-Primary to Class XII at Kendriya Vidyalaya, Moga — CBSE curriculum, fee structure, calendar, circulars, and more.',
}

export default function AcademicsPage() {
  return (
    <main>
      <PageHero
        title="Academics"
        breadcrumbs={[{ label: 'Academics' }]}
      />

      {/* Curriculum Overview */}
      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.centered}>
            <span className={styles.label}>CBSE Curriculum</span>
            <h2 className={styles.heading}>Our Approach to Education</h2>
            <p className={styles.intro}>
              Kendriya Vidyalaya follows the Central Board of Secondary Education (CBSE) curriculum
              from Pre-Primary through Senior Secondary. Our academic structure emphasizes conceptual
              understanding, practical application, and consistent assessment.
            </p>
          </div>
          <div className={styles.approachGrid}>
            {approaches.map((a, i) => (
              <article key={i} className={styles.approachCard}>
                <span className={styles.approachNum} aria-hidden="true">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className={styles.approachIcon} aria-hidden="true">{a.icon}</span>
                <h3 className={styles.approachTitle}>{a.title}</h3>
                <p className={styles.approachText}>{a.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Programmes */}
      <section className={`${styles.section} ${styles.altBg}`}>
        <div className={styles.container}>
          <div className={styles.centered}>
            <span className={styles.label}>What We Offer</span>
            <h2 className={styles.heading}>Academic Programmes</h2>
          </div>
          <div className={styles.programGrid}>
            {programs.map((p, i) => (
              <article key={i} className={styles.programCard}>
                <span className={styles.programNum} aria-hidden="true">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className={styles.programTitle}>{p.title}</h3>
                <p className={styles.programText}>{p.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Links to Sub-pages */}
      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.centered}>
            <span className={styles.label}>Resources</span>
            <h2 className={styles.heading}>Academic Resources</h2>
            <p className={styles.intro}>
              Access fee details, academic calendar, circulars, homework, and more.
            </p>
          </div>
          <div className={styles.linksGrid}>
            {quickLinks.map((link, i) => (
              <Link key={link.href} href={link.href} className={styles.linkCard}>
                <span className={styles.linkNum} aria-hidden="true">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className={styles.linkTitle}>{link.label}</h3>
                <p className={styles.linkDesc}>{link.desc}</p>
                <span className={styles.linkArrow} aria-hidden="true">→</span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
