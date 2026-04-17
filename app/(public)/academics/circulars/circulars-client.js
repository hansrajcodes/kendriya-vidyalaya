'use client'

import { useState, useMemo, useRef, useCallback } from 'react'
import FilterBar, { FilterSelect } from '@/components/filter-bar/filter-bar'
import styles from './circulars.module.css'

const PER_PAGE = 10

export default function CircularsClient({ circulars }) {
  const [typeFilter, setTypeFilter] = useState('All')
  const [sortOrder, setSortOrder] = useState('newest')
  const [page, setPage] = useState(1)
  const listRef = useRef(null)

  const goToPage = useCallback((p) => {
    setPage(p)
    requestAnimationFrame(() => {
      listRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    })
  }, [])

  const types = useMemo(() => {
    const set = new Set(circulars.map((c) => c.type))
    return ['All', ...Array.from(set).sort()]
  }, [circulars])

  const filtered = useMemo(() => {
    let result = circulars
    if (typeFilter !== 'All') {
      result = result.filter((c) => c.type === typeFilter)
    }
    result = [...result].sort((a, b) => {
      const da = new Date(a.date), db = new Date(b.date)
      return sortOrder === 'newest' ? db - da : da - db
    })
    return result
  }, [circulars, typeFilter, sortOrder])

  const totalPages = Math.ceil(filtered.length / PER_PAGE)
  const paginated = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE)

  // Reset to page 1 when filters change
  function handleTypeChange(v) { setTypeFilter(v); setPage(1) }
  function handleSortChange(v) { setSortOrder(v); setPage(1) }

  return (
    <>
      <FilterBar>
        <FilterSelect
          label="Type"
          value={typeFilter}
          onChange={handleTypeChange}
          options={types.map((t) => ({ value: t, label: t }))}
        />
        <FilterSelect
          label="Sort by Date"
          value={sortOrder}
          onChange={handleSortChange}
          options={[
            { value: 'newest', label: 'Newest First' },
            { value: 'oldest', label: 'Oldest First' },
          ]}
        />
      </FilterBar>

      <div className={styles.list} ref={listRef}>
        {paginated.length === 0 ? (
          <p className={styles.noResults}>No circulars found.</p>
        ) : (
          paginated.map((c) => (
            <article key={c.id} className={styles.card}>
              <div className={styles.cardLeft}>
                <span className={styles.badge}>{c.type}</span>
                <p className={styles.date}>{new Date(c.date).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}</p>
              </div>
              <div className={styles.cardCenter}>
                <h3 className={styles.title}>{c.title}</h3>
              </div>
              <div className={styles.cardRight}>
                {c.pdfUrl ? (
                  <a href={c.pdfUrl} target="_blank" rel="noopener noreferrer" className={styles.downloadBtn}>Download ↓</a>
                ) : (
                  <span className={styles.downloadBtn} style={{ opacity: 0.4 }}>Pending</span>
                )}
              </div>
            </article>
          ))
        )}
      </div>

      {totalPages > 1 && (
        <div className={styles.pagination}>
          <button className={styles.pageBtn} onClick={() => goToPage(page - 1)} disabled={page === 1}>← Prev</button>
          {Array.from({ length: totalPages }, (_, i) => (
            <button key={i + 1} className={`${styles.pageBtn} ${page === i + 1 ? styles.pageBtnActive : ''}`} onClick={() => goToPage(i + 1)}>
              {i + 1}
            </button>
          ))}
          <button className={styles.pageBtn} onClick={() => goToPage(page + 1)} disabled={page === totalPages}>Next →</button>
        </div>
      )}
    </>
  )
}
