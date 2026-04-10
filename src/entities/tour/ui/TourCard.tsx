import { Link } from "react-router-dom"
import { formatDate } from "@/shared/lib/format/formatDate"
import { formatPrice } from "@/shared/lib/format/formatPrice"
import { uiText } from "@/shared/config/ui-text"
import type { TourListItem } from "@/services/tours/tours.types"

type TourCardProps = {
  tour: TourListItem
}

export function TourCard({ tour }: TourCardProps) {
  return (
    <article className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
      <img
        src={tour.hotelImage}
        alt={tour.hotelName}
        className="h-44 w-full object-cover"
      />
      <div className="space-y-3 p-5">
        <div>
          <p className="text-lg font-semibold text-slate-900">{tour.hotelName}</p>
          <p className="mt-1 text-sm text-slate-500">
            {tour.countryName} · {tour.cityName}
          </p>
        </div>

        <p className="text-sm text-slate-600">
          {formatDate(tour.startDate)} - {formatDate(tour.endDate)}
        </p>

        <div className="flex items-center justify-between gap-3">
          <p className="text-xl font-semibold text-slate-900">
            {formatPrice(tour.amount, tour.currency)}
          </p>
          <Link
            to={`/tour/${tour.hotelId}/${tour.priceId}`}
            className="text-sm font-medium text-slate-900 underline underline-offset-4"
          >
            {uiText.openPrice}
          </Link>
        </div>
      </div>
    </article>
  )
}
