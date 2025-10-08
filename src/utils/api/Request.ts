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

export async function fetchCountryDetails(
  name: string
): Promise<Country | null> {
  try {
    const res = await fetch(
      `https://restcountries.com/v3.1/name/${name}?fullText=true`,
      {
        next: { revalidate: 120 },
      }
    )

    if (!res.ok) return null

    const data: Country[] = await res.json()
    return data[0] || null
  } catch {
    return null
  }
}


// utils/api/Request.ts
import { CountryDetails } from '@/types/module'

export async function fetchNeighborCountries(
  codes: string[]
): Promise<CountryDetails[]> {
  if (!codes || codes.length === 0) return []
  
  try {
    const res = await fetch(
      `https://restcountries.com/v3.1/alpha?codes=${codes.join(',')}&fields=name,flags,cca3`,
      { cache: 'no-store' }
    )
    if (!res.ok) return []
    const data: CountryDetails[] = await res.json()
    return data
  } catch {
    return []
  }
}

