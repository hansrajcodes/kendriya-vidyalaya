import Link from 'next/link'
import {
  FiFileText, FiBook, FiDollarSign, FiBookOpen,
  FiCalendar, FiClipboard, FiUsers, FiBriefcase,
  FiMessageSquare, FiCamera, FiUserPlus, FiInbox
} from 'react-icons/fi'
import { prisma } from '@/lib/prisma'
import styles from './overview.module.css'

async function getCounts() {
  const [
    circulars, homework, feeGroups, bookList,
    calendar, syllabus, datesheets,
    faculty, careers, testimonials, gallery,
    admissions, careerApps
  ] = await Promise.all([
    prisma.circular.count(),
    prisma.homework.count(),
    prisma.feeGroup.count(),
    prisma.bookList.count(),
    prisma.calendarEvent.count(),
    prisma.syllabus.count(),
    prisma.datesheet.count(),
    prisma.faculty.count(),
    prisma.career.count(),
    prisma.testimonial.count(),
    prisma.galleryImage.count(),
    prisma.admissionApplication.count(),
    prisma.careerApplication.count(),
  ])

  return {
    circulars, homework, feeGroups, bookList,
    calendar, syllabus, datesheets,
    faculty, careers, testimonials, gallery,
    admissions, careerApps
  }
}

const statCards = [
  { key: 'circulars', label: 'Circulars', icon: FiFileText, href: '/dashboard/circulars' },
  { key: 'homework', label: 'Homework', icon: FiBook, href: '/dashboard/homework' },
  { key: 'feeGroups', label: 'Fee Structure', icon: FiDollarSign, href: '/dashboard/fee-structure' },
  { key: 'bookList', label: 'Book List', icon: FiBookOpen, href: '/dashboard/book-list' },
  { key: 'calendar', label: 'Calendar Months', icon: FiCalendar, href: '/dashboard/calendar' },
  { key: 'syllabus', label: 'Syllabus', icon: FiClipboard, href: '/dashboard/examination' },
  { key: 'datesheets', label: 'Datesheets', icon: FiClipboard, href: '/dashboard/examination' },
  { key: 'faculty', label: 'Faculty', icon: FiUsers, href: '/dashboard/faculty' },
  { key: 'careers', label: 'Careers', icon: FiBriefcase, href: '/dashboard/careers' },
  { key: 'testimonials', label: 'Testimonials', icon: FiMessageSquare, href: '/dashboard/testimonials' },
  { key: 'gallery', label: 'Gallery', icon: FiCamera, href: '/dashboard/gallery' },
  { key: 'admissions', label: 'Admissions', icon: FiUserPlus, href: '/dashboard/admissions' },
  { key: 'careerApps', label: 'Career Apps', icon: FiInbox, href: '/dashboard/career-applications' },
]

export const dynamic = 'force-dynamic'

export default async function DashboardOverview() {
  const counts = await getCounts()

  return (
    <>
      <h1 className={styles.heading}>Overview</h1>
      <p className={styles.subtitle}>Manage your school website content</p>

      <div className={styles.grid}>
        {statCards.map((card) => {
          const Icon = card.icon
          return (
            <Link key={card.key} href={card.href} style={{ textDecoration: 'none' }}>
              <div className={styles.card}>
                <div className={styles.cardIcon}><Icon /></div>
                <div className={styles.cardInfo}>
                  <div className={styles.cardCount}>{counts[card.key]}</div>
                  <div className={styles.cardLabel}>{card.label}</div>
                </div>
              </div>
            </Link>
          )
        })}
      </div>
    </>
  )
}
