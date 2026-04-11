import { useQuery } from "@tanstack/react-query"
import { getToursByCountry } from "@/services/tours/toursService"

export type ToursSearchRequest = {
  countryId: string
  requestId: number
}

export function useToursSearch(request: ToursSearchRequest | null) {
  return useQuery({
    queryKey: ["tours", "country", request?.countryId, request?.requestId],
    queryFn: () => {
      if (!request) {
        throw new Error("Country id is required to load tours.")
      }

      return getToursByCountry(request.countryId)
    },
    enabled: Boolean(request),
  })
}
