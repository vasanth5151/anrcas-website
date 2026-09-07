import Seo from '../../../lib/Seo'
import Hero from './Hero'
import TrustStrip from './TrustStrip'
import AboutPreview from './AboutPreview'
import WhyChoose from './WhyChoose'
import Pathway from './Pathway'
import AdmissionCta from './AdmissionCta'
import CampusExperience from './CampusExperience'
import LatestNews from './LatestNews'
import BlogsGrid from './BlogsGrid'
import FaqSection from './FaqSection'
import LocationSection from '../../ui/LocationSection'
import { faqs } from '../../../data/content'
import { site } from '../../../data/site'

const homeSchema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'EducationalOrganization',
      '@id': `${site.url}/#organization`,
      name: site.name,
      alternateName: site.shortName,
      url: site.url,
      email: site.email,
      telephone: site.phones.map((phone) => phone.replace(/\s/g, '')),
      foundingDate: site.established,
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Vadamavandal',
        addressLocality: 'Vadamavandal',
        addressRegion: 'Tamil Nadu',
        addressCountry: 'IN',
      },
    },
    {
      '@type': 'FAQPage',
      mainEntity: faqs.map((faq) => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: { '@type': 'Answer', text: faq.answer },
      })),
    },
  ],
}

export default function HomePage() {
  return (
    <>
      <Seo schema={homeSchema} />
      <Hero />
      <TrustStrip />
      <AboutPreview />
      <WhyChoose />
      <Pathway />
      <AdmissionCta />
      <CampusExperience />
      <LatestNews />
      <FaqSection />
      <BlogsGrid />
      <LocationSection />
    </>
  )
}
