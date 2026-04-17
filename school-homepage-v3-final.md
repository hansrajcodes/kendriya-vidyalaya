# SCHOOL HOMEPAGE — CLAUDE CODE BUILD INSTRUCTIONS (v2)
## Next.js | CSS Modules | Mobile-First | SEO 100 | PageSpeed 100
## Zero Border Radius | Global Design Tokens | Elegant Geometric Accents

---

## DESIGN SYSTEM RULES (READ FIRST — APPLY EVERYWHERE)

1. **Zero border-radius on everything.** No rounded edges anywhere — not on buttons, cards, images, inputs, badges, or any element whatsoever. Everything is sharp and rectangular.
2. **All colors must come from CSS variables defined in globals.css.** Never hardcode a hex value in any component CSS file. Always use `var(--color-*)`.
3. **All typography must come from CSS variables.** Font family, font sizes, font weights, line heights — all defined in globals.css and referenced via `var(--text-*)` and `var(--font-*)`.
4. **Decorative elements:** Every section must have at least one elegant geometric accent — thin lines, small rectangles, diagonal rules, corner brackets, or light-colored abstract shapes. These go behind cards, beside headings, above images, or as background patterns. They must be subtle, sharp, and minimalistic. Use CSS pseudo-elements (`::before`, `::after`) or dedicated `<span aria-hidden="true">` elements. No clip-path complexity — just rectangles, lines, and thin borders.
5. **No third-party icon libraries.** Use emoji with `aria-hidden="true"` or pure CSS shapes.

---

## FOLDER STRUCTURE

```
/app
  layout.js
  page.js
  globals.css

/components
  /hero
    hero.js
    hero.module.css
  /about
    about.js
    about.module.css
  /stats
    stats.js
    stats.module.css
  /whychooseus
    whychooseus.js
    whychooseus.module.css
  /programs
    programs.js
    programs.module.css
  /facilities
    facilities.js
    facilities.module.css
  /gallery
    gallery.js
    gallery.module.css
  /testimonials
    testimonials.js
    testimonials.module.css
  /faq
    faq.js
    faq.module.css
  /admissioncta
    admissioncta.js
    admissioncta.module.css

/public/images/
  hero-bg.webp
  about-school.webp
  gallery-1.webp … gallery-8.webp
  /facilities/
    smart-classroom.webp
    science-lab.webp
    computer-lab.webp
    library.webp
    sports.webp
    auditorium.webp
```

---

## GLOBAL SETUP

### /app/globals.css
### THIS IS THE SINGLE SOURCE OF TRUTH FOR ALL DESIGN TOKENS

```css
/* ============================================================
   RESET
   ============================================================ */
*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  border-radius: 0 !important; /* GLOBAL: Zero border radius everywhere */
}

/* ============================================================
   COLOR TOKENS
   ============================================================ */
:root {
  /* Primary palette */
  --color-navy:          #0B1F3A;
  --color-navy-deep:     #071629;
  --color-navy-mid:      #162E50;
  --color-gold:          #C9A052;
  --color-gold-dark:     #A8832E;
  --color-gold-light:    #E8D5A3;

  /* Neutral palette */
  --color-white:         #FAFAF8;
  --color-off-white:     #F4F4F2;
  --color-grey-light:    #EBEBEA;
  --color-grey-mid:      #C4C2BE;
  --color-grey-text:     #5A5A5A;
  --color-grey-subtle:   #8A8885;
  --color-border:        #E0DDD8;
  --color-border-dark:   #2C3E55;

  /* Decorative / shape colors */
  --color-shape-navy:    rgba(11, 31, 58, 0.04);
  --color-shape-gold:    rgba(201, 160, 82, 0.12);
  --color-shape-line:    rgba(201, 160, 82, 0.35);
  --color-shape-white:   rgba(250, 250, 248, 0.06);
}

/* ============================================================
   TYPOGRAPHY TOKENS
   ============================================================ */
:root {
  /* Font families */
  --font-heading: 'Playfair Display', Georgia, serif;
  --font-body:    'Source Sans 3', sans-serif;

  /* Font sizes — mobile first */
  --text-xs:    0.72rem;   /* 11.5px — labels, badges, captions */
  --text-sm:    0.85rem;   /* 13.5px — small body, card meta */
  --text-base:  0.97rem;   /* 15.5px — body text */
  --text-md:    1.05rem;   /* 16.8px — slightly larger body */
  --text-lg:    1.2rem;    /* 19.2px — sub-headings */
  --text-xl:    1.5rem;    /* 24px — section sub-titles */
  --text-2xl:   2rem;      /* 32px — section headings mobile */
  --text-3xl:   2.5rem;    /* 40px — section headings desktop */
  --text-4xl:   3rem;      /* 48px — hero heading mobile */
  --text-5xl:   3.8rem;    /* 60px — hero heading desktop */

  /* Font weights */
  --weight-light:    300;
  --weight-regular:  400;
  --weight-medium:   500;
  --weight-semibold: 600;
  --weight-bold:     700;

  /* Line heights */
  --leading-tight:   1.15;
  --leading-snug:    1.3;
  --leading-normal:  1.6;
  --leading-relaxed: 1.75;
  --leading-loose:   1.9;

  /* Letter spacing */
  --tracking-tight:  -0.02em;
  --tracking-normal:  0;
  --tracking-wide:    0.06em;
  --tracking-wider:   0.12em;
  --tracking-widest:  0.2em;
}

/* ============================================================
   SPACING & LAYOUT TOKENS
   ============================================================ */
:root {
  --max-width:       1200px;
  --section-pad-v:   80px;
  --section-pad-h:   20px;
  --section-pad:     var(--section-pad-v) var(--section-pad-h);
}

/* ============================================================
   BASE STYLES
   ============================================================ */
html { scroll-behavior: smooth; }

body {
  font-family: var(--font-body);
  font-size: var(--text-base);
  font-weight: var(--weight-regular);
  line-height: var(--leading-normal);
  color: var(--color-navy);
  background-color: var(--color-white);
  -webkit-font-smoothing: antialiased;
}

h1, h2, h3, h4, h5, h6 {
  font-family: var(--font-heading);
  line-height: var(--leading-tight);
  color: var(--color-navy);
}

p {
  font-family: var(--font-body);
  line-height: var(--leading-relaxed);
  color: var(--color-grey-text);
}

img { max-width: 100%; height: auto; display: block; }
a   { text-decoration: none; color: inherit; }
ul, ol, dl { list-style: none; }

/* ============================================================
   UTILITY CLASSES
   ============================================================ */
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}

/* Shared section label (gold uppercase tiny text above headings) */
.section-label {
  font-family: var(--font-body);
  font-size: var(--text-xs);
  font-weight: var(--weight-semibold);
  letter-spacing: var(--tracking-widest);
  text-transform: uppercase;
  color: var(--color-gold);
  display: block;
  margin-bottom: 10px;
}

/* Shared section heading underline accent */
.section-heading {
  font-family: var(--font-heading);
  font-size: var(--text-2xl);
  font-weight: var(--weight-bold);
  color: var(--color-navy);
  display: inline-block;
  padding-bottom: 14px;
  border-bottom: 2px solid var(--color-gold);
  margin-bottom: 0;
}

/* Shared "Know More →" text link */
.text-link {
  font-family: var(--font-body);
  font-size: var(--text-sm);
  font-weight: var(--weight-semibold);
  letter-spacing: var(--tracking-wide);
  text-transform: uppercase;
  color: var(--color-navy);
  border-bottom: 2px solid var(--color-gold);
  padding-bottom: 2px;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  transition: color 0.3s ease;
}

.text-link:hover { color: var(--color-gold); }

/* ============================================================
   RESPONSIVE BREAKPOINTS
   ============================================================ */
@media (min-width: 768px) {
  :root {
    --section-pad-v: 100px;
    --section-pad-h: 40px;
    --text-2xl: 2.4rem;
  }
}

@media (min-width: 1200px) {
  :root {
    --section-pad-v: 120px;
  }
}
```

---

### /app/layout.js

```jsx
import './globals.css'

export const metadata = {
  title: '[School Name] | Best School in [City] – Admissions Open 2025',
  description:
    '[School Name] is the best CBSE affiliated school in [City], [State], offering quality education from Pre-Primary to Class XII. Enroll your child today.',
  keywords: 'best school in [City], CBSE school [City], top school [City], [School Name] admissions',
  openGraph: {
    title: '[School Name] | Best School in [City]',
    description: 'Top-rated CBSE school in [City] — modern infrastructure, experienced faculty, holistic education.',
    url: 'https://www.yourschool.com',
    siteName: '[School Name]',
    images: [{ url: '/images/hero-bg.webp', width: 1200, height: 630 }],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: '[School Name] | Best School in [City]',
    description: 'Admissions open at [School Name] — [City]s most trusted CBSE school.',
    images: ['/images/hero-bg.webp'],
  },
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://www.yourschool.com' },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=Source+Sans+3:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
        <link rel="preload" as="image" href="/images/hero-bg.webp" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'School',
              name: '[School Name]',
              description: 'Best CBSE school in [City], [State].',
              url: 'https://www.yourschool.com',
              logo: 'https://www.yourschool.com/images/logo.png',
              telephone: '+91-XXXXXXXXXX',
              email: 'info@yourschool.com',
              foundingDate: '[Year]',
              address: {
                '@type': 'PostalAddress',
                streetAddress: '[Street Address]',
                addressLocality: '[City]',
                addressRegion: '[State]',
                postalCode: '[PIN]',
                addressCountry: 'IN',
              },
              aggregateRating: {
                '@type': 'AggregateRating',
                ratingValue: '4.8',
                reviewCount: '120',
                bestRating: '5',
              },
            }),
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  )
}
```

