'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import DataTable from '@/components/dashboard/data-table/data-table'
import FormModal, { FormField, styles as fs } from '@/components/dashboard/form-modal/form-modal'
import FileUpload from '@/components/dashboard/file-upload/file-upload'
import ConfirmModal from '@/components/dashboard/confirm-modal/confirm-modal'
import { useToast } from '@/components/dashboard/toast/toast'
import { createCircular, updateCircular, deleteCircular } from '@/actions'

const columns = [
  { key: 'title', label: 'Title' },
  { key: 'type', label: 'Type' },
  { key: 'date', label: 'Date', render: (v) => new Date(v).toLocaleDateString('en-IN') },
  { key: 'pdfUrl', label: 'PDF', render: (v) => v ? 'Attached' : '—' },
]

const blank = { title: '', type: 'General', date: '', pdfUrl: '' }

export default function CircularsClient({ items }) {
  const router = useRouter()
  const toast = useToast()
  const [modal, setModal] = useState(null)
  const [form, setForm] = useState(blank)
  const [editId, setEditId] = useState(null)
  const [loading, setLoading] = useState(false)
  const [confirmState, setConfirmState] = useState(null)

  function openAdd() { setForm(blank); setEditId(null); setModal('add') }
  function openEdit(row) {
    setForm({ title: row.title, type: row.type, date: row.date?.slice(0, 10) || '', pdfUrl: row.pdfUrl || '' })
    setEditId(row.id); setModal('edit')
  }
  function close() { setModal(null) }

  async function handleSave() {
    setLoading(true)
    const data = { title: form.title, type: form.type, date: form.date, pdfUrl: form.pdfUrl || null }
    if (modal === 'add') await createCircular(data)
    else await updateCircular(editId, data)
    setLoading(false)
    close()
    toast(modal === 'add' ? 'Circular added' : 'Circular updated')
    router.refresh()
  }

  function handleDelete(id) {
    setConfirmState({ id, message: 'Are you sure you want to delete this circular?' })
  }

  async function confirmDelete() {
    if (!confirmState) return
    const { id } = confirmState
    setConfirmState(null)
    await deleteCircular(id)
    toast('Circular deleted')
    router.refresh()
  }

  return (
    <>
      <DataTable title="Circulars & Notices" columns={columns} rows={items} onAdd={openAdd} onEdit={openEdit} onDelete={handleDelete} />

      {modal && (
        <FormModal title={modal === 'add' ? 'Add Circular' : 'Edit Circular'} onClose={close} onSubmit={handleSave} loading={loading}>
          <FormField label="Title">
            <input className={fs.input} value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required maxLength={300} />
          </FormField>
          <FormField label="Type">
            <select className={fs.select} value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })}>
              <option value="General">General</option>
              <option value="Academic">Academic</option>
              <option value="Examination">Examination</option>
              <option value="Event">Event</option>
              <option value="Holiday">Holiday</option>
            </select>
          </FormField>
          <FormField label="Date">
            <input className={fs.input} type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} required />
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
