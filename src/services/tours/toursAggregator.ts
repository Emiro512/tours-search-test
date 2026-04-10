import type { ApiHotelsMapDto } from "@/services/api/api.types"
import type { SearchResult } from "@/services/search/search.types"
import type { TourListItem } from "./tours.types"

function createHotelIndex(hotels: ApiHotelsMapDto): Map<string, ApiHotelsMapDto[string]> {
  return new Map(
    Object.values(hotels).map((hotel) => [String(hotel.id), hotel]),
  )
}

export function aggregateTours(
  searchResult: SearchResult,
  hotels: ApiHotelsMapDto,
): TourListItem[] {
  const hotelIndex = createHotelIndex(hotels)

  return searchResult.prices
    .flatMap((price) => {
      const hotel = hotelIndex.get(price.hotelId)

      if (!hotel) {
        return []
      }

      return [
        {
          priceId: price.id,
          hotelId: price.hotelId,
          hotelName: hotel.name,
          hotelImage: hotel.img,
          countryName: hotel.countryName,
          cityName: hotel.cityName,
          amount: price.amount,
          currency: price.currency,
          startDate: price.startDate,
          endDate: price.endDate,
        },
      ]
    })
    .sort((left, right) => left.amount - right.amount)
}
