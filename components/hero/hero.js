import Link from 'next/link';
import Image from 'next/image';
import styles from './hero.module.css';


export default function Hero() {
  return (
    <section className={styles.hero} aria-label="Kendriya Vidyalaya — Best School in Moga, Punjab">
      {/* Background Decor - Subtle gradient blobs */}
      <div className={styles.bgDecor} aria-hidden="true">
        <div className={styles.blob1} />
        <div className={styles.blob2} />
      </div>

      {/* SEO H1 — visually hidden, keyword-rich for search ranking */}
      <h1 className={styles.seoTitle}>
        Kendriya Vidyalaya — Best CBSE School in Moga, Punjab | Admissions Open for Pre-Primary to Class XII
      </h1>

      <div className={styles.container}>
        {/* Left Content Column */}
        <div className={styles.textCol}>
          {/* Pill Badge */}
          <div className={styles.pill}>
            <span className={styles.pillDot} aria-hidden="true" />
            CBSE Affiliated &middot; Admissions Open 2026-27
          </div>

          {/* Headline */}
          <h2 className={styles.headline}>
            Where Future{' '}
            <span className={styles.headlineAccent}>Leaders Grow</span>
          </h2>

          {/* Subtext */}
          <p className={styles.subtext}>
            Empowering students with a world-class CBSE curriculum, holistic sports
            facilities, and a safe environment to explore their true potential —
            from Pre-Primary to Class XII in Moga, Punjab.
          </p>

          {/* CTA Buttons */}
          <div className={styles.buttons}>
            <Link href="/admission" className={styles.primaryBtn}
              aria-label="Apply for admissions at Kendriya Vidyalaya, Moga">
              Apply Now
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
            </Link>
            <a href="/pdf/download-prospectus-2025.pdf" download className={styles.secondaryBtn}
              aria-label="Download school prospectus">
              Download Prospectus
            </a>
          </div>

          {/* Trust Indicators */}
          <div className={styles.trust}>
            <div className={styles.trustItem}>
              <svg className={styles.trustIcon} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
              CBSE Affiliated
            </div>
            <div className={styles.trustItem}>
              <svg className={styles.trustIcon} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
              Since 1989
            </div>
          </div>
        </div>

        {/* Right Image Column */}
        <div className={styles.imageCol}>
          <div className={styles.imageWrapper}>
            <Image
              src="/images/herobg.webp"
              alt="Kendriya Vidyalaya campus — best CBSE school in Moga, Punjab"
              fill
              sizes="(max-width: 768px) 380px, (max-width: 1024px) 480px, 50vw"
              className={styles.heroImage}
              priority
              fetchPriority="high"
              quality={60}
            />
          </div>

          {/* Floating Glassmorphism Card – Board Results */}
          <div className={`${styles.floatingCard} ${styles.cardBottomRight}`}>
            <div className={styles.floatingCardContent}>
              <div>
                <p className={styles.floatingLabel}>CBSE Board Results</p>
                <p className={styles.floatingStat}>100% Pass Rate</p>
              </div>
              <div className={styles.floatingIcon} aria-hidden="true">
                <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
            </div>
          </div>

          {/* Decorative dots grid */}
          <div className={styles.dotsGrid} aria-hidden="true">
            <svg width="100" height="100" fill="currentColor" viewBox="0 0 100 100">
              <pattern id="hero-dots" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                <circle cx="2" cy="2" r="2" />
              </pattern>
              <rect width="100" height="100" fill="url(#hero-dots)" />
            </svg>
          </div>
        </div>
      </div>

      {/* Hidden SEO content for crawlers — keyword-rich */}
      <span className="sr-only">
        Kendriya Vidyalaya is the best CBSE affiliated
        school in Moga, Punjab, established in 1989. We offer quality education from Pre-Primary
        (Nursery, LKG, UKG) to Class XII with Science, Commerce, and Arts streams. Our school features
        smart classrooms, science laboratories, a computer lab, library, sports facilities, and a safe
        campus. Admissions open for the academic year 2026–2027. Kendriya Vidyalaya Moga — top-rated
        CBSE school in Moga with experienced faculty, modern infrastructure, and 100% board pass rate.
        Best school in Moga, top school in Moga, CBSE school Moga, Kendriya Vidyalaya Moga admissions.
      </span>
    </section>
  );
}
