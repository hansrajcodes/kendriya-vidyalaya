'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import DataTable from '@/components/dashboard/data-table/data-table'
import FormModal, { FormField, styles as fs } from '@/components/dashboard/form-modal/form-modal'
import FileUpload from '@/components/dashboard/file-upload/file-upload'
import {
  createSyllabus, updateSyllabus, deleteSyllabus,
  createDatesheet, updateDatesheet, deleteDatesheet,
} from '@/actions'
import ConfirmModal from '@/components/dashboard/confirm-modal/confirm-modal'
import { useToast } from '@/components/dashboard/toast/toast'

const syllabusColumns = [
  { key: 'className', label: 'Class' },
  { key: 'pdfUrl', label: 'PDF', render: (v) => v ? 'Attached' : '—' },
  { key: 'sortOrder', label: 'Order' },
]

const datesheetColumns = [
  { key: 'title', label: 'Title' },
  { key: 'term', label: 'Term' },
  { key: 'className', label: 'Class' },
  { key: 'month', label: 'Month' },
  { key: 'year', label: 'Year' },
  { key: 'pdfUrl', label: 'PDF', render: (v) => v ? 'Attached' : '—' },
  { key: 'sortOrder', label: 'Order' },
]

export default function ExaminationClient({ syllabus, datesheets }) {
  const router = useRouter()
  const toast = useToast()
  const [confirmState, setConfirmState] = useState(null)

  // Syllabus state
  const [sModal, setSModal] = useState(null)
  const [sForm, setSForm] = useState({ className: '', pdfUrl: '', sortOrder: 0 })
  const [sEditId, setSEditId] = useState(null)
  const [sLoading, setSLoading] = useState(false)

  // Datesheet state
  const [dModal, setDModal] = useState(null)
  const [dForm, setDForm] = useState({ title: '', term: '', className: '', month: '', year: '', pdfUrl: '', sortOrder: 0 })
  const [dEditId, setDEditId] = useState(null)
  const [dLoading, setDLoading] = useState(false)

  // Syllabus handlers
  async function saveSyllabus() {
    setSLoading(true)
    const data = { ...sForm, sortOrder: Number(sForm.sortOrder), pdfUrl: sForm.pdfUrl || null }
    if (sModal === 'add') await createSyllabus(data)
    else await updateSyllabus(sEditId, data)
    setSLoading(false); setSModal(null)
    toast(sModal === 'add' ? 'Syllabus added' : 'Syllabus updated')
    router.refresh()
  }

  function delSyllabus(id) {
    setConfirmState({ id, type: 'syllabus', message: 'Are you sure you want to delete this syllabus entry?' })
  }

  // Datesheet handlers
  async function saveDatesheet() {
    setDLoading(true)
    const data = { ...dForm, sortOrder: Number(dForm.sortOrder), pdfUrl: dForm.pdfUrl || null }
    if (dModal === 'add') await createDatesheet(data)
    else await updateDatesheet(dEditId, data)
    setDLoading(false); setDModal(null)
    toast(dModal === 'add' ? 'Datesheet added' : 'Datesheet updated')
    router.refresh()
  }

  function delDatesheet(id) {
    setConfirmState({ id, type: 'datesheet', message: 'Are you sure you want to delete this datesheet entry?' })
  }

  async function confirmDelete() {
    if (!confirmState) return
    const { id, type } = confirmState
    setConfirmState(null)
    if (type === 'syllabus') await deleteSyllabus(id)
    else await deleteDatesheet(id)
    toast(type === 'syllabus' ? 'Syllabus deleted' : 'Datesheet deleted')
    router.refresh()
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <DataTable
        title="Syllabus"
        columns={syllabusColumns}
        rows={syllabus}
        onAdd={() => { setSForm({ className: '', pdfUrl: '', sortOrder: 0 }); setSEditId(null); setSModal('add') }}
        onEdit={(row) => { setSForm({ className: row.className, pdfUrl: row.pdfUrl || '', sortOrder: row.sortOrder }); setSEditId(row.id); setSModal('edit') }}
        onDelete={delSyllabus}
      />

      <DataTable
        title="Datesheets"
        columns={datesheetColumns}
        rows={datesheets}
        onAdd={() => { setDForm({ title: '', term: '', className: '', month: '', year: '', pdfUrl: '', sortOrder: 0 }); setDEditId(null); setDModal('add') }}
        onEdit={(row) => { setDForm({ title: row.title || '', term: row.term, className: row.className || '', month: row.month, year: row.year || '', pdfUrl: row.pdfUrl || '', sortOrder: row.sortOrder }); setDEditId(row.id); setDModal('edit') }}
        onDelete={delDatesheet}
      />

      {sModal && (
        <FormModal title={sModal === 'add' ? 'Add Syllabus' : 'Edit Syllabus'} onClose={() => setSModal(null)} onSubmit={saveSyllabus} loading={sLoading}>
          <FormField label="Class">
            <input className={fs.input} value={sForm.className} onChange={(e) => setSForm({ ...sForm, className: e.target.value })} required maxLength={100} />
          </FormField>
          <FormField label="PDF (optional)">
            <FileUpload value={sForm.pdfUrl} onChange={(url) => setSForm({ ...sForm, pdfUrl: url })} />
          </FormField>
          <FormField label="Sort Order">
            <input className={fs.input} type="number" min={0} max={999} value={sForm.sortOrder} onChange={(e) => setSForm({ ...sForm, sortOrder: e.target.value })} />
          </FormField>
        </FormModal>
      )}

      {dModal && (
        <FormModal title={dModal === 'add' ? 'Add Datesheet' : 'Edit Datesheet'} onClose={() => setDModal(null)} onSubmit={saveDatesheet} loading={dLoading}>
          <FormField label="Title">
            <input className={fs.input} value={dForm.title} onChange={(e) => setDForm({ ...dForm, title: e.target.value })} maxLength={200} placeholder="e.g. Half-Yearly Examination Datesheet" />
          </FormField>
          <FormField label="Term">
            <input className={fs.input} value={dForm.term} onChange={(e) => setDForm({ ...dForm, term: e.target.value })} required maxLength={100} placeholder="e.g. Half-Yearly Examination" />
          </FormField>
          <FormField label="Class">
            <input className={fs.input} value={dForm.className} onChange={(e) => setDForm({ ...dForm, className: e.target.value })} maxLength={100} placeholder="e.g. Class IX–X" />
          </FormField>
          <FormField label="Month">
            <input className={fs.input} value={dForm.month} onChange={(e) => setDForm({ ...dForm, month: e.target.value })} required maxLength={50} placeholder="e.g. September–October" />
          </FormField>
          <FormField label="Year">
            <input className={fs.input} value={dForm.year} onChange={(e) => setDForm({ ...dForm, year: e.target.value })} maxLength={20} placeholder="e.g. 2025–26" />
          </FormField>
          <FormField label="PDF (optional)">
            <FileUpload value={dForm.pdfUrl} onChange={(url) => setDForm({ ...dForm, pdfUrl: url })} />
          </FormField>
          <FormField label="Sort Order">
            <input className={fs.input} type="number" min={0} max={999} value={dForm.sortOrder} onChange={(e) => setDForm({ ...dForm, sortOrder: e.target.value })} />
          </FormField>
        </FormModal>
      )}
      {confirmState && <ConfirmModal message={confirmState.message} onConfirm={confirmDelete} onCancel={() => setConfirmState(null)} />}
    </div>
  )
}
