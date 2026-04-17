'use client'

import { useState, useMemo, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { FiTrash2, FiDownload, FiUpload } from 'react-icons/fi'
import { updateAdmissionStatus, deleteAdmissionApplication } from '@/actions'
import ConfirmModal from '@/components/dashboard/confirm-modal/confirm-modal'
import { useToast } from '@/components/dashboard/toast/toast'
import styles from './admissions.module.css'

const STATUS_OPTIONS = ['pending', 'reviewed', 'accepted', 'rejected']

const STATUS_COLORS = {
  pending: '#e67e22',
  reviewed: '#3498db',
  accepted: '#27ae60',
  rejected: '#c0392b',
}

export default function AdmissionsClient({ applications, hasAdmissionForm }) {
  const router = useRouter()
  const toast = useToast()
  const [statusFilter, setStatusFilter] = useState('All')
  const [formUploaded, setFormUploaded] = useState(hasAdmissionForm)
  const [uploading, setUploading] = useState(false)
  const [confirmState, setConfirmState] = useState(null)
  const fileRef = useRef(null)

  async function handleFormUpload(e) {
    const file = e.target.files?.[0]
    if (!file) return
    if (file.type !== 'application/pdf') {
      toast('Only PDF files are allowed.', 'error')
      e.target.value = ''
      return
    }
    setUploading(true)
    try {
      const fd = new FormData()
      fd.append('file', file)
      const res = await fetch('/api/admission-form', { method: 'POST', body: fd })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error)
      setFormUploaded(true)
      toast('Admission form uploaded successfully')
      router.refresh()
    } catch (err) {
      toast(err.message || 'Upload failed', 'error')
    }
    setUploading(false)
    e.target.value = ''
  }

  const filtered = useMemo(() => {
    if (statusFilter === 'All') return applications
    return applications.filter((a) => a.status === statusFilter)
  }, [applications, statusFilter])

  async function handleStatusChange(id, status) {
    await updateAdmissionStatus(id, status)
    toast(`Status updated to ${status}`)
    router.refresh()
  }

  async function handleDelete(id) {
    setConfirmState({ id, message: 'Are you sure you want to delete this application? This action cannot be undone.' })
  }

  async function confirmDelete() {
    if (!confirmState) return
    const { id } = confirmState
    setConfirmState(null)
    await deleteAdmissionApplication(id)
    toast('Application deleted')
    router.refresh()
  }

  function exportCSV() {
    const headers = ['Student Name', 'DOB', 'Gender', 'Class', 'Father', 'Mother', 'Phone', 'Email', 'Address', 'Previous School', 'Status', 'Date']
    const rows = filtered.map((a) => [
      a.studentName, a.dob, a.gender, a.classApplying,
      a.fatherName, a.motherName, a.phone, a.email,
      `"${a.address.replace(/"/g, '""')}"`, a.previousSchool,
      a.status, new Date(a.createdAt).toLocaleDateString('en-IN'),
    ])
    const csv = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n')
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `admissions-${new Date().toISOString().split('T')[0]}.csv`
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <>
      <div className={styles.formUploadBox}>
        <div className={styles.formUploadLeft}>
          <h3 className={styles.formUploadTitle}>Offline Admission Form (PDF)</h3>
          <p className={styles.formUploadDesc}>
            {formUploaded ? 'A form is currently uploaded. Parents can download it from the admission page.' : 'Upload the admission form PDF so parents can download it for offline admission.'}
          </p>
        </div>
        <div className={styles.formUploadActions}>
          {formUploaded && (
            <a href="/api/admission-form" download className={styles.exportBtn}>
              <FiDownload /> View Current
            </a>
          )}
          <label className={styles.uploadLabel}>
            <FiUpload /> {uploading ? 'Uploading...' : formUploaded ? 'Replace PDF' : 'Upload PDF'}
            <input type="file" accept=".pdf" onChange={handleFormUpload} ref={fileRef} hidden disabled={uploading} />
          </label>
        </div>
      </div>

      <div className={styles.toolbar}>
        <h1 className={styles.heading}>Admission Applications</h1>
        <div className={styles.toolbarActions}>
          <select className={styles.filterSelect} value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
            <option value="All">All Status</option>
            {STATUS_OPTIONS.map((s) => (
              <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>
            ))}
          </select>
          <button className={styles.exportBtn} onClick={exportCSV}>
            <FiDownload /> Export CSV
          </button>
        </div>
      </div>

      <p className={styles.count}>{filtered.length} application{filtered.length !== 1 ? 's' : ''}</p>

      <div className={styles.overflow}>
        {filtered.length === 0 ? (
          <div className={styles.empty}>No applications found.</div>
        ) : (
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Student</th><th>Class</th><th>Phone</th><th>Email</th><th>Date</th><th>Status</th><th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((app) => (
                <tr key={app.id}>
                  <td>
                    <div className={styles.studentName}>{app.studentName}</div>
                    <div className={styles.parentNames}>F: {app.fatherName} | M: {app.motherName}</div>
                  </td>
                  <td>{app.classApplying}</td>
                  <td>{app.phone}</td>
                  <td>{app.email}</td>
                  <td>{new Date(app.createdAt).toLocaleDateString('en-IN')}</td>
                  <td>
                    <select className={styles.statusSelect} value={app.status} onChange={(e) => handleStatusChange(app.id, e.target.value)} style={{ color: STATUS_COLORS[app.status] }}>
                      {STATUS_OPTIONS.map((s) => (
                        <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>
                      ))}
                    </select>
                  </td>
                  <td>
                    <button className={styles.deleteBtn} onClick={() => handleDelete(app.id)}><FiTrash2 /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {confirmState && (
        <ConfirmModal message={confirmState.message} onConfirm={confirmDelete} onCancel={() => setConfirmState(null)} />
      )}
    </>
  )
}
