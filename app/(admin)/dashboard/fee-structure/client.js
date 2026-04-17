'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import DataTable from '@/components/dashboard/data-table/data-table'
import FormModal, { FormField, styles as fs } from '@/components/dashboard/form-modal/form-modal'
import {
  createFeeGroup, updateFeeGroup, deleteFeeGroup,
  createFeeNote, updateFeeNote, deleteFeeNote,
} from '@/actions'
import ConfirmModal from '@/components/dashboard/confirm-modal/confirm-modal'
import { useToast } from '@/components/dashboard/toast/toast'
import { generateFeePdf } from '@/lib/generate-fee-pdf'

/* ── Fee Groups ── */
const groupColumns = [
  { key: 'classRange', label: 'Class Range' },
  { key: 'monthlyTuition', label: 'Monthly Tuition' },
  { key: 'idCardNew', label: 'ID Card (New)' },
  { key: 'registrationNew', label: 'Registration (New)' },
  { key: 'admissionNew', label: 'Admission (New)' },
  { key: 'siblingDiscount', label: 'Sibling %' },
  { key: 'sortOrder', label: 'Order' },
]

const blankGroup = {
  classRange: '', siblingDiscount: 15, monthlyTuition: 0,
  idCardNew: 100, idCardOld: 100,
  registrationNew: 3000, registrationOld: 0,
  admissionNew: 0, admissionOld: 0,
  tuitionNew: 0, tuitionOld: 0,
  sortOrder: 0,
}

/* ── Fee Notes ── */
const noteColumns = [
  { key: 'content', label: 'Note' },
  { key: 'sortOrder', label: 'Order' },
]

const blankNote = { content: '', sortOrder: 0 }

/* ── Helpers ── */
function toInt(v) { return parseInt(v, 10) || 0 }

function groupFormToData(f) {
  return {
    classRange: f.classRange,
    siblingDiscount: toInt(f.siblingDiscount),
    monthlyTuition: toInt(f.monthlyTuition),
    idCardNew: toInt(f.idCardNew),
    idCardOld: toInt(f.idCardOld),
    registrationNew: toInt(f.registrationNew),
    registrationOld: toInt(f.registrationOld),
    admissionNew: toInt(f.admissionNew),
    admissionOld: toInt(f.admissionOld),
    tuitionNew: toInt(f.tuitionNew),
    tuitionOld: toInt(f.tuitionOld),
    sortOrder: toInt(f.sortOrder),
  }
}