### /app/page.js

```jsx
import Hero          from '@/components/hero/hero'
import About         from '@/components/about/about'
import Stats         from '@/components/stats/stats'
import WhyChooseUs   from '@/components/whychooseus/whychooseus'
import Programs      from '@/components/programs/programs'
import Facilities    from '@/components/facilities/facilities'
import Gallery       from '@/components/gallery/gallery'
import Testimonials  from '@/components/testimonials/testimonials'
import FAQ           from '@/components/faq/faq'
import AdmissionCTA  from '@/components/admissioncta/admissioncta'

export default function HomePage() {
  return (
    <main>
      <Hero />
      <About />
      <Stats />
      <WhyChooseUs />
      <Programs />
      <Facilities />
      <Gallery />
      <Testimonials />
      <FAQ />
      <AdmissionCTA />
    </main>
  )
}
```

---

## COMPONENT 1 — HERO

**UI Design:**
Full viewport. Dark navy overlay on photo. Content left-aligned on desktop, centered on mobile. H1 in Playfair Display white, large. Below tagline: thin gold horizontal rule. Two CTA buttons.
**Decorative elements:**
- Large empty rectangle (outline only, gold, ~300×200px) positioned top-right of the viewport, partially off-screen — creates a framing tension
- Thin vertical gold line running down the left side of the content block (like a page margin marker)
- Bottom-left corner: two short perpendicular lines forming an "L" bracket shape in gold (CSS only)

### /components/hero/hero.js

```jsx
import Image from 'next/image'
import Link  from 'next/link'
import styles from './hero.module.css'

export default function Hero() {
  return (
    <section className={styles.hero} aria-label="Hero Banner">

      {/* Background image */}
      <div className={styles.imageWrapper}>
        <Image
          src="/images/hero-bg.webp"
          alt="[School Name] campus — best school in [City]"
          fill priority fetchPriority="high" quality={85}
          style={{ objectFit: 'cover', objectPosition: 'center' }}
        />
        <div className={styles.overlay} aria-hidden="true" />
      </div>

      {/* Decorative: large outline rectangle top-right */}
      <span className={styles.decoRect}    aria-hidden="true" />
      {/* Decorative: bottom-left corner bracket */}
      <span className={styles.decoCorner}  aria-hidden="true" />

      <div className={styles.content}>
        {/* Decorative: vertical left line */}
        <span className={styles.decoLine} aria-hidden="true" />

        <span className={styles.badge}>CBSE Affiliated &middot; Est. [Year]</span>

        <h1 className={styles.heading}>
          Best School in [City]<br />
          <span className={styles.schoolName}>[School Name]</span>
        </h1>

        <p className={styles.tagline}>[Tagline — e.g., Nurturing Minds. Building Futures.]</p>

        <p className={styles.subtext}>
          Quality education from Pre-Primary to Class XII in [City], [State].
        </p>

        <div className={styles.buttons}>
          <Link href="/admissions" className={styles.btnPrimary}
            aria-label="Apply for admissions at [School Name]">
            Apply Now
          </Link>
          <Link href="/about" className={styles.btnSecondary}
            aria-label="Learn more about [School Name]">
            Know More
          </Link>
        </div>
      </div>

      <span className="sr-only">
        [School Name] is the best CBSE affiliated school in [City], [State],
        established in [Year]. Admissions open for Pre-Primary to Class XII.
      </span>
    </section>
  )
}
```

### /components/hero/hero.module.css

```css
.hero {
  position: relative;
  width: 100%;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 100px var(--section-pad-h) 60px;
  overflow: hidden;
}

/* ---- Background ---- */
.imageWrapper {
  position: absolute;
  inset: 0;
  z-index: 0;
}

.overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to bottom,
    rgba(11,31,58,0.88) 0%,
    rgba(11,31,58,0.70) 100%
  );
  z-index: 1;
}

/* ---- Decorative: large outline rectangle top-right ---- */
.decoRect {
  position: absolute;
  top: -60px;
  right: -60px;
  width: 320px;
  height: 320px;
  border: 1px solid rgba(201,160,82,0.18);
  z-index: 2;
  pointer-events: none;
}

/* ---- Decorative: bottom-left corner bracket ---- */
.decoCorner {
  position: absolute;
  bottom: 48px;
  left: 28px;
  width: 36px;
  height: 36px;
  border-left: 2px solid var(--color-gold-light);
  border-bottom: 2px solid var(--color-gold-light);
  opacity: 0.5;
  z-index: 2;
  pointer-events: none;
}

/* ---- Content ---- */
.content {
  position: relative;
  z-index: 3;
  color: var(--color-white);
  max-width: 760px;
  width: 100%;
  text-align: center;
  padding-left: 0;
}

/* ---- Decorative: vertical left line ---- */
.decoLine {
  display: none; /* shown on desktop only */
}

.badge {
  display: inline-block;
  font-family: var(--font-body);
  font-size: var(--text-xs);
  font-weight: var(--weight-semibold);
  letter-spacing: var(--tracking-widest);
  text-transform: uppercase;
  color: var(--color-gold);
  border: 1px solid var(--color-gold);
  padding: 6px 18px;
  margin-bottom: 24px;
}

.heading {
  font-family: var(--font-heading);
  font-size: var(--text-4xl);
  font-weight: var(--weight-bold);
  line-height: var(--leading-snug);
  color: var(--color-white);
  margin-bottom: 16px;
}

.schoolName { color: var(--color-gold); }

.tagline {
  font-family: var(--font-heading);
  font-size: var(--text-lg);
  font-style: italic;
  font-weight: var(--weight-regular);
  color: rgba(250,250,248,0.82);
  padding-bottom: 18px;
  border-bottom: 1px solid var(--color-shape-line);
  display: inline-block;
  margin-bottom: 14px;
}

.subtext {
  font-size: var(--text-sm);
  color: rgba(250,250,248,0.65);
  margin-bottom: 36px;
  font-family: var(--font-body);
}

.buttons {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 14px;
}

.btnPrimary {
  display: inline-block;
  background: var(--color-gold);
  color: var(--color-navy);
  font-family: var(--font-body);
  font-size: var(--text-sm);
  font-weight: var(--weight-bold);
  letter-spacing: var(--tracking-wide);
  text-transform: uppercase;
  padding: 14px 36px;
  transition: background 0.3s ease;
  width: 100%; max-width: 220px; text-align: center;
}
.btnPrimary:hover { background: var(--color-gold-dark); }

.btnSecondary {
  display: inline-block;
  background: transparent;
  color: var(--color-white);
  font-family: var(--font-body);
  font-size: var(--text-sm);
  font-weight: var(--weight-semibold);
  letter-spacing: var(--tracking-wide);
  text-transform: uppercase;
  padding: 13px 36px;
  border: 1px solid rgba(250,250,248,0.5);
  transition: border-color 0.3s ease;
  width: 100%; max-width: 220px; text-align: center;
}
.btnSecondary:hover { border-color: var(--color-white); }

@media (min-width: 640px) {
  .buttons { flex-direction: row; justify-content: center; }
  .btnPrimary, .btnSecondary { width: auto; }
}

@media (min-width: 900px) {
  .hero {
    justify-content: flex-start;
    padding: 120px 40px 80px;
  }
  .overlay {
    background: linear-gradient(
      to right,
      rgba(11,31,58,0.92) 0%,
      rgba(11,31,58,0.55) 55%,
      rgba(11,31,58,0.08) 100%
    );
  }
  .content {
    text-align: left;
    padding-left: 32px;
    max-width: 620px;
    margin-left: calc((100vw - var(--max-width)) / 2);
  }
  .decoLine {
    display: block;
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 2px;
    background: linear-gradient(to bottom, transparent, var(--color-gold), transparent);
    pointer-events: none;
  }
  .buttons { justify-content: flex-start; }
  .heading { font-size: var(--text-5xl); }
  .decoRect { width: 420px; height: 420px; }
}
```

---

## COMPONENT 2 — ABOUT

