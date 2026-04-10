import { TourCard } from "@/entities/tour/ui/TourCard"
import type { TourListItem } from "@/services/tours/tours.types"

type TourResultsProps = {
  tours: TourListItem[]
}

export function TourResults({ tours }: TourResultsProps) {
  return (
    <section className="w-full py-4 sm:py-[25px]">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        {tours.map((tour) => (
          <TourCard key={tour.priceId} tour={tour} />
        ))}
      </div>
    </section>
  )
}
