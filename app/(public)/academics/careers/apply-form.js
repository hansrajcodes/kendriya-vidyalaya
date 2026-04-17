'use client'

import { useState, useRef, useEffect } from 'react'
import { submitCareerApplication } from '@/actions'
import styles from './careers.module.css'

function validate(form, resumeFile) {
  const errors = {}
  const name = form.name.trim()
  if (!name) errors.name = 'Full name is required.'
  else if (name.length < 2) errors.name = 'Name must be at least 2 characters.'
  else if (!/^[A-Za-z\s.\-']+$/.test(name)) errors.name = 'Name can only contain letters, spaces, dots, and hyphens.'

  const email = form.email.trim()
  if (!email) errors.email = 'Email is required.'
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = 'Please enter a valid email address.'

  const phone = form.phone.trim()
  if (!phone) errors.phone = 'Phone number is required.'
  else if (phone.length < 10) errors.phone = 'Phone number must be at least 10 digits.'
  else if (!/^[\d\s\+\-]+$/.test(phone)) errors.phone = 'Phone number can only contain digits, spaces, + and -.'

  if (!resumeFile) errors.resume = 'Please upload your resume (PDF).'

  if (form.message.length > 1000) errors.message = 'Message must be under 1000 characters.'

  return errors
}

export default function CareerApplyForm({ careerId, careerTitle, onClose }) {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' })
  const [resumeFile, setResumeFile] = useState(null)
  const [uploading, setUploading] = useState(false)
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')
  const [fieldErrors, setFieldErrors] = useState({})
  const [touched, setTouched] = useState({})
  const fileRef = useRef(null)

  useEffect(() => {
    document.documentElement.style.overflow = 'hidden'
    document.body.style.overflow = 'hidden'
    return () => {
      document.documentElement.style.overflow = ''
      document.body.style.overflow = ''
    }
  }, [])

  function update(field) {
    return (e) => {
      const next = { ...form, [field]: e.target.value }
      setForm(next)
      if (touched[field]) {
        const errs = validate(next, resumeFile)
        setFieldErrors((prev) => ({ ...prev, [field]: errs[field] || '' }))
      }
    }
  }

  function handleBlur(field) {
    return () => {
      setTouched((prev) => ({ ...prev, [field]: true }))
      const errs = validate(form, resumeFile)
      setFieldErrors((prev) => ({ ...prev, [field]: errs[field] || '' }))
    }
  }

  function handleFileChange(e) {
    const file = e.target.files?.[0]
    if (!file) return
    if (file.type !== 'application/pdf') {
      setFieldErrors((prev) => ({ ...prev, resume: 'Only PDF files are allowed.' }))
      e.target.value = ''
      return
    }
    if (file.size > 5 * 1024 * 1024) {
      setFieldErrors((prev) => ({ ...prev, resume: 'File size must be under 5 MB.' }))
      e.target.value = ''
      return
    }
    setFieldErrors((prev) => ({ ...prev, resume: '' }))
    setResumeFile(file)
  }

  function fileToBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = () => resolve(reader.result.split(',')[1])
      reader.onerror = reject
      reader.readAsDataURL(file)
    })
  }

  async function handleSubmit(e) {
    e.preventDefault()
    const errs = validate(form, resumeFile)
    setFieldErrors(errs)
    setTouched({ name: true, email: true, phone: true, resume: true, message: true })
    if (Object.keys(errs).length > 0) return

    setLoading(true)
    setError('')
    try {
      let resumeBase64 = ''
      if (resumeFile) {
        setUploading(true)
        resumeBase64 = await fileToBase64(resumeFile)
        setUploading(false)
      }
      await submitCareerApplication({ ...form, careerId, resumeBase64 })
      setSubmitted(true)
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.')
    }
    setLoading(false)
    setUploading(false)
  }

  if (submitted) {
    return (
      <div className={styles.applyModal} onClick={onClose}>
        <div className={styles.applyContent} onClick={(e) => e.stopPropagation()}>
          <div className={styles.applySuccess}>
            <span className={styles.applySuccessIcon} aria-hidden="true">&#10003;</span>
            <p className={styles.applySuccessHeading}>Application Submitted</p>
            <p className={styles.applySuccessText}>
              Thank you for applying for <strong>{careerTitle}</strong>. We will review your application and get back to you shortly.
            </p>
            <button type="button" className={styles.applySubmitBtn} onClick={onClose}>Close</button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.applyModal} onClick={onClose}>
      <div className={styles.applyContent} onClick={(e) => e.stopPropagation()}>
        <div className={styles.applyHeader}>
          <div>
            <span className={styles.applyHeaderLabel}>Career Application</span>
            <h3 className={styles.applyTitle}>{careerTitle}</h3>
          </div>
          <button type="button" className={styles.applyCloseBtn} onClick={onClose} aria-label="Close">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M14 4L4 14M4 4l10 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
          </button>
        </div>

        <form className={styles.applyForm} onSubmit={handleSubmit} noValidate>
          <div className={styles.applyRow}>
            <div className={styles.applyField}>
              <label className={styles.applyLabel}>Full Name <span className={styles.applyReq}>*</span></label>
              <input
                className={`${styles.applyInput} ${fieldErrors.name ? styles.applyInputError : ''}`}
                value={form.name}
                onChange={update('name')}
                onBlur={handleBlur('name')}
                placeholder="John Doe"
                maxLength={100}
              />
              <span className={`${styles.applyFieldError} ${fieldErrors.name ? styles.applyFieldErrorVisible : ''}`}>{fieldErrors.name || '\u200b'}</span>
            </div>
            <div className={styles.applyField}>
              <label className={styles.applyLabel}>Email <span className={styles.applyReq}>*</span></label>
              <input
                className={`${styles.applyInput} ${fieldErrors.email ? styles.applyInputError : ''}`}
                type="email"
                value={form.email}
                onChange={update('email')}
                onBlur={handleBlur('email')}
                placeholder="you@example.com"
                maxLength={100}
              />
              <span className={`${styles.applyFieldError} ${fieldErrors.email ? styles.applyFieldErrorVisible : ''}`}>{fieldErrors.email || '\u200b'}</span>
            </div>
          </div>

          <div className={styles.applyField}>
            <label className={styles.applyLabel}>Phone <span className={styles.applyReq}>*</span></label>
            <input
              className={`${styles.applyInput} ${fieldErrors.phone ? styles.applyInputError : ''}`}
              type="tel"
              value={form.phone}
              onChange={update('phone')}
              onBlur={handleBlur('phone')}
              placeholder="9876543210"
              maxLength={10}
            />
            <span className={`${styles.applyFieldError} ${fieldErrors.phone ? styles.applyFieldErrorVisible : ''}`}>{fieldErrors.phone || '\u200b'}</span>
          </div>

          <div className={styles.applyField}>
            <label className={styles.applyLabel}>Resume <span className={styles.applyReq}>*</span></label>
            <div className={`${styles.applyFileZone} ${fieldErrors.resume ? styles.applyFileZoneError : ''} ${resumeFile ? styles.applyFileZoneActive : ''}`}>
              <input className={styles.applyFileHidden} type="file" accept=".pdf" ref={fileRef} onChange={handleFileChange} />
              {resumeFile ? (
                <div className={styles.applyFileInfo}>
                  <span className={styles.applyFileIcon}>&#128196;</span>
                  <span className={styles.applyFileName}>{resumeFile.name}</span>
                  <button type="button" className={styles.applyFileRemove} onClick={() => { setResumeFile(null); fileRef.current.value = '' }}>Remove</button>
                </div>
              ) : (
                <div className={styles.applyFilePlaceholder} onClick={() => fileRef.current?.click()}>
                  <span className={styles.applyFileIcon}>&#128206;</span>
                  <span>Click to upload PDF (max 5 MB)</span>
                </div>
              )}
            </div>
            <span className={`${styles.applyFieldError} ${fieldErrors.resume ? styles.applyFieldErrorVisible : ''}`}>{fieldErrors.resume || '\u200b'}</span>
          </div>

          <div className={styles.applyField}>
            <label className={styles.applyLabel}>Message <span className={styles.applyOptional}>(optional)</span></label>
            <textarea
              className={`${styles.applyTextarea} ${fieldErrors.message ? styles.applyInputError : ''}`}
              value={form.message}
              onChange={update('message')}
              onBlur={handleBlur('message')}
              maxLength={1000}
              rows={3}
              placeholder="Tell us why you'd be a great fit..."
            />
            <span className={styles.applyCharCount}>{form.message.length}/1000</span>
          </div>

          {error && <p className={styles.applyError}>{error}</p>}

          <button type="submit" className={styles.applySubmitBtn} disabled={loading || uploading}>
            {uploading ? 'Uploading Resume...' : loading ? 'Submitting...' : 'Submit Application'}
          </button>
        </form>
      </div>
    </div>
  )
}