**UI Design:**
Two-column: image left, text right on desktop. Stacked on mobile.
**Decorative elements:**
- Image has a thin gold border frame that is offset 10px bottom-right from the image (stacked using a positioned `::after` pseudo-element on the wrapper)
- Behind the text column: a large lightly tinted navy rectangle (positioned `::before` pseudo-element) that bleeds off the right edge slightly — creating depth
- A short double horizontal line (two thin lines stacked) used as a visual separator between the label and the H2

### /components/about/about.js

```jsx
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
              src="/images/about-school.webp"
              alt="[School Name] school building in [City]"
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
            About [School Name]
          </h2>

          <span className="sr-only">
            [School Name] is a CBSE affiliated school in [City], [State], established in [Year],
            committed to academic excellence and holistic development of every student.
          </span>

          <p className={styles.text}>
            Established in [Year], [School Name] is a CBSE affiliated institution in [City],
            [State], built on a foundation of academic excellence, strong values, and a
            commitment to the all-round development of every student. Over the years, we have
            grown into one of the most trusted schools in [City], serving thousands of families
            with quality education from Pre-Primary through Senior Secondary.
          </p>

          <Link href="/about" className={styles.link}
            aria-label="Know more about [School Name]'s history and vision">
            Know More <span aria-hidden="true">→</span>
          </Link>
        </div>

      </div>
    </section>
  )
}
```

### /components/about/about.module.css

```css
.section {
  padding: var(--section-pad);
  background: var(--color-white);
  overflow: hidden;
}

.container {
  max-width: var(--max-width);
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 48px;
}

/* ---- Image column ---- */
.imageCol { width: 100%; }

.imageFrame {
  position: relative;
  width: 100%;
  aspect-ratio: 5 / 4;
  overflow: visible;
}

/* Image itself */
.imageFrame > * {
  position: relative;
  z-index: 1;
  width: 100% !important;
  height: 100% !important;
  object-fit: cover;
}

/* Decorative gold offset border behind image */
.imageFrame::after {
  content: '';
  position: absolute;
  bottom: -12px;
  right: -12px;
  width: 100%;
  height: 100%;
  border: 2px solid var(--color-gold);
  z-index: 0;
  pointer-events: none;
}

/* ---- Text column ---- */
.textCol {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
}

/* Decorative light navy fill behind text on desktop */
.textCol::before {
  content: '';
  position: absolute;
  top: -40px;
  right: -40px;
  bottom: -40px;
  left: 40%;
  background: var(--color-shape-navy);
  z-index: 0;
  pointer-events: none;
  display: none; /* enabled on desktop */
}

/* Decorative double rule */
.decoDoubleRule {
  display: block;
  width: 48px;
  height: 6px;
  border-top: 2px solid var(--color-gold);
  border-bottom: 2px solid var(--color-gold);
  margin-bottom: 16px;
  position: relative;
  z-index: 1;
}

.label {
  font-family: var(--font-body);
  font-size: var(--text-xs);
  font-weight: var(--weight-semibold);
  letter-spacing: var(--tracking-widest);
  text-transform: uppercase;
  color: var(--color-gold);
  display: block;
  margin-bottom: 10px;
  position: relative;
  z-index: 1;
}

.heading {
  font-family: var(--font-heading);
  font-size: var(--text-2xl);
  font-weight: var(--weight-bold);
  color: var(--color-navy);
  display: inline-block;
  padding-bottom: 14px;
  border-bottom: 2px solid var(--color-gold);
  margin-bottom: 20px;
  position: relative;
  z-index: 1;
}

.text {
  font-family: var(--font-body);
  font-size: var(--text-base);
  color: var(--color-grey-text);
  line-height: var(--leading-relaxed);
  margin-bottom: 28px;
  position: relative;
  z-index: 1;
}

.link {
  font-family: var(--font-body);
  font-size: var(--text-sm);
  font-weight: var(--weight-semibold);
  letter-spacing: var(--tracking-wide);
  text-transform: uppercase;
  color: var(--color-navy);
  border-bottom: 2px solid var(--color-gold);
  padding-bottom: 2px;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  transition: color 0.3s ease;
  width: fit-content;
  position: relative;
  z-index: 1;
}
.link:hover { color: var(--color-gold); }

@media (min-width: 900px) {
  .container { flex-direction: row; align-items: center; gap: 80px; }
  .imageCol { width: 46%; flex-shrink: 0; }
  .textCol { width: 54%; }
  .textCol::before { display: block; }
  .heading { font-size: var(--text-3xl); }
}
```

---

## COMPONENT 3 — STATS

**UI Design:**
Navy background. Centered heading. 5 stats in a row.
**Decorative elements:**
- A large outlined rectangle (gold, very thin, low opacity) centered behind the stat numbers — like a ghost frame around the whole stat row
- Thin horizontal gold line above and below the stats row
- Each divider between stats is a thin vertical line in a subtle lighter navy

### /components/stats/stats.js

```jsx
import styles from './stats.module.css'

const stats = [
  { value: '[X]+', label: 'Years of Excellence' },
  { value: '[X]+', label: 'Students Enrolled' },
  { value: '[X]+', label: 'Qualified Teachers' },
  { value: '[X]%', label: 'Board Pass Rate' },
  { value: '[X]',  label: 'Acre Campus' },
]

export default function Stats() {
  return (
    <section className={styles.section} aria-labelledby="stats-heading">

      {/* Decorative: horizontal rules */}
      <span className={styles.decoLineTop}   aria-hidden="true" />
      <span className={styles.decoLineBottom} aria-hidden="true" />

      <div className={styles.container}>
        <h2 id="stats-heading" className={styles.heading}>
          [School Name] by the Numbers
        </h2>

        <span className="sr-only">
          Since [Year], [School Name] has served thousands of students in [City]
          with outstanding academic results and award-winning faculty.
        </span>

        <div className={styles.statsWrapper}>
          {/* Decorative ghost rectangle behind numbers */}
          <span className={styles.decoGhostRect} aria-hidden="true" />

          <dl className={styles.grid}>
            {stats.map((s, i) => (
              <div className={styles.item} key={i}>
                <dt className="sr-only">{s.label}</dt>
                <dd className={styles.value} aria-label={`${s.value} ${s.label}`}>
                  <span className={styles.number} aria-hidden="true">{s.value}</span>
                  <span className={styles.label}>{s.label}</span>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  )
}
```

### /components/stats/stats.module.css

```css
.section {
  background: var(--color-navy);
  padding: 70px var(--section-pad-h);
  position: relative;
  overflow: hidden;
}

/* Decorative horizontal rules */
.decoLineTop,
.decoLineBottom {
  display: block;
  position: absolute;
  left: 0; right: 0;
  height: 1px;
  background: linear-gradient(
    to right,
    transparent,
    var(--color-shape-line),
    transparent
  );
  pointer-events: none;
}
.decoLineTop    { top: 0; }
.decoLineBottom { bottom: 0; }

.container {
  max-width: var(--max-width);
  margin: 0 auto;
}

.heading {
  font-family: var(--font-heading);
  font-size: var(--text-xl);
  font-weight: var(--weight-semibold);
  color: var(--color-white);
  text-align: center;
  margin-bottom: 48px;
  opacity: 0.6;
  letter-spacing: var(--tracking-wide);
  font-style: italic;
}

.statsWrapper {
  position: relative;
  display: flex;
  justify-content: center;
}

/* Decorative ghost rectangle behind the stats */
.decoGhostRect {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 90%;
  height: 110%;
  border: 1px solid rgba(201,160,82,0.10);
  pointer-events: none;
}

.grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px 24px;
  width: 100%;
}

.item { text-align: center; }

.value {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
}

.number {
  font-family: var(--font-heading);
  font-size: var(--text-4xl);
  font-weight: var(--weight-bold);
  color: var(--color-gold);
  line-height: 1;
}

.label {
  font-family: var(--font-body);
  font-size: var(--text-xs);
  font-weight: var(--weight-regular);
  color: rgba(250,250,248,0.55);
  letter-spacing: var(--tracking-widest);
  text-transform: uppercase;
}

@media (min-width: 768px) {
  .section { padding: 80px var(--section-pad-h); }
  .grid {
    grid-template-columns: repeat(5, 1fr);
    gap: 0;
  }
  .item {
    border-right: 1px solid var(--color-border-dark);
  }
  .item:last-child { border-right: none; }
  .number { font-size: var(--text-4xl); }
}
```

---

## COMPONENT 4 — WHY CHOOSE US

**UI Design:**
Off-white background. Centered heading + intro. 2×3 grid of feature cards.
**Decorative elements:**
- Each card has a 3px top border in gold (left-to-right reveal feel)
- Behind the section: a large, faint solid navy square rotated 8deg positioned top-right — like an abstract background shape
- A thin vertical gold line to the left of the section heading group (bar accent)
- Small gold square dots (2×2px) at each corner of the card on hover — achieved with box-shadow trick

### /components/whychooseus/whychooseus.js

