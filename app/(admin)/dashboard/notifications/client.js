'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { markNotificationsRead } from '@/actions'
import styles from './notifications.module.css'

const PER_PAGE = 10

function timeAgo(dateStr) {
  const diff = Date.now() - new Date(dateStr).getTime()
  const mins = Math.floor(diff / 60000)
  if (mins < 1) return 'Just now'
  if (mins < 60) return `${mins}m ago`
  const hrs = Math.floor(mins / 60)
  if (hrs < 24) return `${hrs}h ago`
  const days = Math.floor(hrs / 24)
  if (days < 30) return `${days}d ago`
  return `${Math.floor(days / 30)}mo ago`
}

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

export default function NotificationsClient({ items }) {
  const [page, setPage] = useState(1)

  useEffect(() => {
    markNotificationsRead()
  }, [])

  const totalPages = Math.ceil(items.length / PER_PAGE)
  const paginated = items.slice((page - 1) * PER_PAGE, page * PER_PAGE)

  return (
    <div className={styles.wrap}>
      <h1 className={styles.heading}>Notifications</h1>

      {items.length === 0 ? (
        <p className={styles.empty}>No notifications yet.</p>
      ) : (
        <>
          <div className={styles.list}>
            {paginated.map((n) => (
              <Link
                key={n.id}
                href={n.link || '/dashboard'}
                className={`${styles.card} ${!n.isRead ? styles.cardUnread : ''}`}
              >
                <div className={styles.cardTop}>
                  <span className={styles.badge}>{n.type}</span>
                  <span className={styles.time}>{timeAgo(n.createdAt)}</span>
                </div>
                <p className={styles.message}>{n.message}</p>
                <span className={styles.date}>{formatDate(n.createdAt)}</span>
              </Link>
            ))}
          </div>

          {totalPages > 1 && (
            <div className={styles.pagination}>
              <button className={styles.pageBtn} onClick={() => setPage(page - 1)} disabled={page === 1}>
                ← Prev
              </button>
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i + 1}
                  className={`${styles.pageBtn} ${page === i + 1 ? styles.pageBtnActive : ''}`}
                  onClick={() => setPage(i + 1)}
                >
                  {i + 1}
                </button>
              ))}
              <button className={styles.pageBtn} onClick={() => setPage(page + 1)} disabled={page === totalPages}>
                Next →
              </button>
            </div>
          )}
        </>
      )}
    </div>
  )
}
