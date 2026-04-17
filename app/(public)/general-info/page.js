import PageHero from '@/components/pagehero/pagehero'
import styles from './general-info.module.css'

const uniformBoys = [
  'White shirt with school monogram on pocket',
  'Navy blue trousers',
  'Navy blue tie with gold stripes',
  'Black leather shoes with white socks',
  'School belt (navy blue with school buckle)',
  'Navy blue sweater/blazer in winter',
]

const uniformGirls = [
  'White shirt with school monogram on pocket',
  'Navy blue skirt (Pre-Primary to Class V) / Salwar-kameez (Class VI onwards)',
  'Navy blue tie with gold stripes',
  'Black leather shoes with white socks',
  'Navy blue sweater/blazer in winter',
  'White dupatta for senior students',
]

const leaveRules = [
  'A written application from the parent/guardian is mandatory for any leave.',
  'Leave of three or more consecutive days requires prior approval from the Principal.',
  'Medical leave must be accompanied by a valid medical certificate from a registered practitioner.',
  'Students absent without prior permission for more than 10 consecutive working days may have their name struck off the rolls.',
  'Half-day leave is permitted only with a written request submitted at the start of the school day.',
  'Leave during examinations is strongly discouraged and may result in the student not being assessed for that exam.',
]

const transportRules = [
  'The school operates a fleet of GPS-tracked buses covering major routes in and around Moga.',
  'A trained attendant is present on every bus to ensure the safety of younger students.',
  'Bus fees are charged on a monthly/quarterly basis and are non-refundable.',
  'Students must carry their bus identity cards at all times during commute.',
  'Pick-up and drop-off points are designated and cannot be changed mid-session without prior written approval.',
  'Any change in transport requirement must be communicated in writing to the school office one month in advance.',
]

const discipline = [
  'Students must be punctual. Latecomers may not be permitted to attend the first class.',
  'Mobile phones and electronic gadgets are strictly prohibited on campus.',
  'Use of unfair means during examinations will lead to immediate disqualification and disciplinary action.',
  'Students must treat all staff, classmates, and school property with respect.',
  'Bullying, ragging, or any form of harassment is a zero-tolerance offence and will result in suspension or expulsion.',
  'The school dress code must be followed on all working days and during school events.',
  'Damage to school property must be compensated for by the student\'s family.',
]

export const metadata = {
  title: 'General Information | Kendriya Vidyalaya, Moga',
  description:
    'School uniform details, leave rules, transport information, school tours, and discipline code at Kendriya Vidyalaya, Moga.',
}

export default function GeneralInfoPage() {
  return (
    <main>
      <PageHero
        title="General Information"
        breadcrumbs={[{ label: 'General Information' }]}
      />

      {/* School Uniform */}
      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.centered}>
            <span className={styles.label}>Dress Code</span>
            <h2 className={styles.heading}>School Uniform</h2>
            <p className={styles.intro}>
              All students must wear the prescribed school uniform on every working day.
              Uniforms are available at the school store.
            </p>
          </div>

          <div className={styles.uniformGrid}>
            <div className={styles.uniformCard}>
              <h3 className={styles.uniformTitle}>Boys</h3>
              <ul className={styles.uniformList}>
                {uniformBoys.map((item, i) => (
                  <li key={i} className={styles.uniformItem}>
                    <span className={styles.bullet} aria-hidden="true">&#9670;</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className={styles.uniformCard}>
              <h3 className={styles.uniformTitle}>Girls</h3>
              <ul className={styles.uniformList}>
                {uniformGirls.map((item, i) => (
                  <li key={i} className={styles.uniformItem}>
                    <span className={styles.bullet} aria-hidden="true">&#9670;</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Leave Rules */}
      <section className={`${styles.section} ${styles.altBg}`}>
        <div className={styles.container}>
          <span className={styles.label}>Attendance Policy</span>
          <h2 className={styles.heading}>Leave Rules</h2>
          <ul className={styles.ruleList}>
            {leaveRules.map((r, i) => (
              <li key={i} className={styles.ruleItem}>
                <span className={styles.bullet} aria-hidden="true">&#9670;</span>
                {r}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* School Transport */}
      <section className={styles.section}>
        <div className={styles.container}>
          <span className={styles.label}>Commute</span>
          <h2 className={styles.heading}>School Transport</h2>
          <ul className={styles.ruleList}>
            {transportRules.map((r, i) => (
              <li key={i} className={styles.ruleItem}>
                <span className={styles.bullet} aria-hidden="true">&#9670;</span>
                {r}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* School Tours */}
      <section className={`${styles.section} ${styles.altBg}`}>
        <div className={styles.container}>
          <span className={styles.label}>Excursions</span>
          <h2 className={styles.heading}>School Tours</h2>
          <p className={styles.text}>
            Kendriya Vidyalaya organizes educational tours and excursions at least once during
            each academic session. These trips are designed to supplement classroom learning with
            real-world experiences — visits to historical monuments, science centres, industrial
            units, and nature reserves are part of our regular calendar.
          </p>
          <p className={styles.text}>
            Participation is voluntary and subject to written consent from parents. Tour fees are
            collected separately and cover transport, meals, entry charges, and insurance. All
            tours are supervised by senior teaching staff and follow strict safety protocols.
          </p>
        </div>
      </section>

      {/* Discipline */}
      <section className={styles.section}>
        <div className={styles.container}>
          <span className={styles.label}>Code of Conduct</span>
          <h2 className={styles.heading}>Discipline</h2>
          <p className={styles.text} style={{ marginBottom: '24px' }}>
            Discipline is the cornerstone of the Kendriya Vidyalaya ethos. We expect every
            student to uphold the following standards:
          </p>
          <ul className={styles.ruleList}>
            {discipline.map((r, i) => (
              <li key={i} className={styles.ruleItem}>
                <span className={styles.bullet} aria-hidden="true">&#9670;</span>
                {r}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  )
}
