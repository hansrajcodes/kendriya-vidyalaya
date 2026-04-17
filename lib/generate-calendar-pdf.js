import { jsPDF } from 'jspdf'
import autoTable from 'jspdf-autotable'

const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
]

function ordinal(n) {
  const s = ['th', 'st', 'nd', 'rd']
  const v = n % 100
  return n + (s[(v - 20) % 10] || s[v] || s[0])
}

export function generateCalendarPdf(events, session) {
  const doc = new jsPDF('p', 'mm', 'a4')
  const pageWidth = doc.internal.pageSize.getWidth()

  // Title
  doc.setFontSize(16)
  doc.setFont('helvetica', 'bold')
  doc.text('KPS Yearly Planner', pageWidth / 2, 18, { align: 'center' })

  // Session subtitle
  doc.setFontSize(10)
  doc.setFont('helvetica', 'normal')
  doc.text(`Academic Session ${session}`, pageWidth / 2, 25, { align: 'center' })

  // Sort events by date
  const sorted = [...events].sort((a, b) => new Date(a.date) - new Date(b.date))

  // Build table rows
  const rows = sorted.map((ev) => {
    const d = new Date(ev.date)
    const dateStr = `${ordinal(d.getDate())} ${MONTH_NAMES[d.getMonth()]} ${d.getFullYear()}`
    return [dateStr, ev.name]
  })

  autoTable(doc, {
    startY: 32,
    head: [['Date', 'Event / Holiday']],
    body: rows,
    theme: 'grid',
    margin: { left: 14, right: 14 },
    styles: { fontSize: 9, cellPadding: 3 },
    headStyles: { fillColor: [11, 31, 58], textColor: 255, fontStyle: 'bold', fontSize: 9 },
    columnStyles: {
      0: { cellWidth: 55, fontStyle: 'bold' },
      1: { cellWidth: 'auto' },
    },
    alternateRowStyles: { fillColor: [247, 248, 250] },
  })

  doc.save('yearly-planner.pdf')
}