```jsx
import Link   from 'next/link'
import styles from './whychooseus.module.css'

const features = [
  { icon: '🎓', title: 'Experienced Faculty',        text: 'Our qualified educators bring years of experience and genuine dedication to every classroom, ensuring each student receives the attention they deserve.' },
  { icon: '📚', title: 'CBSE Curriculum',             text: 'Affiliated with CBSE, New Delhi, we deliver a structured, nationally recognized academic framework that prepares students thoroughly for board examinations and higher education.' },
  { icon: '🏫', title: 'Modern Infrastructure',       text: 'Smart classrooms, advanced laboratories, a well-stocked library, and sports facilities — everything a student needs to learn, grow, and excel on a single campus.' },
  { icon: '🛡️', title: 'Safe & Secure Campus',        text: '24/7 CCTV surveillance, controlled entry points, trained security staff, and an on-campus medical room ensure every child is always in safe hands.' },
  { icon: '🌱', title: 'Holistic Development',        text: 'Sports, performing arts, debate, robotics, and community service are woven into school life — nurturing well-rounded individuals, not just high scorers.' },
  { icon: '🤝', title: 'Transparent Communication',  text: 'Regular parent-teacher meetings, detailed progress reports, and a real-time portal keep every family informed and involved at each step of their child\'s journey.' },
]

export default function WhyChooseUs() {
  return (
    <section className={styles.section} aria-labelledby="why-heading">

      {/* Decorative: large faint background shape */}
      <span className={styles.decoBgShape} aria-hidden="true" />

      <div className={styles.container}>
        <div className={styles.sectionTop}>
          {/* Decorative: vertical bar beside heading group */}
          <span className={styles.decoBar} aria-hidden="true" />
          <div className={styles.headingGroup}>
            <span className={styles.label}>Our Difference</span>
            <h2 id="why-heading" className={styles.heading}>
              Why Choose [School Name]?
            </h2>
            <p className={styles.intro}>
              Parents across [City] choose [School Name] for our quality of education,
              safe environment, and the genuine care our faculty extends to every child.
            </p>
          </div>
        </div>

        <span className="sr-only">
          [School Name] in [City] is distinguished by experienced CBSE faculty, modern
          infrastructure, a safe campus, and holistic programmes.
        </span>

        <ul className={styles.grid}>
          {features.map((f, i) => (
            <li key={i} className={styles.card}>
              <span className={styles.icon} aria-hidden="true">{f.icon}</span>
              <h3 className={styles.cardTitle}>{f.title}</h3>
              <p className={styles.cardText}>{f.text}</p>
            </li>
          ))}
        </ul>

        <div className={styles.cta}>
          <Link href="/why-choose-us" className={styles.link}
            aria-label="Learn why [School Name] is among the best schools in [City]">
            Know More <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </section>
  )
}
```

### /components/whychooseus/whychooseus.module.css

```css
.section {
  padding: var(--section-pad);
  background: var(--color-off-white);
  position: relative;
  overflow: hidden;
}

/* Decorative: large faint navy rotated square */
.decoBgShape {
  position: absolute;
  top: -120px;
  right: -180px;
  width: 480px;
  height: 480px;
  background: var(--color-shape-navy);
  transform: rotate(12deg);
  pointer-events: none;
  z-index: 0;
}

.container {
  max-width: var(--max-width);
  margin: 0 auto;
  position: relative;
  z-index: 1;
}

.sectionTop {
  display: flex;
  align-items: flex-start;
  gap: 20px;
  max-width: 640px;
  margin: 0 auto 56px;
}

/* Decorative vertical gold bar */
.decoBar {
  display: block;
  width: 3px;
  min-height: 80px;
  background: linear-gradient(to bottom, var(--color-gold), var(--color-gold-light));
  flex-shrink: 0;
  margin-top: 4px;
}

.headingGroup { flex: 1; }

.label {
  font-family: var(--font-body);
  font-size: var(--text-xs);
  font-weight: var(--weight-semibold);
  letter-spacing: var(--tracking-widest);
  text-transform: uppercase;
  color: var(--color-gold);
  display: block;
  margin-bottom: 8px;
}

.heading {
  font-family: var(--font-heading);
  font-size: var(--text-2xl);
  font-weight: var(--weight-bold);
  color: var(--color-navy);
  display: inline-block;
  padding-bottom: 12px;
  border-bottom: 2px solid var(--color-gold);
  margin-bottom: 16px;
}

.intro {
  font-family: var(--font-body);
  font-size: var(--text-base);
  color: var(--color-grey-text);
  line-height: var(--leading-relaxed);
}

.grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}

.card {
  background: var(--color-white);
  border-top: 3px solid var(--color-gold);
  padding: 28px 24px;
  box-shadow: 0 2px 12px rgba(11,31,58,0.05);
  transition: box-shadow 0.3s ease, transform 0.3s ease;
  position: relative;
}

.card:hover {
  box-shadow: 0 8px 28px rgba(11,31,58,0.11);
  transform: translateY(-4px);
}

.icon {
  font-size: 1.8rem;
  display: block;
  margin-bottom: 14px;
  line-height: 1;
}

.cardTitle {
  font-family: var(--font-heading);
  font-size: var(--text-md);
  font-weight: var(--weight-semibold);
  color: var(--color-navy);
  margin-bottom: 10px;
}

.cardText {
  font-family: var(--font-body);
  font-size: var(--text-sm);
  color: var(--color-grey-text);
  line-height: var(--leading-relaxed);
}

.cta { text-align: center; margin-top: 48px; }

.link {
  font-family: var(--font-body);
  font-size: var(--text-sm);
  font-weight: var(--weight-semibold);
  letter-spacing: var(--tracking-wide);
  text-transform: uppercase;
  color: var(--color-navy);
  border-bottom: 2px solid var(--color-gold);
  padding-bottom: 2px;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  transition: color 0.3s ease;
}
.link:hover { color: var(--color-gold); }

@media (min-width: 768px) {
  .grid { grid-template-columns: repeat(3, 1fr); gap: 24px; }
}
```

---

## COMPONENT 5 — PROGRAMS

**UI Design:**
White background. Centered heading. 7 programme cards (1 col mobile, 2 col tablet, 3 col desktop).
**Decorative elements:**
- Each card has a 4px left border in navy that transitions to gold on hover, plus the card translates right slightly
- Small programme number (01, 02...) in very light gold behind each card title — positioned absolute, large, faint
- A thin horizontal gold rule spans the full width between heading and cards

### /components/programs/programs.js

```jsx
import Link   from 'next/link'
import styles from './programs.module.css'

const programs = [
  { title: 'Pre-Primary (Nursery – UKG)',                  text: 'A play-based curriculum that builds foundational language, cognitive, and motor skills — giving every child a confident and joyful start to school life.' },
  { title: 'Primary School (Class I – V)',                  text: 'Strong conceptual foundations in English, Hindi, Mathematics, and Environmental Science through activity-based learning that prioritizes understanding.' },
  { title: 'Middle School (Class VI – VIII)',               text: 'Dedicated subject teachers, laboratory sessions, and structured assessments that prepare students thoroughly for the demands of the secondary years.' },
  { title: 'Secondary School (Class IX – X)',               text: 'Rigorous preparation for CBSE Board Examinations with structured assessments, mock tests, and personalized guidance for every student.' },
  { title: 'Senior Secondary — Science (Class XI – XII)',   text: 'In-depth instruction in Physics, Chemistry, Biology, and Mathematics, with lab work and guidance for JEE and NEET examinations.' },
  { title: 'Senior Secondary — Commerce (Class XI – XII)',  text: 'A thorough grounding in Accountancy, Business Studies, and Economics, preparing students for finance, management, and entrepreneurship careers.' },
  { title: 'Senior Secondary — Arts (Class XI – XII)',      text: 'History, Political Science, Geography, Psychology, and English — ideal for careers in law, civil services, journalism, and the liberal arts.' },
]

export default function Programs() {
  return (
    <section className={styles.section} aria-labelledby="programs-heading">
      <div className={styles.container}>

        <div className={styles.sectionTop}>
          <span className={styles.label}>What We Offer</span>
          <h2 id="programs-heading" className={styles.heading}>
            Academic Programmes
          </h2>
          <p className={styles.intro}>
            A complete academic journey from Pre-Primary through Class XII,
            structured under the CBSE curriculum and delivered by subject-specialized educators.
          </p>
        </div>

        {/* Decorative full-width rule */}
        <span className={styles.decoRule} aria-hidden="true" />

        <span className="sr-only">
          [School Name] in [City] offers Pre-Primary, Primary, Middle, Secondary, and Senior
          Secondary programmes under CBSE affiliation.
        </span>

        <ul className={styles.grid}>
          {programs.map((p, i) => (
            <li key={i} className={styles.card}>
              {/* Decorative faint number */}
              <span className={styles.decoNum} aria-hidden="true">
                {String(i + 1).padStart(2, '0')}
              </span>
              <h3 className={styles.cardTitle}>{p.title}</h3>
              <p className={styles.cardText}>{p.text}</p>
            </li>
          ))}
        </ul>

        <div className={styles.cta}>
          <Link href="/programmes" className={styles.link}
            aria-label="View all academic programmes at [School Name]">
            Know More <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </section>
  )
}
```

