'use client'

import { useState } from 'react'
import { submitAdmissionApplication } from '@/actions'
import styles from './apply.module.css'

const classOptions = [
  'Nursery', 'LKG', 'UKG',
  'Class I', 'Class II', 'Class III', 'Class IV', 'Class V',
  'Class VI', 'Class VII', 'Class VIII',
  'Class IX', 'Class X', 'Class XI', 'Class XII',
]

const initialForm = {
  studentName: '', dob: '', gender: '', classApplying: '',
  fatherName: '', motherName: '', phone: '', email: '',
  address: '', previousSchool: '',
}

export default function ApplyForm() {
  const [form, setForm] = useState(initialForm)
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  function update(field) {
    return (e) => setForm({ ...form, [field]: e.target.value })
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      await submitAdmissionApplication(form)
      setSubmitted(true)
    } catch {
      setError('Something went wrong. Please try again.')
    }
    setLoading(false)
  }

  if (submitted) {
    return (
      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.success}>
            <span className={styles.successIcon} aria-hidden="true">&#10003;</span>
            <p className={styles.successText}>Application Submitted Successfully</p>
            <p className={styles.successSub}>
              Thank you for applying to Kendriya Vidyalaya. Our admissions team will review
              your application and contact you shortly.
            </p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.centered}>
          <span className={styles.label}>Admission Form</span>
          <h2 className={styles.heading}>Student Application</h2>
          <p className={styles.intro}>
            Fill in the details below to submit your admission application online.
            All fields marked are required.
          </p>
        </div>

        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.row}>
            <div className={styles.field}>
              <label className={styles.fieldLabel}>Student Name</label>
              <input className={styles.input} value={form.studentName} onChange={update('studentName')} required maxLength={100} minLength={2} pattern="[A-Za-z\s.\-']+" title="Letters, spaces, dots, hyphens only" />
            </div>
            <div className={styles.field}>
              <label className={styles.fieldLabel}>Date of Birth</label>
              <input className={styles.input} type="date" value={form.dob} onChange={update('dob')} required />
            </div>
          </div>

          <div className={styles.row}>
            <div className={styles.field}>
              <label className={styles.fieldLabel}>Gender</label>
              <select className={styles.select} value={form.gender} onChange={update('gender')} required>
                <option value="">Select</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div className={styles.field}>
              <label className={styles.fieldLabel}>Class Applying For</label>
              <select className={styles.select} value={form.classApplying} onChange={update('classApplying')} required>
                <option value="">Select Class</option>
                {classOptions.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
          </div>

          <div className={styles.row}>
            <div className={styles.field}>
              <label className={styles.fieldLabel}>Father&apos;s Name</label>
              <input className={styles.input} value={form.fatherName} onChange={update('fatherName')} required maxLength={100} minLength={2} pattern="[A-Za-z\s.\-']+" title="Letters, spaces, dots, hyphens only" />
            </div>
            <div className={styles.field}>
              <label className={styles.fieldLabel}>Mother&apos;s Name</label>
              <input className={styles.input} value={form.motherName} onChange={update('motherName')} required maxLength={100} minLength={2} pattern="[A-Za-z\s.\-']+" title="Letters, spaces, dots, hyphens only" />
            </div>
          </div>

          <div className={styles.row}>
            <div className={styles.field}>
              <label className={styles.fieldLabel}>Phone Number</label>
              <input className={styles.input} type="tel" value={form.phone} onChange={update('phone')} required maxLength={15} minLength={10} pattern="[\d\s\+\-]+" title="Valid phone number" />
            </div>
            <div className={styles.field}>
              <label className={styles.fieldLabel}>Email Address</label>
              <input className={styles.input} type="email" value={form.email} onChange={update('email')} required maxLength={100} />
            </div>
          </div>

          <div className={styles.field}>
            <label className={styles.fieldLabel}>Address</label>
            <textarea className={styles.textarea} value={form.address} onChange={update('address')} required maxLength={500} rows={3} />
          </div>

          <div className={styles.field}>
            <label className={styles.fieldLabel}>Previous School (if any)</label>
            <input className={styles.input} value={form.previousSchool} onChange={update('previousSchool')} maxLength={200} />
          </div>

          {error && <p className={styles.error}>{error}</p>}

          <button type="submit" className={styles.submitBtn} disabled={loading}>
            {loading ? 'Submitting...' : 'Submit Application'}
          </button>
        </form>
      </div>
    </section>
  )
}
