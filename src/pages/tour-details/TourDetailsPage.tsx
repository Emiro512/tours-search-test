import { motion } from "framer-motion"
import { Link, useParams } from "react-router-dom"
import { formatDate } from "@/shared/lib/format/formatDate"
import { formatPrice } from "@/shared/lib/format/formatPrice"
import { ThemeToggle } from "@/shared/ui/theme-toggle/ThemeToggle"
import { TourDetailsSkeleton } from "@/pages/tour-details/TourDetailsSkeleton"
import { useTourDetails } from "@/pages/tour-details/useTourDetails"

export function TourDetailsPage() {
  const { hotelId, priceId } = useParams()
  const detailsQuery = useTourDetails({ hotelId, priceId })

  if (!hotelId || !priceId) {
    return (
      <main className="mx-auto min-h-screen max-w-5xl px-4 py-10">
        <div className="rounded-3xl bg-white p-8 shadow-sm dark:bg-slate-900">
          <p className="text-sm text-red-600 dark:text-red-400">Некоректне посилання на тур.</p>
          <Link to="/" className="mt-4 inline-block text-sm font-medium text-slate-900 underline underline-offset-4 dark:text-slate-100">
            Повернутися до пошуку
          </Link>
        </div>
      </main>
    )
  }

  if (detailsQuery.isPending) {
    return (
      <main className="mx-auto min-h-screen max-w-5xl px-4 py-10">
        <TourDetailsSkeleton />
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
        <div className="rounded-3xl bg-white p-8 shadow-sm dark:bg-slate-900">
          <p className="text-sm text-red-600 dark:text-red-400">{errorMessage}</p>
          <Link to="/" className="mt-4 inline-block text-sm font-medium text-slate-900 underline underline-offset-4 dark:text-slate-100">
            Повернутися до пошуку
          </Link>
        </div>
      </main>
    )
  }

  const details = detailsQuery.data

  return (
    <main className="mx-auto min-h-screen max-w-5xl px-4 py-10">
      <motion.div
        className="overflow-hidden rounded-[2rem] bg-white shadow-[0_30px_80px_-50px_rgba(15,23,42,0.45)] dark:bg-slate-900 dark:shadow-[0_30px_80px_-50px_rgba(0,0,0,0.85)]"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
      >
        <div className="relative h-72 bg-slate-200 sm:h-96 dark:bg-slate-800">
          {details.hotelImage ? (
            <img
              src={details.hotelImage}
              alt={details.hotelName}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full items-center justify-center bg-[linear-gradient(135deg,#cbd5e1,#e2e8f0)] dark:bg-[linear-gradient(135deg,#1e293b,#334155)]">
              <p className="text-sm font-medium text-slate-600 dark:text-slate-300">
                Зображення недоступне
              </p>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/55 via-slate-950/10 to-transparent" />
        </div>
        <div className="space-y-6 p-6 sm:p-8">
          <motion.header
            className="space-y-2"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.18, ease: "easeOut", delay: 0.04 }}
          >
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <Link to="/" className="inline-block text-sm font-medium text-slate-900 underline underline-offset-4 dark:text-slate-100">
                Повернутися до пошуку
              </Link>
              <ThemeToggle />
            </div>
            <h1 className="text-3xl font-semibold text-slate-900 dark:text-slate-100">
              {details.hotelName}
            </h1>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              {details.countryName} · {details.cityName}
            </p>
          </motion.header>

          <motion.section
            className="grid gap-4 rounded-3xl border border-slate-200 bg-slate-50 p-5 sm:grid-cols-2 dark:border-slate-800 dark:bg-slate-950"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.18, ease: "easeOut", delay: 0.08 }}
          >
            <div>
              <p className="text-sm text-slate-500 dark:text-slate-400">Ціна</p>
              <p className="mt-1 text-2xl font-semibold text-slate-900 dark:text-slate-100">
                {formatPrice(details.amount, details.currency)}
              </p>
            </div>
            <div>
              <p className="text-sm text-slate-500 dark:text-slate-400">Дати</p>
              <p className="mt-1 text-base font-medium text-slate-900 dark:text-slate-100">
                {formatDate(details.startDate)} - {formatDate(details.endDate)}
              </p>
            </div>
          </motion.section>

          {details.description ? (
            <motion.section
              className="space-y-2"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.18, ease: "easeOut", delay: 0.12 }}
            >
              <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Опис</h2>
              <p className="text-sm leading-6 text-slate-600 dark:text-slate-300">
                {details.description}
              </p>
            </motion.section>
          ) : null}

          {details.services && Object.keys(details.services).length > 0 ? (
            <motion.section
              className="space-y-3"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.18, ease: "easeOut", delay: 0.16 }}
            >
              <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Послуги</h2>
              <ul className="grid gap-3 sm:grid-cols-2">
                {Object.entries(details.services).map(([service, value]) => (
                  <li
                    key={service}
                    className="rounded-2xl border border-slate-200 bg-white px-4 py-3 dark:border-slate-800 dark:bg-slate-950"
                  >
                    <p className="text-sm font-medium capitalize text-slate-900 dark:text-slate-100">
                      {service.replaceAll("_", " ")}
                    </p>
                    <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{value}</p>
                  </li>
                ))}
              </ul>
            </motion.section>
          ) : null}
        </div>
      </motion.div>
    </main>
  )
}
