'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import DataTable from '@/components/dashboard/data-table/data-table'
import FormModal, { FormField, styles as fs } from '@/components/dashboard/form-modal/form-modal'
import ConfirmModal from '@/components/dashboard/confirm-modal/confirm-modal'
import { useToast } from '@/components/dashboard/toast/toast'
import { createCareer, updateCareer, deleteCareer } from '@/actions'

const columns = [
  { key: 'title', label: 'Title' },
  { key: 'type', label: 'Type' },
  { key: 'qualification', label: 'Qualification' },
  { key: 'experience', label: 'Experience' },
  { key: 'isActive', label: 'Active', render: (v) => v ? 'Yes' : 'No' },
]

const blank = { title: '', type: 'Teaching', qualification: '', experience: '', isActive: true }

export default function CareersClient({ items }) {
  const router = useRouter()
  const toast = useToast()
  const [modal, setModal] = useState(null)
  const [form, setForm] = useState(blank)
  const [editId, setEditId] = useState(null)
  const [loading, setLoading] = useState(false)
  const [confirmState, setConfirmState] = useState(null)

  function openAdd() { setForm(blank); setEditId(null); setModal('add') }
  function openEdit(row) { setForm({ title: row.title, type: row.type, qualification: row.qualification, experience: row.experience, isActive: row.isActive }); setEditId(row.id); setModal('edit') }
  function close() { setModal(null) }

  async function handleSave() {
    setLoading(true)
    if (modal === 'add') await createCareer(form)
    else await updateCareer(editId, form)
    setLoading(false)
    close()
    toast(modal === 'add' ? 'Career posting added' : 'Career posting updated')
    router.refresh()
  }

  function handleDelete(id) {
    setConfirmState({ id, message: 'Are you sure you want to delete this career posting?' })
  }

  async function confirmDelete() {
    if (!confirmState) return
    const { id } = confirmState
    setConfirmState(null)
    await deleteCareer(id)
    toast('Career posting deleted')
    router.refresh()
  }

  return (
    <>
      <DataTable title="Careers" columns={columns} rows={items} onAdd={openAdd} onEdit={openEdit} onDelete={handleDelete} />

      {modal && (
        <FormModal title={modal === 'add' ? 'Add Career' : 'Edit Career'} onClose={close} onSubmit={handleSave} loading={loading}>
          <FormField label="Job Title">
            <input className={fs.input} value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required maxLength={200} />
          </FormField>
          <FormField label="Type">
            <select className={fs.select} value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })}>
              <option value="Teaching">Teaching</option>
              <option value="Non-Teaching">Non-Teaching</option>
            </select>
          </FormField>
          <FormField label="Qualification">
            <input className={fs.input} value={form.qualification} onChange={(e) => setForm({ ...form, qualification: e.target.value })} required maxLength={200} />
          </FormField>
          <FormField label="Experience">
            <input className={fs.input} value={form.experience} onChange={(e) => setForm({ ...form, experience: e.target.value })} required maxLength={100} placeholder="e.g. 3+ years" />
          </FormField>
          <FormField label="Active">
            <select className={fs.select} value={form.isActive ? 'true' : 'false'} onChange={(e) => setForm({ ...form, isActive: e.target.value === 'true' })}>
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
          </FormField>
        </FormModal>
      )}
      {confirmState && <ConfirmModal message={confirmState.message} onConfirm={confirmDelete} onCancel={() => setConfirmState(null)} />}
    </>
  )
}
