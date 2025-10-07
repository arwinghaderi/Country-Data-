import { Country } from '../../types/module'

export async function fetchCountries(): Promise<Country[]> {
  const res = await fetch(
    'https://restcountries.com/v3.1/all?fields=name,capital,flags,region,population',
    { cache: 'no-store' }
  )

  if (!res.ok) {
    throw new Error('خطا در دریافت داده‌های کشورها')
  }

  const data: Country[] = await res.json()
  return data
}
