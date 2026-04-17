'use client'

import { useState } from 'react'
import Image from 'next/image'
import styles from './faculty.module.css'

export default function FacultyList({ faculty }) {
  const [query, setQuery] = useState('')

  const filtered = faculty.filter((f) =>
    f.name.toLowerCase().includes(query.toLowerCase())
  )

  return (
    <>
      <div className={styles.searchBar}>
        <div className={styles.searchWrap}>
          <svg className={styles.searchIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            type="text"
            className={styles.searchInput}
            placeholder="Search faculty by name..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label="Search faculty by name"
          />
        </div>
      </div>

      <div className={styles.grid}>
        {filtered.length > 0 ? (
          filtered.map((f) => (
            <article key={f.id} className={styles.card}>
              <div className={styles.cardImage}>
                {f.imageUrl ? (
                  <Image
                    src={f.imageUrl}
                    alt={f.name}
                    width={400}
                    height={533}
                    style={{ objectFit: 'cover', width: '100%', height: '100%' }}
                  />
                ) : (
                  <div className={styles.cardImagePlaceholder}>
                    <span className={styles.avatarInitial}>{f.name.charAt(0)}</span>
                  </div>
                )}
              </div>
              <div className={styles.cardBody}>
                <h3 className={styles.cardName}>{f.name}</h3>
                <p className={styles.cardRole}>{f.role} — {f.subject}</p>
                <p className={styles.cardQual}>{f.qualification}</p>
              </div>
            </article>
          ))
        ) : (
          <p className={styles.noResults}>No faculty members found.</p>
        )}
      </div>
    </>
  )
}
