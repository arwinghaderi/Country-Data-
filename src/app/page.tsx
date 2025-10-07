'use client'

import Image from 'next/image'

export default function Home() {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 px-4">
      {/* Hero Text */}
      <h1 className="text-4xl md:text-6xl font-bold mb-4 text-center">
        Explore Countries Around the World
      </h1>

      <p className="text-lg md:text-2xl text-center max-w-xl mb-8  text-amber-300 ">
        Browse all countries, see flags, regions, capitals, and more. Built with
        Next.js, Tailwind CSS, React Query, and shadcn/ui.
      </p>

      {/* Placeholder image (optional) */}
      <div className="w-full max-w-md">
        <Image
          src="/world-map.jpg"
          alt="World Map"
          width={600}
          height={400}
          className="mx-auto"
        />
      </div>
    </section>
  )
}
