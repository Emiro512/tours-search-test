type ProvidedApiModule = {
  getCountries: () => Promise<Response>
  searchGeo: (query?: string) => Promise<Response>
  startSearchPrices: (countryID: string) => Promise<Response>
  getSearchPrices: (token: string) => Promise<Response>
  stopSearchPrices: (token: string) => Promise<Response>
  getHotels: (countryID: string) => Promise<Response>
  getHotel: (hotelId: number | string) => Promise<Response>
  getPrice: (priceId: string) => Promise<Response>
}

async function loadProvidedApi(): Promise<ProvidedApiModule> {
  const importProvidedApi = new Function(
    'return import("@/services/api/external/api.js")',
  ) as () => Promise<ProvidedApiModule>

  return importProvidedApi()
}

export const providedApi = {
  async getCountries() {
    return (await loadProvidedApi()).getCountries()
  },
  async searchGeo(query?: string) {
    return (await loadProvidedApi()).searchGeo(query)
  },
  async startSearchPrices(countryId: string) {
    return (await loadProvidedApi()).startSearchPrices(countryId)
  },
  async getSearchPrices(token: string) {
    return (await loadProvidedApi()).getSearchPrices(token)
  },
  async stopSearchPrices(token: string) {
    return (await loadProvidedApi()).stopSearchPrices(token)
  },
  async getHotels(countryId: string) {
    return (await loadProvidedApi()).getHotels(countryId)
  },
  async getHotel(hotelId: number | string) {
    return (await loadProvidedApi()).getHotel(hotelId)
  },
  async getPrice(priceId: string) {
    return (await loadProvidedApi()).getPrice(priceId)
  },
}
