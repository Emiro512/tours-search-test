import { useParams } from "react-router-dom"

export function TourDetailsPage() {
  const { id } = useParams()

  return (
    <main className="mx-auto min-h-screen max-w-5xl px-4 py-10">
      <div className="rounded-2xl bg-white p-8 shadow-sm">
        <h1 className="text-2xl font-semibold text-slate-900">
          Tour details
        </h1>
        <p className="mt-2 text-sm text-slate-600">
          Tour ID: {id}
        </p>
      </div>
    </main>
  )
}