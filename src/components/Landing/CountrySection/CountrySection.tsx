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
  const [searchFilter, setSearchFilter] = useState<string>('')
  const [regionFilter, setRegionFilter] = useState<string>('')
  const [loadMoreClicked, setLoadMoreClicked] = useState(false) // برای فعال شدن دکمه ریست

  // اعمال فیلتر روی کشورها
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

  // وقتی فیلتر اعمال شد
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
      setSearchFilter(search)
      setRegionFilter(region)
      setLoadMoreClicked(false) // هر بار فیلتر عوض شد، دکمه ریست دوباره غیر فعال شود
      localStorage.setItem(
        'countryFilter',
        JSON.stringify({ search, region, visibleCount: 8 })
      )
    }
  }

  // بارگذاری اولیه فیلتر از localStorage
  useEffect(() => {
    const stored = localStorage.getItem('countryFilter')
    if (stored) {
      const parsed = JSON.parse(stored)
      const filtered = applyFilter(initialCountries, parsed)
      setFilteredCountries(filtered)
      setVisibleCount(parsed.visibleCount || 8)
      setSearchFilter(parsed.search || '')
      setRegionFilter(parsed.region || '')
      if (parsed.visibleCount && parsed.visibleCount > 8)
        setLoadMoreClicked(true)
    }
  }, [initialCountries])

  // وقتی "مشاهده کشورهای بیشتر" زده شد
  const handleLoadMore = () => {
    const nextCount = visibleCount + 8
    setVisibleCount(nextCount)
    setLoadMoreClicked(true) // دکمه ریست فعال می‌شود
    localStorage.setItem(
      'countryFilter',
      JSON.stringify({
        search: searchFilter,
        region: regionFilter,
        visibleCount: nextCount,
      })
    )
  }

  // ریست کردن فقط تعداد مشاهده شده (Load More)
  const handleResetLoadMore = () => {
    setVisibleCount(8)
    setLoadMoreClicked(false) // دوباره غیر فعال می‌شود
    localStorage.setItem(
      'countryFilter',
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
        {/* Header + Filter */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-10 gap-4">
          <SectionHeader
            title="کشورهای جهان 🌍"
            dec="شما می‌توانید جزئیات تمامی کشورهای جهان را مشاهده کنید"
            center={false}
          />
          <div className=" w-full">
            <CountryFilter
              onFilter={handleFilter}
              allCountries={initialCountries}
            />
          </div>
        </div>

        {/* Country List */}
        <CountryCard countries={filteredCountries.slice(0, visibleCount)} />

        {/* Load More + Reset */}
        {visibleCount < filteredCountries.length && (
          <div className="flex justify-center mt-10 gap-5">
            <button
              onClick={handleLoadMore}
              className="bg-amber-400  cursor-pointer hover:bg-amber-500 dark:bg-amber-500 dark:hover:bg-amber-400 text-white px-6 py-3 rounded-xl shadow-md transition-all font-semibold flex items-center gap-2"
            >
              مشاهده کشورهای بیشتر 🌎
            </button>
            <button
              onClick={handleResetLoadMore}
              disabled={!loadMoreClicked} // غیر فعال تا قبل از Load More
              className={`px-4 py-2 rounded-xl shadow-md transition-all font-semibold text-white ${
                loadMoreClicked
                  ? 'bg-red-500 hover:bg-red-600'
                  : 'bg-gray-400 cursor-not-allowed'
              }`}
            >
              ریست مشاهده بیشتر 🔄
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
