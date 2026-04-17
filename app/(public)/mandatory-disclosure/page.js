import PageHero from '@/components/pagehero/pagehero'
import { prisma } from '@/lib/prisma'
import { getCurrentSession } from '@/lib/session-year'
import { FiFileText } from 'react-icons/fi'
import FeeDownloadBtn from '@/app/(public)/academics/fee-structure/download-btn'
import CalendarDownloadBtn from '@/app/(public)/academics/calendar/download-btn'
import styles from './mpd.module.css'

export const revalidate = 60

export const metadata = {
  title: 'Mandatory Public Disclosure | Kendriya Vidyalaya, Moga',
  description:
    'CBSE Mandatory Public Disclosure — general information, affiliation documents, infrastructure, staff details, committees, and compliance certificates for Kendriya Vidyalaya, Moga.',
}

/* ─── A: General Information ─── */
const generalInfo = [
  ['Name of the School', 'Kendriya Vidyalaya, Moga'],
  ['Affiliation No.', '1630072'],
  ['School Code', '20067'],
  ['Complete Address with Pin Code', 'FCI Road, Moga — 142001'],
  ['Principal Name & Qualification', 'Mrs. Hem Prabha Sood (M.A., B.Ed)'],
  ['School Email ID', 'drkpsmoga@gmail.com'],
  ['Contact Details', '0163-6237724, 9814207229'],
]

/* ─── B: Documents & Information ─── */
const documents = [
  { name: 'Affiliation / Upgradation / Extension of Affiliation Letter', file: 'AFFILIATION-LETTER-2025-2030.pdf' },
  { name: 'Society / Trust / Company Registration / Renewal Certificate', file: 'society-registration.pdf' },
  { name: 'No Objection Certificate (NOC) by State Govt. / UT', file: 'noc-certii.pdf' },
  { name: 'Recognition Certificate under RTE Act, 2009', file: 'recognition.pdf' },
  { name: 'Valid Building Safety Certificate (National Building Code)', file: 'building-certificate.pdf' },
  { name: 'Valid Fire Safety Certificate', file: 'fire-certificate.pdf' },
  { name: 'DEO Certificate / Self Certification by School', file: 'deo-certificate.pdf' },
  { name: 'Drinking Water, Health & Sanitation Certificates / Water Testing Report', file: 'drinking-water--1.pdf' },
  { name: 'School Managing Committee (SMC)', file: 'smc-26.pdf' },
  { name: 'Parents Teachers Association (PTA) Members', file: 'pta-26.pdf' },
]

/* ─── D: Staff (Teaching) ─── */
const staffLeadership = [
  { role: 'Principal', count: '1', name: 'Mrs. Hem Prabha Sood' },
  { role: 'Vice Principal', count: '1', name: 'Mrs. Megha Arora' },
  { role: 'Headmistress', count: '1', name: 'Mrs. Ruhi Singh' },
  { role: 'Dean of Student Welfare', count: '1', name: 'Mr. Malkit Singh' },
]

const staffTeachers = [
  ['PGT (Post Graduate Teachers)', '25'],
  ['TGT (Trained Graduate Teachers)', '21'],
  ['PRT (Primary Teachers)', '19'],
  ['Teachers Section Ratio', '1:7'],
]

const staffSpecial = [
  { role: 'Special Educator', name: 'Mrs. Manjeet Kaur' },
  { role: 'Counsellor & Wellness Teacher', name: 'Mrs. Radhika Bansal, Mr. Ananthanarayanan' },
]

/* ─── C: Result PDFs ─── */
const resultDocs = [
  { name: 'Board Result — Class X (Last 3 Years)', file: 'result-class-x.pdf' },
  { name: 'Board Result — Class XII (Last 3 Years)', file: 'result-class-xii.pdf' },
]

/* ─── E: Infrastructure ─── */
const infrastructure = [
  ['Total Campus Area', '9,865 Sq. Mtr'],
  ['No. and Size of Classrooms', '59 (38 to 120.40 Sq. Mtr)'],
  ['No. and Size of Laboratories (incl. Computer Labs)', '8 (68.56 to 153.29 Sq. Mtr)'],
  ['Library Size', '330.27 Sq. Mtr'],
  ['Internet Facility', 'Yes'],
  ['No. of Girls Toilets', '27'],
  ['No. of Boys Toilets', '18'],
  ['No. of CWSN Toilets', '6'],
]

/* ─── Committees ─── */
const committees = [
  {
    title: 'POSH Committee (Prevention of Sexual Harassment)',
    description: 'Constituted under the Sexual Harassment of Women at Workplace (Prevention, Prohibition and Redressal) Act, 2013.',
  },
  {
    title: 'POCSO Committee (Child Safety)',
    description: 'Constituted under the Protection of Children from Sexual Offences Act, 2012 to ensure student safety and welfare.',
  },
  {
    title: 'Anti-Bullying Committee',
    description: 'Ensures a safe, inclusive environment free from all forms of bullying, ragging, and intimidation.',
  },
  {
    title: 'Grievance Redressal Committee',
    description: 'Handles parent and student grievances in a transparent and time-bound manner as per CBSE guidelines.',
  },
]

