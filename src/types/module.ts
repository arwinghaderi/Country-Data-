export interface Country {
  name: {
    common: string
    official: string
    nativeName?: {
      [lang: string]: {
        official: string
        common: string
      }
    }
  }
  capital?: string[]
  region?: string
  population?: number
  flags?: {
    png: string
    svg: string
    alt?: string
  }
  cca3: string
}
