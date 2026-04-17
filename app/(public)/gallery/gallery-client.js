'use client'

import { useState, useMemo, useEffect, useCallback } from 'react'
import Image from 'next/image'
import { FiGrid, FiArrowLeft } from 'react-icons/fi'
import FilterBar, { FilterSelect } from '@/components/filter-bar/filter-bar'
import Lightbox from '@/components/lightbox/lightbox'
import styles from './gallery.module.css'

export default function GalleryClient({ images, albums = [], categories }) {
  const [categoryFilter, setCategoryFilter] = useState('All')
  const [sortOrder, setSortOrder] = useState('newest')
  const [lightboxIndex, setLightboxIndex] = useState(null)
  const [activeAlbum, setActiveAlbum] = useState(null)

  const openAlbum = useCallback((album) => {
    setActiveAlbum(album)
    setLightboxIndex(null)
    window.history.pushState({ album: true }, '')
  }, [])

  const closeAlbum = useCallback(() => {
    setActiveAlbum(null)
    setLightboxIndex(null)
  }, [])

  useEffect(() => {
    function handlePopState(e) {
      if (activeAlbum) {
        e.preventDefault()
        setActiveAlbum(null)
        setLightboxIndex(null)
      }
    }
    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [activeAlbum])

  // Merge images and albums into a single sorted list
  const gridItems = useMemo(() => {
    let imgs = categoryFilter === 'All' ? images : images.filter((img) => img.category === categoryFilter)
    let albs = categoryFilter === 'All' ? albums : albums.filter((a) => a.category === categoryFilter)

    const merged = [
      ...imgs.map((img, i) => ({ type: 'image', data: img, originalIndex: i, createdAt: img.createdAt || '' })),
      ...albs.map((album) => ({ type: 'album', data: album, createdAt: album.createdAt || '' })),
    ]

    merged.sort((a, b) => {
      if (!a.createdAt || !b.createdAt) return 0
      return sortOrder === 'newest'
        ? new Date(b.createdAt) - new Date(a.createdAt)
        : new Date(a.createdAt) - new Date(b.createdAt)
    })

    return merged
  }, [images, albums, categoryFilter, sortOrder])

  // For lightbox: merge all images (standalone + album images) in grid order
  const allImages = useMemo(() => {
    const result = []
    for (const item of gridItems) {
      if (item.type === 'image') {
        result.push(item.data)
      } else if (item.type === 'album' && item.data.images) {
        result.push(...item.data.images)
      }
    }
    return result
  }, [gridItems])

  const lightboxImages = activeAlbum ? activeAlbum.images : allImages

  function handleImageClick(item) {
    const idx = allImages.indexOf(item.data)
    setLightboxIndex(idx)
  }

  return (
    <>
      {!activeAlbum && (
        <FilterBar>
          {categories.length > 0 && (
            <FilterSelect
              label="Category"
              value={categoryFilter}
              onChange={setCategoryFilter}
              options={[
                { value: 'All', label: 'All Categories' },
                ...categories.map((c) => ({ value: c, label: c })),
              ]}
            />
          )}
          <FilterSelect
            label="Sort"
            value={sortOrder}
            onChange={setSortOrder}
            options={[
              { value: 'newest', label: 'Newest First' },
              { value: 'oldest', label: 'Oldest First' },
            ]}
          />
        </FilterBar>
      )}

      {activeAlbum ? (
        <>
          <div className={styles.albumHeader}>
            <button className={styles.backBtn} onClick={() => window.history.back()}>
              <FiArrowLeft /> Back to Gallery
            </button>
            <h3 className={styles.albumTitle}>{activeAlbum.title}</h3>
            <p className={styles.albumMeta}>{activeAlbum.imageCount} photos</p>
          </div>

          <div className={styles.grid}>
            {activeAlbum.images.map((img, i) => (
              <figure key={i} className={styles.figure} onClick={() => setLightboxIndex(i)} style={{ cursor: 'pointer' }}>
                <div className={styles.imageWrapper}>
                  <Image src={img.src} alt={img.alt} fill style={{ objectFit: 'cover' }} sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" />
                  <div className={styles.overlay}>
                    <p className={styles.caption}>{img.caption}</p>
                  </div>
                </div>
              </figure>
            ))}
          </div>
        </>
      ) : (
        <div className={styles.grid}>
          {gridItems.map((item, i) => {
            if (item.type === 'image') {
              const img = item.data
              return (
                <figure key={`img-${i}`} className={styles.figure} onClick={() => handleImageClick(item)} style={{ cursor: 'pointer' }}>
                  <div className={styles.imageWrapper}>
                    <Image src={img.src} alt={img.alt} fill style={{ objectFit: 'cover' }} sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" />
                    <div className={styles.overlay}>
                      <p className={styles.caption}>{img.caption}</p>
                    </div>
                  </div>
                </figure>
              )
            }
            const album = item.data
            return (
              <figure key={`album-${album.id}`} className={styles.figure} onClick={() => openAlbum(album)} style={{ cursor: 'pointer' }}>
                <div className={styles.imageWrapper}>
                  <Image src={album.coverSrc} alt={album.title} fill style={{ objectFit: 'cover' }} sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" />
                  <div className={styles.albumOverlay}>
                    <div className={styles.albumBadge}>
                      <FiGrid />
                      <span>{album.imageCount} photos</span>
                    </div>
                    <p className={styles.caption}>{album.title}</p>
                  </div>
                </div>
              </figure>
            )
          })}
        </div>
      )}

      {lightboxIndex !== null && (
        <Lightbox
          images={lightboxImages}
          currentIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onPrev={() => setLightboxIndex((lightboxIndex - 1 + lightboxImages.length) % lightboxImages.length)}
          onNext={() => setLightboxIndex((lightboxIndex + 1) % lightboxImages.length)}
        />
      )}
    </>
  )
}
