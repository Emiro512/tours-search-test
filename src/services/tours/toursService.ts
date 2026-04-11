import { getHotels } from "@/services/api/hotelsApi"
import type { ApiHotelsMapDto } from "@/services/api/api.types"
import { runSearch } from "@/services/search/searchService"
import { aggregateTours } from "@/services/tours/toursAggregator"

type HotelsCacheEntry = {
  data: ApiHotelsMapDto
  expiresAt: number
}

const HOTELS_CACHE_TTL_MS = 5 * 60 * 1000
const HOTELS_CACHE_MAX_SIZE = 10

const hotelsByCountryCache = new Map<string, HotelsCacheEntry>()

function evictOldestHotelCacheEntry() {
  if (hotelsByCountryCache.size <= HOTELS_CACHE_MAX_SIZE) {
    return
  }

  const oldestCountryId = hotelsByCountryCache.keys().next().value

  if (oldestCountryId) {
    hotelsByCountryCache.delete(oldestCountryId)
  }
}

async function getHotelsByCountry(countryId: string): Promise<ApiHotelsMapDto> {
  const cachedEntry = hotelsByCountryCache.get(countryId)

  if (cachedEntry) {
    if (cachedEntry.expiresAt > Date.now()) {
      return cachedEntry.data
    }

    hotelsByCountryCache.delete(countryId)
  }

  const hotels = await getHotels(countryId)

  hotelsByCountryCache.set(countryId, {
    data: hotels,
    expiresAt: Date.now() + HOTELS_CACHE_TTL_MS,
  })
  evictOldestHotelCacheEntry()

  return hotels
}

export async function getToursByCountry(countryId: string) {
  const [searchResult, hotels] = await Promise.all([
    runSearch(countryId),
    getHotelsByCountry(countryId),
  ])

  return aggregateTours(searchResult, hotels)
}
