'use client'

import { createContext, useContext, useState, useCallback } from 'react'
import { FiCheck, FiAlertCircle, FiInfo, FiX } from 'react-icons/fi'
import styles from './toast.module.css'

const ToastContext = createContext(null)

const ICONS = {
  success: <FiCheck />,
  error: <FiAlertCircle />,
  info: <FiInfo />,
}

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([])

  const addToast = useCallback((message, type = 'success', duration = 3000) => {
    const id = Date.now() + Math.random()
    setToasts((prev) => [...prev, { id, message, type }])
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id))
    }, duration)
  }, [])

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }, [])

  return (
    <ToastContext.Provider value={addToast}>
      {children}
      <div className={styles.container}>
        {toasts.map((toast) => (
          <div key={toast.id} className={`${styles.toast} ${styles[toast.type]}`}>
            <span className={styles.icon}>{ICONS[toast.type]}</span>
            <span className={styles.message}>{toast.message}</span>
            <button className={styles.closeBtn} onClick={() => removeToast(toast.id)}>
              <FiX />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  )
}

export function useToast() {
  const ctx = useContext(ToastContext)
  if (!ctx) throw new Error('useToast must be used within ToastProvider')
  return ctx
}
