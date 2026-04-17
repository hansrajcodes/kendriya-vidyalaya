/**
 * Returns the current academic session string based on the date.
 * Academic year starts in April: before April → "(year-1)–(year)", after April → "(year)–(year+1)"
 */
export function getCurrentSession() {
  const now = new Date()
  const year = now.getFullYear()
  const month = now.getMonth() // 0-indexed: 0=Jan, 3=Apr

  if (month < 3) {
    // Jan–Mar: still previous session
    return `${year - 1}–${String(year).slice(2)}`
  }
  // Apr–Dec: new session
  return `${year}–${String(year + 1).slice(2)}`
}
