import { Country } from '@/types/module'

export async function fetchCountries(): Promise<Country[]> {
  try {
    const res = await fetch(
      'https://restcountries.com/v3.1/all?fields=name,capital,flags,region,population',
      { cache: 'no-store' }
    )
    if (!res.ok) throw new Error('خطا در دریافت داده‌های کشورها')
    return res.json()
  } catch {
    return []
  }
}

export async function fetchCountriesByName(name: string): Promise<Country[]> {
  try {
    const res = await fetch(
      `https://restcountries.com/v3.1/name/${name}?fields=name,capital,flags,region,population`,
      { cache: 'no-store' }
    )
    if (!res.ok) return []
    return res.json()
  } catch {
    return []
  }
}

export async function fetchCountriesByRegion(
  region: string
): Promise<Country[]> {
  try {
    const res = await fetch(
      `https://restcountries.com/v3.1/region/${region}?fields=name,capital,flags,region,population`,
      { cache: 'no-store' }
    )
    if (!res.ok) return []
    return res.json()
  } catch {
    return []
  }
}
