import { useQuery } from "@tanstack/react-query"
import { getTourDetails } from "@/services/tours/tourDetailsService"

type UseTourDetailsParams = {
  hotelId?: string
  priceId?: string
}

export function useTourDetails({
  hotelId,
  priceId,
}: UseTourDetailsParams) {
  return useQuery({
    queryKey: ["tour-details", hotelId, priceId],
    queryFn: () => {
      if (!hotelId || !priceId) {
        throw new Error("Некоректне посилання на тур.")
      }

      return getTourDetails(hotelId, priceId)
    },
    enabled: Boolean(hotelId && priceId),
  })
}