export default function FeeStructureClient({ groups, notes }) {
  const router = useRouter()
  const toast = useToast()
  const [confirmState, setConfirmState] = useState(null)

  /* Group state */
  const [gModal, setGModal] = useState(null)
  const [gForm, setGForm] = useState(blankGroup)
  const [gEditId, setGEditId] = useState(null)
  const [gLoading, setGLoading] = useState(false)

  /* Note state */
  const [nModal, setNModal] = useState(null)
  const [nForm, setNForm] = useState(blankNote)
  const [nEditId, setNEditId] = useState(null)
  const [nLoading, setNLoading] = useState(false)

  /* ── Group handlers ── */
  function openAddGroup() { setGForm(blankGroup); setGEditId(null); setGModal('add') }
  function openEditGroup(row) {
    setGForm({
      classRange: row.classRange, siblingDiscount: row.siblingDiscount,
      monthlyTuition: row.monthlyTuition,
      idCardNew: row.idCardNew, idCardOld: row.idCardOld,
      registrationNew: row.registrationNew, registrationOld: row.registrationOld,
      admissionNew: row.admissionNew, admissionOld: row.admissionOld,
      tuitionNew: row.tuitionNew, tuitionOld: row.tuitionOld,
      sortOrder: row.sortOrder,
    })
    setGEditId(row.id)
    setGModal('edit')
  }

  async function handleSaveGroup() {
    setGLoading(true)
    const data = groupFormToData(gForm)
    if (gModal === 'add') await createFeeGroup(data)
    else await updateFeeGroup(gEditId, data)
    setGLoading(false)
    setGModal(null)
    toast(gModal === 'add' ? 'Fee group added' : 'Fee group updated')
    router.refresh()
  }

  function handleDeleteGroup(id) {
    setConfirmState({ id, type: 'group', message: 'Are you sure you want to delete this fee group?' })
  }

  /* ── Note handlers ── */
  function openAddNote() { setNForm(blankNote); setNEditId(null); setNModal('add') }
  function openEditNote(row) {
    setNForm({ content: row.content, sortOrder: row.sortOrder })
    setNEditId(row.id)
    setNModal('edit')
  }

  async function handleSaveNote() {
    setNLoading(true)
    const data = { content: nForm.content, sortOrder: toInt(nForm.sortOrder) }
    if (nModal === 'add') await createFeeNote(data)
    else await updateFeeNote(nEditId, data)
    setNLoading(false)
    setNModal(null)
    toast(nModal === 'add' ? 'Fee note added' : 'Fee note updated')
    router.refresh()
  }

  function handleDeleteNote(id) {
    setConfirmState({ id, type: 'note', message: 'Are you sure you want to delete this note?' })
  }

  async function confirmDelete() {
    if (!confirmState) return
    const { id, type } = confirmState
    setConfirmState(null)
    if (type === 'group') await deleteFeeGroup(id)
    else await deleteFeeNote(id)
    toast(type === 'group' ? 'Fee group deleted' : 'Fee note deleted')
    router.refresh()
  }

  /* ── Paired number input helper ── */
  function pairField(label, keyNew, keyOld) {
    return (
      <div className={fs.fullWidth}>
        <FormField label={label}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
            <input className={fs.input} type="number" min={0} max={999999} placeholder="New Student" value={gForm[keyNew]} onChange={(e) => setGForm({ ...gForm, [keyNew]: e.target.value })} />
            <input className={fs.input} type="number" min={0} max={999999} placeholder="Old Student" value={gForm[keyOld]} onChange={(e) => setGForm({ ...gForm, [keyOld]: e.target.value })} />
          </div>
        </FormField>
      </div>
    )
  }

  return (
    <>
      {/* Download PDF */}
      <div style={{ marginBottom: 16, display: 'flex', justifyContent: 'flex-end' }}>
        <button
          onClick={() => generateFeePdf(groups, notes)}
          style={{
            padding: '8px 20px', background: 'var(--color-navy)', color: 'var(--color-gold)',
            border: '1px solid var(--color-gold)', fontFamily: 'var(--font-body)',
            fontSize: 'var(--text-xs)', fontWeight: 600, cursor: 'pointer',
            textTransform: 'uppercase', letterSpacing: '0.04em',
          }}
        >
          Download PDF
        </button>
      </div>

      {/* Fee Groups */}
      <DataTable title="Fee Groups" columns={groupColumns} rows={groups} onAdd={openAddGroup} onEdit={openEditGroup} onDelete={handleDeleteGroup} />

      {gModal && (
        <FormModal title={gModal === 'add' ? 'Add Fee Group' : 'Edit Fee Group'} onClose={() => setGModal(null)} onSubmit={handleSaveGroup} loading={gLoading}>
          <FormField label="Class Range (e.g. Nur to U.K.G)">
            <input className={fs.input} value={gForm.classRange} onChange={(e) => setGForm({ ...gForm, classRange: e.target.value })} required maxLength={100} />
          </FormField>
          <FormField label="Sibling Discount %">
            <input className={fs.input} type="number" min={0} max={100} value={gForm.siblingDiscount} onChange={(e) => setGForm({ ...gForm, siblingDiscount: e.target.value })} />
          </FormField>
          <FormField label="Monthly Tuition Rate">
            <input className={fs.input} type="number" min={0} max={999999} value={gForm.monthlyTuition} onChange={(e) => setGForm({ ...gForm, monthlyTuition: e.target.value })} />
          </FormField>
          <FormField label="Sort Order">
            <input className={fs.input} type="number" min={0} max={999} value={gForm.sortOrder} onChange={(e) => setGForm({ ...gForm, sortOrder: e.target.value })} />
          </FormField>
          {pairField('Id Card (New / Old)', 'idCardNew', 'idCardOld')}
          {pairField('Registration Fee (New / Old)', 'registrationNew', 'registrationOld')}
          {pairField('Admission Fee (New / Old)', 'admissionNew', 'admissionOld')}
          {pairField('Tuition Total (New / Old)', 'tuitionNew', 'tuitionOld')}
        </FormModal>
      )}

      {/* Fee Notes */}
      <div style={{ marginTop: 40 }}>
        <DataTable title="Fee Notes" columns={noteColumns} rows={notes} onAdd={openAddNote} onEdit={openEditNote} onDelete={handleDeleteNote} />
      </div>

      {nModal && (
        <FormModal title={nModal === 'add' ? 'Add Fee Note' : 'Edit Fee Note'} onClose={() => setNModal(null)} onSubmit={handleSaveNote} loading={nLoading}>
          <FormField label="Note Content">
            <textarea className={fs.input} rows={3} value={nForm.content} onChange={(e) => setNForm({ ...nForm, content: e.target.value })} required maxLength={500} />
          </FormField>
          <FormField label="Sort Order">
            <input className={fs.input} type="number" min={0} max={999} value={nForm.sortOrder} onChange={(e) => setNForm({ ...nForm, sortOrder: e.target.value })} />
          </FormField>
        </FormModal>
      )}
      {confirmState && <ConfirmModal message={confirmState.message} onConfirm={confirmDelete} onCancel={() => setConfirmState(null)} />}
    </>
  )
}