### /components/programs/programs.module.css

```css
.section {
  padding: var(--section-pad);
  background: var(--color-white);
}

.container {
  max-width: var(--max-width);
  margin: 0 auto;
}

.sectionTop {
  text-align: center;
  max-width: 640px;
  margin: 0 auto 0;
}

.label {
  font-family: var(--font-body);
  font-size: var(--text-xs);
  font-weight: var(--weight-semibold);
  letter-spacing: var(--tracking-widest);
  text-transform: uppercase;
  color: var(--color-gold);
  display: block;
  margin-bottom: 10px;
}

.heading {
  font-family: var(--font-heading);
  font-size: var(--text-2xl);
  font-weight: var(--weight-bold);
  color: var(--color-navy);
  display: inline-block;
  padding-bottom: 12px;
  border-bottom: 2px solid var(--color-gold);
  margin-bottom: 16px;
}

.intro {
  font-size: var(--text-base);
  color: var(--color-grey-text);
  line-height: var(--leading-relaxed);
}

/* Decorative full-width rule */
.decoRule {
  display: block;
  width: 100%;
  height: 1px;
  background: linear-gradient(to right, transparent, var(--color-gold-light), transparent);
  margin: 40px 0 48px;
}

.grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2px;
  background: var(--color-grey-light);
}

.card {
  background: var(--color-white);
  border-left: 4px solid var(--color-navy);
  padding: 28px 28px 28px 32px;
  position: relative;
  overflow: hidden;
  transition: border-color 0.3s ease, transform 0.3s ease;
}
.card:hover {
  border-color: var(--color-gold);
  transform: translateX(6px);
}

/* Decorative faint number behind card content */
.decoNum {
  position: absolute;
  top: 8px;
  right: 16px;
  font-family: var(--font-heading);
  font-size: 4.5rem;
  font-weight: var(--weight-bold);
  color: var(--color-shape-gold);
  line-height: 1;
  pointer-events: none;
  user-select: none;
  z-index: 0;
}

.cardTitle {
  font-family: var(--font-heading);
  font-size: var(--text-md);
  font-weight: var(--weight-semibold);
  color: var(--color-navy);
  margin-bottom: 8px;
  position: relative;
  z-index: 1;
}

.cardText {
  font-family: var(--font-body);
  font-size: var(--text-sm);
  color: var(--color-grey-text);
  line-height: var(--leading-relaxed);
  position: relative;
  z-index: 1;
}

.cta { text-align: center; margin-top: 48px; }

.link {
  font-family: var(--font-body);
  font-size: var(--text-sm);
  font-weight: var(--weight-semibold);
  letter-spacing: var(--tracking-wide);
  text-transform: uppercase;
  color: var(--color-navy);
  border-bottom: 2px solid var(--color-gold);
  padding-bottom: 2px;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  transition: color 0.3s ease;
}
.link:hover { color: var(--color-gold); }

@media (min-width: 640px) {
  .grid { grid-template-columns: 1fr 1fr; }
}
@media (min-width: 1024px) {
  .grid { grid-template-columns: repeat(3, 1fr); }
}
```

---

## COMPONENT 6 — FACILITIES

**UI Design:**
Off-white background. 2-col / 3-col image card grid.
**Decorative elements:**
- Behind the entire grid: two large intersecting diagonal lines (thin, gold, low opacity) using a CSS background with `linear-gradient` pattern — creates a cross-hatch feel without being loud
- Each card image has a thin gold top-left corner bracket (positioned via `::before` on the imageWrapper — two sides of a corner) that appears on hover
- Section heading has a small filled gold square (4×4px) to the left of it

### /components/facilities/facilities.js

```jsx
import Image from 'next/image'
import Link  from 'next/link'
import styles from './facilities.module.css'

const facilities = [
  { img: '/images/facilities/smart-classroom.webp', title: 'Smart Classrooms',       text: 'Interactive digital boards and audio-visual systems that make every lesson more engaging and effective for students.' },
  { img: '/images/facilities/science-lab.webp',     title: 'Science Laboratories',   text: 'Three fully equipped labs for Physics, Chemistry, and Biology — supporting all CBSE-prescribed practicals safely.' },
  { img: '/images/facilities/computer-lab.webp',    title: 'Computer Laboratory',     text: 'High-performance workstations with high-speed internet, supporting structured computer education from Class III onwards.' },
  { img: '/images/facilities/library.webp',         title: 'Library',                 text: 'A comprehensive resource centre with [X],000+ books, reference volumes, and digital learning materials.' },
  { img: '/images/facilities/sports.webp',          title: 'Sports Facilities',       text: 'Cricket, football, basketball courts, and athletics track — supervised by trained physical education instructors.' },
  { img: '/images/facilities/auditorium.webp',      title: 'Auditorium',              text: 'A [X]-seat air-conditioned auditorium with professional sound and stage lighting for events and performances.' },
]

export default function Facilities() {
  return (
    <section className={styles.section} aria-labelledby="facilities-heading">
      <div className={styles.container}>

        <div className={styles.sectionTop}>
          <span className={styles.decoSquare} aria-hidden="true" />
          <div className={styles.headingGroup}>
            <span className={styles.label}>Our Campus</span>
            <h2 id="facilities-heading" className={styles.heading}>
              Infrastructure &amp; Facilities
            </h2>
            <p className={styles.intro}>
              Spread across [X] acres in [City], our campus is fully equipped to support
              academic excellence and the all-round development of every student.
            </p>
          </div>
        </div>

        <span className="sr-only">
          [School Name] in [City] features smart classrooms, science labs, a computer lab,
          library, sports ground, and an auditorium within a safe and modern campus.
        </span>

        <div className={styles.gridWrapper}>
          {/* Decorative cross-hatch lines behind grid */}
          <span className={styles.decoCross} aria-hidden="true" />

          <ul className={styles.grid}>
            {facilities.map((f, i) => (
              <li key={i} className={styles.card}>
                <div className={styles.imageWrapper}>
                  <Image
                    src={f.img}
                    alt={`${f.title} at [School Name], [City]`}
                    width={400} height={280} loading="lazy"
                    style={{ objectFit: 'cover', width: '100%', height: '100%' }}
                  />
                </div>
                <div className={styles.cardBody}>
                  <h3 className={styles.cardTitle}>{f.title}</h3>
                  <p className={styles.cardText}>{f.text}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.cta}>
          <Link href="/facilities" className={styles.link}
            aria-label="Explore all facilities at [School Name]">
            Know More <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </section>
  )
}
```

### /components/facilities/facilities.module.css

```css
.section {
  padding: var(--section-pad);
  background: var(--color-off-white);
}

.container {
  max-width: var(--max-width);
  margin: 0 auto;
}

.sectionTop {
  display: flex;
  align-items: flex-start;
  gap: 16px;
  max-width: 680px;
  margin: 0 auto 52px;
}

/* Decorative small gold square */
.decoSquare {
  display: block;
  width: 10px;
  height: 10px;
  background: var(--color-gold);
  flex-shrink: 0;
  margin-top: 10px;
}

.headingGroup { flex: 1; }

.label {
  font-family: var(--font-body);
  font-size: var(--text-xs);
  font-weight: var(--weight-semibold);
  letter-spacing: var(--tracking-widest);
  text-transform: uppercase;
  color: var(--color-gold);
  display: block;
  margin-bottom: 8px;
}

.heading {
  font-family: var(--font-heading);
  font-size: var(--text-2xl);
  font-weight: var(--weight-bold);
  color: var(--color-navy);
  display: inline-block;
  padding-bottom: 12px;
  border-bottom: 2px solid var(--color-gold);
  margin-bottom: 14px;
}

.intro {
  font-size: var(--text-base);
  color: var(--color-grey-text);
  line-height: var(--leading-relaxed);
}

.gridWrapper {
  position: relative;
}

/* Decorative cross-hatch lines */
.decoCross {
  position: absolute;
  inset: -20px;
  background-image:
    linear-gradient(135deg, var(--color-shape-gold) 1px, transparent 1px),
    linear-gradient(45deg,  var(--color-shape-gold) 1px, transparent 1px);
  background-size: 48px 48px;
  pointer-events: none;
  z-index: 0;
}

.grid {
  position: relative;
  z-index: 1;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}

.card {
  background: var(--color-white);
  box-shadow: 0 2px 14px rgba(11,31,58,0.07);
  transition: box-shadow 0.3s ease, transform 0.3s ease;
  overflow: hidden;
}
.card:hover {
  box-shadow: 0 8px 28px rgba(11,31,58,0.13);
  transform: translateY(-4px);
}

.imageWrapper {
  width: 100%;
  aspect-ratio: 4 / 3;
  overflow: hidden;
  position: relative;
}

/* Decorative top-left corner bracket on hover */
.imageWrapper::before {
  content: '';
  position: absolute;
  top: 10px;
  left: 10px;
  width: 28px;
  height: 28px;
  border-top: 2px solid var(--color-gold);
  border-left: 2px solid var(--color-gold);
  z-index: 2;
  opacity: 0;
  transition: opacity 0.3s ease;
  pointer-events: none;
}
.card:hover .imageWrapper::before { opacity: 1; }

.imageWrapper img {
  transition: transform 0.4s ease;
  object-fit: cover;
  width: 100% !important;
  height: 100% !important;
}
.card:hover .imageWrapper img { transform: scale(1.04); }

.cardBody { padding: 20px 22px 24px; }

.cardTitle {
  font-family: var(--font-heading);
  font-size: var(--text-md);
  font-weight: var(--weight-semibold);
  color: var(--color-navy);
  margin-bottom: 8px;
}

.cardText {
  font-family: var(--font-body);
  font-size: var(--text-sm);
  color: var(--color-grey-text);
  line-height: var(--leading-relaxed);
}

.cta { text-align: center; margin-top: 48px; }

.link {
  font-family: var(--font-body);
  font-size: var(--text-sm);
  font-weight: var(--weight-semibold);
  letter-spacing: var(--tracking-wide);
  text-transform: uppercase;
  color: var(--color-navy);
  border-bottom: 2px solid var(--color-gold);
  padding-bottom: 2px;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  transition: color 0.3s ease;
}
.link:hover { color: var(--color-gold); }

@media (min-width: 1024px) {
  .grid { grid-template-columns: repeat(3, 1fr); gap: 28px; }
}
```

