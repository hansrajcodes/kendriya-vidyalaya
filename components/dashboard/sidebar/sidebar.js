'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  FiHome, FiFileText, FiBook, FiDollarSign, FiBookOpen,
  FiCalendar, FiClipboard, FiUsers, FiBriefcase,
  FiMessageSquare, FiCamera, FiUserPlus, FiInbox, FiBell
} from 'react-icons/fi'
import styles from './sidebar.module.css'

const navItems = [
  { href: '/dashboard', label: 'Overview', icon: FiHome, exact: true },
  { type: 'label', text: 'Content' },
  { href: '/dashboard/circulars', label: 'Circulars', icon: FiFileText },
  { href: '/dashboard/homework', label: 'Homework', icon: FiBook },
  { href: '/dashboard/fee-structure', label: 'Fee Structure', icon: FiDollarSign },
  { href: '/dashboard/book-list', label: 'Book List', icon: FiBookOpen },
  { href: '/dashboard/calendar', label: 'Calendar', icon: FiCalendar },
  { href: '/dashboard/examination', label: 'Examination', icon: FiClipboard },
  { href: '/dashboard/gallery', label: 'Gallery', icon: FiCamera },
  { type: 'label', text: 'People' },
  { href: '/dashboard/faculty', label: 'Faculty', icon: FiUsers },
  { href: '/dashboard/careers', label: 'Careers', icon: FiBriefcase },
  { href: '/dashboard/testimonials', label: 'Testimonials', icon: FiMessageSquare },
  { type: 'label', text: 'Applications' },
  { href: '/dashboard/admissions', label: 'Admissions', icon: FiUserPlus },
  { href: '/dashboard/career-applications', label: 'Career Apps', icon: FiInbox },
  { href: '/dashboard/notifications', label: 'Notifications', icon: FiBell },
]

export default function Sidebar({ open, onClose }) {
  const pathname = usePathname()

  function isActive(item) {
    if (item.exact) return pathname === item.href
    return pathname.startsWith(item.href)
  }

  return (
    <>
      {open && <div className={styles.overlay} onClick={onClose} />}
      <aside className={`${styles.sidebar} ${open ? styles.sidebarOpen : ''}`}>
        <div className={styles.brand}>
          <div className={styles.brandCrest} aria-label="Kendriya Vidyalaya">KV</div>
          <div>
            <div className={styles.brandText}>Kendriya Vidyalaya</div>
            <div className={styles.brandSub}>Dashboard</div>
          </div>
        </div>

        <nav className={styles.nav}>
          {navItems.map((item, i) => {
            if (item.type === 'label') {
              return <div key={i} className={styles.navLabel}>{item.text}</div>
            }

            const Icon = item.icon
            const active = isActive(item)

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`${styles.navItem} ${active ? styles.navItemActive : ''}`}
                onClick={onClose}
              >
                <span className={styles.navIcon}><Icon /></span>
                {item.label}
              </Link>
            )
          })}
        </nav>
      </aside>
    </>
  )
}
