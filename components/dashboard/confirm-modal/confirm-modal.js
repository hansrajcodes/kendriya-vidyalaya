'use client'

import { useEffect } from 'react'
import { FiAlertTriangle } from 'react-icons/fi'
import styles from './confirm-modal.module.css'

export default function ConfirmModal({ title = 'Confirm Delete', message, onConfirm, onCancel }) {
  useEffect(() => {
    document.documentElement.style.overflow = 'hidden'
    document.body.style.overflow = 'hidden'
    return () => {
      document.documentElement.style.overflow = ''
      document.body.style.overflow = ''
    }
  }, [])

  return (
    <div className={styles.overlay} onClick={onCancel}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.icon}><FiAlertTriangle /></div>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.message}>{message}</p>
        <div className={styles.actions}>
          <button className={styles.cancelBtn} onClick={onCancel}>Cancel</button>
          <button className={styles.confirmBtn} onClick={onConfirm}>Delete</button>
        </div>
      </div>
    </div>
  )
}
