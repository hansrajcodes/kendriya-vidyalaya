'use client'

import { useEffect } from 'react'
import { FiX } from 'react-icons/fi'
import styles from './form-modal.module.css'

export default function FormModal({ title, onClose, onSubmit, loading, children }) {
  useEffect(() => {
    document.documentElement.style.overflow = 'hidden'
    document.body.style.overflow = 'hidden'
    return () => {
      document.documentElement.style.overflow = ''
      document.body.style.overflow = ''
    }
  }, [])

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <span className={styles.headerTitle}>{title}</span>
          <button className={styles.closeBtn} onClick={onClose}><FiX /></button>
        </div>

        <form
          className={styles.form}
          onSubmit={(e) => {
            e.preventDefault()
            onSubmit()
          }}
        >
          <div className={styles.body}>
            {children}
          </div>

          <div className={styles.footer}>
            <button type="button" className={styles.cancelBtn} onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className={styles.saveBtn} disabled={loading}>
              {loading ? 'Saving...' : 'Save'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export function FormField({ label, children }) {
  return (
    <div className={styles.field}>
      <label className={styles.label}>{label}</label>
      {children}
    </div>
  )
}

export { styles }
