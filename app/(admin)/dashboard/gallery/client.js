'use client'

import { useState, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { FiX, FiChevronLeft, FiChevronRight } from 'react-icons/fi'
import DataTable from '@/components/dashboard/data-table/data-table'
import FormModal, { FormField, styles as fs } from '@/components/dashboard/form-modal/form-modal'
import FileUpload from '@/components/dashboard/file-upload/file-upload'
import MultiFileUpload from '@/components/dashboard/multi-file-upload/multi-file-upload'
import ConfirmModal from '@/components/dashboard/confirm-modal/confirm-modal'
import { useToast } from '@/components/dashboard/toast/toast'
import {
  createGalleryImage, updateGalleryImage, deleteGalleryImage,
  createGalleryAlbum, updateGalleryAlbum, deleteGalleryAlbum,
} from '@/actions'

const CATEGORIES = ['General', 'Annual Day', 'Sports', 'Cultural', 'Academic', 'Infrastructure']

const thumbStyle = {
  width: 48, height: 48, objectFit: 'cover', cursor: 'pointer',
  border: '1px solid var(--color-border)',
}

const blankImage = { title: '', category: 'General', imageUrl: '' }
const blankAlbum = { title: '', category: 'General', images: [] }

export default function GalleryClient({ items, albums }) {
  const router = useRouter()
  const toast = useToast()
  const [confirmState, setConfirmState] = useState(null)
  const [tab, setTab] = useState('uploads')

  // Filters
  const [imageCategory, setImageCategory] = useState('All')
  const [albumCategory, setAlbumCategory] = useState('All')

  // Individual Image state
  const [iModal, setIModal] = useState(null)
  const [iForm, setIForm] = useState(blankImage)
  const [iEditId, setIEditId] = useState(null)
  const [iLoading, setILoading] = useState(false)

  // Album state
  const [aModal, setAModal] = useState(null)
  const [aForm, setAForm] = useState(blankAlbum)
  const [aEditId, setAEditId] = useState(null)
  const [aLoading, setALoading] = useState(false)

  // Preview state
  const [previewImages, setPreviewImages] = useState(null)
  const [previewIndex, setPreviewIndex] = useState(0)

  const imageColumns = [
    { key: 'title', label: 'Title' },
    { key: 'category', label: 'Category' },
    {
      key: 'imageUrl', label: 'Image', render: (v) => v
        ? <img src={v} alt="" style={thumbStyle} onClick={() => { setPreviewImages([v]); setPreviewIndex(0) }} />
        : '—'
    },
    { key: 'createdAt', label: 'Added', render: (v) => new Date(v).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) },
  ]

  const albumColumns = [
    { key: 'title', label: 'Title' },
    { key: 'category', label: 'Category' },
    {
      key: 'images', label: 'Images', render: (v, row) => {
        if (!v?.length) return '—'
        const urls = v.map((img) => img.imageUrl)
        return (
          <span
            style={{ cursor: 'pointer', color: 'var(--color-navy)', textDecoration: 'underline', fontWeight: 600 }}
            onClick={() => { setPreviewImages(urls); setPreviewIndex(0) }}
          >
            {v.length} photo(s)
          </span>
        )
      }
    },
    { key: 'createdAt', label: 'Added', render: (v) => new Date(v).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) },
  ]

  const filteredImages = useMemo(() => {
    if (imageCategory === 'All') return items
    return items.filter((img) => img.category === imageCategory)
  }, [items, imageCategory])

  const filteredAlbums = useMemo(() => {
    if (albumCategory === 'All') return albums
    return albums.filter((a) => a.category === albumCategory)
  }, [albums, albumCategory])

  async function saveImage() {
    setILoading(true)
    const data = { ...iForm }
    if (iModal === 'add') await createGalleryImage(data)
    else await updateGalleryImage(iEditId, data)
    setILoading(false)
    setIModal(null)
    toast(iModal === 'add' ? 'Image added' : 'Image updated')
    router.refresh()
  }

  function delImage(id) {
    setConfirmState({ id, type: 'image', message: 'Are you sure you want to delete this gallery image?' })
  }

  async function saveAlbum() {
    if (aForm.images.length < 2) {
      toast('Albums must have at least 2 images', 'error')
      return
    }
    setALoading(true)
    const data = { ...aForm }
    if (aModal === 'add') await createGalleryAlbum(data)
    else await updateGalleryAlbum(aEditId, data)
    setALoading(false)
    setAModal(null)
    toast(aModal === 'add' ? 'Album added' : 'Album updated')
    router.refresh()
  }

  function delAlbum(id) {
    setConfirmState({ id, type: 'album', message: 'Are you sure you want to delete this album and all its images?' })
  }

  async function confirmDelete() {
    if (!confirmState) return
    const { id, type } = confirmState
    setConfirmState(null)
    if (type === 'image') await deleteGalleryImage(id)
    else await deleteGalleryAlbum(id)
    toast(type === 'image' ? 'Image deleted' : 'Album deleted')
    router.refresh()
  }

  const filterStyle = {
    display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '0',
  }
  const selectStyle = {
    padding: '6px 12px', border: '1px solid var(--color-border)',
    fontFamily: 'var(--font-body)', fontSize: 'var(--text-sm)',
    color: 'var(--color-navy)', background: 'var(--color-white)',
  }
  const tabBase = {
    padding: '10px 28px', fontFamily: 'var(--font-body)', fontSize: 'var(--text-sm)',
    fontWeight: 600, cursor: 'pointer', border: '1px solid var(--color-gold)',
    textTransform: 'uppercase', letterSpacing: '0.04em', transition: 'all 0.2s',
  }
  const tabActive = { ...tabBase, background: 'var(--color-navy)', color: 'var(--color-gold)' }
  const tabInactive = { ...tabBase, background: 'var(--color-white)', color: 'var(--color-navy)' }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {/* Toggle */}
      <div>
        <div style={{ display: 'flex', gap: 0 }}>
          <button style={tab === 'uploads' ? tabActive : tabInactive} onClick={() => setTab('uploads')}>
            Uploads ({items.length})
          </button>
          <button style={{ ...(tab === 'albums' ? tabActive : tabInactive), borderLeft: 'none' }} onClick={() => setTab('albums')}>
            Albums ({albums.length})
          </button>
        </div>
        <p style={{
          margin: '10px 0 0', fontFamily: 'var(--font-body)', fontSize: 'var(--text-xs)',
          color: 'var(--color-text-light)', lineHeight: 1.5,
        }}>
          <strong>Uploads</strong> are single images that can be added quickly without a title.{' '}
          <strong>Albums</strong> group multiple images (min. 2) under a common title — ideal for events, exhibitions, or functions.
        </p>
      </div>

      {tab === 'uploads' && (
        <div>
          <div style={{ ...filterStyle, marginBottom: '12px' }}>
            <label style={{ fontSize: 'var(--text-sm)', fontWeight: 600, color: 'var(--color-navy)' }}>Filter:</label>
            <select style={selectStyle} value={imageCategory} onChange={(e) => setImageCategory(e.target.value)}>
              <option value="All">All Categories</option>
              {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <DataTable
            title="Gallery Images"
            columns={imageColumns}
            rows={filteredImages}
            onAdd={() => { setIForm(blankImage); setIEditId(null); setIModal('add') }}
            onEdit={(row) => { setIForm({ title: row.title, category: row.category, imageUrl: row.imageUrl || '' }); setIEditId(row.id); setIModal('edit') }}
            onDelete={delImage}
          />
        </div>
      )}

      {tab === 'albums' && (
        <div>
          <div style={{ ...filterStyle, marginBottom: '12px' }}>
            <label style={{ fontSize: 'var(--text-sm)', fontWeight: 600, color: 'var(--color-navy)' }}>Filter:</label>
            <select style={selectStyle} value={albumCategory} onChange={(e) => setAlbumCategory(e.target.value)}>
              <option value="All">All Categories</option>
              {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <DataTable
            title="Gallery Albums"
            columns={albumColumns}
            rows={filteredAlbums}
            onAdd={() => { setAForm(blankAlbum); setAEditId(null); setAModal('add') }}
            onEdit={(row) => { setAForm({ title: row.title, category: row.category, images: row.images?.map((img) => img.imageUrl) || [] }); setAEditId(row.id); setAModal('edit') }}
            onDelete={delAlbum}
          />
        </div>
      )}

      {/* Image Preview Modal */}
      {previewImages && (
        <div
          style={{
            position: 'fixed', inset: 0, zIndex: 9999,
            background: 'rgba(0,0,0,0.85)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}
          onClick={() => setPreviewImages(null)}
        >
          <button
            onClick={(e) => { e.stopPropagation(); setPreviewImages(null) }}
            style={{
              position: 'absolute', top: 16, right: 16,
              background: 'none', border: 'none', color: '#fff',
              fontSize: '1.75rem', cursor: 'pointer', zIndex: 10,
            }}
          >
            <FiX />
          </button>

          {previewImages.length > 1 && (
            <>
              <button
                onClick={(e) => { e.stopPropagation(); setPreviewIndex((previewIndex - 1 + previewImages.length) % previewImages.length) }}
                style={{
                  position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)',
                  background: 'rgba(255,255,255,0.15)', border: 'none', color: '#fff',
                  fontSize: '1.5rem', padding: '8px 12px', cursor: 'pointer', zIndex: 10,
                }}
              >
                <FiChevronLeft />
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); setPreviewIndex((previewIndex + 1) % previewImages.length) }}
                style={{
                  position: 'absolute', right: 16, top: '50%', transform: 'translateY(-50%)',
                  background: 'rgba(255,255,255,0.15)', border: 'none', color: '#fff',
                  fontSize: '1.5rem', padding: '8px 12px', cursor: 'pointer', zIndex: 10,
                }}
              >
                <FiChevronRight />
              </button>
            </>
          )}

          <div onClick={(e) => e.stopPropagation()} style={{ maxWidth: '90vw', maxHeight: '85vh', position: 'relative' }}>
            <img
              src={previewImages[previewIndex]}
              alt="Preview"
              style={{ maxWidth: '90vw', maxHeight: '85vh', objectFit: 'contain', display: 'block' }}
            />
            {previewImages.length > 1 && (
              <div style={{
                textAlign: 'center', color: '#fff', marginTop: 8,
                fontFamily: 'var(--font-body)', fontSize: 'var(--text-sm)',
              }}>
                {previewIndex + 1} / {previewImages.length}
              </div>
            )}
          </div>
        </div>
      )}

      {iModal && (
        <FormModal title={iModal === 'add' ? 'Add Image' : 'Edit Image'} onClose={() => setIModal(null)} onSubmit={saveImage} loading={iLoading}>
          <FormField label="Title">
            <input className={fs.input} value={iForm.title} onChange={(e) => setIForm({ ...iForm, title: e.target.value })} required maxLength={200} />
          </FormField>
          <FormField label="Category">
            <select className={fs.select} value={iForm.category} onChange={(e) => setIForm({ ...iForm, category: e.target.value })}>
              {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </FormField>
          <FormField label="Image">
            <FileUpload value={iForm.imageUrl} onChange={(url) => setIForm({ ...iForm, imageUrl: url })} accept=".jpg,.jpeg,.png,.webp" folder="images" />
          </FormField>
        </FormModal>
      )}

      {aModal && (
        <FormModal title={aModal === 'add' ? 'Add Album' : 'Edit Album'} onClose={() => setAModal(null)} onSubmit={saveAlbum} loading={aLoading}>
          <FormField label="Album Title">
            <input className={fs.input} value={aForm.title} onChange={(e) => setAForm({ ...aForm, title: e.target.value })} required maxLength={200} />
          </FormField>
          <FormField label="Category">
            <select className={fs.select} value={aForm.category} onChange={(e) => setAForm({ ...aForm, category: e.target.value })}>
              {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </FormField>
          <div className={fs.fullWidth}>
            <FormField label="Images (up to 50)">
              <MultiFileUpload value={aForm.images} onChange={(urls) => setAForm({ ...aForm, images: urls })} accept=".jpg,.jpeg,.png,.webp" folder="images" maxFiles={50} />
            </FormField>
          </div>
        </FormModal>
      )}
      {confirmState && <ConfirmModal message={confirmState.message} onConfirm={confirmDelete} onCancel={() => setConfirmState(null)} />}
    </div>
  )
}
