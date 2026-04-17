'use client'

import { useState, useRef, useEffect } from 'react'
import styles from './calendar.module.css'

const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
]
const DAY_HEADERS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']

// Academic year order: April(3) → March(2)
const SESSION_MONTHS = [3, 4, 5, 6, 7, 8, 9, 10, 11, 0, 1, 2]

function getDaysInMonth(monthIndex, year) { return new Date(year, monthIndex + 1, 0).getDate() }
function getFirstDayOfWeek(monthIndex, year) { return new Date(year, monthIndex, 1).getDay() }

function ordinal(n) {
  const s = ['th', 'st', 'nd', 'rd']
  const v = n % 100
  return n + (s[(v - 20) % 10] || s[v] || s[0])
}

export default function CalendarGrid({ events, startYear }) {
  const [popup, setPopup] = useState(null)
  const popupRef = useRef(null)

  // Group events by "YYYY-MM" key
  const eventMap = {}
  for (const ev of events) {
    const d = new Date(ev.date)
    const day = d.getDate()
    const key = `${d.getFullYear()}-${d.getMonth()}`
    if (!eventMap[key]) eventMap[key] = {}
    if (!eventMap[key][day]) eventMap[key][day] = []
    eventMap[key][day].push(ev.name)
  }

  // Build sorted events list per month for the event list below each calendar
  const monthEvents = {}
  for (const ev of events) {
    const d = new Date(ev.date)
    const key = `${d.getFullYear()}-${d.getMonth()}`
    if (!monthEvents[key]) monthEvents[key] = []
    monthEvents[key].push({ day: d.getDate(), name: ev.name })
  }

  useEffect(() => {
    function handleClick(e) {
      if (popupRef.current && !popupRef.current.contains(e.target)) setPopup(null)
    }
    if (popup) document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [popup])

  function getPopupAlign(dayNum, firstDay) {
    const col = (firstDay + dayNum - 1) % 7
    if (col <= 1) return 'left'
    if (col >= 5) return 'right'
    return 'center'
  }

  function handleDayClick(e, day, names, monthKey, firstDay) {
    if (!names?.length) return
    if (popup && popup.day === day && popup.monthKey === monthKey) {
      setPopup(null)
      return
    }
    const align = getPopupAlign(day, firstDay)
    setPopup({ day, names, monthKey, align })
  }

  return (
    <>
      <div className={styles.calendarGrid}>
        {SESSION_MONTHS.map((mi) => {
          const year = mi <= 2 ? startYear + 1 : startYear
          const key = `${year}-${mi}`
          const dayMap = eventMap[key] || {}
          const evList = (monthEvents[key] || []).sort((a, b) => a.day - b.day)
          const daysInMonth = getDaysInMonth(mi, year)
          const firstDay = getFirstDayOfWeek(mi, year)
          const sessionStr = `${startYear}-${String(startYear + 1).slice(2)}`

          return (
            <div key={key} className={styles.monthCard}>
              <div className={styles.monthHeader}>
                <span className={styles.monthName}>{MONTH_NAMES[mi]}</span>
                <span className={styles.monthYear}>{sessionStr}</span>
              </div>

              <div className={styles.miniCal}>
                {DAY_HEADERS.map((d) => (
                  <span key={d} className={styles.dayHeader}>{d}</span>
                ))}
                {Array.from({ length: firstDay }).map((_, i) => (
                  <span key={`e-${i}`} className={styles.dayEmpty} />
                ))}
                {Array.from({ length: daysInMonth }).map((_, i) => {
                  const dayNum = i + 1
                  const hasEvent = !!dayMap[dayNum]
                  const isPopupOpen = popup && popup.day === dayNum && popup.monthKey === key
                  return (
                    <span
                      key={dayNum}
                      className={`${styles.dayNum} ${hasEvent ? styles.dayHasEvent : ''}`}
                      onClick={(e) => hasEvent && handleDayClick(e, dayNum, dayMap[dayNum], key, firstDay)}
                    >
                      {dayNum}
                      {isPopupOpen && (
                        <div ref={popupRef} className={`${styles.popup} ${popup.align === 'left' ? styles.popupLeft : popup.align === 'right' ? styles.popupRight : ''}`}>
                          <div className={styles.popupDay}>{ordinal(dayNum)}</div>
                          {popup.names.map((n, idx) => (
                            <div key={idx} className={styles.popupEvent}>{n}</div>
                          ))}
                        </div>
                      )}
                    </span>
                  )
                })}
              </div>

              {evList.length > 0 && (
                <ul className={styles.eventList}>
                  {evList.map((ev, j) => (
                    <li key={j} className={styles.eventItem}>
                      <span className={styles.eventDate}>{ordinal(ev.day)}</span>
                      {ev.name}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )
        })}
      </div>

    </>
  )
}
