'use client'

import { useState } from 'react'
import { SessionProvider } from 'next-auth/react'
import Sidebar from '@/components/dashboard/sidebar/sidebar'
import DashboardHeader from '@/components/dashboard/header/header'
import { ToastProvider } from '@/components/dashboard/toast/toast'
import styles from '@/app/(admin)/dashboard/dashboard.module.css'

export default function DashboardShell({ user, notificationCount = 0, children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <SessionProvider>
      <ToastProvider>
        <div className={styles.wrapper}>
          <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
          <div className={styles.main}>
            <DashboardHeader
              user={user}
              notificationCount={notificationCount}
              onMenuToggle={() => setSidebarOpen((o) => !o)}
            />
            <main className={styles.content}>
              {children}
            </main>
          </div>
        </div>
      </ToastProvider>
    </SessionProvider>
  )
}
