'use client'

import { useState, useEffect, useRef } from 'react'
import { Search, Globe2, RotateCcw, ChevronDown } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { Country } from '@/types/module'
import { useDebounce } from '@/hooks/module'
import {
  fetchCountriesByName,
  fetchCountriesByRegion,
} from '@/utils/api/Request'

interface CountryFilterProps {
  onFilter: (countries: Country[], search: string, region: string) => void
  allCountries: Country[]
}

export default function CountryFilter({
  onFilter,
  allCountries,
}: CountryFilterProps) {
  const [search, setSearch] = useState('')
  const [region, setRegion] = useState('')
  const debouncedSearch = useDebounce(search, 500)

  const [selectOpen, setSelectOpen] = useState(false)
  const selectRef = useRef<HTMLDivElement>(null)

  const regions = [
    { value: '', label: '🌐 همه قاره‌ها' },
    { value: 'Africa', label: '🌍 آفریقا' },
    { value: 'Americas', label: '🌎 آمریکا' },
    { value: 'Asia', label: '🌏 آسیا' },
    { value: 'Europe', label: '🌍 اروپا' },
    { value: 'Oceania', label: '🌊 اقیانوسیه' },
  ]

  // Load saved filters
  useEffect(() => {
    const stored = localStorage.getItem('countryFilter')
    if (stored) {
      const parsed = JSON.parse(stored)
      setSearch(parsed.search || '')
      setRegion(parsed.region || '')
    }
  }, [])

  // Fetch filtered data
  useEffect(() => {
    let active = true

    const fetchFiltered = async () => {
      let result: Country[] = []

      if (debouncedSearch.trim()) {
        result = await fetchCountriesByName(debouncedSearch)
      } else if (region) {
        result = await fetchCountriesByRegion(region)
      } else {
        result = allCountries
      }

      if (active) {
        onFilter(result, debouncedSearch, region)
        localStorage.setItem(
          'countryFilter',
          JSON.stringify({ search: debouncedSearch, region })
        )
      }
    }

    fetchFiltered()
    return () => {
      active = false
    }
  }, [debouncedSearch, region, allCountries, onFilter])

  const handleReset = () => {
    setSearch('')
    setRegion('')
    onFilter(allCountries, '', '')
    localStorage.removeItem('countryFilter')
  }

  // Close select when clicked outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(e.target as Node)) {
        setSelectOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 py-6 px-4 rounded-xl shadow-sm"
    >
      {/* Search + Select */}
      <div className="flex flex-col md:flex-row items-center gap-4 w-full">
        {/* Search Input */}
        <div className="relative w-full md:w-1/2">
          <Search className="absolute left-4 top-3.5 text-gray-400 dark:text-gray-500" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="جستجوی کشور..."
            className="w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl pl-12 pr-4 py-3 text-sm md:text-base shadow-sm focus:ring-2 focus:ring-amber-400 dark:focus:ring-amber-500 outline-none transition-all"
          />
        </div>

        {/* Custom Select */}
        <div className="relative w-full md:w-1/3" ref={selectRef}>
          <div
            className="w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl pl-12 pr-4 py
            py-3 text-sm md:text-base shadow-sm cursor-pointer flex items-center justify-between select-none"
            onClick={() => setSelectOpen(!selectOpen)}
          >
            <span>
              {regions.find((r) => r.value === region)?.label ||
                '🌐 همه قاره‌ها'}
            </span>

            {/* آیکون با انیمیشن چرخش */}
            <motion.div
              animate={{ rotate: selectOpen ? 180 : 0 }}
              transition={{ duration: 0.25 }}
            >
              <ChevronDown className="w-4 h-4 text-gray-400 dark:text-gray-500" />
            </motion.div>
          </div>

          {/* Dropdown List */}
          <AnimatePresence>
            {selectOpen && (
              <motion.div
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                transition={{ duration: 0.15 }}
                className="absolute z-10 mt-1 w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-lg max-h-60 overflow-auto"
              >
                {regions.map((r) => (
                  <div
                    key={r.value}
                    className={`px-4 py-2 cursor-pointer hover:bg-amber-100 dark:hover:bg-amber-500 transition-colors ${
                      r.value === region ? 'font-semibold text-amber-500' : ''
                    }`}
                    onClick={() => {
                      setRegion(r.value)
                      setSelectOpen(false)
                    }}
                  >
                    {r.label}
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          <Globe2 className="absolute left-4 top-3.5 text-gray-400 dark:text-gray-500" />
        </div>
      </div>

      <motion.div
        whileTap={{ scale: 0.95 }}
        onClick={handleReset}
        className="mt-5  w-1/2 flex items-center justify-center gap-2 bg-amber-400 dark:bg-amber-500 text-white px-6 py-3 rounded-xl shadow-md hover:bg-amber-500 dark:hover:bg-amber-400 transition-all  cursor-pointer"
      >
        <RotateCcw className="w-4 h-4" />
        <span className="text-sm font-semibold">ریست فیلتر</span>
      </motion.div>
    </motion.div>
  )
}
