import { useState } from "react"
import { uiText } from "@/shared/config/ui-text"
import { TourResults } from "@/widgets/tour-results/TourResults"
import { SearchForm } from "@/widgets/search-form/SearchForm"
import type { DestinationComboboxItem } from "@/widgets/search-form/model"
import { useToursSearch } from "@/widgets/search-form/useToursSearch"

export function HomePage() {
  const [submittedCountryId, setSubmittedCountryId] = useState<string | null>(null)
  const toursQuery = useToursSearch(submittedCountryId)
  const errorMessage =
    toursQuery.error instanceof Error
      ? toursQuery.error.message
      : uiText.loadingToursError

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
            {uiText.toursTitle}
          </p>
          <h1 className="mt-3 max-w-2xl text-3xl font-semibold leading-tight sm:text-4xl">
            {uiText.toursHeading}
          </h1>
          <p className="mt-3 max-w-2xl text-sm text-slate-300 sm:text-base">
            {uiText.toursDescription}
          </p>
        </div>
        <div className="px-8 py-8">
          <SearchForm onSubmit={handleSearchSubmit} />
          {submittedCountryId ? (
            <div className="mt-8">
              {toursQuery.isPending ? (
                <p className="text-sm text-slate-600">{uiText.loadingTours}</p>
              ) : null}

              {toursQuery.isError ? (
                <p className="text-sm text-red-600">{errorMessage}</p>
              ) : null}

              {toursQuery.isSuccess && toursQuery.data.length === 0 ? (
                <p className="text-sm text-slate-600">{uiText.noToursFound}</p>
              ) : null}

              {toursQuery.isSuccess && toursQuery.data.length > 0 ? (
                <TourResults tours={toursQuery.data} />
              ) : null}
            </div>
          ) : null}
        </div>
      </div>
    </main>
  )
}
