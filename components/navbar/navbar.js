'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import styles from './navbar.module.css'

const navLinks = [
  { label: 'Home', href: '/' },
  {
    label: 'About Us',
    href: '/about',
    children: [
      { label: 'About School', href: '/about' },
      { label: 'Faculty', href: '/faculty' },
      { label: 'Infrastructure', href: '/infrastructure' },
    ],
  },
  {
    label: 'Academics',
    href: '/academics',
    children: [
      { label: 'Overview', href: '/academics' },
      { label: 'Fee Structure', href: '/academics/fee-structure' },
      { label: 'Academic Calendar', href: '/academics/calendar' },
      { label: 'Circulars & Notices', href: '/academics/circulars' },
      { label: 'Holidays Homework', href: '/academics/homework' },
      { label: 'Book List', href: '/academics/book-list' },
      { label: 'Careers', href: '/academics/careers' },
    ],
  },
  { label: 'Admission', href: '/admission' },
  {
    label: 'Campus Life',
    href: '/gallery',
    children: [
      { label: 'Gallery', href: '/gallery' },
      { label: 'Examination', href: '/examination' },
      { label: 'General Information', href: '/general-info' },
    ],
  },
  { label: 'Contact Us', href: '/contact' },
]

export default function Navbar() {
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [openDropdown, setOpenDropdown] = useState(null)
  const [mounted, setMounted] = useState(false)
  const darkHero = mounted && pathname !== '/'

  useEffect(() => {
    setMounted(true)
    const onScroll = () => setScrolled(window.scrollY > 20)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const toggleMobileDropdown = (label) => {
    setOpenDropdown(openDropdown === label ? null : label)
  }

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ''} ${darkHero ? styles.darkHero : ''}`}>
      <nav className={styles.nav} aria-label="Main navigation">
        <Link href="/" className={styles.logo} aria-label="Kendriya Vidyalaya — Home">
          <span className={styles.logoText}>Kendriya Vidyalaya</span>
        </Link>

        {/* Desktop Links */}
        <ul className={styles.links}>
          {navLinks.map((link) => (
            <li
              key={link.label}
              className={`${styles.linkItem} ${link.children ? styles.hasDropdown : ''}`}
            >
              {link.children ? (
                <button type="button" className={styles.link}>
                  {link.label}
                  <span className={styles.dropdownArrow} aria-hidden="true">▾</span>
                </button>
              ) : (
                <Link href={link.href} className={styles.link}>
                  {link.label}
                </Link>
              )}
              {link.children && (
                <ul className={styles.dropdown}>
                  {link.children.map((child) => (
                    <li key={child.href}>
                      <Link href={child.href} className={styles.dropdownLink}>
                        {child.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>

        {/* CTA Button */}
        <Link href="/admission" className={styles.cta}>
          Admissions
        </Link>

        {/* Mobile Hamburger */}
        <button
          className={`${styles.hamburger} ${menuOpen ? styles.hamburgerOpen : ''}`}
          onClick={() => { setMenuOpen(!menuOpen); setOpenDropdown(null) }}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
        >
          <span className={styles.bar} aria-hidden="true" />
          <span className={styles.bar} aria-hidden="true" />
          <span className={styles.bar} aria-hidden="true" />
        </button>
      </nav>

      {/* Mobile Menu */}
      <div
        id="mobile-menu"
        className={`${styles.mobileMenu} ${menuOpen ? styles.mobileMenuOpen : ''}`}
      >
        <div className={styles.mobileMenuInner}>
        <ul className={styles.mobileLinks}>
          {navLinks.map((link) => (
            <li key={link.label} className={styles.mobileItem}>
              {link.children ? (
                <>
                  <button
                    className={styles.mobileDropdownBtn}
                    onClick={() => toggleMobileDropdown(link.label)}
                    aria-expanded={openDropdown === link.label}
                  >
                    {link.label}
                    <span
                      className={`${styles.mobileArrow} ${openDropdown === link.label ? styles.mobileArrowOpen : ''}`}
                      aria-hidden="true"
                    >
                      ▾
                    </span>
                  </button>
                  <ul
                    className={`${styles.mobileDropdown} ${openDropdown === link.label ? styles.mobileDropdownOpen : ''}`}
                  >
                    {link.children.map((child) => (
                      <li key={child.href}>
                        <Link
                          href={child.href}
                          className={styles.mobileSubLink}
                          onClick={() => setMenuOpen(false)}
                        >
                          {child.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </>
              ) : (
                <Link
                  href={link.href}
                  className={styles.mobileLink}
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </Link>
              )}
            </li>
          ))}
          <li>
            <Link
              href="/admission"
              className={styles.mobileCta}
              onClick={() => setMenuOpen(false)}
            >
              Admissions
            </Link>
          </li>
        </ul>
        </div>
      </div>
    </header>
  )
}
