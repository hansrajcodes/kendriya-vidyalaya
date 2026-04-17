import Image from 'next/image'
import Link from 'next/link'
import PageHero from '@/components/pagehero/pagehero'
import styles from './about.module.css'

const deskMessages = [
  {
    name: 'Mr. Sunil Garg',
    role: 'Chairman',
    image: '/images/chairman.webp',
    message:
      'Education is the most powerful tool we can give our children. At Kendriya Vidyalaya, we are committed to building a generation of confident, compassionate, and capable individuals who will lead with integrity. Our vision since 1989 has been to make world-class education accessible in Moga, and we continue to invest in the best infrastructure, faculty, and opportunities for every student.',
  },
  {
    name: 'Mrs. SUNITA RANI',
    role: 'Director',
    image: '/images/schooldirector.webp',
    message:
      'A school is more than a building — it is a community. At Kendriya Vidyalaya, every teacher, student, and parent is part of a shared mission: to nurture potential and produce responsible citizens. We ensure that academic rigor is balanced with character development, sports, and the arts, because true education shapes the whole person.',
  },
  {
    name: 'Mr. MALKIT SINGH',
    role: 'Dean',
    image: '/images/schooldean.webp',
    message:
      'Academic excellence does not happen by accident — it requires planning, dedication, and a genuine understanding of each student\'s strengths. Our curriculum is designed to challenge and support students at every level, from Pre-Primary through Senior Secondary. We take pride in our structured approach to learning, our regular assessments, and our commitment to helping every child reach their full potential.',
  },
  {
    name: 'Mrs. Hemprabha Sood',
    role: 'Principal',
    image: '/images/schoolprincipal.webp',
    message:
      'Every morning, I see hundreds of young faces walk through our gates, each carrying unique dreams. It is our responsibility and privilege to help them realize those dreams. At Kendriya Vidyalaya, we maintain the highest standards of discipline, academic instruction, and personal care. I invite parents across Moga and beyond to visit our campus and see the difference for themselves.',
  },
]

const coreValues = [
  {
    icon: '\u{1F4DA}',
    title: 'Academic Excellence',
    text: 'Rigorous CBSE curriculum with structured assessments, regular parent-teacher interactions, and a focus on conceptual understanding over rote learning.',
  },
  {
    icon: '\u{1F3AF}',
    title: 'Discipline & Character',
    text: 'A values-first approach that instils punctuality, respect, integrity, and responsibility — habits that stay with students for life.',
  },
  {
    icon: '\u{1F3C6}',
    title: 'Sports & Fitness',
    text: 'Dedicated coaching in athletics, cricket, basketball, and yoga. Our students regularly compete and win at district and state-level tournaments.',
  },
  {
    icon: '\u{1F3AD}',
    title: 'Arts & Culture',
    text: 'Annual cultural festivals, music, dance, and drama programs that nurture creativity and preserve our rich Punjabi and Indian heritage.',
  },
  {
    icon: '\u{1F4BB}',
    title: 'Digital Literacy',
    text: 'Smart classrooms, fully equipped computer labs, and a curriculum that prepares students for the demands of a technology-driven world.',
  },
  {
    icon: '\u{1F91D}',
    title: 'Community Service',
    text: 'Regular social outreach programs, environmental drives, and community engagement that teach students the importance of giving back.',
  },
]

const milestones = [
  { year: '1989', title: 'Foundation', text: 'School established in Moga, Punjab with a handful of classrooms and a bold vision to bring quality education to the region.' },
  { year: '1995', title: 'CBSE Affiliation', text: 'Received CBSE affiliation (No. 1630072), marking a major milestone in our commitment to national educational standards.' },
  { year: '2003', title: 'Senior Secondary Wing', text: 'Expanded to Senior Secondary level with Science, Commerce, and Humanities streams — giving students a complete K-12 pathway.' },
  { year: '2010', title: 'Campus Expansion', text: 'Inaugurated new science laboratories, computer labs, and a modern library to support 21st-century learning.' },
  { year: '2018', title: 'Smart Classrooms', text: 'Rolled out smart classroom technology across all grades, integrating digital learning into everyday instruction.' },
  { year: '2024', title: '35 Years of Excellence', text: 'Celebrated 35 years of shaping futures — with over 15,000 alumni and counting, continuing to set new benchmarks in education.' },
]

const stats = [
  { number: '35+', label: 'Years of Excellence', suffix: 'Since 1989' },
  { number: '15,000+', label: 'Alumni Worldwide', suffix: 'And Growing' },
  { number: '100+', label: 'Qualified Faculty', suffix: 'Expert Educators' },
  { number: '3', label: 'Academic Streams', suffix: 'Science · Commerce · Arts' },
]

