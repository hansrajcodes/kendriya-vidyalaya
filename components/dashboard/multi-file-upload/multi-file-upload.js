'use client'

import { useRef, useState } from 'react'
import { FiX, FiUploadCloud } from 'react-icons/fi'
import styles from './multi-file-upload.module.css'

export default function MultiFileUpload({ value = [], onChange, accept = '.jpg,.jpeg,.png,.webp', folder = 'images', maxFiles = 10 }) {
  const inputRef = useRef(null)
  const [uploading, setUploading] = useState(false)

  async function handleFiles(fileList) {
    if (!fileList?.length) return
    setUploading(true)

    const urls = [...value]
    for (const file of Array.from(fileList)) {
      if (urls.length >= maxFiles) break
      const formData = new FormData()
      formData.append('file', file)
      formData.append('folder', folder)

      try {
        const res = await fetch('/api/upload', { method: 'POST', body: formData })
        const data = await res.json()
        if (data.url) urls.push(data.url)
      } catch (err) {
        console.error('Upload failed:', err)
      }
    }

    onChange(urls)
    setUploading(false)
  }

  function removeAt(index) {
    onChange(value.filter((_, i) => i !== index))
  }

  return (
    <div className={styles.wrapper}>
      {value.length > 0 && (
        <div className={styles.thumbnailGrid}>
          {value.map((url, i) => (
            <div key={i} className={styles.thumbnail}>
              <img src={url} alt={`Upload ${i + 1}`} className={styles.thumbnailImg} />
              <button type="button" className={styles.removeBtn} onClick={() => removeAt(i)}>
                <FiX />
              </button>
            </div>
          ))}
        </div>
      )}

      {value.length < maxFiles && (
        <>
          <div className={styles.dropzone} onClick={() => inputRef.current?.click()}>
            <FiUploadCloud style={{ fontSize: '1.5rem', color: 'var(--color-grey-subtle)' }} />
            <div className={styles.dropzoneText}>
              {uploading ? 'Uploading...' : 'Click to upload images'}
            </div>
            <div className={styles.dropzoneHint}>
              JPG, PNG, or WebP &middot; {value.length}/{maxFiles} uploaded
            </div>
          </div>
          <input
            ref={inputRef}
            type="file"
            accept={accept}
            multiple
            style={{ display: 'none' }}
            onChange={(e) => handleFiles(e.target.files)}
          />
        </>
      )}
    </div>
  )
}
