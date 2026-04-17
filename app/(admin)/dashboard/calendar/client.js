'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import DataTable from '@/components/dashboard/data-table/data-table'
import FormModal, { FormField, styles as fs } from '@/components/dashboard/form-modal/form-modal'
import ConfirmModal from '@/components/dashboard/confirm-modal/confirm-modal'
import { useToast } from '@/components/dashboard/toast/toast'
import { createCalendarEvent, updateCalendarEvent, deleteCalendarEvent } from '@/actions'
import { generateCalendarPdf } from '@/lib/generate-calendar-pdf'

const columns = [
  {
    key: 'date', label: 'Date', render: (v) => {
      const d = new Date(v)
      return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
    },
  },
  { key: 'name', label: 'Event' },
]

export default function CalendarClient({ items }) {
  const router = useRouter()
  const toast = useToast()
  const [modal, setModal] = useState(null)
  const [form, setForm] = useState({ date: '', name: '' })
  const [editId, setEditId] = useState(null)
  const [loading, setLoading] = useState(false)
  const [confirmState, setConfirmState] = useState(null)

  function openAdd() {
    setForm({ date: '', name: '' })
    setEditId(null)
    setModal('add')
  }

  function openEdit(row) {
    const d = new Date(row.date)
    const iso = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
    setForm({ date: iso, name: row.name })
    setEditId(row.id)
    setModal('edit')
  }

  function close() { setModal(null) }

  async function handleSave() {
    setLoading(true)
    const data = { date: form.date, name: form.name.trim() }
    if (modal === 'add') await createCalendarEvent(data)
    else await updateCalendarEvent(editId, data)
    setLoading(false)
    close()
    toast(modal === 'add' ? 'Event added' : 'Event updated')
    router.refresh()
  }

  function handleDelete(id) {
    setConfirmState({ id, message: 'Are you sure you want to delete this calendar event?' })
  }

  async function confirmDelete() {
    if (!confirmState) return
    const { id } = confirmState
    setConfirmState(null)
    await deleteCalendarEvent(id)
    toast('Event deleted')
    router.refresh()
  }

  return (
    <>
      <DataTable title="Academic Calendar" columns={columns} rows={items} onAdd={openAdd} onEdit={openEdit} onDelete={handleDelete} />

      <button
        style={{ marginTop: 12, padding: '8px 20px', background: 'var(--color-navy)', color: '#fff', border: 'none', borderRadius: 'var(--radius-md)', cursor: 'pointer', fontFamily: 'var(--font-body)', fontSize: 'var(--text-xs)', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' }}
        onClick={() => {
          const now = new Date()
          const y = now.getFullYear()
          const session = now.getMonth() < 3 ? `${y - 1}-${String(y).slice(2)}` : `${y}-${String(y + 1).slice(2)}`
          generateCalendarPdf(items, session)
        }}
      >
        Download PDF
      </button>

      {modal && (
        <FormModal title={modal === 'add' ? 'Add Event' : 'Edit Event'} onClose={close} onSubmit={handleSave} loading={loading}>
          <FormField label="Date">
            <input className={fs.input} type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} required />
          </FormField>
          <FormField label="Event Name">
            <input className={fs.input} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required maxLength={200} />
          </FormField>
        </FormModal>
      )}
      {confirmState && <ConfirmModal message={confirmState.message} onConfirm={confirmDelete} onCancel={() => setConfirmState(null)} />}
    </>
  )
}
