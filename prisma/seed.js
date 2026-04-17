require('dotenv').config()
const bcrypt = require('bcryptjs')

async function main() {
  const { PrismaClient } = require('@prisma/client')
  const { PrismaNeon } = require('@prisma/adapter-neon')

  const adapter = new PrismaNeon({ connectionString: process.env.DATABASE_URL })
  const prisma = new PrismaClient({ adapter })

  // ── Admin User ──
  const hashedPassword = await bcrypt.hash(
    process.env.ADMIN_PASSWORD || 'KendriyaAdmin@2026',
    12
  )

  const admin = await prisma.user.upsert({
    where: { email: process.env.ADMIN_EMAIL || 'principal@kendriyavidyalaya.com' },
    update: {},
    create: {
      email: process.env.ADMIN_EMAIL || 'principal@kendriyavidyalaya.com',
      name: 'Principal',
      password: hashedPassword,
    },
  })
  console.log('Admin user:', admin.email)

  // ── Fee Structure ──
  const feeCount = await prisma.feeGroup.count()
  if (feeCount === 0) {
    await prisma.feeGroup.createMany({
      data: [
        { classRange: 'Nur to U.K.G', siblingDiscount: 15, monthlyTuition: 2600, idCardNew: 100, idCardOld: 100, registrationNew: 3000, registrationOld: 0, admissionNew: 3000, admissionOld: 0, tuitionNew: 7800, tuitionOld: 7800, sortOrder: 1 },
        { classRange: 'I to III', siblingDiscount: 15, monthlyTuition: 2900, idCardNew: 100, idCardOld: 100, registrationNew: 3000, registrationOld: 0, admissionNew: 5000, admissionOld: 0, tuitionNew: 8700, tuitionOld: 8700, sortOrder: 2 },
        { classRange: 'IV to VI', siblingDiscount: 15, monthlyTuition: 3100, idCardNew: 100, idCardOld: 100, registrationNew: 3000, registrationOld: 0, admissionNew: 6000, admissionOld: 0, tuitionNew: 9300, tuitionOld: 9300, sortOrder: 3 },
        { classRange: 'VII & VIII', siblingDiscount: 15, monthlyTuition: 3300, idCardNew: 100, idCardOld: 100, registrationNew: 3000, registrationOld: 0, admissionNew: 7000, admissionOld: 0, tuitionNew: 9900, tuitionOld: 9900, sortOrder: 4 },
        { classRange: 'IX & X', siblingDiscount: 15, monthlyTuition: 3600, idCardNew: 100, idCardOld: 100, registrationNew: 3000, registrationOld: 0, admissionNew: 8000, admissionOld: 0, tuitionNew: 10800, tuitionOld: 10800, sortOrder: 5 },
        { classRange: 'XI', siblingDiscount: 15, monthlyTuition: 4300, idCardNew: 100, idCardOld: 100, registrationNew: 3000, registrationOld: 0, admissionNew: 8000, admissionOld: 0, tuitionNew: 12900, tuitionOld: 12900, sortOrder: 6 },
        { classRange: 'XII', siblingDiscount: 15, monthlyTuition: 4500, idCardNew: 100, idCardOld: 100, registrationNew: 3000, registrationOld: 0, admissionNew: 8000, admissionOld: 0, tuitionNew: 13500, tuitionOld: 13500, sortOrder: 7 },
      ],
    })
    await prisma.feeNote.createMany({
      data: [
        { content: 'Exam Fee ₹1,000 — payable three times a year (July 25, Oct 25, Jan 26).', sortOrder: 1 },
        { content: 'Skills Subjects (Taxation, A.I. & Mathematics) — ₹1,500 for both new and old students.', sortOrder: 2 },
        { content: 'Staff Child: Nursery to VIII (Monthly) = ₹1,000, IX–XII = ₹1,200, Class IV Monthly ₹600, Exam ₹1,000, Admission ₹2,000.', sortOrder: 3 },
      ],
    })
    console.log('Seeded fee structure')
  }

  // ── Faculty ──
  const facultyCount = await prisma.faculty.count()
  if (facultyCount === 0) {
    await prisma.faculty.createMany({
      data: [
        { name: '[Principal Name]', role: 'Principal', subject: 'Administration', qualification: 'M.Ed., M.A.', sortOrder: 1 },
        { name: '[Vice Principal Name]', role: 'Vice Principal', subject: 'English', qualification: 'M.A. English, B.Ed.', sortOrder: 2 },
        { name: '[Teacher Name]', role: 'PGT', subject: 'Physics', qualification: 'M.Sc. Physics, B.Ed.', sortOrder: 3 },
        { name: '[Teacher Name]', role: 'PGT', subject: 'Chemistry', qualification: 'M.Sc. Chemistry, B.Ed.', sortOrder: 4 },
        { name: '[Teacher Name]', role: 'PGT', subject: 'Mathematics', qualification: 'M.Sc. Mathematics, B.Ed.', sortOrder: 5 },
        { name: '[Teacher Name]', role: 'PGT', subject: 'Biology', qualification: 'M.Sc. Biology, B.Ed.', sortOrder: 6 },
        { name: '[Teacher Name]', role: 'PGT', subject: 'Commerce', qualification: 'M.Com., B.Ed.', sortOrder: 7 },
        { name: '[Teacher Name]', role: 'TGT', subject: 'Hindi', qualification: 'M.A. Hindi, B.Ed.', sortOrder: 8 },
        { name: '[Teacher Name]', role: 'TGT', subject: 'Social Science', qualification: 'M.A. History, B.Ed.', sortOrder: 9 },
        { name: '[Teacher Name]', role: 'TGT', subject: 'Computer Science', qualification: 'MCA, B.Ed.', sortOrder: 10 },
        { name: '[Teacher Name]', role: 'PRT', subject: 'Primary (Class I-V)', qualification: 'B.A., D.El.Ed.', sortOrder: 11 },
        { name: '[Teacher Name]', role: 'PET', subject: 'Physical Education', qualification: 'B.P.Ed., M.P.Ed.', sortOrder: 12 },
      ],
    })
    console.log('Seeded faculty')
  }

  // ── Circulars ──
  const circularCount = await prisma.circular.count()
  if (circularCount === 0) {
    await prisma.circular.createMany({
      data: [
        { title: 'Annual Examination Schedule for Session 2025-26', date: new Date('2026-02-15'), type: 'Examination' },
        { title: 'Annual Day Celebration — Schedule & Dress Code', date: new Date('2026-02-01'), type: 'Event' },
        { title: 'Republic Day — Holiday Notification', date: new Date('2026-01-20'), type: 'Holiday' },
        { title: 'Winter Break Homework Submission Deadline', date: new Date('2026-01-10'), type: 'Academic' },
        { title: 'Winter Vacation Notice — December 2025', date: new Date('2025-12-15'), type: 'Holiday' },
        { title: 'Unit Test II — Datesheet & Syllabus', date: new Date('2025-12-01'), type: 'Examination' },
        { title: 'Sports Day — Event Details & Participation', date: new Date('2025-11-15'), type: 'Event' },
        { title: 'Fee Payment Reminder — November 2025', date: new Date('2025-11-01'), type: 'General' },
      ],
    })
    console.log('Seeded circulars')
  }

  // ── Careers ──
  const careerCount = await prisma.career.count()
  if (careerCount === 0) {
    await prisma.career.createMany({
      data: [
        { title: 'PGT — Physics', type: 'Teaching', qualification: 'M.Sc. Physics, B.Ed.', experience: '3+ years' },
        { title: 'PGT — English', type: 'Teaching', qualification: 'M.A. English, B.Ed.', experience: '3+ years' },
        { title: 'TGT — Mathematics', type: 'Teaching', qualification: 'B.Sc. Mathematics, B.Ed.', experience: '2+ years' },
        { title: 'PRT — Primary Section', type: 'Teaching', qualification: 'B.A. / B.Sc., D.El.Ed.', experience: '1+ years' },
        { title: 'Lab Assistant — Science', type: 'Non-Teaching', qualification: 'B.Sc. with lab experience', experience: '1+ years' },
        { title: 'Administrative Assistant', type: 'Non-Teaching', qualification: 'Graduate with computer proficiency', experience: '2+ years' },
      ],
    })
    console.log('Seeded careers')
  }

  // ── Testimonials ──
  const testimonialCount = await prisma.testimonial.count()
  if (testimonialCount === 0) {
    await prisma.testimonial.createMany({
      data: [
        { name: 'Mrs. Amandeep Kaur', quote: 'Kendriya Vidyalaya has been the best choice for my children. The teachers genuinely care about every student\'s progress.', role: 'Parent of Class X Student', sortOrder: 1 },
        { name: 'Mr. Rajesh Sharma', quote: 'The discipline, values, and academic rigour at this school are unmatched in Moga. My son has flourished here.', role: 'Parent of Class VIII Student', sortOrder: 2 },
        { name: 'Mrs. Pooja Gupta', quote: 'From infrastructure to faculty quality, everything about this school gives us confidence that our daughter is in the right place.', role: 'Parent of Class V Student', sortOrder: 3 },
      ],
    })
    console.log('Seeded testimonials')
  }

  // ── Homework ──
  const homeworkCount = await prisma.homework.count()
  if (homeworkCount === 0) {
    await prisma.homework.createMany({
      data: [
        { className: 'Nursery – UKG', vacationPeriod: 'Winter 2025', date: 'December 2025' },
        { className: 'Class I – II', vacationPeriod: 'Winter 2025', date: 'December 2025' },
        { className: 'Class III – V', vacationPeriod: 'Winter 2025', date: 'December 2025' },
        { className: 'Class VI – VIII', vacationPeriod: 'Winter 2025', date: 'December 2025' },
        { className: 'Class IX – X', vacationPeriod: 'Winter 2025', date: 'December 2025' },
        { className: 'Class XI – XII', vacationPeriod: 'Winter 2025', date: 'December 2025' },
      ],
    })
    console.log('Seeded homework')
  }

  // ── Calendar ──
  const calendarCount = await prisma.calendarEvent.count()
  if (calendarCount === 0) {
    await prisma.calendarEvent.createMany({
      data: [
        { date: new Date('2026-04-01'), name: 'Session Begins' },
        { date: new Date('2026-04-05'), name: 'Orientation Day for new students' },
        { date: new Date('2026-05-15'), name: 'Summer Break begins' },
        { date: new Date('2026-07-01'), name: 'Session resumes' },
        { date: new Date('2026-07-15'), name: 'Unit Test I' },
        { date: new Date('2026-07-28'), name: 'Parent-Teacher Meeting' },
        { date: new Date('2026-08-09'), name: 'Raksha Bandhan' },
        { date: new Date('2026-08-15'), name: 'Independence Day' },
        { date: new Date('2026-09-04'), name: 'Janmashtami' },
        { date: new Date('2026-09-05'), name: "Teacher's Day" },
        { date: new Date('2026-09-22'), name: 'Half-Yearly Examination begins' },
        { date: new Date('2026-10-02'), name: 'Half-Yearly Examination ends' },
        { date: new Date('2026-10-20'), name: 'Dussehra Break' },
        { date: new Date('2026-11-08'), name: 'Diwali Break' },
        { date: new Date('2026-11-14'), name: "Children's Day" },
        { date: new Date('2026-11-24'), name: 'Guru Nanak Jayanti' },
        { date: new Date('2026-11-25'), name: 'Sports Day' },
        { date: new Date('2026-12-08'), name: 'Unit Test II' },
        { date: new Date('2026-12-20'), name: 'Winter Break begins' },
        { date: new Date('2026-12-25'), name: 'Christmas' },
        { date: new Date('2027-01-05'), name: 'Session resumes' },
        { date: new Date('2027-01-13'), name: 'Lohri' },
        { date: new Date('2027-01-26'), name: 'Republic Day' },
        { date: new Date('2027-02-10'), name: 'Annual Examination begins (Senior)' },
        { date: new Date('2027-02-20'), name: 'Annual Day preparations' },
        { date: new Date('2027-03-01'), name: 'Annual Examination' },
        { date: new Date('2027-03-15'), name: 'Annual Day Celebration' },
        { date: new Date('2027-03-28'), name: 'Result Declaration' },
      ],
    })
    console.log('Seeded calendar')
  }

  // ── Syllabus ──
  const syllabusCount = await prisma.syllabus.count()
  if (syllabusCount === 0) {
    await prisma.syllabus.createMany({
      data: [
        { className: 'Pre-Primary (Nursery – UKG)', sortOrder: 1 },
        { className: 'Class I – V', sortOrder: 2 },
        { className: 'Class VI – VIII', sortOrder: 3 },
        { className: 'Class IX – X', sortOrder: 4 },
        { className: 'Class XI – XII (Science)', sortOrder: 5 },
        { className: 'Class XI – XII (Commerce)', sortOrder: 6 },
        { className: 'Class XI – XII (Arts)', sortOrder: 7 },
      ],
    })
    console.log('Seeded syllabus')
  }

  // ── Datesheet ──
  const datesheetCount = await prisma.datesheet.count()
  if (datesheetCount === 0) {
    await prisma.datesheet.createMany({
      data: [
        { term: 'Unit Test I', month: 'July', sortOrder: 1 },
        { term: 'Half-Yearly Examination', month: 'September–October', sortOrder: 2 },
        { term: 'Unit Test II', month: 'December', sortOrder: 3 },
        { term: 'Annual Examination', month: 'February–March', sortOrder: 4 },
      ],
    })
    console.log('Seeded datesheets')
  }

  // ── Book List ──
  const bookCount = await prisma.bookList.count()
  if (bookCount === 0) {
    const classes = [
      'Nursery', 'LKG', 'UKG',
      'Class I', 'Class II', 'Class III', 'Class IV', 'Class V',
      'Class VI', 'Class VII', 'Class VIII',
      'Class IX', 'Class X',
      'Class XI (Science)', 'Class XI (Commerce)', 'Class XI (Arts)',
      'Class XII (Science)', 'Class XII (Commerce)', 'Class XII (Arts)',
    ]
    await prisma.bookList.createMany({
      data: classes.map((cls, i) => ({
        className: cls,
        year: '2025-26',
        sortOrder: i + 1,
      })),
    })
    console.log('Seeded book list')
  }

  console.log('Seeding complete!')
  await prisma.$disconnect()
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
