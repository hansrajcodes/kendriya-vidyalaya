import PageHero from '@/components/pagehero/pagehero'
import styles from './contact.module.css'

const contactDetails = [
  { icon: '📍', label: 'Address', value: 'Kendriya Vidyalaya,\nMoga, Punjab — 142001' },
  { icon: '📞', label: 'Phone', value: '0163-6237724, 9814207229' },
  { icon: '✉️', label: 'Email', value: 'drkpsmoga@gmail.com' },
  { icon: '🕐', label: 'Office Hours', value: 'Monday – Saturday: 8:00 AM – 3:00 PM' },
]

export const metadata = {
  title: 'Contact Us | Kendriya Vidyalaya, Moga',
  description:
    'Get in touch with Kendriya Vidyalaya, Moga. Find our address, phone number, email, office hours, and send us an enquiry.',
}

export default function ContactPage() {
  return (
    <main>
      <PageHero
        title="Contact Us"
        breadcrumbs={[{ label: 'Contact Us' }]}
      />

      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.grid}>
            {/* Contact Info */}
            <div className={styles.infoCol}>
              <span className={styles.label}>Get in Touch</span>
              <h2 className={styles.heading}>We&apos;d Love to Hear From You</h2>
              <p className={styles.text}>
                Have questions about admissions, academics, or anything else? Reach out to us
                using the details below, or fill in the enquiry form and we will get back to
                you within 24 hours.
              </p>

              <div className={styles.detailsList}>
                {contactDetails.map((d, i) => (
                  <div key={i} className={styles.detailItem}>
                    <span className={styles.detailIcon} aria-hidden="true">{d.icon}</span>
                    <div>
                      <p className={styles.detailLabel}>{d.label}</p>
                      <p className={styles.detailValue}>{d.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Enquiry Form */}
            <div className={styles.formCol}>
              <div className={styles.formCard}>
                <h3 className={styles.formTitle}>Send an Enquiry</h3>
                <form className={styles.form}>
                  <div className={styles.fieldGroup}>
                    <label className={styles.fieldLabel} htmlFor="name">Full Name</label>
                    <input className={styles.input} type="text" id="name" name="name" required placeholder="Your full name" maxLength={100} minLength={2} pattern="[A-Za-z\s.\-']+" title="Letters, spaces, dots, hyphens only" />
                  </div>
                  <div className={styles.fieldGroup}>
                    <label className={styles.fieldLabel} htmlFor="phone">Phone Number</label>
                    <input className={styles.input} type="tel" id="phone" name="phone" required placeholder="+91 XXXXXXXXXX" maxLength={15} minLength={10} pattern="[\d\s\+\-]+" title="Valid phone number" />
                  </div>
                  <div className={styles.fieldGroup}>
                    <label className={styles.fieldLabel} htmlFor="email">Email Address</label>
                    <input className={styles.input} type="email" id="email" name="email" placeholder="your@email.com" maxLength={100} />
                  </div>
                  <div className={styles.fieldGroup}>
                    <label className={styles.fieldLabel} htmlFor="classFor">Enquiry for Class</label>
                    <select className={styles.select} id="classFor" name="classFor">
                      <option value="">Select class</option>
                      <option value="nursery">Nursery</option>
                      <option value="lkg">LKG</option>
                      <option value="ukg">UKG</option>
                      <option value="1-5">Class I – V</option>
                      <option value="6-8">Class VI – VIII</option>
                      <option value="9-10">Class IX – X</option>
                      <option value="11-12-science">Class XI – XII (Science)</option>
                      <option value="11-12-commerce">Class XI – XII (Commerce)</option>
                      <option value="11-12-arts">Class XI – XII (Arts)</option>
                    </select>
                  </div>
                  <div className={styles.fieldGroup}>
                    <label className={styles.fieldLabel} htmlFor="message">Message</label>
                    <textarea className={styles.textarea} id="message" name="message" rows="4" placeholder="Your message or question..." maxLength={1000} />
                  </div>
                  <button type="submit" className={styles.submitBtn}>
                    Send Enquiry
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className={styles.mapSection}>
        <div className={styles.container}>
          <div className={styles.mapGrid}>
            <iframe
              className={styles.map}
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3426.322728649036!2d75.15797007558386!3d30.821621974541593!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391a08849e7cfc91%3A0x96eab1699cd4a9b7!2sKendriya%20Vidyalaya!5e0!3m2!1sen!2sin!4v1772646746142!5m2!1sen!2sin"
              width="600"
              height="450"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Kendriya Vidyalaya on Google Maps"
            />
            <div className={styles.mapInfo}>
              <span className={styles.label}>Find Us</span>
              <h2 className={styles.heading}>Visit Our Campus</h2>
              <p className={styles.text}>
                We are located in the heart of Moga, Punjab. Our campus is easily accessible
                and we welcome parents and students to visit us during office hours.
              </p>
              <div className={styles.detailItem}>
                <span className={styles.detailIcon} aria-hidden="true">📍</span>
                <div>
                  <p className={styles.detailLabel}>Address</p>
                  <p className={styles.detailValue}>Kendriya Vidyalaya,{'\n'}Moga, Punjab — 142001</p>
                </div>
              </div>
              <div className={styles.detailItem} style={{ marginTop: 20 }}>
                <span className={styles.detailIcon} aria-hidden="true">🕐</span>
                <div>
                  <p className={styles.detailLabel}>Office Hours</p>
                  <p className={styles.detailValue}>Monday – Saturday: 8:00 AM – 3:00 PM</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
