'use client'

import { useRef, useState } from 'react'
import { FiFile, FiX, FiUploadCloud } from 'react-icons/fi'
import styles from './file-upload.module.css'

export default function FileUpload({ value, onChange, accept = '.pdf,.jpg,.jpeg,.png', folder = 'pdfs' }) {
  const inputRef = useRef(null)
  const [uploading, setUploading] = useState(false)

  async function handleFile(file) {
    if (!file) return
    setUploading(true)

    const formData = new FormData()
    formData.append('file', file)
    formData.append('folder', folder)

    try {
      const res = await fetch('/api/upload', { method: 'POST', body: formData })
      const data = await res.json()
      if (data.url) {
        onChange(data.url)
      }
    } catch (err) {
      console.error('Upload failed:', err)
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className={styles.wrapper}>
      {value ? (
        <div className={styles.preview}>
          <FiFile className={styles.previewIcon} />
          <span className={styles.previewName}>{value.split('/').pop()}</span>
          <button type="button" className={styles.removeBtn} onClick={() => onChange('')}>
            <FiX />
          </button>
        </div>
      ) : (
        <>
          <div
            className={styles.dropzone}
            onClick={() => inputRef.current?.click()}
          >
            <FiUploadCloud style={{ fontSize: '1.5rem', color: 'var(--color-grey-subtle)' }} />
            <div className={styles.dropzoneText}>
              {uploading ? 'Uploading...' : 'Click to upload'}
            </div>
            <div className={styles.dropzoneHint}>
              {accept.includes('.pdf') && accept.includes('.jpg') ? 'PDF, JPG, or PNG' : accept.includes('.pdf') ? 'PDF files only' : 'JPG, PNG, or WebP'}
            </div>
          </div>
          <input
            ref={inputRef}
            type="file"
            accept={accept}
            style={{ display: 'none' }}
            onChange={(e) => handleFile(e.target.files[0])}
          />
        </>
      )}
    </div>
  )
}
