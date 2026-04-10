import { getHotels } from "@/services/api/hotelsApi"
import type { ApiHotelsMapDto } from "@/services/api/api.types"
import { runSearch } from "@/services/search/searchService"
import { aggregateTours, type TourListItem } from "@/services/tours/toursAggregator"

const hotelsByCountryCache = new Map<string, ApiHotelsMapDto>()

async function getHotelsByCountry(countryId: string): Promise<ApiHotelsMapDto> {
  const cachedHotels = hotelsByCountryCache.get(countryId)

  if (cachedHotels) {
    return cachedHotels
  }

  const hotels = await getHotels(countryId)

  hotelsByCountryCache.set(countryId, hotels)

  return hotels
}

export async function getToursByCountry(countryId: string): Promise<TourListItem[]> {
  const [searchResult, hotels] = await Promise.all([
    runSearch(countryId),
    getHotelsByCountry(countryId),
  ])

  return aggregateTours(searchResult, hotels)
}
