import Link from 'next/link'
import PageHero from '@/components/pagehero/pagehero'
import { prisma } from '@/lib/prisma'
import styles from './admission.module.css'

const steps = [
  {
    num: '01',
    icon: '\u{1F4CB}',
    title: 'Collect Application Form',
    text: 'Obtain the admission form from the school office or download it from the website. Fill in all required details accurately.',
  },
  {
    num: '02',
    icon: '\u{1F4AC}',
    title: 'Student Interaction',
    text: 'The student will be invited for an informal interaction/assessment appropriate to the class applied for.',
  },
  {
    num: '03',
    icon: '\u{1F4C4}',
    title: 'Document Verification',
    text: 'Submit original and photocopied documents including birth certificate, previous school records, transfer certificate, and photographs.',
  },
  {
    num: '04',
    icon: '\u{2705}',
    title: 'Fee Payment & Enrollment',
    text: 'Upon selection, complete the fee payment at the school accounts office. The student is officially enrolled upon fee confirmation.',
  },
]

const rules = [
  'Admission is granted on a first-come, first-served basis subject to seat availability.',
  'The decision of the Admission Committee is final and binding.',
  'Parents must provide accurate information; any discrepancy may lead to cancellation of admission.',
  'Age criteria as prescribed by CBSE must be met for the respective class.',
  'Transfer Certificate (TC) from the previous school is mandatory for Class II onwards.',
  'Students seeking admission to Class XI must have passed Class X from a CBSE-affiliated school.',
]

const feeRules = [
  'Fees must be paid by the 15th of every month. Late payment will attract a fine as per school policy.',
  'Fees can be paid quarterly, half-yearly, or annually at the accounts office.',
  'Fee once paid is non-refundable under any circumstances.',
  'A fee concession, if applicable, must be applied for at the beginning of the academic session.',
  'Cheque bounce will be subject to penalty charges.',
  'The school reserves the right to revise the fee structure at the beginning of each academic session.',
]

const timings = [
  { icon: '\u{2600}\u{FE0F}', label: 'Summer Session', period: 'April – September', time: '7:30 AM – 1:30 PM' },
  { icon: '\u{2744}\u{FE0F}', label: 'Winter Session', period: 'October – March', time: '8:30 AM – 2:30 PM' },
  { icon: '\u{1F3E2}', label: 'Office Hours', period: 'Monday – Saturday', time: '8:00 AM – 3:00 PM' },
]

const highlights = [
  { number: 'Pre-Nursery to XII', label: 'All Grades' },
  { number: '3 Streams', label: 'Science · Commerce · Arts' },
  { number: 'CBSE Affiliated', label: 'Aff. No. 1630072' },
  { number: 'Since 1989', label: '35+ Years Legacy' },
]

const docs = [
  'Birth Certificate (original + photocopy)',
  'Transfer Certificate from previous school',
  'Report Card / Mark Sheet of last class attended',
  'Aadhar Card of the student',
  '4 recent passport-size photographs',
  'Address proof of parent/guardian',
]

export const metadata = {
  title: 'Admissions | Kendriya Vidyalaya, Moga',
  description:
    'Admission procedure, rules, fee payment guidelines, and school timings at Kendriya Vidyalaya, Moga. Apply now for Pre-Primary to Class XII.',
}

export default async function AdmissionPage() {
  const formSetting = await prisma.siteSetting.findUnique({
    where: { key: 'admissionFormPdf' },
  })
  const hasAdmissionForm = !!formSetting?.value

  return (
    <main>
      <PageHero
        title="Admissions"
        breadcrumbs={[{ label: 'Admission' }]}
      />

      {/* Admission Procedure */}
      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.centered}>
            <span className={styles.label}>How to Apply</span>
            <h2 className={styles.heading}>Admission Procedure</h2>
            <p className={styles.intro}>
              Admissions at Kendriya Vidyalaya follow a transparent and straightforward process.
              Follow the steps below to enroll your child.
            </p>
          </div>

          <div className={styles.stepsTimeline}>
            {steps.map((s, i) => (
              <div key={s.num} className={styles.stepItem}>
                <div className={styles.stepConnector} aria-hidden="true">
                  <span className={styles.stepDot}>
                    <span className={styles.stepIcon}>{s.icon}</span>
                  </span>
                  {i < steps.length - 1 && <span className={styles.stepLine} />}
                </div>
                <div className={styles.stepCard}>
                  <span className={styles.stepNum}>{s.num}</span>
                  <h3 className={styles.stepTitle}>{s.title}</h3>
                  <p className={styles.stepText}>{s.text}</p>
                </div>
              </div>
            ))}
          </div>

          <div className={styles.ctaBox}>
            <Link href="/admission/apply" className={styles.ctaBtn}>
              Apply Online
            </Link>
            {hasAdmissionForm && (
              <a href="/api/admission-form" download className={styles.ctaBtnOutline}>
                Download Admission Form
              </a>
            )}
          </div>
        </div>
      </section>

      {/* Documents Required */}
      <section className={styles.docsSection}>
        <div className={styles.container}>
          <div className={styles.centered}>
            <span className={styles.labelLight}>Checklist</span>
            <h2 className={styles.headingLight}>Documents Required</h2>
          </div>
          <div className={styles.docsGrid}>
            {docs.map((d, i) => (
              <div className={styles.docItem} key={i}>
                <span className={styles.docCheck} aria-hidden="true">&#10003;</span>
                <span className={styles.docText}>{d}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Admission Rules & Fee Policy */}
      <section className={`${styles.section} ${styles.altBg}`}>
        <div className={styles.container}>
          <div className={styles.rulesLayout}>
            <div className={styles.rulesCol}>
              <span className={styles.label}>Guidelines</span>
              <h2 className={styles.heading}>Admission Rules</h2>
              <div className={styles.ruleList}>
                {rules.map((r, i) => (
                  <div key={i} className={styles.ruleItem}>
                    <span className={styles.ruleNum}>{String(i + 1).padStart(2, '0')}</span>
                    <p className={styles.ruleText}>{r}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className={styles.rulesCol}>
              <span className={styles.label}>Fee Policy</span>
              <h2 className={styles.heading}>Rules Regarding Fees</h2>
              <div className={styles.ruleList}>
                {feeRules.map((r, i) => (
                  <div key={i} className={styles.ruleItem}>
                    <span className={styles.ruleNum}>{String(i + 1).padStart(2, '0')}</span>
                    <p className={styles.ruleText}>{r}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* School Timing */}
      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.centered}>
            <span className={styles.label}>Schedule</span>
            <h2 className={styles.heading}>School Timing</h2>
          </div>
          <div className={styles.timingGrid}>
            {timings.map((t, i) => (
              <div key={i} className={styles.timingCard}>
                <span className={styles.timingIcon}>{t.icon}</span>
                <p className={styles.timingLabel}>{t.label}</p>
                <p className={styles.timingPeriod}>{t.period}</p>
                <p className={styles.timingTime}>{t.time}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Closing CTA */}
      <section className={styles.closingSection}>
        <div className={styles.container}>
          <div className={styles.closingContent}>
            <span className={styles.labelLight}>Begin Your Journey</span>
            <h2 className={styles.closingHeading}>Admissions Open for 2025–26</h2>
            <p className={styles.closingText}>
              Give your child the gift of quality education. Join the Kendriya Vidyalaya family —
              where every student is nurtured to achieve their fullest potential.
            </p>
            <div className={styles.closingBtns}>
              <Link href="/admission/apply" className={styles.closingBtnPrimary}>
                Apply Now
              </Link>
              <Link href="/contact" className={styles.closingBtnSecondary}>
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