const achievements = [
  { icon: '\u{1F3C5}', title: 'District Toppers', text: 'Consistently producing district-level CBSE board toppers in Class X and XII across Science, Commerce, and Arts streams.' },
  { icon: '\u{26BD}', title: 'State-Level Sports Champions', text: 'Multiple gold medals at Punjab State Athletics, Kho-Kho championships, and inter-school cricket tournaments.' },
  { icon: '\u{1F4DC}', title: 'CBSE Affiliation No. 1630072', text: 'Fully affiliated and regularly inspected by CBSE, ensuring adherence to national curriculum standards and academic quality benchmarks.' },
  { icon: '\u{1F3A8}', title: 'Cultural Excellence Awards', text: 'Winners at Zonal and Inter-Zonal Youth Festivals for folk dance, music, and theatrical performances — celebrating our Punjabi heritage.' },
  { icon: '\u{1F4BB}', title: 'Digital Innovation in Education', text: 'Among the first schools in Moga to adopt smart classrooms, digital assessments, and an integrated ERP system for transparent school management.' },
  { icon: '\u{1F30D}', title: 'Community Impact', text: 'Over 35 years of social outreach — blood donation camps, tree plantation drives, and free uniform distribution for underprivileged students.' },
]

const trustSignals = [
  { number: '100%', label: 'Board Pass Rate', text: 'Consistently high pass rates in CBSE Class X and XII board examinations, well above national and state averages.' },
  { number: '4:1', label: 'Parent Referral Ratio', text: 'Four out of every five new admissions come through word-of-mouth from satisfied parents — our strongest endorsement.' },
  { number: '25+', label: 'Co-Curricular Activities', text: 'From robotics and coding clubs to classical dance and debate — every student finds their passion beyond the classroom.' },
]

export const metadata = {
  title: 'About Us | Kendriya Vidyalaya, Moga',
  description:
    'Learn about Kendriya Vidyalaya — our history, mission, vision, and messages from the Chairman, Director, Dean, and Principal.',
}

