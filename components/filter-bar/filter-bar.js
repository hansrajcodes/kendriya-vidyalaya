'use client'

import styles from './filter-bar.module.css'

export default function FilterBar({ children }) {
  return <div className={styles.bar}>{children}</div>
}

export function FilterSelect({ label, value, onChange, options }) {
  return (
    <div className={styles.filterGroup}>
      <label className={styles.filterLabel}>{label}</label>
      <select className={styles.filterSelect} value={value} onChange={(e) => onChange(e.target.value)}>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>
    </div>
  )
}
