'use client'

import { useState, useEffect } from 'react'
import CountryFilter from '../CountryFilter/CountryFilter'
import CountryCard from '../CountryCard/CountryCard'
import { Country } from '@/types/module'
import SectionHeader from '../../module/sectionHeader/sectionHeader'

interface CountrySectionProps {
  initialCountries: Country[]
}

export default function CountrySection({
  initialCountries,
}: CountrySectionProps) {
  const [filteredCountries, setFilteredCountries] =
    useState<Country[]>(initialCountries)

  const [visibleCount, setVisibleCount] = useState(8)

  const applyFilter = (
    countries: Country[],
    filter: { search: string; region: string }
  ) => {
    const { search, region } = filter
    return countries.filter((c) => {
      const matchesRegion = region ? c.region === region : true
      const matchesSearch = search
        ? c.name.common.toLowerCase().includes(search.toLowerCase())
        : true
      return matchesRegion && matchesSearch
    })
  }

  const handleFilter = (
    countries: Country[],
    search: string,
    region: string
  ) => {
    const current = JSON.stringify(filteredCountries.map((c) => c.name.common))
    const next = JSON.stringify(countries.map((c) => c.name.common))

    if (current !== next) {
      setFilteredCountries(countries)
      setVisibleCount(8) 
      localStorage.setItem('countryFilter', JSON.stringify({ search, region }))
    }
  }

  useEffect(() => {
    const stored = localStorage.getItem('countryFilter')
    if (stored) {
      const parsed = JSON.parse(stored)
      const filtered = applyFilter(initialCountries, parsed)
      setFilteredCountries(filtered)
    }
  }, [initialCountries])

  return (
    <section className="bg-gray-50 dark:bg-gray-900 py-16 transition-colors duration-500">
      <div className="container mx-auto px-4">
        {/* Header + Filter */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-10">
          <SectionHeader
            title="کشورهای جهان 🌍"
            dec="شما می‌توانید جزئیات تمامی کشورهای جهان را مشاهده کنید"
            center={false}
          />

          <CountryFilter
            onFilter={handleFilter}
            allCountries={initialCountries}
          />
        </div>

        {/* Country List */}
        <CountryCard countries={filteredCountries.slice(0, visibleCount)} />

        {/* Load More Button */}
        {visibleCount < filteredCountries.length && (
          <div className="flex justify-center mt-10">
            <button
              onClick={() => setVisibleCount((prev) => prev + 8)}
              className="bg-amber-400 hover:bg-amber-500 dark:bg-amber-500 dark:hover:bg-amber-400 text-white px-6 py-3 rounded-xl shadow-md transition-all font-semibold flex items-center gap-2"
            >
              مشاهده کشورهای بیشتر 🌎
            </button>
          </div>
        )}

        {/* Empty State */}
        {filteredCountries.length === 0 && (
          <div className="text-center mt-10 text-gray-500 dark:text-gray-400 text-lg font-medium">
            هیچ کشوری با فیلتر فعلی پیدا نشد 😔
          </div>
        )}
      </div>
    </section>
  )
}
