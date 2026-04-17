import Link from 'next/link'
import styles from './footer.module.css'

const socialLinks = [
  { icon: '/svg/fb.svg', href: 'https://www.facebook.com/12kps/', label: 'Facebook' },
  { icon: '/svg/insta.svg', href: 'https://www.instagram.com/drkpsmoga/', label: 'Instagram' },
  { icon: '/svg/youtube.svg', href: 'https://www.youtube.com/@Dr.kpsmoga', label: 'YouTube' },
  { icon: '/svg/x.svg', href: 'https://x.com/Drkpsmoga', label: 'X' },
]

const quickLinks = [
  { label: 'About Us', href: '/about' },
  { label: 'Academics', href: '/academics' },
  { label: 'Infrastructure', href: '/infrastructure' },
  { label: 'Admission', href: '/admission' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'Contact Us', href: '/contact' },
]

const academicLinks = [
  { label: 'Fee Structure', href: '/academics/fee-structure' },
  { label: 'Academic Calendar', href: '/academics/calendar' },
  { label: 'Circulars & Notices', href: '/academics/circulars' },
  { label: 'Holidays Homework', href: '/academics/homework' },
  { label: 'Examination', href: '/examination' },
  { label: 'Book List', href: '/academics/book-list' },
]

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        {/* Top decorative rule */}
        <span className={styles.decoRule} aria-hidden="true" />

        <div className={styles.grid}>
          {/* Column 1 — School Info */}
          <div className={styles.col}>
            <Link href="/" className={styles.brand}>
              <span className={styles.brandText}>Kendriya Vidyalaya</span>
            </Link>
            <address className={styles.address}>
              Moga, Punjab — 142001<br />
              Phone: 0163-6237724, 9814207229<br />
              Email: drkpsmoga@gmail.com
            </address>
            <div className={styles.socials}>
              {socialLinks.map((s) => (
                <a key={s.label} href={s.href} className={styles.socialIcon} aria-label={s.label} target="_blank" rel="noopener noreferrer">
                  <img src={s.icon} alt={s.label} width={18} height={18} className={styles.socialImg} />
                </a>
              ))}
            </div>
          </div>

          {/* Link Columns */}
          <div className={styles.linksGrid}>
            <div className={styles.col}>
              <p className={styles.colTitle}>Quick Links</p>
              <ul className={styles.linkList}>
                {quickLinks.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className={styles.footerLink}>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className={styles.col}>
              <p className={styles.colTitle}>Academics</p>
              <ul className={styles.linkList}>
                {academicLinks.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className={styles.footerLink}>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className={styles.col}>
              <p className={styles.colTitle}>Information</p>
              <ul className={styles.linkList}>
                <li><Link href="/general-info" className={styles.footerLink}>General Info</Link></li>
                <li><Link href="/faculty" className={styles.footerLink}>Faculty</Link></li>
                <li><Link href="/examination" className={styles.footerLink}>Examination</Link></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className={styles.bottom}>
          <span className={styles.decoRuleBottom} aria-hidden="true" />
          <p className={styles.copyright}>
            &copy; {new Date().getFullYear()} Kendriya Vidyalaya, Moga. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
