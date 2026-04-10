import { Link, useParams } from "react-router-dom"
import { formatDate } from "@/shared/lib/format/formatDate"
import { formatPrice } from "@/shared/lib/format/formatPrice"
import { useTourDetails } from "@/pages/tour-details/useTourDetails"

export function TourDetailsPage() {
  const { hotelId, priceId } = useParams()
  const detailsQuery = useTourDetails({ hotelId, priceId })

  if (!hotelId || !priceId) {
    return (
      <main className="mx-auto min-h-screen max-w-5xl px-4 py-10">
        <div className="rounded-3xl bg-white p-8 shadow-sm">
          <p className="text-sm text-red-600">Некоректне посилання на тур.</p>
          <Link to="/" className="mt-4 inline-block text-sm font-medium text-slate-900 underline underline-offset-4">
            Повернутися до пошуку
          </Link>
        </div>
      </main>
    )
  }

  if (detailsQuery.isPending) {
    return (
      <main className="mx-auto min-h-screen max-w-5xl px-4 py-10">
        <div className="rounded-3xl bg-white p-8 shadow-sm">
          <p className="text-sm text-slate-600">Завантаження деталей туру...</p>
        </div>
      </main>
    )
  }

  if (detailsQuery.isError) {
    const errorMessage =
      detailsQuery.error instanceof Error
        ? detailsQuery.error.message
        : "Не вдалося завантажити деталі туру."

    return (
      <main className="mx-auto min-h-screen max-w-5xl px-4 py-10">
        <div className="rounded-3xl bg-white p-8 shadow-sm">
          <p className="text-sm text-red-600">{errorMessage}</p>
          <Link to="/" className="mt-4 inline-block text-sm font-medium text-slate-900 underline underline-offset-4">
            Повернутися до пошуку
          </Link>
        </div>
      </main>
    )
  }

  const details = detailsQuery.data

  return (
    <main className="mx-auto min-h-screen max-w-5xl px-4 py-10">
      <div className="overflow-hidden rounded-[2rem] bg-white shadow-[0_30px_80px_-50px_rgba(15,23,42,0.45)]">
        <div className="relative h-72 bg-slate-200 sm:h-96">
          {details.hotelImage ? (
            <img
              src={details.hotelImage}
              alt={details.hotelName}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full items-center justify-center bg-[linear-gradient(135deg,#cbd5e1,#e2e8f0)]">
              <p className="text-sm font-medium text-slate-600">
                Зображення недоступне
              </p>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/55 via-slate-950/10 to-transparent" />
        </div>
        <div className="space-y-6 p-6 sm:p-8">
          <header className="space-y-2">
            <Link to="/" className="inline-block text-sm font-medium text-slate-900 underline underline-offset-4">
              Повернутися до пошуку
            </Link>
            <h1 className="text-3xl font-semibold text-slate-900">
              {details.hotelName}
            </h1>
            <p className="text-sm text-slate-500">
              {details.countryName} · {details.cityName}
            </p>
          </header>

          <section className="grid gap-4 rounded-3xl border border-slate-200 bg-slate-50 p-5 sm:grid-cols-2">
            <div>
              <p className="text-sm text-slate-500">Ціна</p>
              <p className="mt-1 text-2xl font-semibold text-slate-900">
                {formatPrice(details.amount, details.currency)}
              </p>
            </div>
            <div>
              <p className="text-sm text-slate-500">Дати</p>
              <p className="mt-1 text-base font-medium text-slate-900">
                {formatDate(details.startDate)} - {formatDate(details.endDate)}
              </p>
            </div>
          </section>

          {details.description ? (
            <section className="space-y-2">
              <h2 className="text-lg font-semibold text-slate-900">Опис</h2>
              <p className="text-sm leading-6 text-slate-600">
                {details.description}
              </p>
            </section>
          ) : null}

          {details.services && Object.keys(details.services).length > 0 ? (
            <section className="space-y-3">
              <h2 className="text-lg font-semibold text-slate-900">Послуги</h2>
              <ul className="grid gap-3 sm:grid-cols-2">
                {Object.entries(details.services).map(([service, value]) => (
                  <li
                    key={service}
                    className="rounded-2xl border border-slate-200 bg-white px-4 py-3"
                  >
                    <p className="text-sm font-medium capitalize text-slate-900">
                      {service.replaceAll("_", " ")}
                    </p>
                    <p className="mt-1 text-sm text-slate-500">{value}</p>
                  </li>
                ))}
              </ul>
            </section>
          ) : null}
        </div>
      </div>
    </main>
  )
}
