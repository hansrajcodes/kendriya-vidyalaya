import PageHero from '@/components/pagehero/pagehero'
import ApplyForm from './apply-form'

export const metadata = {
  title: 'Apply Online | Kendriya Vidyalaya, Moga',
  description:
    'Submit your admission application online for Kendriya Vidyalaya, Moga — Pre-Primary to Class XII.',
}

export default function ApplyPage() {
  return (
    <main>
      <PageHero
        title="Apply Online"
        breadcrumbs={[
          { label: 'Admission', href: '/admission' },
          { label: 'Apply' },
        ]}
      />
      <ApplyForm />
    </main>
  )
}
