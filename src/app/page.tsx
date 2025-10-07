import Image from 'next/image'
import HeroTitle from '@/components/Landing/HeroTitle/HeroTitle'
import FeatureSection from '../components/Landing/FeatureSection/FeatureSection'

export default function Home() {
  return (
    <>
      <section className="relative min-h-screen flex items-center justify-start overflow-hidden">
        <Image
          src="/world-map.jpg"
          alt="World Map"
          fill
          priority
          className="object-cover object-center brightness-[0.6]"
        />

        <div className="absolute inset-0 bg-gradient-to-l from-black/70 via-black/40 to-transparent" />

        <div className="relative z-10 text-right px-8 sm:px-16 md:px-24  w-full md:w-1/2">
          <HeroTitle />
        </div>
      </section>
      <section>
          <FeatureSection />
      </section>
    </>
  )
}