---

## COMPONENT 7 — GALLERY

**UI Design:**
White background. 2-col / 4-col image grid. Gold overlay on hover.
**Decorative elements:**
- Section heading flanked by thin horizontal lines on both sides (rule-heading-rule layout)
- A thin gold bottom-right corner bracket on each image that is always visible (not hover-only) — like a film frame mark
- "View More" button has a thin offset shadow (2px 2px 0 navy) instead of a filled shadow

### /components/gallery/gallery.js

```jsx
import Image from 'next/image'
import Link  from 'next/link'
import styles from './gallery.module.css'

const images = [
  { src: '/images/gallery-1.webp', alt: 'Annual Day celebration at [School Name]' },
  { src: '/images/gallery-2.webp', alt: 'Sports Day activities at [School Name]' },
  { src: '/images/gallery-3.webp', alt: 'Students in smart classroom at [School Name]' },
  { src: '/images/gallery-4.webp', alt: 'Science fair at [School Name], [City]' },
  { src: '/images/gallery-5.webp', alt: 'Cultural programme at [School Name]' },
  { src: '/images/gallery-6.webp', alt: 'Library reading area at [School Name]' },
  { src: '/images/gallery-7.webp', alt: 'Sports facilities at [School Name] campus' },
  { src: '/images/gallery-8.webp', alt: 'Auditorium event at [School Name], [City]' },
]

export default function Gallery() {
  return (
    <section className={styles.section} aria-labelledby="gallery-heading">
      <div className={styles.container}>

        {/* Rule — Heading — Rule layout */}
        <div className={styles.sectionTop}>
          <span className={styles.decoRuleLine} aria-hidden="true" />
          <div className={styles.headingCenter}>
            <span className={styles.label}>Campus Life</span>
            <h2 id="gallery-heading" className={styles.heading}>
              Life at [School Name]
            </h2>
          </div>
          <span className={styles.decoRuleLine} aria-hidden="true" />
        </div>

        <p className={styles.intro}>
          A glimpse into the vibrant school life at [School Name], [City].
        </p>

        <span className="sr-only">
          Photo gallery showcasing campus life, events, classrooms, and sports activities
          at [School Name] in [City].
        </span>

        <ul className={styles.grid} role="list"
          aria-label="Gallery of school life at [School Name]">
          {images.map((img, i) => (
            <li key={i} className={styles.item}>
              <figure className={styles.figure}>
                <div className={styles.imageWrapper}>
                  <Image
                    src={img.src} alt={img.alt} fill loading="lazy"
                    style={{ objectFit: 'cover' }}
                    sizes="(max-width: 640px) 50vw, 25vw"
                  />
                  <div className={styles.hoverOverlay} aria-hidden="true" />
                  {/* Decorative corner mark */}
                  <span className={styles.cornerMark} aria-hidden="true" />
                </div>
                <figcaption className="sr-only">{img.alt}</figcaption>
              </figure>
            </li>
          ))}
        </ul>

        <div className={styles.cta}>
          <Link href="/gallery" className={styles.btn}
            aria-label="View full photo gallery of [School Name]">
            View More
          </Link>
        </div>
      </div>
    </section>
  )
}
```

### /components/gallery/gallery.module.css

```css
.section {
  padding: var(--section-pad);
  background: var(--color-white);
}

.container {
  max-width: var(--max-width);
  margin: 0 auto;
}

/* Rule — Heading — Rule */
.sectionTop {
  display: flex;
  align-items: center;
  gap: 24px;
  margin-bottom: 16px;
}

.decoRuleLine {
  display: block;
  flex: 1;
  height: 1px;
  background: var(--color-border);
}

.headingCenter { text-align: center; flex-shrink: 0; }

.label {
  font-family: var(--font-body);
  font-size: var(--text-xs);
  font-weight: var(--weight-semibold);
  letter-spacing: var(--tracking-widest);
  text-transform: uppercase;
  color: var(--color-gold);
  display: block;
  margin-bottom: 6px;
}

.heading {
  font-family: var(--font-heading);
  font-size: var(--text-2xl);
  font-weight: var(--weight-bold);
  color: var(--color-navy);
  display: inline-block;
  padding-bottom: 10px;
  border-bottom: 2px solid var(--color-gold);
}

.intro {
  font-size: var(--text-base);
  color: var(--color-grey-text);
  text-align: center;
  margin-bottom: 40px;
}

.grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 6px;
}

.item { display: block; }
.figure { margin: 0; }

.imageWrapper {
  position: relative;
  width: 100%;
  aspect-ratio: 4 / 3;
  overflow: hidden;
  background: var(--color-off-white);
}

.hoverOverlay {
  position: absolute;
  inset: 0;
  background: rgba(201,160,82,0);
  transition: background 0.3s ease;
  z-index: 1;
}
.item:hover .hoverOverlay {
  background: rgba(201,160,82,0.22);
}
.imageWrapper img {
  transition: transform 0.4s ease;
}
.item:hover .imageWrapper img {
  transform: scale(1.04);
}

/* Decorative bottom-right corner mark (always visible) */
.cornerMark {
  position: absolute;
  bottom: 8px;
  right: 8px;
  width: 20px;
  height: 20px;
  border-right: 1.5px solid rgba(201,160,82,0.6);
  border-bottom: 1.5px solid rgba(201,160,82,0.6);
  z-index: 2;
  pointer-events: none;
}

.cta { text-align: center; margin-top: 40px; }

.btn {
  display: inline-block;
  font-family: var(--font-body);
  font-size: var(--text-sm);
  font-weight: var(--weight-semibold);
  letter-spacing: var(--tracking-wide);
  text-transform: uppercase;
  color: var(--color-navy);
  border: 2px solid var(--color-navy);
  padding: 13px 44px;
  transition: background 0.3s ease, color 0.3s ease;
  box-shadow: 3px 3px 0 var(--color-gold);
}
.btn:hover {
  background: var(--color-navy);
  color: var(--color-white);
}

@media (min-width: 768px) {
  .grid { grid-template-columns: repeat(4, 1fr); gap: 8px; }
}
```

---

## COMPONENT 8 — TESTIMONIALS

**UI Design:**
Navy background. Three cards side-by-side.
**Decorative elements:**
- Large faint quotation mark behind each card text (positioned absolute, very light)
- A thin gold horizontal line spans the full section width between heading and cards
- Behind the entire section: a subtle grid of small gold dots using CSS background-image

### /components/testimonials/testimonials.js

