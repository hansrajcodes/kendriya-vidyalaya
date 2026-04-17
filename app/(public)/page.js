import dynamic from 'next/dynamic'
import Hero          from '@/components/hero/hero'
import About         from '@/components/about/about'
import Stats         from '@/components/stats/stats'
import WhyChooseUs   from '@/components/whychooseus/whychooseus'
import Programs      from '@/components/programs/programs'
import Facilities    from '@/components/facilities/facilities'
import Gallery       from '@/components/gallery/gallery'
import FAQ           from '@/components/faq/faq'
import AdmissionCTA  from '@/components/admissioncta/admissioncta'

const Testimonials = dynamic(() => import('@/components/testimonials/testimonials'), {
  loading: () => null,
})
import { prisma }    from '@/lib/prisma'

export const metadata = {
  title: 'Kendriya Vidyalaya | Best CBSE School in Moga, Punjab – Admissions Open 2026-27',
  description:
    'Kendriya Vidyalaya is the best CBSE affiliated school in Moga, Punjab. Quality education from Pre-Primary to Class XII with smart classrooms, science labs, sports facilities, and experienced faculty. Admissions open for 2026-27.',
  alternates: { canonical: 'https://www.drkpsmoga.com' },
}

export const revalidate = 60

export default async function HomePage() {
  const testimonials = await prisma.testimonial.findMany({
    where: { isActive: true },
    orderBy: { sortOrder: 'asc' },
    select: { name: true, quote: true, role: true },
  })

  return (
    <main id="main-content">
      <Hero />
      <About />
      <Stats />
      <WhyChooseUs />
      <Programs />
      <Facilities />
      <Gallery />
      <Testimonials data={testimonials} />
      <FAQ />
      <AdmissionCTA />
    </main>
  )
}
