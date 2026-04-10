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

// @ts-ignore The provided mock API is a plain JavaScript module without declarations.
import * as externalApi from "@/services/api/external/api.js"

const providedApiModule = externalApi as ProvidedApiModule

export const providedApi = {
  async getCountries() {
    return providedApiModule.getCountries()
  },
  async searchGeo(query?: string) {
    return providedApiModule.searchGeo(query)
  },
  async startSearchPrices(countryId: string) {
    return providedApiModule.startSearchPrices(countryId)
  },
  async getSearchPrices(token: string) {
    return providedApiModule.getSearchPrices(token)
  },
  async stopSearchPrices(token: string) {
    return providedApiModule.stopSearchPrices(token)
  },
  async getHotels(countryId: string) {
    return providedApiModule.getHotels(countryId)
  },
  async getHotel(hotelId: number | string) {
    return providedApiModule.getHotel(hotelId)
  },
  async getPrice(priceId: string) {
    return providedApiModule.getPrice(priceId)
  },
}
