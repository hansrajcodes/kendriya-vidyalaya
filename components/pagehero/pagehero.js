import Link from 'next/link'
import styles from './pagehero.module.css'

export default function PageHero({ title, breadcrumbs = [] }) {
  return (
    <section className={styles.hero}>
      <div className={styles.container}>
        <nav className={styles.breadcrumb} aria-label="Breadcrumb">
          <ol className={styles.crumbList}>
            <li className={styles.crumbItem}>
              <Link href="/" className={styles.crumbLink}>Home</Link>
            </li>
            {breadcrumbs.map((crumb, i) => (
              <li key={i} className={styles.crumbItem}>
                <span className={styles.crumbSep} aria-hidden="true">/</span>
                {crumb.href ? (
                  <Link href={crumb.href} className={styles.crumbLink}>{crumb.label}</Link>
                ) : (
                  <span className={styles.crumbCurrent} aria-current="page">{crumb.label}</span>
                )}
              </li>
            ))}
          </ol>
        </nav>
        <h1 className={styles.title}>{title}</h1>
        <span className={styles.decoLine} aria-hidden="true" />
      </div>
    </section>
  )
}
