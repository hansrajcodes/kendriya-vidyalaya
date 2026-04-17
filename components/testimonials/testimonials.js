'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'
import styles from './testimonials.module.css'

const GAP = 24
const AUTO_PLAY_MS = 4000

export default function Testimonials({ data = [] }) {
  const testimonials = data.length > 0 ? data : [
    { quote: 'Kendriya Vidyalaya has been the best choice for our children.', name: 'Parent', role: 'Parent' },
  ]
  const N = testimonials.length
  const extended = [...testimonials, ...testimonials, ...testimonials]
  const viewportRef = useRef(null)
  const trackRef = useRef(null)

  const [currentIndex, setCurrentIndex] = useState(N)
  const [cardsPerView, setCardsPerView] = useState(1)
  const [translateX, setTranslateX] = useState(0)
  const [isSnapping, setIsSnapping] = useState(false)
  const [paused, setPaused] = useState(false)
  const [autoKey, setAutoKey] = useState(0)
  const isAnimating = useRef(false)

  // Update cardsPerView on resize
  useEffect(() => {
    const update = () => setCardsPerView(window.innerWidth >= 1024 ? 2 : 1)
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  // Calculate translateX
  const recalcTranslate = useCallback(() => {
    if (!viewportRef.current) return
    const containerWidth = viewportRef.current.offsetWidth
    const cardWidth = cardsPerView === 1
      ? containerWidth
      : (containerWidth - GAP) / 2
    setTranslateX(-(currentIndex * (cardWidth + GAP)))
  }, [currentIndex, cardsPerView])

  useEffect(() => {
    recalcTranslate()
    window.addEventListener('resize', recalcTranslate)
    return () => window.removeEventListener('resize', recalcTranslate)
  }, [recalcTranslate])

  // After slide transition ends, snap to the middle copy if we left it
  const handleTransitionEnd = (e) => {
    if (e.target !== trackRef.current) return
    if (currentIndex >= 2 * N) {
      setIsSnapping(true)
      setCurrentIndex(currentIndex - N)
    } else if (currentIndex < N) {
      setIsSnapping(true)
      setCurrentIndex(currentIndex + N)
    } else {
      isAnimating.current = false
    }
  }

  // Re-enable transition after the instant snap has painted
  useEffect(() => {
    if (!isSnapping) return
    let id1, id2
    id1 = requestAnimationFrame(() => {
      id2 = requestAnimationFrame(() => {
        setIsSnapping(false)
        isAnimating.current = false
      })
    })
    return () => {
      cancelAnimationFrame(id1)
      if (id2) cancelAnimationFrame(id2)
    }
  }, [isSnapping])

  // Navigation (block while animating, reset auto-play timer)
  const slide = (dir) => {
    if (isAnimating.current) return
    isAnimating.current = true
    setCurrentIndex(i => i + dir)
    setAutoKey(k => k + 1)
  }
  const prev = () => slide(-1)
  const next = () => slide(1)

  // Auto-play
  useEffect(() => {
    if (paused || isSnapping) return
    const id = setInterval(() => {
      if (isAnimating.current) return
      isAnimating.current = true
      setCurrentIndex(i => i + 1)
    }, AUTO_PLAY_MS)
    return () => clearInterval(id)
  }, [paused, isSnapping, autoKey])

  return (
    <section className={styles.section} aria-labelledby="testimonials-heading">

      {/* Decorative dot grid background */}
      <span className={styles.decoDotGrid} aria-hidden="true" />

      <div className={styles.container}>
        <div className={styles.sectionTop}>
          <span className={styles.label}>Parent Reviews</span>
          <h2 id="testimonials-heading" className={styles.heading}>
            What Parents Say
          </h2>
        </div>

        {/* Decorative full-width gold line */}
        <span className={styles.decoLine} aria-hidden="true" />

        <span className="sr-only">
          Parent reviews of Kendriya Vidyalaya, among the best CBSE schools in Moga, Punjab.
        </span>

        <div
          className={styles.slider}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div className={styles.viewport} ref={viewportRef}>
            <ul
              ref={trackRef}
              className={styles.track}
              style={{
                transform: `translateX(${translateX}px)`,
                ...(isSnapping && { transition: 'none' })
              }}
              onTransitionEnd={handleTransitionEnd}
              role="list"
              aria-label="Parent testimonials"
            >
              {extended.map((t, i) => (
                <li key={i} className={styles.card}>
                  {/* Decorative large faint quote mark */}
                  <span className={styles.decoQuote} aria-hidden="true">&ldquo;</span>

                  <blockquote className={styles.blockquote}>
                    <p className={styles.quoteText}>{t.quote}</p>
                  </blockquote>
                  <div className={styles.divider} aria-hidden="true" />
                  <footer className={styles.footer}>
                    <cite className={styles.name}>{t.name}</cite>
                    <span className={styles.role}>{t.role}</span>
                  </footer>
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.navRow}>
            <button
              className={styles.navBtn}
              onClick={prev}
              aria-label="Previous testimonial"
            >
              <FiChevronLeft size={20} />
            </button>
            <button
              className={styles.navBtn}
              onClick={next}
              aria-label="Next testimonial"
            >
              <FiChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
