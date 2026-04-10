import { getHotel } from "@/services/api/hotelsApi"
import { getPrice } from "@/services/api/toursApi"

export type TourDetails = {
  hotelId: string
  priceId: string
  hotelName: string
  hotelImage: string
  countryName: string
  cityName: string
  description?: string
  services?: Record<string, string>
  amount: number
  currency: string
  startDate: string
  endDate: string
}

export async function getTourDetails(
  hotelId: string,
  priceId: string,
): Promise<TourDetails> {
  const normalizedHotelId = Number(hotelId)

  const [hotel, price] = await Promise.all([
    getHotel(Number.isNaN(normalizedHotelId) ? hotelId : normalizedHotelId),
    getPrice(priceId),
  ])

  return {
    hotelId: String(hotel.id),
    priceId: price.id,
    hotelName: hotel.name,
    hotelImage: hotel.img,
    countryName: hotel.countryName,
    cityName: hotel.cityName,
    description: hotel.description,
    services: hotel.services,
    amount: price.amount,
    currency: price.currency,
    startDate: price.startDate,
    endDate: price.endDate,
  }
}
