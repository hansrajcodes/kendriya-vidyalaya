'use client'

import { useState, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { FiTrash2, FiDownload } from 'react-icons/fi'
import { updateCareerApplicationStatus, deleteCareerApplication } from '@/actions'
import ConfirmModal from '@/components/dashboard/confirm-modal/confirm-modal'
import { useToast } from '@/components/dashboard/toast/toast'
import styles from '../admissions/admissions.module.css'

const STATUS_OPTIONS = ['pending', 'reviewed', 'accepted', 'rejected']

const STATUS_COLORS = {
  pending: '#e67e22',
  reviewed: '#3498db',
  accepted: '#27ae60',
  rejected: '#c0392b',
}

export default function CareerAppsClient({ applications }) {
  const router = useRouter()
  const toast = useToast()
  const [statusFilter, setStatusFilter] = useState('All')
  const [confirmState, setConfirmState] = useState(null)

  const filtered = useMemo(() => {
    if (statusFilter === 'All') return applications
    return applications.filter((a) => a.status === statusFilter)
  }, [applications, statusFilter])

  async function handleStatusChange(id, status) {
    await updateCareerApplicationStatus(id, status)
    toast(`Status updated to ${status}`)
    router.refresh()
  }

  function handleDelete(id) {
    setConfirmState({ id, message: 'Are you sure you want to delete this application?' })
  }

  async function confirmDelete() {
    if (!confirmState) return
    const { id } = confirmState
    setConfirmState(null)
    await deleteCareerApplication(id)
    toast('Application deleted')
    router.refresh()
  }

  return (
    <>
      <div className={styles.toolbar}>
        <h1 className={styles.heading}>Career Applications</h1>
        <div className={styles.toolbarActions}>
          <select
            className={styles.filterSelect}
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="All">All Status</option>
            {STATUS_OPTIONS.map((s) => (
              <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>
            ))}
          </select>
        </div>
      </div>

      <p className={styles.count}>{filtered.length} application{filtered.length !== 1 ? 's' : ''}</p>

      <div className={styles.overflow}>
        {filtered.length === 0 ? (
          <div className={styles.empty}>No career applications found.</div>
        ) : (
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Name</th>
                <th>Position</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Resume</th>
                <th>Date</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((app) => (
                <tr key={app.id}>
                  <td>
                    <div className={styles.studentName}>{app.name}</div>
                    {app.message && (
                      <div className={styles.parentNames}>{app.message.slice(0, 60)}{app.message.length > 60 ? '...' : ''}</div>
                    )}
                  </td>
                  <td>{app.career?.title || '—'}</td>
                  <td>{app.email}</td>
                  <td>{app.phone}</td>
                  <td>
                    {app.resumeUrl ? (
                      <a
                        href={`/api/serve-resume?id=${app.id}`}
                        download
                        className={styles.exportBtn}
                        style={{ padding: '4px 10px', fontSize: '0.7rem' }}
                      >
                        <FiDownload /> PDF
                      </a>
                    ) : '—'}
                  </td>
                  <td>{new Date(app.createdAt).toLocaleDateString('en-IN')}</td>
                  <td>
                    <select
                      className={styles.statusSelect}
                      value={app.status}
                      onChange={(e) => handleStatusChange(app.id, e.target.value)}
                      style={{ color: STATUS_COLORS[app.status] }}
                    >
                      {STATUS_OPTIONS.map((s) => (
                        <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>
                      ))}
                    </select>
                  </td>
                  <td>
                    <button className={styles.deleteBtn} onClick={() => handleDelete(app.id)}>
                      <FiTrash2 />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      {confirmState && <ConfirmModal message={confirmState.message} onConfirm={confirmDelete} onCancel={() => setConfirmState(null)} />}
    </>
  )
}
