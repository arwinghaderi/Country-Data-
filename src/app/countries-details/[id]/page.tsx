import {
  fetchCountryDetails,
  fetchNeighborCountries,
  fetchCountriesByRegion,
} from '@/utils/api/Request'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import { Country, CountryDetails } from '@/types/module'
import SectionHeader from '@/components/module/sectionHeader/sectionHeader'

interface CountryPageProps {
  params: { id: string }
}

export default async function CountryPage({ params }: CountryPageProps) {
  const country: CountryDetails | null = await fetchCountryDetails(params.id)
  if (!country) notFound()

  const neighbors: CountryDetails[] | Country[] = country.borders
    ? await fetchNeighborCountries(country.borders)
    : await fetchCountriesByRegion(country.region || '')

  const {
    name,
    flags,
    capital,
    region,
    subregion,
    population,
    currencies,
    languages,
    borders,
    maps,
    coatOfArms,
  } = country

  return (
    <>
      <section className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 py-16 transition-colors duration-500">
        <div className="container mx-auto px-4">
          <Link
            href="/#countris"
            className="inline-flex items-center gap-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-5 py-3 text-sm shadow hover:shadow-md transition-all mb-10"
          >
            <ArrowLeft className="w-4 h-4" /> بازگشت به جستجوی کشورها
          </Link>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
            <div className="relative w-full h-64 md:h-96 rounded-2xl overflow-hidden shadow-md bg-gray-200 dark:bg-gray-800 flex items-center justify-center">
              {flags?.svg || flags?.png ? (
                <Image
                  src={flags.svg || flags.png}
                  alt={name.common}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="flex items-center justify-center w-full h-full text-gray-500 dark:text-gray-400">
                  تصویر موجود نیست
                </div>
              )}
              {coatOfArms?.svg && (
                <div className="absolute top-4 right-4 w-16 h-16">
                  <Image
                    src={coatOfArms.svg}
                    alt="نشان ملی"
                    fill
                    className="object-contain"
                  />
                </div>
              )}
            </div>

            <div className="flex flex-col gap-4 overflow-auto max-h-[36rem]">
              <h1 className="text-3xl font-bold">{name.common}</h1>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-base">
                <p>
                  <span className="font-semibold">نام رسمی:</span>{' '}
                  {name.official}
                </p>
                <p className="truncate">
                  <span className="font-semibold">نام بومی:</span>{' '}
                  {name.nativeName
                    ? Object.values(name.nativeName)[0]?.common
                    : '-'}
                </p>
                <p>
                  <span className="font-semibold">پایتخت:</span>{' '}
                  {capital?.[0] || '-'}
                </p>
                <p>
                  <span className="font-semibold">قاره/منطقه:</span>{' '}
                  {region || '-'}
                </p>
                <p>
                  <span className="font-semibold">زیرمنطقه:</span>{' '}
                  {subregion || '-'}
                </p>
                <p>
                  <span className="font-semibold">جمعیت:</span>{' '}
                  {population?.toLocaleString('fa-IR') || '-'}
                </p>
                <p className="max-h-20 overflow-y-auto">
                  <span className="font-semibold">واحد پول:</span>{' '}
                  {currencies
                    ? Object.values(currencies).map((c) => (
                        <span key={c.name} className="mr-2 inline-block">
                          {c.symbol} ({c.name})
                        </span>
                      ))
                    : '-'}
                </p>
                <p className="max-h-20 overflow-y-auto">
                  <span className="font-semibold">زبان‌ها:</span>{' '}
                  {languages ? Object.values(languages).join(', ') : '-'}
                </p>
                <p className="max-h-20 overflow-y-auto">
                  <span className="font-semibold">همسایگان:</span>{' '}
                  {borders
                    ? borders.map((b) => (
                        <span
                          key={b}
                          className="inline-block bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded-md mr-1 mb-1"
                        >
                          {b}
                        </span>
                      ))
                    : '-'}
                </p>
                <p>
                  <span className="font-semibold">نقشه گوگل:</span>{' '}
                  {maps?.googleMaps ? (
                    <Link
                      href={maps.googleMaps}
                      target="_blank"
                      className="text-amber-500 hover:underline"
                    >
                      مشاهده روی نقشه
                    </Link>
                  ) : (
                    '-'
                  )}
                </p>
                <p>
                  <span className="font-semibold">توضیح پرچم:</span>{' '}
                  {flags?.alt || '-'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-16 container mx-auto px-4">
        <SectionHeader
          title="کشورهای هم‌قاره‌ای و همسایه 🌍"
          dec={`نمایش ${
            neighbors.length > 8
              ? `۸ کشور از مجموع ${neighbors.length}`
              : neighbors.length
          } کشور`}
          center={false}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {neighbors.slice(0, 8).map((country, idx) => (
            <Link
              key={`${country.name.common}-${idx}`}
              href={`/countries-details/${encodeURIComponent(
                country.name.common
              )}`}
              className="group relative bg-white dark:bg-gray-900 rounded-2xl shadow-lg overflow-hidden border border-gray-200 dark:border-gray-800 transition-transform transform hover:scale-105 hover:shadow-2xl"
            >
              {country.flags?.png ? (
                <div className="relative h-40 w-full overflow-hidden">
                  <Image
                    src={country.flags.png}
                    alt={country.flags.alt || country.name.common}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
              ) : (
                <div className="flex items-center justify-center h-40 bg-gray-200 dark:bg-gray-800 text-gray-500">
                  تصویر موجود نیست
                </div>
              )}

              <div className="p-4 flex flex-col gap-2">
                <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 group-hover:text-amber-500 transition-colors truncate">
                  {country.name.common}
                </h3>
                {country.capital && (
                  <p className="text-sm text-gray-700 dark:text-gray-300 truncate">
                    <span className="font-semibold">پایتخت:</span>{' '}
                    {country.capital.join(', ')}
                  </p>
                )}
                {country.region && (
                  <p className="text-sm text-gray-700 dark:text-gray-300 truncate">
                    <span className="font-semibold">منطقه:</span>{' '}
                    {country.region}
                  </p>
                )}
                {country.population && (
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    <span className="font-semibold">جمعیت:</span>{' '}
                    {country.population.toLocaleString('fa-IR')}
                  </p>
                )}
                <div className="mt-2">
                  <span className="inline-block px-3 py-1 bg-amber-500 text-white text-xs rounded-full font-medium transition-colors group-hover:bg-amber-600">
                    مشاهده کشور
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  )
}
