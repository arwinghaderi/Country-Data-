'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import SectionHeader from '../../module/sectionHeader/sectionHeader'

interface Country {
  name: { common: string }
  capital?: string[]
  flags?: { png: string; alt?: string }
  region?: string
  population?: number
}

interface CountryCardProps {
  countries: Country[]
}

export default function CountryCard({ countries }: CountryCardProps) {
  return (
    <section className="bg-gray-50 dark:bg-gray-950 py-16 transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-6 text-right">
        <SectionHeader
          title="کشورهای جهان 🌍"
          dec="شما میتوانید جزیات تمامی کشور های حهان را ببینید"
                  center={false}
                  
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {countries.map((country, index) => (
            <motion.div
              key={country.name.common}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.03 }}
              whileHover={{
                scale: 1.05,
                rotate: 0.5,
                transition: { type: 'spring', stiffness: 300 },
              }}
              className="group bg-white dark:bg-gray-900 rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-200 dark:border-gray-800"
            >
              {country.flags?.png && (
                <div className="relative w-full h-48 overflow-hidden">
                  <Image
                    src={country.flags.png || ''}
                    alt={country.flags.alt || country.name.common}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
              )}

              <div className="p-5">
                <h3 className="text-lg md:text-xl font-bold text-gray-900 dark:text-gray-100 mb-2 group-hover:text-amber-500 transition-colors">
                  {country.name.common}
                </h3>
                <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-1">
                  {country.capital && (
                    <li>
                      <span className="font-semibold text-gray-900 dark:text-gray-100">
                        پایتخت:
                      </span>{' '}
                      {country.capital.join(', ')}
                    </li>
                  )}
                  {country.region && (
                    <li>
                      <span className="font-semibold text-gray-900 dark:text-gray-100">
                        منطقه:
                      </span>{' '}
                      {country.region}
                    </li>
                  )}
                  {country.population && (
                    <li>
                      <span className="font-semibold text-gray-900 dark:text-gray-100">
                        جمعیت:
                      </span>{' '}
                      {country.population.toLocaleString()}
                    </li>
                  )}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
