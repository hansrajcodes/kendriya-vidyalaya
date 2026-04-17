import Navbar from '@/components/navbar/navbar'
import Footer from '@/components/footer/footer'

const SITE_URL = 'https://www.drkpsmoga.com'
const SCHOOL_NAME = 'Kendriya Vidyalaya'

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SCHOOL_NAME} | Best CBSE School in Moga, Punjab – Admissions Open 2026-27`,
    template: `%s | Kendriya Vidyalaya, Moga`,
  },
  description:
    'Kendriya Vidyalaya is the best CBSE affiliated school in Moga, Punjab, offering quality education from Pre-Primary to Class XII with smart classrooms, science labs, and sports facilities. Admissions open for 2026-27.',
  keywords: [
    'best school in Moga',
    'best school near me',
    'CBSE school Moga',
    'top school Moga Punjab',
    'Kendriya Vidyalaya',
    'Kendriya Vidyalaya Moga',
    'school admissions Moga',
    'best CBSE school in Moga',
    'schools in Moga Punjab',
    'senior secondary school Moga',
    'best school in Moga district',
    'top 10 schools in Moga',
    'CBSE affiliated school Moga Punjab',
    'school near me Moga',
  ],
  openGraph: {
    title: `Kendriya Vidyalaya | Best CBSE School in Moga, Punjab`,
    description: 'Top-rated CBSE school in Moga, Punjab — modern infrastructure, experienced faculty, holistic education from Pre-Primary to Class XII. Admissions open.',
    url: SITE_URL,
    siteName: 'Kendriya Vidyalaya',
    images: [{ url: '/images/hero-bg.webp', width: 1200, height: 630, alt: `${SCHOOL_NAME} campus in Moga, Punjab` }],
    type: 'website',
    locale: 'en_IN',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Kendriya Vidyalaya | Best School in Moga',
    description: 'Admissions open at Kendriya Vidyalaya — Moga\'s most trusted CBSE school since 1989.',
    images: ['/images/hero-bg.webp'],
    site: '@Drkpsmoga',
  },
  robots: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1, 'max-video-preview': -1 },
  alternates: { canonical: SITE_URL },
  verification: {
    // Add your Google Search Console verification code here when ready
    // google: 'your-verification-code',
  },
}

export default function PublicLayout({ children }) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />

      {/* Schema.org — School (EducationalOrganization) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': ['School', 'EducationalOrganization'],
            '@id': `${SITE_URL}/#school`,
            name: SCHOOL_NAME,
            alternateName: 'Kendriya Vidyalaya',
            description: 'Best CBSE affiliated school in Moga, Punjab offering quality education from Pre-Primary (Nursery, LKG, UKG) to Class XII with Science, Commerce, and Arts streams since 1989.',
            url: SITE_URL,
            logo: `${SITE_URL}/navbarlogogold.svg`,
            image: `${SITE_URL}/images/hero-bg.webp`,
            telephone: ['+91-163-6237724', '+91-9814207229'],
            email: 'drkpsmoga@gmail.com',
            foundingDate: '1989',
            curriculumUsed: 'CBSE',
            educationalLevel: ['Pre-Primary', 'Primary', 'Middle School', 'Secondary', 'Senior Secondary'],
            numberOfStudents: { '@type': 'QuantitativeValue', value: 1500 },
            sameAs: [
              'https://www.facebook.com/12kps/',
              'https://www.instagram.com/drkpsmoga/',
              'https://www.youtube.com/@Dr.kpsmoga',
              'https://x.com/Drkpsmoga',
            ],
            address: {
              '@type': 'PostalAddress',
              streetAddress: 'Kichlu Rd, Hardev Nagar',
              addressLocality: 'Moga',
              addressRegion: 'Punjab',
              postalCode: '142001',
              addressCountry: 'IN',
            },
            geo: {
              '@type': 'GeoCoordinates',
              latitude: 30.8216,
              longitude: 75.1580,
            },
            hasMap: 'https://maps.google.com/?cid=10874234501261592119',
            openingHoursSpecification: {
              '@type': 'OpeningHoursSpecification',
              dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
              opens: '08:00',
              closes: '15:00',
            },
            aggregateRating: {
              '@type': 'AggregateRating',
              ratingValue: '4.8',
              reviewCount: '120',
              bestRating: '5',
            },
            areaServed: {
              '@type': 'City',
              name: 'Moga',
              containedInPlace: {
                '@type': 'State',
                name: 'Punjab',
              },
            },
            priceRange: '$$',
          }),
        }}
      />

      {/* Schema.org — LocalBusiness (for "near me" searches) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'LocalBusiness',
            '@id': `${SITE_URL}/#localbusiness`,
            name: SCHOOL_NAME,
            image: `${SITE_URL}/images/hero-bg.webp`,
            telephone: '+91-163-6237724',
            email: 'drkpsmoga@gmail.com',
            url: SITE_URL,
            address: {
              '@type': 'PostalAddress',
              streetAddress: 'Kichlu Rd, Hardev Nagar',
              addressLocality: 'Moga',
              addressRegion: 'Punjab',
              postalCode: '142001',
              addressCountry: 'IN',
            },
            geo: {
              '@type': 'GeoCoordinates',
              latitude: 30.8216,
              longitude: 75.1580,
            },
            openingHoursSpecification: {
              '@type': 'OpeningHoursSpecification',
              dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
              opens: '08:00',
              closes: '15:00',
            },
            priceRange: '$$',
            aggregateRating: {
              '@type': 'AggregateRating',
              ratingValue: '4.8',
              reviewCount: '120',
              bestRating: '5',
            },
          }),
        }}
      />

      {/* Schema.org — WebSite (for sitelinks search) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebSite',
            '@id': `${SITE_URL}/#website`,
            name: 'Kendriya Vidyalaya',
            url: SITE_URL,
            publisher: { '@id': `${SITE_URL}/#school` },
          }),
        }}
      />
    </>
  )
}
