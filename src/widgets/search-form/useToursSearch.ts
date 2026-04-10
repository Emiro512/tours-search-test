import { useQuery } from "@tanstack/react-query"
import { getToursByCountry } from "@/services/tours/toursService"

export function useToursSearch(countryId: string | null) {
  return useQuery({
    queryKey: ["tours", "country", countryId],
    queryFn: () => {
      if (!countryId) {
        throw new Error("Country id is required to load tours.")
      }

      return getToursByCountry(countryId)
    },
    enabled: Boolean(countryId),
  })
}
