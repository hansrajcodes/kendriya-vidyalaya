'use client'

import { useState } from 'react'
import styles from './faq.module.css'


const faqs = [
  { q: 'How do I apply for admission at Kendriya Vidyalaya, Moga?',    a: 'Admission involves submitting an online application form, followed by a student interaction session and document verification. Please visit our Admissions page or contact the school office to begin.' },
  { q: 'Which board does Kendriya Vidyalaya follow?',                     a: 'Kendriya Vidyalaya is affiliated with the Central Board of Secondary Education (CBSE), New Delhi — one of India\'s most recognized and respected educational boards.' },
  { q: 'What classes does Kendriya Vidyalaya offer?',                     a: 'We offer classes from Nursery (Pre-Primary) through Class XII, covering Pre-Primary, Primary (I–V), Middle (VI–VIII), Secondary (IX–X), and Senior Secondary (XI–XII) with Science, Commerce, and Arts streams.' },
  { q: 'Does Kendriya Vidyalaya provide transport facilities?',           a: 'Yes, Kendriya Vidyalaya operates GPS-enabled school buses covering all major areas of Moga. All buses have trained drivers and attendants, and real-time tracking is available to parents.' },
  { q: 'Is Kendriya Vidyalaya among the best schools in Moga?',        a: 'Kendriya Vidyalaya is consistently recognized as one of the top CBSE schools in Moga, known for academic excellence, modern infrastructure, and holistic student development since 1989.' },
]

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null)
  const toggle = (i) => setOpenIndex(openIndex === i ? null : i)

  return (
    <section className={styles.section} aria-labelledby="faq-heading">
      <div className={styles.container}>

        <div className={styles.sectionTop}>
          {/* Decorative large faint ? */}
          <span className={styles.decoMark} aria-hidden="true">?</span>
          <span className={styles.label}>Common Questions</span>
          <h2 id="faq-heading" className={styles.heading}>
            Frequently Asked Questions
          </h2>
        </div>

        <span className="sr-only">
          Common questions about admissions, curriculum, and facilities
          at Kendriya Vidyalaya in Moga.
        </span>

        <div className={styles.listWrapper}>
          {/* Decorative right-side vertical rule */}
          <span className={styles.decoSideRule} aria-hidden="true" />

          <dl className={styles.list}>
            {faqs.map((faq, i) => (
              <div key={i} className={styles.item}
                itemScope itemProp="mainEntity"
                itemType="https://schema.org/Question">
                <dt>
                  <h3 className={styles.question} itemProp="name">
                    <button
                      onClick={() => toggle(i)}
                      aria-expanded={openIndex === i}
                      aria-controls={`faq-answer-${i}`}
                      className={styles.questionBtn}
                    >
                      {/* Decorative small filled square */}
                      <span className={styles.decoSquare} aria-hidden="true" />
                      <span className={styles.questionText}>{faq.q}</span>
                      <span className={`${styles.icon} ${openIndex === i ? styles.iconOpen : ''}`}
                        aria-hidden="true">+</span>
                    </button>
                  </h3>
                </dt>
                <dd id={`faq-answer-${i}`}
                  className={`${styles.answer} ${openIndex === i ? styles.answerOpen : ''}`}
                  itemScope itemProp="acceptedAnswer"
                  itemType="https://schema.org/Answer">
                  <div className={styles.answerInner}>
                    <p itemProp="text" className={styles.answerText}>{faq.a}</p>
                  </div>
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <script type="application/ld+json" dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: faqs.map(f => ({
              '@type': 'Question',
              name: f.q,
              acceptedAnswer: { '@type': 'Answer', text: f.a },
            })),
          })
        }} />
      </div>
    </section>
  )
}
