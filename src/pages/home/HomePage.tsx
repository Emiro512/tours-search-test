import { useState } from "react"
import { SearchForm } from "@/widgets/search-form/SearchForm"
import type { DestinationComboboxItem } from "@/widgets/search-form/model"
import { useToursSearch } from "@/widgets/search-form/useToursSearch"

export function HomePage() {
  const [submittedCountryId, setSubmittedCountryId] = useState<string | null>(null)
  const toursQuery = useToursSearch(submittedCountryId)
  const errorMessage =
    toursQuery.error instanceof Error
      ? toursQuery.error.message
      : "Something went wrong while loading tours."

  function handleSearchSubmit(selection: DestinationComboboxItem | null) {
    if (!selection?.countryId) {
      return
    }

    setSubmittedCountryId(selection.countryId)
  }

  return (
    <main className="mx-auto min-h-screen max-w-5xl px-4 py-10">
      <div className="overflow-hidden rounded-[2rem] bg-white shadow-[0_30px_80px_-50px_rgba(15,23,42,0.45)]">
        <div className="bg-[linear-gradient(135deg,#0f172a,#1e293b_55%,#334155)] px-8 py-10 text-white">
          <p className="text-sm uppercase tracking-[0.24em] text-slate-300">
            Tours Search
          </p>
          <h1 className="mt-3 max-w-2xl text-3xl font-semibold leading-tight sm:text-4xl">
            Find tours by destination
          </h1>
          <p className="mt-3 max-w-2xl text-sm text-slate-300 sm:text-base">
            Choose a country, city, or hotel to explore available tour options.
          </p>
        </div>
        <div className="px-8 py-8">
          <SearchForm onSubmit={handleSearchSubmit} />
          <div className="mt-8">
            {toursQuery.isPending ? (
              <p className="text-sm text-slate-600">Loading tours...</p>
            ) : null}

            {toursQuery.isError ? (
              <p className="text-sm text-red-600">{errorMessage}</p>
            ) : null}

            {toursQuery.isSuccess && toursQuery.data.length === 0 ? (
              <p className="text-sm text-slate-600">No tours found</p>
            ) : null}

            {toursQuery.isSuccess && toursQuery.data.length > 0 ? (
              <ul className="space-y-3">
                {toursQuery.data.map((tour) => (
                  <li
                    key={tour.priceId}
                    className="rounded-2xl border border-slate-200 px-4 py-4"
                  >
                    <p className="text-base font-semibold text-slate-900">
                      {tour.hotelName}
                    </p>
                    <p className="mt-1 text-sm text-slate-600">
                      {tour.countryName} · {tour.cityName}
                    </p>
                    <p className="mt-2 text-sm text-slate-700">
                      {tour.amount} {tour.currency}
                    </p>
                    <p className="mt-1 text-sm text-slate-500">
                      {tour.startDate} - {tour.endDate}
                    </p>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
        </div>
      </div>
    </main>
  )
}
