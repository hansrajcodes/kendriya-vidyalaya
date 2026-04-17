import Image from 'next/image'
import Link  from 'next/link'
import styles from './about.module.css'

export default function About() {
  return (
    <section className={styles.section} aria-labelledby="about-heading">
      <div className={styles.container}>

        <div className={styles.imageCol}>
          <div className={styles.imageFrame}>
            <Image
              src="/images/slider-1.webp"
              alt="Kendriya Vidyalaya school building in Moga"
              width={580} height={460} loading="lazy"
              style={{ objectFit: 'cover', width: '100%', height: '100%' }}
            />
          </div>
        </div>

        <div className={styles.textCol}>
          {/* Decorative double rule above label */}
          <span className={styles.decoDoubleRule} aria-hidden="true" />

          <span className={styles.label}>About Us</span>

          <h2 id="about-heading" className={styles.heading}>
            About Kendriya Vidyalaya
          </h2>

          <span className="sr-only">
            Kendriya Vidyalaya is a CBSE affiliated school in Moga, Punjab, established in 1989,
            committed to academic excellence and holistic development of every student.
          </span>

          <p className={styles.text}>
            Established in 1989, Kendriya Vidyalaya is a CBSE affiliated institution in Moga,
            Punjab, built on a foundation of academic excellence, strong values, and a
            commitment to the all-round development of every student. Over the years, we have
            grown into one of the most trusted schools in Moga, serving thousands of families
            with quality education from Pre-Primary through Senior Secondary.
          </p>

          <Link href="/about" className={styles.link}
            aria-label="Know more about Kendriya Vidyalaya's history and vision">
            Know More <span aria-hidden="true">→</span>
          </Link>
        </div>

      </div>
    </section>
  )
}
