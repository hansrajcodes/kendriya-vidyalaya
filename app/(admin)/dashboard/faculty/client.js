'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import DataTable from '@/components/dashboard/data-table/data-table'
import FormModal, { FormField, styles as fs } from '@/components/dashboard/form-modal/form-modal'
import FileUpload from '@/components/dashboard/file-upload/file-upload'
import ConfirmModal from '@/components/dashboard/confirm-modal/confirm-modal'
import { useToast } from '@/components/dashboard/toast/toast'
import { createFaculty, updateFaculty, deleteFaculty } from '@/actions'

const columns = [
  { key: 'name', label: 'Name' },
  { key: 'role', label: 'Role' },
  { key: 'subject', label: 'Subject' },
  { key: 'qualification', label: 'Qualification' },
  { key: 'imageUrl', label: 'Photo', render: (v) => v ? 'Uploaded' : '—' },
  { key: 'sortOrder', label: 'Order' },
]

const blank = { name: '', role: '', subject: '', qualification: '', imageUrl: '', sortOrder: 0 }

export default function FacultyClient({ items }) {
  const router = useRouter()
  const toast = useToast()
  const [modal, setModal] = useState(null)
  const [form, setForm] = useState(blank)
  const [editId, setEditId] = useState(null)
  const [loading, setLoading] = useState(false)
  const [confirmState, setConfirmState] = useState(null)

  function openAdd() { setForm(blank); setEditId(null); setModal('add') }
  function openEdit(row) { setForm({ name: row.name, role: row.role, subject: row.subject, qualification: row.qualification, imageUrl: row.imageUrl || '', sortOrder: row.sortOrder }); setEditId(row.id); setModal('edit') }
  function close() { setModal(null) }

  async function handleSave() {
    setLoading(true)
    const data = { ...form, sortOrder: Number(form.sortOrder), imageUrl: form.imageUrl || null }
    if (modal === 'add') await createFaculty(data)
    else await updateFaculty(editId, data)
    setLoading(false)
    close()
    toast(modal === 'add' ? 'Faculty added' : 'Faculty updated')
    router.refresh()
  }

  function handleDelete(id) {
    setConfirmState({ id, message: 'Are you sure you want to delete this faculty member?' })
  }

  async function confirmDelete() {
    if (!confirmState) return
    const { id } = confirmState
    setConfirmState(null)
    await deleteFaculty(id)
    toast('Faculty member deleted')
    router.refresh()
  }

  return (
    <>
      <DataTable title="Faculty" columns={columns} rows={items} onAdd={openAdd} onEdit={openEdit} onDelete={handleDelete} />

      {modal && (
        <FormModal title={modal === 'add' ? 'Add Faculty' : 'Edit Faculty'} onClose={close} onSubmit={handleSave} loading={loading}>
          <FormField label="Name">
            <input className={fs.input} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required maxLength={100} />
          </FormField>
          <FormField label="Role">
            <select className={fs.select} value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} required>
              <option value="">Select role</option>
              <option value="Principal">Principal</option>
              <option value="Vice Principal">Vice Principal</option>
              <option value="PGT">PGT</option>
              <option value="TGT">TGT</option>
              <option value="PRT">PRT</option>
              <option value="PET">PET</option>
            </select>
          </FormField>
          <FormField label="Subject">
            <input className={fs.input} value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} required maxLength={100} />
          </FormField>
          <FormField label="Qualification">
            <input className={fs.input} value={form.qualification} onChange={(e) => setForm({ ...form, qualification: e.target.value })} required maxLength={200} />
          </FormField>
          <FormField label="Photo (optional)">
            <FileUpload value={form.imageUrl} onChange={(url) => setForm({ ...form, imageUrl: url })} accept=".jpg,.jpeg,.png,.webp" folder="images" />
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