```jsx
import styles from './testimonials.module.css'

const testimonials = [
  {
    quote: 'My daughter has transformed completely since joining [School Name]. The teachers genuinely care about every child\'s progress. Best decision we made for her education in [City].',
    name: '[Parent Name]',
    role: 'Parent of Class [X] Student',
  },
  {
    quote: 'The facilities are exceptional and the curriculum keeps children both challenged and motivated. We are proud to be a part of the [School Name] family.',
    name: '[Parent Name]',
    role: 'Parent of Class [X] Student',
  },
  {
    quote: 'We moved to [City] two years ago and choosing [School Name] was the best decision for our child\'s academic future.',
    name: '[Parent Name]',
    role: 'Parent of Class [X] Student',
  },
]

export default function Testimonials() {
  return (
    <section className={styles.section} aria-labelledby="testimonials-heading">

      {/* Decorative dot grid background */}
      <span className={styles.decoDotGrid} aria-hidden="true" />

      <div className={styles.container}>
        <div className={styles.sectionTop}>
          <span className={styles.label}>Parent Reviews</span>
          <h2 id="testimonials-heading" className={styles.heading}>
            What Parents Say
          </h2>
        </div>

        {/* Decorative full-width gold line */}
        <span className={styles.decoLine} aria-hidden="true" />

        <span className="sr-only">
          Parent reviews of [School Name], among the best CBSE schools in [City], [State].
        </span>

        <ul className={styles.grid}>
          {testimonials.map((t, i) => (
            <li key={i} className={styles.card}>
              {/* Decorative large faint quote mark */}
              <span className={styles.decoQuote} aria-hidden="true">"</span>

              <blockquote className={styles.blockquote}>
                <p className={styles.quoteText}>{t.quote}</p>
              </blockquote>
              <div className={styles.divider} aria-hidden="true" />
              <footer className={styles.footer}>
                <cite className={styles.name}>{t.name}</cite>
                <span className={styles.role}>{t.role}</span>
              </footer>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
```

### /components/testimonials/testimonials.module.css

```css
.section {
  padding: var(--section-pad);
  background: var(--color-navy);
  position: relative;
  overflow: hidden;
}

/* Decorative dot grid */
.decoDotGrid {
  position: absolute;
  inset: 0;
  background-image: radial-gradient(circle, rgba(201,160,82,0.12) 1px, transparent 1px);
  background-size: 28px 28px;
  pointer-events: none;
  z-index: 0;
}

.container {
  max-width: var(--max-width);
  margin: 0 auto;
  position: relative;
  z-index: 1;
}

.sectionTop {
  text-align: center;
  margin-bottom: 24px;
}

.label {
  font-family: var(--font-body);
  font-size: var(--text-xs);
  font-weight: var(--weight-semibold);
  letter-spacing: var(--tracking-widest);
  text-transform: uppercase;
  color: var(--color-gold);
  display: block;
  margin-bottom: 10px;
}

.heading {
  font-family: var(--font-heading);
  font-size: var(--text-2xl);
  font-weight: var(--weight-bold);
  color: var(--color-white);
  display: inline-block;
  padding-bottom: 12px;
  border-bottom: 2px solid var(--color-gold);
}

/* Decorative full-width gold line */
.decoLine {
  display: block;
  width: 100%;
  height: 1px;
  background: linear-gradient(to right, transparent, var(--color-shape-line), transparent);
  margin-bottom: 48px;
}

.grid {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.card {
  background: var(--color-white);
  padding: 36px 32px 32px;
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;
}

/* Decorative large faint quote mark */
.decoQuote {
  position: absolute;
  top: -10px;
  left: 16px;
  font-family: var(--font-heading);
  font-size: 8rem;
  font-weight: var(--weight-bold);
  color: rgba(201,160,82,0.08);
  line-height: 1;
  pointer-events: none;
  user-select: none;
  z-index: 0;
}

.blockquote { margin: 0; position: relative; z-index: 1; }

.quoteText {
  font-family: var(--font-body);
  font-size: var(--text-base);
  font-style: italic;
  color: var(--color-grey-text);
  line-height: var(--leading-relaxed);
}

.divider {
  height: 1px;
  background: var(--color-border);
  margin: 22px 0;
  position: relative;
  z-index: 1;
}

.footer {
  display: flex;
  flex-direction: column;
  gap: 3px;
  position: relative;
  z-index: 1;
}

.name {
  font-family: var(--font-body);
  font-size: var(--text-sm);
  font-weight: var(--weight-semibold);
  color: var(--color-navy);
  font-style: normal;
}

.role {
  font-family: var(--font-body);
  font-size: var(--text-xs);
  color: var(--color-grey-subtle);
  letter-spacing: var(--tracking-wide);
}

@media (min-width: 768px) {
  .grid { flex-direction: row; gap: 24px; }
  .card { flex: 1; }
}
```

---

## COMPONENT 9 — FAQ

**UI Design:**
Off-white background. Accordion list. React useState.
**Decorative elements:**
- To the right of the FAQ list: a tall, thin vertical line in gold that runs the full height of the list — like an editorial sidebar rule
- Small filled navy square (5×5px) sits before each question text
- A faint large "?" character floats behind the heading in very light gold

### /components/faq/faq.js

```jsx
'use client'

import { useState } from 'react'
import styles from './faq.module.css'

const faqs = [
  { q: 'How do I apply for admission at [School Name], [City]?',    a: 'Admission involves submitting an online application form, followed by a student interaction session and document verification. Please visit our Admissions page or contact the school office to begin.' },
  { q: 'Which board does [School Name] follow?',                     a: '[School Name] is affiliated with the Central Board of Secondary Education (CBSE), New Delhi — one of India\'s most recognized and respected educational boards.' },
  { q: 'What classes does [School Name] offer?',                     a: 'We offer classes from Nursery (Pre-Primary) through Class XII, covering Pre-Primary, Primary (I–V), Middle (VI–VIII), Secondary (IX–X), and Senior Secondary (XI–XII) with Science, Commerce, and Arts streams.' },
  { q: 'Does [School Name] provide transport facilities?',           a: 'Yes, [School Name] operates GPS-enabled school buses covering all major areas of [City]. All buses have trained drivers and attendants, and real-time tracking is available to parents.' },
  { q: 'Is [School Name] among the best schools in [City]?',        a: '[School Name] is consistently recognized as one of the top CBSE schools in [City], known for academic excellence, modern infrastructure, and holistic student development since [Year].' },
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
          at [School Name] in [City].
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
                  <p itemProp="text" className={styles.answerText}>{faq.a}</p>
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
```

### /components/faq/faq.module.css

```css
.section {
  padding: var(--section-pad);
  background: var(--color-off-white);
}

.container {
  max-width: 820px;
  margin: 0 auto;
}

.sectionTop {
  text-align: center;
  margin-bottom: 52px;
  position: relative;
}

/* Decorative large faint ? mark */
.decoMark {
  position: absolute;
  top: -20px;
  left: 50%;
  transform: translateX(-50%);
  font-family: var(--font-heading);
  font-size: 9rem;
  font-weight: var(--weight-bold);
  color: rgba(201,160,82,0.06);
  line-height: 1;
  pointer-events: none;
  user-select: none;
  z-index: 0;
}

.label {
  font-family: var(--font-body);
  font-size: var(--text-xs);
  font-weight: var(--weight-semibold);
  letter-spacing: var(--tracking-widest);
  text-transform: uppercase;
  color: var(--color-gold);
  display: block;
  margin-bottom: 10px;
  position: relative;
  z-index: 1;
}

.heading {
  font-family: var(--font-heading);
  font-size: var(--text-2xl);
  font-weight: var(--weight-bold);
  color: var(--color-navy);
  display: inline-block;
  padding-bottom: 12px;
  border-bottom: 2px solid var(--color-gold);
  position: relative;
  z-index: 1;
}

.listWrapper {
  position: relative;
}

/* Decorative side vertical rule */
.decoSideRule {
  display: none;
  position: absolute;
  top: 0;
  bottom: 0;
  right: -28px;
  width: 2px;
  background: linear-gradient(to bottom, transparent, var(--color-gold-light), transparent);
  pointer-events: none;
}

.list { display: flex; flex-direction: column; }

.item {
  border-bottom: 1px solid var(--color-border);
}
.item:first-child { border-top: 1px solid var(--color-border); }

.question { margin: 0; }

.questionBtn {
  width: 100%;
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 20px 0;
  text-align: left;
  transition: color 0.3s ease;
}
.questionBtn:hover .questionText { color: var(--color-gold); }

/* Decorative small filled navy square */
.decoSquare {
  display: block;
  width: 6px;
  height: 6px;
  background: var(--color-gold);
  flex-shrink: 0;
}

.questionText {
  font-family: var(--font-body);
  font-size: var(--text-base);
  font-weight: var(--weight-semibold);
  color: var(--color-navy);
  flex: 1;
  line-height: var(--leading-snug);
  transition: color 0.3s ease;
}

.icon {
  font-size: 1.4rem;
  font-weight: var(--weight-light);
  color: var(--color-gold);
  flex-shrink: 0;
  transition: transform 0.3s ease;
  line-height: 1;
}
.iconOpen { transform: rotate(45deg); }

.answer {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.35s ease;
  margin: 0;
  padding-left: 18px;
}
.answerOpen { max-height: 300px; }

.answerText {
  font-family: var(--font-body);
  font-size: var(--text-sm);
  color: var(--color-grey-text);
  line-height: var(--leading-relaxed);
  padding-bottom: 20px;
}

@media (min-width: 768px) {
  .decoSideRule { display: block; }
}
```

---

## COMPONENT 10 — ADMISSION CTA

**UI Design:**
Navy background. Centered. 4-step admission process row. Two CTA buttons.
**Decorative elements:**
- Full-bleed diagonal stripe pattern using CSS (thin navy-on-navy lines, like a subtle weave) in background
- A large outlined gold rectangle (very thin border) positioned behind the heading text, slightly larger than the text block
- Horizontal thin gold rules above and below the steps row
- The two buttons sit inside a subtle outlined box container to group them visually

