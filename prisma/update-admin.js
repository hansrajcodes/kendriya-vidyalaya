require('dotenv').config()
const bcrypt = require('bcryptjs')

async function main() {
  const { PrismaClient } = require('@prisma/client')
  const { PrismaNeon } = require('@prisma/adapter-neon')

  const adapter = new PrismaNeon({ connectionString: process.env.DATABASE_URL })
  const prisma = new PrismaClient({ adapter })

  const newEmail = process.env.ADMIN_EMAIL
  const newPassword = process.env.ADMIN_PASSWORD

  if (!newEmail || !newPassword) {
    console.error('ADMIN_EMAIL or ADMIN_PASSWORD missing in .env')
    process.exit(1)
  }

  const hashed = await bcrypt.hash(newPassword, 12)

  const oldEmails = [
    'principal@kitchlupublicschool.com',
  ]

  // Try updating any existing admin (by old email or current email).
  const existing = await prisma.user.findFirst({
    where: { OR: [{ email: { in: oldEmails } }, { email: newEmail }] },
  })

  if (existing) {
    const updated = await prisma.user.update({
      where: { id: existing.id },
      data: { email: newEmail, password: hashed },
    })
    console.log(`Updated admin user → ${updated.email}`)
  } else {
    const created = await prisma.user.create({
      data: { email: newEmail, name: 'Principal', password: hashed },
    })
    console.log(`Created admin user → ${created.email}`)
  }

  await prisma.$disconnect()
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