export default function AboutPage() {
  return (
    <main>
      <PageHero
        title="About Us"
        breadcrumbs={[{ label: 'About Us' }]}
      />

      {/* School History & Mission */}
      <section className={`${styles.section} ${styles.altBg}`}>
        <div className={styles.container}>
          <div className={styles.twoCol}>
            <div className={styles.textCol}>
              <span className={styles.label}>Established 1989</span>
              <h2 className={styles.heading}>Our School</h2>
              <p className={styles.text}>
                Kendriya Vidyalaya was established
                in 1989 in Moga, Punjab, with a clear mission: to provide quality CBSE education
                that is accessible, affordable, and rooted in strong Indian values. What started
                as a small institution has grown into one of the most trusted and respected schools
                in the district.
              </p>
              <p className={styles.text}>
                Over three decades, we have educated thousands of students, many of whom have gone
                on to excel in medicine, engineering, civil services, business, and the arts. Our
                alumni network is a testament to the strong academic and moral foundation that
                Kendriya Vidyalaya provides.
              </p>
            </div>
            <div className={styles.imageCol}>
              <div className={styles.imageFrame}>
                <Image
                  src="/images/aboutus2.webp"
                  alt="Kendriya Vidyalaya campus in Moga, Punjab"
                  width={540}
                  height={420}
                  style={{ objectFit: 'cover', width: '100%', height: '100%' }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* School at a Glance — Stats */}
      <section className={styles.statsSection}>
        <div className={styles.container}>
          <div className={styles.statsGrid}>
            {stats.map((s, i) => (
              <div className={styles.statCard} key={i}>
                <span className={styles.statNumber}>{s.number}</span>
                <span className={styles.statLabel}>{s.label}</span>
                <span className={styles.statSuffix}>{s.suffix}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.centered}>
            <span className={styles.label}>What Drives Us</span>
            <h2 className={styles.heading}>Mission & Vision</h2>
          </div>
          <div className={styles.mvGrid}>
            <div className={`${styles.mvCard} ${styles.mvNavy}`}>
              <span className={styles.mvIcon} aria-hidden="true">&#9670;</span>
              <h3 className={styles.mvTitle}>Our Mission</h3>
              <p className={styles.mvText}>
                To deliver a comprehensive, CBSE-aligned education that develops intellectual
                curiosity, moral character, and physical fitness in every student — preparing
                them to contribute meaningfully to society as informed, responsible citizens.
              </p>
            </div>
            <div className={`${styles.mvCard} ${styles.mvNavy}`}>
              <span className={styles.mvIcon} aria-hidden="true">&#9670;</span>
              <h3 className={styles.mvTitle}>Our Vision</h3>
              <p className={styles.mvText}>
                To be the most trusted educational institution in Moga and the region — known
                for academic excellence, values-based education, and the holistic development
                of every child who walks through our doors.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className={`${styles.section} ${styles.altBg}`}>
        <div className={styles.container}>
          <div className={styles.centered}>
            <span className={styles.label}>What We Stand For</span>
            <h2 className={styles.heading}>Our Core Values</h2>
          </div>
          <div className={styles.valuesGrid}>
            {coreValues.map((v, i) => (
              <article className={styles.valueCard} key={i}>
                <span className={styles.valueNum} aria-hidden="true">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className={styles.valueIcon} aria-hidden="true">{v.icon}</span>
                <h3 className={styles.valueTitle}>{v.title}</h3>
                <p className={styles.valueText}>{v.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Achievements & Recognition */}
      <section className={styles.achievementsSection}>
        <div className={styles.container}>
          <div className={styles.centered}>
            <span className={styles.labelLight}>Proven Track Record</span>
            <h2 className={styles.headingLight}>Achievements & Recognition</h2>
            <p className={styles.achievementsIntro}>
              Over 35 years, Kendriya Vidyalaya has earned a reputation for excellence — in academics,
              sports, culture, and community service. Here are some of the milestones that set us apart.
            </p>
          </div>
          <div className={styles.achievementsGrid}>
            {achievements.map((a, i) => (
              <article className={styles.achievementCard} key={i}>
                <span className={styles.achievementNum} aria-hidden="true">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className={styles.achievementIcon} aria-hidden="true">{a.icon}</span>
                <h3 className={styles.achievementTitle}>{a.title}</h3>
                <p className={styles.achievementText}>{a.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Why Parents Trust Us */}
      <section className={`${styles.section} ${styles.altBg}`}>
        <div className={styles.container}>
          <div className={styles.centered}>
            <span className={styles.label}>The Proof Is in the Numbers</span>
            <h2 className={styles.heading}>Why Parents Trust Us</h2>
          </div>
          <div className={styles.trustGrid}>
            {trustSignals.map((t, i) => (
              <div className={styles.trustCard} key={i}>
                <span className={styles.trustNumber}>{t.number}</span>
                <span className={styles.trustLabel}>{t.label}</span>
                <p className={styles.trustText}>{t.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Journey — Milestones */}
      <section className={styles.milestonesSection}>
        <div className={styles.container}>
          <div className={styles.centered}>
            <span className={styles.labelLight}>Our Journey</span>
            <h2 className={styles.headingLight}>Milestones That Define Us</h2>
          </div>
          <div className={styles.timeline}>
            {milestones.map((m, i) => (
              <div className={styles.timelineItem} key={i}>
                <span className={styles.timelineYear}>{m.year}</span>
                <div className={styles.timelineDot} aria-hidden="true" />
                <div className={styles.timelineContent}>
                  <h3 className={styles.timelineTitle}>{m.title}</h3>
                  <p className={styles.timelineText}>{m.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* From the Desk */}
      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.centered}>
            <span className={styles.label}>Leadership</span>
            <h2 className={styles.heading}>From the Desk</h2>
          </div>
          <div className={styles.deskList}>
            {deskMessages.map((d, i) => (
              <article
                key={i}
                className={`${styles.deskCard} ${i % 2 !== 0 ? styles.deskCardReverse : ''}`}
              >
                <div className={styles.deskImageCol}>
                  <div className={styles.deskImageFrame}>
                    <Image
                      src={d.image}
                      alt={`${d.name}, ${d.role} at Kendriya Vidyalaya`}
                      width={400}
                      height={533}
                      style={{ objectFit: 'cover', width: '100%', height: '100%' }}
                    />
                  </div>
                </div>
                <div className={styles.deskTextCol}>
                  <span className={styles.deskQuote} aria-hidden="true">&ldquo;</span>
                  <p className={styles.deskMessage}>{d.message}</p>
                  <div className={styles.deskFooter}>
                    <span className={styles.deskRule} aria-hidden="true" />
                    <p className={styles.deskName}>{d.name}</p>
                    <p className={styles.deskRole}>{d.role}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Closing CTA */}
      <section className={styles.closingSection}>
        <div className={styles.container}>
          <span className={styles.closingDecoRule} aria-hidden="true" />
          <div className={styles.closingContent}>
            <span className={styles.labelLight}>Our Promise</span>
            <h2 className={styles.closingHeading}>Our Commitment</h2>
            <p className={styles.closingText}>
              For over three decades, Kendriya Vidyalaya
              has stood as a pillar of quality education in Moga, Punjab. Guided by the values of our
              namesake — courage, service, and an unwavering belief in the power of education — we
              continue to nurture young minds into confident, capable, and compassionate individuals.
            </p>
            <div className={styles.closingBtns}>
              <Link href="/admission" className={styles.closingBtnPrimary}>
                Apply for Admission
              </Link>
              <Link href="/contact" className={styles.closingBtnSecondary}>
                Visit Our Campus
              </Link>
            </div>
          </div>
          <span className={styles.closingDecoRule} aria-hidden="true" />
        </div>
      </section>
    </main>
  )
}