### /components/admissioncta/admissioncta.js

```jsx
import Link   from 'next/link'
import styles from './admissioncta.module.css'

const steps = [
  { num: '01', label: 'Fill Online Application' },
  { num: '02', label: 'Student Interaction' },
  { num: '03', label: 'Document Verification' },
  { num: '04', label: 'Confirm Enrollment' },
]

export default function AdmissionCTA() {
  return (
    <section className={styles.section} aria-labelledby="admissions-heading">

      {/* Decorative: diagonal stripe bg */}
      <span className={styles.decoStripes} aria-hidden="true" />

      <div className={styles.container}>

        <div className={styles.headingBlock}>
          {/* Decorative: outlined rectangle behind heading */}
          <span className={styles.decoOutlineRect} aria-hidden="true" />

          <span className={styles.label}>Enroll Your Child</span>
          <h2 id="admissions-heading" className={styles.heading}>
            Admissions Open at [School Name] — [City]
          </h2>
          <p className={styles.subtext}>
            Give your child the best start in life. Join the [School Name] family
            and be part of [City]'s most trusted CBSE school community.
          </p>
        </div>

        <span className="sr-only">
          Apply now for admissions at [School Name], [City] for the academic year 2025–2026.
          Limited seats available across all classes.
        </span>

        {/* Decorative rule above steps */}
        <span className={styles.decoRule} aria-hidden="true" />

        <ul className={styles.steps} aria-label="Admission process steps">
          {steps.map((s, i) => (
            <li key={i} className={styles.step}>
              <span className={styles.stepNum} aria-hidden="true">{s.num}</span>
              <span className={styles.stepLabel}>{s.label}</span>
            </li>
          ))}
        </ul>

        {/* Decorative rule below steps */}
        <span className={styles.decoRule} aria-hidden="true" />

        <div className={styles.btnContainer}>
          <div className={styles.btnBox}>
            <Link href="/admissions" className={styles.btnPrimary}
              aria-label="Apply now for admissions at [School Name], [City]">
              Apply Now
            </Link>
            <Link href="/contact" className={styles.btnSecondary}
              aria-label="Enquire about admissions at [School Name]">
              Enquire Now
            </Link>
          </div>
        </div>

      </div>
    </section>
  )
}
```

### /components/admissioncta/admissioncta.module.css

```css
.section {
  position: relative;
  padding: 100px var(--section-pad-h);
  background: var(--color-navy);
  overflow: hidden;
  text-align: center;
}

/* Decorative diagonal stripe bg */
.decoStripes {
  position: absolute;
  inset: 0;
  background-image: repeating-linear-gradient(
    -55deg,
    transparent,
    transparent 18px,
    rgba(255,255,255,0.015) 18px,
    rgba(255,255,255,0.015) 20px
  );
  pointer-events: none;
  z-index: 0;
}

.container {
  position: relative;
  z-index: 1;
  max-width: 860px;
  margin: 0 auto;
}

.headingBlock {
  position: relative;
  display: inline-block;
  padding: 0 20px;
  margin-bottom: 48px;
}

/* Decorative outlined rectangle behind heading */
.decoOutlineRect {
  position: absolute;
  top: -20px;
  left: -10px;
  right: -10px;
  bottom: -20px;
  border: 1px solid rgba(201,160,82,0.15);
  pointer-events: none;
}

.label {
  font-family: var(--font-body);
  font-size: var(--text-xs);
  font-weight: var(--weight-semibold);
  letter-spacing: var(--tracking-widest);
  text-transform: uppercase;
  color: var(--color-gold);
  display: block;
  margin-bottom: 14px;
}

.heading {
  font-family: var(--font-heading);
  font-size: var(--text-2xl);
  font-weight: var(--weight-bold);
  color: var(--color-white);
  line-height: var(--leading-snug);
  margin-bottom: 16px;
}

.subtext {
  font-family: var(--font-body);
  font-size: var(--text-base);
  color: rgba(250,250,248,0.65);
  line-height: var(--leading-relaxed);
  max-width: 560px;
  margin: 0 auto;
}

/* Decorative rules */
.decoRule {
  display: block;
  width: 100%;
  height: 1px;
  background: linear-gradient(to right, transparent, var(--color-shape-line), transparent);
  margin: 36px 0;
}

/* Steps */
.steps {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}

.step {
  display: flex;
  align-items: center;
  gap: 14px;
}

.stepNum {
  width: 44px;
  height: 44px;
  border: 1px solid var(--color-gold);
  color: var(--color-gold);
  font-family: var(--font-heading);
  font-size: var(--text-sm);
  font-weight: var(--weight-bold);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.stepLabel {
  font-family: var(--font-body);
  font-size: var(--text-sm);
  font-weight: var(--weight-medium);
  color: var(--color-white);
}

/* Button group container */
.btnContainer { display: flex; justify-content: center; }

.btnBox {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 14px;
  border: 1px solid rgba(201,160,82,0.2);
  padding: 24px 36px;
}

.btnPrimary {
  display: inline-block;
  background: var(--color-gold);
  color: var(--color-navy);
  font-family: var(--font-body);
  font-size: var(--text-sm);
  font-weight: var(--weight-bold);
  letter-spacing: var(--tracking-wide);
  text-transform: uppercase;
  padding: 14px 44px;
  transition: background 0.3s ease;
  width: 100%;
  text-align: center;
}
.btnPrimary:hover { background: var(--color-gold-dark); }

.btnSecondary {
  display: inline-block;
  background: transparent;
  color: var(--color-white);
  font-family: var(--font-body);
  font-size: var(--text-sm);
  font-weight: var(--weight-semibold);
  letter-spacing: var(--tracking-wide);
  text-transform: uppercase;
  padding: 13px 44px;
  border: 1px solid rgba(250,250,248,0.4);
  transition: border-color 0.3s ease;
  width: 100%;
  text-align: center;
}
.btnSecondary:hover { border-color: var(--color-white); }

@media (min-width: 560px) {
  .btnBox { flex-direction: row; }
  .btnPrimary, .btnSecondary { width: auto; }
}

@media (min-width: 768px) {
  .section { padding: 120px var(--section-pad-h); }
  .heading { font-size: var(--text-3xl); }
  .steps {
    flex-direction: row;
    justify-content: center;
    gap: 0;
  }
  .step {
    flex-direction: column;
    text-align: center;
    flex: 1;
    gap: 12px;
    position: relative;
  }
  .step:not(:last-child)::after {
    content: '';
    position: absolute;
    top: 22px;
    left: calc(50% + 22px);
    width: calc(100% - 44px);
    height: 1px;
    background: rgba(201,160,82,0.25);
  }
  .stepLabel { font-size: var(--text-xs); letter-spacing: var(--tracking-wide); }
}
```

---

## FINAL CHECKLIST FOR CLAUDE CODE

1. Create all files exactly as listed in the folder structure
2. Confirm `globals.css` has `border-radius: 0 !important` on the `*` selector
3. Confirm **no component CSS file contains any hardcoded hex color** — all colors must be `var(--color-*)` variables
4. Confirm **no element anywhere has `border-radius`** set explicitly
5. Confirm all font sizes use `var(--text-*)` and all font families use `var(--font-*)`
6. Each decorative element (decoRect, decoLine, decoCorner, etc.) must have `aria-hidden="true"` and `pointer-events: none`
7. `'use client'` directive only on FAQ component
8. All other components are Server Components
9. Google Fonts loaded once in layout.js only
10. Add `next.config.js` with `reactStrictMode: true`
11. Create placeholder WebP images in `/public/images/` so the build doesn't fail
12. Run `npm run build` — must compile with zero errors and zero warnings
13. Replace all `[placeholders]` with real values after build is confirmed
14. Test on mobile viewport (375px) — every section must be readable and properly stacked

---

## DECORATIVE ELEMENTS SUMMARY

| Component       | Decorative Elements Used |
|-----------------|-------------------------|
| Hero            | Outline rect (top-right), corner L-bracket (bottom-left), vertical left line |
| About           | Gold offset border behind image, light navy fill behind text, double horizontal rule |
| Stats           | Top + bottom horizontal rules, ghost outline rect behind numbers |
| Why Choose Us   | Rotated faint navy square (top-right bg), vertical gold bar beside heading |
| Programs        | Full-width gradient rule, faint large number behind each card |
| Facilities      | Cross-hatch line pattern behind grid, corner bracket on image hover |
| Gallery         | Rule–heading–rule layout, bottom-right corner mark on every image |
| Testimonials    | Dot grid background, large faint quote mark behind each card |
| FAQ             | Large faint ? behind heading, small filled square before question, side vertical rule |
| Admission CTA   | Diagonal stripe bg, outlined rect behind heading, horizontal rules above/below steps, outlined button container |
