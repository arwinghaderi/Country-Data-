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
  const [searchFilter, setSearchFilter] = useState<string>('')
  const [regionFilter, setRegionFilter] = useState<string>('')
  const [loadMoreClicked, setLoadMoreClicked] = useState(false)

  const [visibleCount, setVisibleCount] = useState<number>(8)

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
      setSearchFilter(search)
      setRegionFilter(region)
      setLoadMoreClicked(false)
      let count = visibleCount
      const stored = localStorage.getItem('countryFilter-1')
      if (stored) {
        const parsed = JSON.parse(stored)
        count = parsed.visibleCount || 8
      }
      setVisibleCount(count)
      localStorage.setItem(
        'countryFilter-1',
        JSON.stringify({ search, region, visibleCount: count })
      )
    }
  }

  useEffect(() => {
    const stored = localStorage.getItem('countryFilter-1')
    if (stored) {
      const parsed = JSON.parse(stored)
      const filtered = applyFilter(initialCountries, parsed)
      setFilteredCountries(filtered)
      setVisibleCount(parsed.visibleCount || 8)
      setSearchFilter(parsed.search || '')
      setRegionFilter(parsed.region || '')
      if (parsed.visibleCount && parsed.visibleCount > 8) {
        setLoadMoreClicked(true)
      }
    } else {
      setFilteredCountries(initialCountries)
      setVisibleCount(8)
    }
  }, [initialCountries])

  useEffect(() => {
    const stored = localStorage.getItem('countryFilter-1')
    if (stored) {
      const parsed = JSON.parse(stored)
      if (parsed.visibleCount && parsed.visibleCount !== visibleCount) {
        setVisibleCount(parsed.visibleCount)
      }
    }
  }, []) 

  const handleLoadMore = () => {
    const nextCount = visibleCount + 8
    setVisibleCount(nextCount)
    setLoadMoreClicked(true)
    localStorage.setItem(
      'countryFilter-1',
      JSON.stringify({
        search: searchFilter,
        region: regionFilter,
        visibleCount: nextCount,
      })
    )
  }

  const handleResetLoadMore = () => {
    setVisibleCount(8)
    setLoadMoreClicked(false)
    localStorage.setItem(
      'countryFilter-1',
      JSON.stringify({
        search: searchFilter,
        region: regionFilter,
        visibleCount: 8,
      })
    )
  }

  return (
    <section className="bg-gray-50 dark:bg-gray-900 py-16 transition-colors duration-500">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-10 gap-4">
          <SectionHeader
            title="کشورهای جهان 🌍"
            dec="شما می‌توانید جزئیات تمامی کشورهای جهان را مشاهده کنید"
            center={false}
          />
          <div className="w-full">
            <CountryFilter
              onFilter={handleFilter}
              allCountries={initialCountries}
            />
          </div>
        </div>

        <CountryCard countries={filteredCountries.slice(0, visibleCount)} />

        {visibleCount < filteredCountries.length && (
          <div className="flex justify-center mt-10 gap-5">
            <button
              onClick={handleLoadMore}
              className="bg-amber-400 cursor-pointer hover:bg-amber-500 dark:bg-amber-500 dark:hover:bg-amber-400 text-white px-6 py-3 rounded-xl shadow-md transition-all font-semibold flex items-center gap-2"
            >
              مشاهده کشورهای بیشتر 🌎
            </button>
            <button
              onClick={handleResetLoadMore}
              disabled={!loadMoreClicked}
              className={`px-4 py-2 rounded-xl shadow-md transition-all font-semibold text-white ${
                loadMoreClicked
                  ? 'bg-red-500 hover:bg-red-600 cursor-pointer'
                  : 'bg-gray-400 cursor-not-allowed'
              }`}
            >
              ریست مشاهده بیشتر 🔄
            </button>
          </div>
        )}

        {filteredCountries.length === 0 && (
          <div className="text-center mt-10 text-gray-500 dark:text-gray-400 text-lg font-medium">
            هیچ کشوری با فیلتر فعلی پیدا نشد
          </div>
        )}
      </div>
    </section>
  )
}
