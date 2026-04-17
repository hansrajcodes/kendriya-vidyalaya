import Image from 'next/image'
import PageHero from '@/components/pagehero/pagehero'
import styles from './infrastructure.module.css'

const facilities = [
  {
    img: '/images/smartclassroom.webp',
    title: 'Smart Classrooms',
    text: 'Every classroom at Kendriya Vidyalaya is equipped with interactive digital boards, high-quality projectors, and audio-visual systems. These tools enable teachers to deliver dynamic, engaging lessons that cater to visual, auditory, and kinesthetic learners alike. Our smart classroom setup ensures that even complex concepts are made accessible and memorable.',
  },
  {
    img: '/images/sciencelab.webp',
    title: 'Science Laboratories',
    text: 'We maintain three fully equipped laboratories for Physics, Chemistry, and Biology. Each lab is designed to support all CBSE-prescribed practicals safely and effectively, with proper ventilation, safety equipment, and modern instruments. Students from Class VI onwards receive regular hands-on lab experience that deepens their understanding of scientific concepts.',
  },
  {
    img: '/images/computerlabs.webp',
    title: 'Computer Laboratory',
    text: 'Our computer lab features high-performance workstations with broadband internet connectivity. Structured computer education begins from Class III, covering fundamental computing skills, programming basics, and digital literacy. Senior students work with advanced software tools relevant to their academic streams.',
  },
  {
    img: '/images/library.webp',
    title: 'Library & Resource Centre',
    text: 'The school library houses a comprehensive collection of textbooks, reference volumes, encyclopedias, magazines, and digital learning materials. A dedicated reading area encourages a culture of independent learning. The library is open throughout school hours and is regularly updated with the latest publications across all subjects.',
  },
  {
    img: '/images/sports.webp',
    title: 'Sports Facilities',
    text: 'Our campus includes a full-size cricket ground, football field, basketball and volleyball courts, and a 200-metre athletics track. All sporting activities are supervised by trained physical education instructors. Students participate in inter-school competitions at the district and state level, and physical education is a core part of the daily timetable.',
  },
  {
    img: '/images/auditorium.webp',
    title: 'Auditorium & Assembly Hall',
    text: 'The school auditorium is an air-conditioned, multi-purpose facility with professional sound systems and stage lighting. It hosts morning assemblies, annual day celebrations, cultural programmes, inter-house competitions, and guest lectures. The auditorium seats hundreds and serves as the cultural heart of the school.',
  },
]

const campusFeatures = [
  { icon: '🛡️', title: 'Safe Campus', text: '24/7 CCTV surveillance, controlled entry, trained security personnel, and an on-campus medical room.' },
  { icon: '🚌', title: 'Transport Fleet', text: 'GPS-tracked school buses covering major routes across Moga and surrounding areas with trained attendants.' },
  { icon: '💧', title: 'RO Water & Hygiene', text: 'Clean drinking water at every floor, hygienic washrooms, and regular sanitization of the entire campus.' },
  { icon: '🌳', title: 'Green Campus', text: 'Landscaped gardens, tree-lined walkways, and open spaces that create a healthy and inspiring learning environment.' },
]

export const metadata = {
  title: 'Infrastructure & Facilities | Kendriya Vidyalaya, Moga',
  description:
    'Explore the modern infrastructure at Kendriya Vidyalaya, Moga — smart classrooms, science labs, computer lab, library, sports facilities, auditorium, and a safe campus.',
}

export default function InfrastructurePage() {
  return (
    <main>
      <PageHero
        title="Infrastructure & Facilities"
        breadcrumbs={[{ label: 'Infrastructure' }]}
      />

      {/* Facilities Detail Section */}
      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.centered}>
            <span className={styles.label}>Our Campus</span>
            <h2 className={styles.heading}>World-Class Facilities</h2>
            <p className={styles.intro}>
              Spread across a modern campus in Moga, Kendriya Vidyalaya is fully equipped
              to support academic excellence, sports, and the all-round development of every student.
            </p>
          </div>

          <div className={styles.facilityList}>
            {facilities.map((f, i) => (
              <article
                key={i}
                className={`${styles.facilityItem} ${i % 2 !== 0 ? styles.reversed : ''}`}
              >
                <div className={styles.facilityImage}>
                  <Image
                    src={f.img}
                    alt={`${f.title} at Kendriya Vidyalaya, Moga`}
                    width={600}
                    height={400}
                    style={{ objectFit: 'cover', width: '100%', height: '100%' }}
                  />
                </div>
                <div className={styles.facilityContent}>
                  <span className={styles.facilityNum} aria-hidden="true">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <h3 className={styles.facilityTitle}>{f.title}</h3>
                  <p className={styles.facilityText}>{f.text}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Campus Features Grid */}
      <section className={styles.navySection}>
        <div className={styles.container}>
          <div className={styles.centered}>
            <span className={styles.labelLight}>Campus Life</span>
            <h2 className={styles.headingLight}>A Safe & Nurturing Environment</h2>
          </div>
          <div className={styles.featuresGrid}>
            {campusFeatures.map((f, i) => (
              <div key={i} className={styles.featureCard}>
                <span className={styles.featureIcon} aria-hidden="true">{f.icon}</span>
                <h3 className={styles.featureTitle}>{f.title}</h3>
                <p className={styles.featureText}>{f.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
