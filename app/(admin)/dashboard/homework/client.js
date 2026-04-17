'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import DataTable from '@/components/dashboard/data-table/data-table'
import FormModal, { FormField, styles as fs } from '@/components/dashboard/form-modal/form-modal'
import FileUpload from '@/components/dashboard/file-upload/file-upload'
import ConfirmModal from '@/components/dashboard/confirm-modal/confirm-modal'
import { useToast } from '@/components/dashboard/toast/toast'
import { createHomework, updateHomework, deleteHomework } from '@/actions'

const columns = [
  { key: 'className', label: 'Class' },
  { key: 'vacationPeriod', label: 'Vacation Period' },
  { key: 'date', label: 'Date' },
  { key: 'pdfUrl', label: 'PDF', render: (v) => v ? 'Attached' : '—' },
]

const blank = { className: '', vacationPeriod: '', date: '', pdfUrl: '' }

export default function HomeworkClient({ items }) {
  const router = useRouter()
  const toast = useToast()
  const [modal, setModal] = useState(null)
  const [form, setForm] = useState(blank)
  const [editId, setEditId] = useState(null)
  const [loading, setLoading] = useState(false)
  const [confirmState, setConfirmState] = useState(null)

  function openAdd() { setForm(blank); setEditId(null); setModal('add') }
  function openEdit(row) { setForm({ className: row.className, vacationPeriod: row.vacationPeriod, date: row.date, pdfUrl: row.pdfUrl || '' }); setEditId(row.id); setModal('edit') }
  function close() { setModal(null) }

  async function handleSave() {
    setLoading(true)
    const data = { ...form, pdfUrl: form.pdfUrl || null }
    if (modal === 'add') await createHomework(data)
    else await updateHomework(editId, data)
    setLoading(false)
    close()
    toast(modal === 'add' ? 'Homework added' : 'Homework updated')
    router.refresh()
  }

  function handleDelete(id) {
    setConfirmState({ id, message: 'Are you sure you want to delete this homework record?' })
  }

  async function confirmDelete() {
    if (!confirmState) return
    const { id } = confirmState
    setConfirmState(null)
    await deleteHomework(id)
    toast('Homework deleted')
    router.refresh()
  }

  return (
    <>
      <DataTable title="Holiday Homework" columns={columns} rows={items} onAdd={openAdd} onEdit={openEdit} onDelete={handleDelete} />

      {modal && (
        <FormModal title={modal === 'add' ? 'Add Homework' : 'Edit Homework'} onClose={close} onSubmit={handleSave} loading={loading}>
          <FormField label="Class">
            <input className={fs.input} value={form.className} onChange={(e) => setForm({ ...form, className: e.target.value })} required maxLength={100} placeholder="e.g. Class VI – VIII" />
          </FormField>
          <FormField label="Vacation Period">
            <input className={fs.input} value={form.vacationPeriod} onChange={(e) => setForm({ ...form, vacationPeriod: e.target.value })} required maxLength={100} placeholder="e.g. Winter 2025" />
          </FormField>
          <FormField label="Date">
            <input className={fs.input} value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} required maxLength={50} placeholder="e.g. December 2025" />
          </FormField>
          <FormField label="PDF (optional)">
            <FileUpload value={form.pdfUrl} onChange={(url) => setForm({ ...form, pdfUrl: url })} />
          </FormField>
        </FormModal>
      )}
      {confirmState && <ConfirmModal message={confirmState.message} onConfirm={confirmDelete} onCancel={() => setConfirmState(null)} />}
    </>
  )
}
