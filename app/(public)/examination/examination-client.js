'use client'

import { useState, useMemo } from 'react'
import FilterBar, { FilterSelect } from '@/components/filter-bar/filter-bar'
import styles from './examination.module.css'

const PER_PAGE = 8

export default function ExaminationClient({ datesheets }) {
  const [termFilter, setTermFilter] = useState('All')
  const [classFilter, setClassFilter] = useState('All')
  const [page, setPage] = useState(1)

  const terms = useMemo(() => {
    const set = new Set(datesheets.map((d) => d.term))
    return ['All', ...Array.from(set).sort()]
  }, [datesheets])

  const classes = useMemo(() => {
    const set = new Set(datesheets.filter((d) => d.className).map((d) => d.className))
    return ['All', ...Array.from(set).sort()]
  }, [datesheets])

  const filtered = useMemo(() => {
    let result = datesheets
    if (termFilter !== 'All') result = result.filter((d) => d.term === termFilter)
    if (classFilter !== 'All') result = result.filter((d) => d.className === classFilter)
    return result
  }, [datesheets, termFilter, classFilter])

  const totalPages = Math.ceil(filtered.length / PER_PAGE)
  const paged = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE)

  function handleFilterChange(setter) {
    return (val) => {
      setter(val)
      setPage(1)
    }
  }

  return (
    <>
      <FilterBar>
        <FilterSelect
          label="Term"
          value={termFilter}
          onChange={handleFilterChange(setTermFilter)}
          options={terms.map((t) => ({ value: t, label: t }))}
        />
        <FilterSelect
          label="Class"
          value={classFilter}
          onChange={handleFilterChange(setClassFilter)}
          options={classes.map((c) => ({ value: c, label: c }))}
        />
      </FilterBar>

      <div className={styles.datesheetGrid}>
        {filtered.length === 0 ? (
          <p className={styles.noResults}>No datesheets found.</p>
        ) : (
          paged.map((d) => (
            <div key={d.id} className={styles.datesheetCard}>
              <span className={styles.datesheetMonth}>{d.month}{d.year ? ` ${d.year}` : ''}</span>
              <h3 className={styles.datesheetTerm}>{d.title || d.term}</h3>
              {d.className && (
                <span className={styles.datesheetClass}>{d.className}</span>
              )}
              {d.pdfUrl ? (
                <a href={d.pdfUrl} target="_blank" rel="noopener noreferrer" className={styles.datesheetDownload}>Download ↓</a>
              ) : (
                <span className={styles.datesheetDownload} style={{ opacity: 0.4 }}>Pending</span>
              )}
            </div>
          ))
        )}
      </div>

      {totalPages > 1 && (
        <div className={styles.pagination}>
          <button
            className={styles.pageBtn}
            onClick={() => setPage((p) => p - 1)}
            disabled={page === 1}
          >
            ← Previous
          </button>
          <span className={styles.pageInfo}>Page {page} of {totalPages}</span>
          <button
            className={styles.pageBtn}
            onClick={() => setPage((p) => p + 1)}
            disabled={page === totalPages}
          >
            Next →
          </button>
        </div>
      )}
    </>
  )
}
