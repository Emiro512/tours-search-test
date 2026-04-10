import { useState } from "react"
import { uiText } from "@/shared/config/ui-text"
import { Skeleton } from "@/shared/ui/skeleton/Skeleton"
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
          <div className="mx-auto w-full max-w-[700px]">
            <SearchForm
              isSubmitting={Boolean(submittedCountryId && toursQuery.isPending)}
              onSubmit={handleSearchSubmit}
            />
            {submittedCountryId ? (
              <div className="mt-8">
                {toursQuery.isPending ? (
                  <div
                    className="grid w-full grid-cols-1 gap-5 px-4 py-4 sm:grid-cols-2 sm:p-[25px]"
                    aria-label={uiText.loadingTours}
                  >
                    {[0, 1].map((item) => (
                      <div
                        key={item}
                        className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm"
                      >
                        <Skeleton className="h-44 rounded-none" />
                        <div className="space-y-3 p-5">
                          <Skeleton className="h-5 w-3/4" />
                          <Skeleton className="h-4 w-1/2" />
                          <Skeleton className="h-4 w-2/3" />
                          <div className="flex items-center justify-between gap-3 pt-1">
                            <Skeleton className="h-6 w-24" />
                            <Skeleton className="h-4 w-20" />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
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
      </div>
    </main>
  )
}
