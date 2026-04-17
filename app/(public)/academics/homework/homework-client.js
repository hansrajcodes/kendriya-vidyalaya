'use client'

import { useState, useMemo } from 'react'
import FilterBar, { FilterSelect } from '@/components/filter-bar/filter-bar'
import styles from './homework.module.css'

export default function HomeworkClient({ items }) {
  const [classFilter, setClassFilter] = useState('All')
  const [periodFilter, setPeriodFilter] = useState('All')

  const classes = useMemo(() => {
    const set = new Set(items.map((h) => h.className))
    return ['All', ...Array.from(set).sort()]
  }, [items])

  const periods = useMemo(() => {
    const set = new Set(items.map((h) => h.vacationPeriod))
    return ['All', ...Array.from(set).sort()]
  }, [items])

  const filtered = useMemo(() => {
    let result = items
    if (classFilter !== 'All') result = result.filter((h) => h.className === classFilter)
    if (periodFilter !== 'All') result = result.filter((h) => h.vacationPeriod === periodFilter)
    return result
  }, [items, classFilter, periodFilter])

  return (
    <>
      <FilterBar>
        <FilterSelect
          label="Class"
          value={classFilter}
          onChange={setClassFilter}
          options={classes.map((c) => ({ value: c, label: c }))}
        />
        <FilterSelect
          label="Vacation Period"
          value={periodFilter}
          onChange={setPeriodFilter}
          options={periods.map((p) => ({ value: p, label: p }))}
        />
      </FilterBar>

      <div className={styles.grid}>
        {filtered.length === 0 ? (
          <p className={styles.noResults}>No homework found.</p>
        ) : (
          filtered.map((h) => (
            <article key={h.id} className={styles.card}>
              <div className={styles.cardTop}>
                <span className={styles.cardBadge}>{h.vacationPeriod}</span>
                <p className={styles.cardDate}>{h.date}</p>
              </div>
              <h3 className={styles.cardClass}>{h.className}</h3>
              {h.pdfUrl ? (
                <a href={h.pdfUrl} target="_blank" rel="noopener noreferrer" className={styles.downloadBtn}>Download ↓</a>
              ) : (
                <span className={styles.downloadBtn} style={{ opacity: 0.4 }}>Pending</span>
              )}
            </article>
          ))
        )}
      </div>
    </>
  )
}
