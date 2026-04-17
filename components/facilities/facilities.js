import Image from 'next/image'
import Link  from 'next/link'
import styles from './facilities.module.css'

const facilities = [
  { img: '/images/smartclassroom.webp', title: 'Smart Classrooms',       text: 'Interactive digital boards and audio-visual systems that make every lesson more engaging and effective for students.' },
  { img: '/images/sciencelab.webp',     title: 'Science Laboratories',   text: 'Three fully equipped labs for Physics, Chemistry, and Biology — supporting all CBSE-prescribed practicals safely.' },
  { img: '/images/computerlabs.webp',    title: 'Computer Laboratory',     text: 'High-performance workstations with high-speed internet, supporting structured computer education from Class III onwards.' },
  { img: '/images/library.webp',         title: 'Library',                 text: 'A comprehensive resource centre with 10,000+ books, reference volumes, and digital learning materials.' },
  { img: '/images/sports.webp',          title: 'Sports Facilities',       text: 'Cricket, football, basketball courts, and athletics track — supervised by trained physical education instructors.' },
  { img: '/images/auditorium.webp',      title: 'Auditorium',              text: 'A 500-seat air-conditioned auditorium with professional sound and stage lighting for events and performances.' },
]

export default function Facilities() {
  return (
    <section className={styles.section} aria-labelledby="facilities-heading">
      <div className={styles.container}>

        <div className={styles.sectionTop}>
          <span className={styles.decoSquare} aria-hidden="true" />
          <div className={styles.headingGroup}>
            <span className={styles.label}>Our Campus</span>
            <h2 id="facilities-heading" className={styles.heading}>
              Infrastructure &amp; Facilities
            </h2>
            <p className={styles.intro}>
              Spread across 9,865 sq. metres in Moga, our campus is fully equipped to support
              academic excellence and the all-round development of every student.
            </p>
          </div>
        </div>

        <span className="sr-only">
          Kendriya Vidyalaya in Moga features smart classrooms, science labs, a computer lab,
          library, sports ground, and an auditorium within a safe and modern campus.
        </span>

        <div className={styles.gridWrapper}>
          {/* Decorative cross-hatch lines behind grid */}
          <span className={styles.decoCross} aria-hidden="true" />

          <ul className={styles.grid}>
            {facilities.map((f, i) => (
              <li key={i} className={styles.card}>
                <div className={styles.imageWrapper}>
                  <Image
                    src={f.img}
                    alt={`${f.title} at Kendriya Vidyalaya, Moga`}
                    width={400} height={280} loading="lazy"
                    style={{ objectFit: 'cover', width: '100%', height: '100%' }}
                  />
                </div>
                <div className={styles.cardBody}>
                  <h3 className={styles.cardTitle}>{f.title}</h3>
                  <p className={styles.cardText}>{f.text}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.cta}>
          <Link href="/infrastructure" className={styles.link}
            aria-label="Explore all facilities at Kendriya Vidyalaya">
            Know More <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </section>
  )
}
