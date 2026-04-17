'use client'

import { useEffect, useCallback, useRef } from 'react'
import { FiX, FiChevronLeft, FiChevronRight, FiDownload } from 'react-icons/fi'
import styles from './lightbox.module.css'

export default function Lightbox({ images, currentIndex, onClose, onPrev, onNext }) {
  const current = images[currentIndex]
  const closedByBack = useRef(false)

  const closeLightbox = useCallback(() => {
    if (!closedByBack.current) {
      window.history.back()
    }
    onClose()
  }, [onClose])

  const handleKey = useCallback((e) => {
    if (e.key === 'Escape') closeLightbox()
    if (e.key === 'ArrowLeft') onPrev()
    if (e.key === 'ArrowRight') onNext()
  }, [closeLightbox, onPrev, onNext])

  useEffect(() => {
    document.addEventListener('keydown', handleKey)
    document.documentElement.style.overflow = 'hidden'
    document.body.style.overflow = 'hidden'

    window.history.pushState({ lightbox: true }, '')
    function handlePopState() {
      closedByBack.current = true
      onClose()
    }
    window.addEventListener('popstate', handlePopState)

    return () => {
      document.removeEventListener('keydown', handleKey)
      window.removeEventListener('popstate', handlePopState)
      document.documentElement.style.overflow = ''
      document.body.style.overflow = ''
    }
  }, [handleKey, onClose])

  async function handleDownload() {
    try {
      const res = await fetch(current.src)
      const blob = await res.blob()
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = (current.caption || current.alt || 'image') + '.jpg'
      a.click()
      URL.revokeObjectURL(url)
    } catch {
      window.open(current.src, '_blank')
    }
  }

  if (!current) return null

  return (
    <div className={styles.overlay} onClick={closeLightbox}>
      <div className={styles.content} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeBtn} onClick={closeLightbox} aria-label="Close">
          <FiX />
        </button>

        {images.length > 1 && (
          <>
            <button className={`${styles.navBtn} ${styles.navPrev}`} onClick={onPrev} aria-label="Previous">
              <FiChevronLeft />
            </button>
            <button className={`${styles.navBtn} ${styles.navNext}`} onClick={onNext} aria-label="Next">
              <FiChevronRight />
            </button>
          </>
        )}

        <div className={styles.imageContainer}>
          <img src={current.src} alt={current.alt || current.caption} className={styles.image} />
        </div>

        <div className={styles.footer}>
          {current.caption && <p className={styles.caption}>{current.caption}</p>}
          <div className={styles.footerActions}>
            <span className={styles.counter}>{currentIndex + 1} / {images.length}</span>
            <button
              onClick={handleDownload}
              className={styles.downloadBtn}
            >
              <FiDownload /> Download
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
