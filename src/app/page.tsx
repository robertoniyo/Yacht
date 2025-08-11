import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import FeatureGrid from '@/components/FeatureGrid'
import FleetCarousel from '@/components/FleetCarousel'
import CTA from '@/components/CTA'
import Footer from '@/components/Footer'

export default function Page() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <FeatureGrid />
        <FleetCarousel />
        <CTA />
      </main>
      <Footer />
    </>
  )
}


