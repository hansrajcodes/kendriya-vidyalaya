import { jsPDF } from 'jspdf'
import autoTable from 'jspdf-autotable'

function fmt(n) {
  return Number(n).toLocaleString('en-IN')
}

export function generateFeePdf(groups, notes) {
  const doc = new jsPDF('p', 'mm', 'a4')
  const pageWidth = doc.internal.pageSize.getWidth()

  // Title
  doc.setFontSize(16)
  doc.setFont('helvetica', 'bold')
  doc.text('KPS Fee Chart', pageWidth / 2, 18, { align: 'center' })

  // Session subtitle
  const now = new Date()
  const year = now.getFullYear()
  const month = now.getMonth()
  const session = month < 3 ? `${year - 1}-${String(year).slice(2)}` : `${year}-${String(year + 1).slice(2)}`
  doc.setFontSize(10)
  doc.setFont('helvetica', 'normal')
  doc.text(`Session ${session}`, pageWidth / 2, 25, { align: 'center' })

  let y = 32

  for (const g of groups) {
    const totalNew = g.idCardNew + g.registrationNew + g.admissionNew + g.tuitionNew
    const totalOld = g.idCardOld + g.registrationOld + g.admissionOld + g.tuitionOld

    // Check if we need a new page (rough estimate: table ~45mm)
    if (y > 245) {
      doc.addPage()
      y = 15
    }

    // Class range header
    doc.setFontSize(11)
    doc.setFont('helvetica', 'bold')
    doc.text(`${g.classRange}  (${g.siblingDiscount}% Sibling Discount)`, 14, y)
    y += 2

    autoTable(doc, {
      startY: y,
      head: [['Fees', 'New Student', 'Old Student']],
      body: [
        ['Id Card', fmt(g.idCardNew), fmt(g.idCardOld)],
        ['Registration Fee', fmt(g.registrationNew), fmt(g.registrationOld)],
        ['Admission Fee', fmt(g.admissionNew), fmt(g.admissionOld)],
        [`Tuition Fee (1 Month @${fmt(g.monthlyTuition)})`, fmt(g.tuitionNew), fmt(g.tuitionOld)],
      ],
      foot: [['TOTAL', fmt(totalNew), fmt(totalOld)]],
      theme: 'grid',
      margin: { left: 14, right: 14 },
      styles: { fontSize: 9, cellPadding: 2.5 },
      headStyles: { fillColor: [11, 31, 58], textColor: 255, fontStyle: 'bold', fontSize: 8 },
      footStyles: { fillColor: [11, 31, 58], textColor: [207, 167, 55], fontStyle: 'bold', fontSize: 9 },
      columnStyles: {
        0: { cellWidth: 'auto' },
        1: { halign: 'right', cellWidth: 35 },
        2: { halign: 'right', cellWidth: 35 },
      },
    })

    y = doc.lastAutoTable.finalY + 8
  }

  // Notes
  if (notes.length > 0) {
    const pageHeight = doc.internal.pageSize.getHeight()
    const marginBottom = 15
    const lineH = 3.5

    if (y > pageHeight - 60) {
      doc.addPage()
      y = 15
    }

    doc.setFontSize(10)
    doc.setFont('helvetica', 'bold')
    doc.text('Important Notes:', 14, y)
    y += 7

    doc.setFontSize(8)
    doc.setFont('helvetica', 'normal')

    for (const n of notes) {
      // Manual word-wrap at ~95 chars per line
      const fullText = `•  ${n.content}`
      const wrapped = []
      const words = fullText.split(' ')
      let line = ''
      for (const w of words) {
        const test = line ? `${line} ${w}` : w
        if (test.length > 95) {
          if (line) wrapped.push(line)
          line = w
        } else {
          line = test
        }
      }
      if (line) wrapped.push(line)

      const blockH = wrapped.length * lineH + 2
      if (y + blockH > pageHeight - marginBottom) {
        doc.addPage()
        y = 15
      }

      for (let i = 0; i < wrapped.length; i++) {
        doc.text(wrapped[i], 14, y + i * lineH)
      }
      y += blockH
    }
  }

  doc.save('fee-structure.pdf')
}
