require('dotenv').config()

async function main() {
  const { PrismaClient } = require('@prisma/client')
  const { PrismaNeon } = require('@prisma/adapter-neon')

  const adapter = new PrismaNeon({ connectionString: process.env.DATABASE_URL })
  const prisma = new PrismaClient({ adapter })

  const now = new Date()
  const startYear = now.getMonth() < 3 ? now.getFullYear() - 1 : now.getFullYear()
  const sessionStart = new Date(startYear, 3, 1)
  const sessionEnd = new Date(startYear + 1, 2, 31, 23, 59, 59)

  console.log(`Today: ${now.toDateString()}`)
  console.log(`Session window: ${sessionStart.toDateString()} → ${sessionEnd.toDateString()}\n`)

  const events = await prisma.calendarEvent.findMany({
    where: { date: { gte: sessionStart, lte: sessionEnd } },
    orderBy: { date: 'asc' },
  })

  console.log(`Found ${events.length} events in current session:\n`)
  for (const ev of events) {
    console.log(`  ${ev.date.toISOString().slice(0, 10)}  ${ev.name}`)
  }

  await prisma.$disconnect()
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
