'use client'

import Link from 'next/link'
import { signOut } from 'next-auth/react'
import { FiMenu, FiExternalLink, FiBell } from 'react-icons/fi'
import styles from './header.module.css'

export default function DashboardHeader({ user, notificationCount = 0, onMenuToggle }) {
  return (
    <header className={styles.header}>
      <div className={styles.left}>
        <button className={styles.menuBtn} onClick={onMenuToggle} aria-label="Toggle menu">
          <FiMenu />
        </button>
        <span className={styles.title}>Dashboard</span>
      </div>

      <div className={styles.right}>
        <Link href="/dashboard/notifications" className={styles.bellBtn} aria-label="Notifications">
          <FiBell />
          {notificationCount > 0 && (
            <span className={styles.bellBadge}>{notificationCount}</span>
          )}
        </Link>
        <Link href="/" className={styles.siteLink} target="_blank">
          View Site <FiExternalLink />
        </Link>
        {user?.name && <span className={styles.user}>{user.name}</span>}
        <button className={styles.signOut} onClick={() => signOut({ callbackUrl: '/login' })}>
          Sign Out
        </button>
      </div>
    </header>
  )
}
