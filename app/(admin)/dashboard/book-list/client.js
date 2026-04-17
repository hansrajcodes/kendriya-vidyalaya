'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import DataTable from '@/components/dashboard/data-table/data-table'
import FormModal, { FormField, styles as fs } from '@/components/dashboard/form-modal/form-modal'
import FileUpload from '@/components/dashboard/file-upload/file-upload'
import ConfirmModal from '@/components/dashboard/confirm-modal/confirm-modal'
import { useToast } from '@/components/dashboard/toast/toast'
import { createBookList, updateBookList, deleteBookList } from '@/actions'

const columns = [
  { key: 'className', label: 'Class' },
  { key: 'year', label: 'Year' },
  { key: 'pdfUrl', label: 'PDF', render: (v) => v ? 'Attached' : '—' },
  { key: 'sortOrder', label: 'Order' },
]

const blank = { className: '', year: '2025-26', pdfUrl: '', sortOrder: 0 }

export default function BookListClient({ items }) {
  const router = useRouter()
  const toast = useToast()
  const [modal, setModal] = useState(null)
  const [form, setForm] = useState(blank)
  const [editId, setEditId] = useState(null)
  const [loading, setLoading] = useState(false)
  const [confirmState, setConfirmState] = useState(null)

  function openAdd() { setForm(blank); setEditId(null); setModal('add') }
  function openEdit(row) { setForm({ className: row.className, year: row.year, pdfUrl: row.pdfUrl || '', sortOrder: row.sortOrder }); setEditId(row.id); setModal('edit') }
  function close() { setModal(null) }

  async function handleSave() {
    setLoading(true)
    const data = { ...form, sortOrder: Number(form.sortOrder), pdfUrl: form.pdfUrl || null }
    if (modal === 'add') await createBookList(data)
    else await updateBookList(editId, data)
    setLoading(false)
    close()
    toast(modal === 'add' ? 'Book list added' : 'Book list updated')
    router.refresh()
  }

  function handleDelete(id) {
    setConfirmState({ id, message: 'Are you sure you want to delete this book list entry?' })
  }

  async function confirmDelete() {
    if (!confirmState) return
    const { id } = confirmState
    setConfirmState(null)
    await deleteBookList(id)
    toast('Book list entry deleted')
    router.refresh()
  }

  return (
    <>
      <DataTable title="Book List" columns={columns} rows={items} onAdd={openAdd} onEdit={openEdit} onDelete={handleDelete} />

      {modal && (
        <FormModal title={modal === 'add' ? 'Add Book List' : 'Edit Book List'} onClose={close} onSubmit={handleSave} loading={loading}>
          <FormField label="Class">
            <input className={fs.input} value={form.className} onChange={(e) => setForm({ ...form, className: e.target.value })} required maxLength={100} placeholder="e.g. Class VI" />
          </FormField>
          <FormField label="Year">
            <input className={fs.input} value={form.year} onChange={(e) => setForm({ ...form, year: e.target.value })} required maxLength={20} />
          </FormField>
          <FormField label="PDF (optional)">
            <FileUpload value={form.pdfUrl} onChange={(url) => setForm({ ...form, pdfUrl: url })} />
          </FormField>
          <FormField label="Sort Order">
            <input className={fs.input} type="number" min={0} max={999} value={form.sortOrder} onChange={(e) => setForm({ ...form, sortOrder: e.target.value })} />
          </FormField>
        </FormModal>
      )}
      {confirmState && <ConfirmModal message={confirmState.message} onConfirm={confirmDelete} onCancel={() => setConfirmState(null)} />}
    </>
  )
}