export default async function MandatoryDisclosurePage() {
  const [feeGroups, feeNotes, calendarEvents] = await Promise.all([
    prisma.feeGroup.findMany({ orderBy: { sortOrder: 'asc' } }),
    prisma.feeNote.findMany({ orderBy: { sortOrder: 'asc' } }),
    prisma.calendarEvent.findMany({ orderBy: { date: 'asc' } }),
  ])

  const session = getCurrentSession()

  return (
    <main>
      <PageHero
        title="Mandatory Public Disclosure"
        breadcrumbs={[{ label: 'Mandatory Public Disclosure' }]}
      />

      {/* A: General Information */}
      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.centered}>
            <span className={styles.label}>A: General Information</span>
            <h2 className={styles.heading}>School Details</h2>
            <p className={styles.intro}>
              Disclosed as per mandatory requirements of the Central Board of Secondary Education (CBSE), New Delhi.
            </p>
          </div>

          <table className={styles.infoTable}>
            <thead>
              <tr><th>Information</th><th>Details</th></tr>
            </thead>
            <tbody>
              {generalInfo.map(([label, value]) => (
                <tr key={label}><td className={styles.thCell}>{label}</td><td>{value}</td></tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* B: Documents & Information */}
      <section className={`${styles.section} ${styles.altBg}`}>
        <div className={styles.container}>
          <div className={styles.centered}>
            <span className={styles.label}>B: Documents & Information</span>
            <h2 className={styles.heading}>Uploaded Documents</h2>
            <p className={styles.intro}>
              As per CBSE affiliation by-laws. Click to view or download.
            </p>
          </div>

          <div className={styles.docGrid}>
            {documents.map((doc) => (
              <a key={doc.file} href={`/pdf/${doc.file}`} target="_blank" rel="noopener noreferrer" className={styles.docCard}>
                <div className={styles.docIcon}><FiFileText /></div>
                <div className={styles.docInfo}>
                  <div className={styles.docName}>{doc.name}</div>
                  <div className={styles.docType}>PDF Document</div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* C: Result & Academics */}
      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.centered}>
            <span className={styles.label}>C: Result & Academics</span>
            <h2 className={styles.heading}>Result & Academics</h2>
          </div>

          <h3 className={styles.subHeading}>Fee Structure</h3>
          <p className={styles.text}>Detailed class-wise fee structure for Session {session}.</p>
          <div className={styles.btnRow}>
            <a href="/academics/fee-structure" className={styles.linkBtn}>View Fee Structure</a>
            <FeeDownloadBtn groups={JSON.parse(JSON.stringify(feeGroups))} notes={JSON.parse(JSON.stringify(feeNotes))} />
          </div>

          <h3 className={styles.subHeading}>Annual Academic Calendar</h3>
          <p className={styles.text}>Yearly planner with all important dates, holidays, and events for Session {session}.</p>
          <div className={styles.btnRow}>
            <a href="/academics/calendar" className={styles.linkBtn}>View Calendar</a>
            <CalendarDownloadBtn events={JSON.parse(JSON.stringify(calendarEvents))} session={session} />
          </div>

          <h3 className={styles.subHeading}>Board Examination Results</h3>
          <div className={styles.docGrid}>
            {resultDocs.map((doc) => (
              <a key={doc.file} href={`/pdf/${doc.file}`} target="_blank" rel="noopener noreferrer" className={styles.docCard}>
                <div className={styles.docIcon}><FiFileText /></div>
                <div className={styles.docInfo}>
                  <div className={styles.docName}>{doc.name}</div>
                  <div className={styles.docType}>PDF Document</div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* D: Staff (Teaching) */}
      <section className={`${styles.section} ${styles.altBg}`}>
        <div className={styles.container}>
          <div className={styles.centered}>
            <span className={styles.label}>D: Staff (Teaching)</span>
            <h2 className={styles.heading}>Staff Information</h2>
          </div>

          <h3 className={styles.subHeading}>School Leadership</h3>
          <table className={styles.infraTable}>
            <thead>
              <tr><th>Designation</th><th>Count</th><th>Name</th></tr>
            </thead>
            <tbody>
              {staffLeadership.map((s) => (
                <tr key={s.role}><td>{s.role}</td><td>{s.count}</td><td>{s.name}</td></tr>
              ))}
            </tbody>
          </table>

          <h3 className={styles.subHeading}>Teaching Staff</h3>
          <table className={styles.infraTable}>
            <thead>
              <tr><th>Category</th><th>Number / Strength</th></tr>
            </thead>
            <tbody>
              {staffTeachers.map(([cat, count]) => (
                <tr key={cat}><td>{cat}</td><td>{count}</td></tr>
              ))}
            </tbody>
          </table>

          <h3 className={styles.subHeading}>Special Educators & Counsellors</h3>
          <table className={styles.infraTable}>
            <thead>
              <tr><th>Role</th><th>Name</th></tr>
            </thead>
            <tbody>
              {staffSpecial.map((s) => (
                <tr key={s.role}><td>{s.role}</td><td>{s.name}</td></tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* E: School Infrastructure */}
      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.centered}>
            <span className={styles.label}>E: School Infrastructure</span>
            <h2 className={styles.heading}>Infrastructure Details</h2>
          </div>

          <table className={styles.infraTable}>
            <thead>
              <tr><th>Facility</th><th>Details</th></tr>
            </thead>
            <tbody>
              {infrastructure.map(([facility, detail]) => (
                <tr key={facility}><td>{facility}</td><td>{detail}</td></tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Grievance Redressal */}
      <section className={`${styles.section} ${styles.altBg}`}>
        <div className={styles.container}>
          <div className={styles.centered}>
            <span className={styles.label}>Compliance</span>
            <h2 className={styles.heading}>Grievance Redressal</h2>
            <p className={styles.intro}>
              As per CBSE guidelines, parents and students may contact the Grievance Officer for any complaints or concerns.
            </p>
          </div>

          <div className={styles.contactCard}>
            <div className={styles.contactName}>Mrs. Hem Prabha Sood</div>
            <div className={styles.contactRole}>Grievance Redressal Officer / Principal</div>
            <div className={styles.contactDetail}>
              Email: drkpsmoga@gmail.com<br />
              Phone: 0163-6237724, 9814207229<br />
              Available: Monday – Saturday, 8:00 AM – 2:00 PM
            </div>
          </div>
        </div>
      </section>

      {/* Child Safety & Committees */}
      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.centered}>
            <span className={styles.label}>Safety</span>
            <h2 className={styles.heading}>Child Safety & Committees</h2>
          </div>

          <div className={styles.committeeGrid}>
            {committees.map((c) => (
              <div key={c.title} className={styles.memberCard}>
                <div className={styles.memberName}>{c.title}</div>
                <div className={styles.memberProfession} style={{ marginTop: 8 }}>{c.description}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Admission Policy */}
      <section className={`${styles.section} ${styles.altBg}`}>
        <div className={styles.container}>
          <div className={styles.centered}>
            <span className={styles.label}>Admissions</span>
            <h2 className={styles.heading}>Admission Policy</h2>
          </div>

          <ul className={styles.list}>
            <li className={styles.listItem}>Admissions are open from Pre-Primary (Nursery) to Class XII, subject to seat availability.</li>
            <li className={styles.listItem}>Age eligibility as per CBSE and state government norms.</li>
            <li className={styles.listItem}>Documents required: Birth Certificate, Transfer Certificate (TC), Report Card, Aadhaar Card, Passport-size photographs, and Parent ID proof.</li>
            <li className={styles.listItem}>Admission is granted on the basis of interaction and/or entrance assessment.</li>
            <li className={styles.listItem}>Detailed admission process is available on the <a href="/admission" style={{ color: 'var(--color-navy)', fontWeight: 600 }}>Admission page</a>.</li>
          </ul>
        </div>
      </section>

      {/* Transfer Certificate / Withdrawal */}
      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.centered}>
            <span className={styles.label}>Process</span>
            <h2 className={styles.heading}>Transfer Certificate & Withdrawal</h2>
          </div>

          <ul className={styles.list}>
            <li className={styles.listItem}>Application for TC must be submitted in writing by the parent/guardian at the school office.</li>
            <li className={styles.listItem}>All pending dues must be cleared before TC issuance.</li>
            <li className={styles.listItem}>TC is generally issued within 7 working days of the request.</li>
            <li className={styles.listItem}>Original TC and all school-issued documents are returned upon withdrawal.</li>
            <li className={styles.listItem}>Mid-session withdrawal requires one month&apos;s notice or fee in lieu.</li>
          </ul>
        </div>
      </section>

      {/* Privacy Policy */}
      <section className={`${styles.section} ${styles.altBg}`}>
        <div className={styles.container}>
          <div className={styles.centered}>
            <span className={styles.label}>Legal</span>
            <h2 className={styles.heading}>Privacy Policy & Terms</h2>
          </div>

          <p className={styles.text}>
            This website is owned and operated by Kendriya Vidyalaya, Moga, Punjab. The school respects the privacy of all visitors and users of this website.
          </p>
          <h3 className={styles.subHeading}>Data Collection</h3>
          <p className={styles.text}>
            Information collected through contact forms, admission forms, or career application forms is used solely for the stated purpose and is not shared with any third party.
          </p>
          <h3 className={styles.subHeading}>Use of Information</h3>
          <p className={styles.text}>
            Personal data submitted through this website is used to respond to enquiries, process admission applications, and communicate school-related information. The school does not sell, trade, or rent personal information.
          </p>
          <h3 className={styles.subHeading}>Copyright</h3>
          <p className={styles.text}>
            All content on this website — including text, images, logos, and graphics — is the intellectual property of Kendriya Vidyalaya and may not be reproduced without prior written consent.
          </p>
        </div>
      </section>
    </main>
  )
}
