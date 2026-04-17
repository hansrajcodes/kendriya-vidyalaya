require('dotenv').config()

async function main() {
  const { PrismaClient } = require('@prisma/client')
  const { PrismaNeon } = require('@prisma/adapter-neon')

  const adapter = new PrismaNeon({ connectionString: process.env.DATABASE_URL })
  const prisma = new PrismaClient({ adapter })

  // Compute current academic session range (April → March)
  const now = new Date()
  const startYear = now.getMonth() < 3 ? now.getFullYear() - 1 : now.getFullYear()

  // Note: dates for lunar/Islamic festivals are approximations and should
  // be reviewed annually by the admin against the official calendar.
  const events = [
    // ── April ──
    { m: 3,  d: 1,  name: 'Session Begins',                       y: startYear },
    { m: 3,  d: 5,  name: 'Orientation Day for new students',     y: startYear },
    { m: 3,  d: 14, name: 'Baisakhi (Vaisakhi)',                  y: startYear },
    { m: 3,  d: 21, name: 'Ram Navami',                           y: startYear },
    { m: 3,  d: 30, name: 'Mahavir Jayanti',                      y: startYear },
    // ── May ──
    { m: 4,  d: 1,  name: 'Labour Day',                           y: startYear },
    { m: 4,  d: 11, name: 'Buddha Purnima',                       y: startYear },
    { m: 4,  d: 15, name: 'Summer Break begins',                  y: startYear },
    { m: 4,  d: 27, name: 'Eid-ul-Adha (Bakrid)',                 y: startYear },
    // ── July ──
    { m: 6,  d: 1,  name: 'Session resumes',                      y: startYear },
    { m: 6,  d: 5,  name: 'Muharram',                             y: startYear },
    { m: 6,  d: 15, name: 'Unit Test I',                          y: startYear },
    { m: 6,  d: 28, name: 'Parent-Teacher Meeting',               y: startYear },
    // ── August ──
    { m: 7,  d: 9,  name: 'Raksha Bandhan',                       y: startYear },
    { m: 7,  d: 15, name: 'Independence Day',                     y: startYear },
    // ── September ──
    { m: 8,  d: 4,  name: 'Janmashtami',                          y: startYear },
    { m: 8,  d: 5,  name: "Teacher's Day",                        y: startYear },
    { m: 8,  d: 14, name: 'Ganesh Chaturthi',                     y: startYear },
    { m: 8,  d: 22, name: 'Half-Yearly Examination begins',       y: startYear },
    // ── October ──
    { m: 9,  d: 2,  name: 'Gandhi Jayanti',                       y: startYear },
    { m: 9,  d: 5,  name: 'Half-Yearly Examination ends',         y: startYear },
    { m: 9,  d: 20, name: 'Dussehra Break (Vijayadashami)',       y: startYear },
    // ── November ──
    { m: 10, d: 8,  name: 'Diwali Break',                         y: startYear },
    { m: 10, d: 10, name: 'Bhai Dooj',                            y: startYear },
    { m: 10, d: 14, name: "Children's Day",                       y: startYear },
    { m: 10, d: 24, name: 'Guru Nanak Jayanti',                   y: startYear },
    { m: 10, d: 25, name: 'Sports Day',                           y: startYear },
    // ── December ──
    { m: 11, d: 8,  name: 'Unit Test II',                         y: startYear },
    { m: 11, d: 20, name: 'Winter Break begins',                  y: startYear },
    { m: 11, d: 25, name: 'Christmas',                            y: startYear },
    // ── January ──
    { m: 0,  d: 1,  name: "New Year's Day",                       y: startYear + 1 },
    { m: 0,  d: 5,  name: 'Session resumes',                      y: startYear + 1 },
    { m: 0,  d: 13, name: 'Lohri',                                y: startYear + 1 },
    { m: 0,  d: 14, name: 'Makar Sankranti / Maghi',              y: startYear + 1 },
    { m: 0,  d: 17, name: 'Guru Gobind Singh Jayanti',            y: startYear + 1 },
    { m: 0,  d: 26, name: 'Republic Day',                         y: startYear + 1 },
    // ── February ──
    { m: 1,  d: 10, name: 'Annual Examination begins (Senior)',   y: startYear + 1 },
    { m: 1,  d: 14, name: 'Maha Shivratri',                       y: startYear + 1 },
    { m: 1,  d: 20, name: 'Annual Day preparations',              y: startYear + 1 },
    // ── March ──
    { m: 2,  d: 1,  name: 'Annual Examination',                   y: startYear + 1 },
    { m: 2,  d: 4,  name: 'Holi',                                 y: startYear + 1 },
    { m: 2,  d: 15, name: 'Annual Day Celebration',               y: startYear + 1 },
    { m: 2,  d: 19, name: 'Eid-ul-Fitr',                          y: startYear + 1 },
    { m: 2,  d: 28, name: 'Result Declaration',                   y: startYear + 1 },
  ]

  const sessionStart = new Date(startYear, 3, 1)
  const sessionEnd = new Date(startYear + 1, 2, 31, 23, 59, 59)

  const deleted = await prisma.calendarEvent.deleteMany({
    where: { date: { gte: sessionStart, lte: sessionEnd } },
  })
  console.log(`Deleted ${deleted.count} existing events in range ${sessionStart.toDateString()} → ${sessionEnd.toDateString()}`)

  await prisma.calendarEvent.createMany({
    data: events.map((e) => ({ date: new Date(e.y, e.m, e.d), name: e.name })),
  })
  console.log(`Inserted ${events.length} events for session ${startYear}-${String(startYear + 1).slice(2)}`)

  await prisma.$disconnect()
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
