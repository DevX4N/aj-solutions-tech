import Hero from '../components/Hero'
import Pillars from '../components/Pillars'
import Services from '../components/Services'
import Process from '../components/Process'
import Differentials from '../components/Differentials'
import Metrics from '../components/Metrics'
import About from '../components/About'
import Testimonials from '../components/Testimonials'
import Faq from '../components/Faq'
import Contact from '../components/Contact'
import useHashScroll from '../lib/useHashScroll'

export default function HomePage() {
  useHashScroll()
  return (
    <>
      <Hero />
      <Pillars />
      <Services />
      <Process />
      <Differentials />
      <Metrics />
      <About />
      <Testimonials />
      <Faq />
      <Contact />
    </>
  )
}
