'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import DataTable from '@/components/dashboard/data-table/data-table'
import FormModal, { FormField, styles as fs } from '@/components/dashboard/form-modal/form-modal'
import ConfirmModal from '@/components/dashboard/confirm-modal/confirm-modal'
import { useToast } from '@/components/dashboard/toast/toast'
import { createTestimonial, updateTestimonial, deleteTestimonial } from '@/actions'

const columns = [
  { key: 'name', label: 'Name' },
  { key: 'role', label: 'Role' },
  { key: 'quote', label: 'Quote', render: (v) => v?.length > 60 ? v.slice(0, 60) + '...' : v },
  { key: 'isActive', label: 'Active', render: (v) => v ? 'Yes' : 'No' },
  { key: 'sortOrder', label: 'Order' },
]

const blank = { name: '', quote: '', role: '', isActive: true, sortOrder: 0 }

export default function TestimonialsClient({ items }) {
  const router = useRouter()
  const toast = useToast()
  const [modal, setModal] = useState(null)
  const [form, setForm] = useState(blank)
  const [editId, setEditId] = useState(null)
  const [loading, setLoading] = useState(false)
  const [confirmState, setConfirmState] = useState(null)

  function openAdd() { setForm(blank); setEditId(null); setModal('add') }
  function openEdit(row) { setForm({ name: row.name, quote: row.quote, role: row.role, isActive: row.isActive, sortOrder: row.sortOrder }); setEditId(row.id); setModal('edit') }
  function close() { setModal(null) }

  async function handleSave() {
    setLoading(true)
    if (modal === 'add') await createTestimonial({ ...form, sortOrder: Number(form.sortOrder) })
    else await updateTestimonial(editId, { ...form, sortOrder: Number(form.sortOrder) })
    setLoading(false)
    close()
    toast(modal === 'add' ? 'Testimonial added' : 'Testimonial updated')
    router.refresh()
  }

  function handleDelete(id) {
    setConfirmState({ id, message: 'Are you sure you want to delete this testimonial?' })
  }

  async function confirmDelete() {
    if (!confirmState) return
    const { id } = confirmState
    setConfirmState(null)
    await deleteTestimonial(id)
    toast('Testimonial deleted')
    router.refresh()
  }

  return (
    <>
      <DataTable title="Testimonials" columns={columns} rows={items} onAdd={openAdd} onEdit={openEdit} onDelete={handleDelete} />

      {modal && (
        <FormModal title={modal === 'add' ? 'Add Testimonial' : 'Edit Testimonial'} onClose={close} onSubmit={handleSave} loading={loading}>
          <FormField label="Name">
            <input className={fs.input} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required maxLength={100} />
          </FormField>
          <FormField label="Role / Designation">
            <input className={fs.input} value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} required maxLength={150} placeholder="e.g. Parent of Class X Student" />
          </FormField>
          <FormField label="Quote">
            <textarea className={fs.textarea} value={form.quote} onChange={(e) => setForm({ ...form, quote: e.target.value })} required maxLength={1000} rows={3} />
          </FormField>
          <FormField label="Active">
            <select className={fs.select} value={form.isActive ? 'true' : 'false'} onChange={(e) => setForm({ ...form, isActive: e.target.value === 'true' })}>
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
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
