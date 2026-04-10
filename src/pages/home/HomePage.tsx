import { SearchForm } from "@/widgets/search-form/SearchForm"

export function HomePage() {
  return (
    <main className="mx-auto min-h-screen max-w-5xl px-4 py-10">
      <div className="overflow-hidden rounded-[2rem] bg-white shadow-[0_30px_80px_-50px_rgba(15,23,42,0.45)]">
        <div className="bg-[linear-gradient(135deg,#0f172a,#1e293b_55%,#334155)] px-8 py-10 text-white">
          <p className="text-sm uppercase tracking-[0.24em] text-slate-300">
            Tours Search
          </p>
          <h1 className="mt-3 max-w-2xl text-3xl font-semibold leading-tight sm:text-4xl">
            Find a destination first. We’ll wire the full tour flow next.
          </h1>
          <p className="mt-3 max-w-2xl text-sm text-slate-300 sm:text-base">
            This step focuses on a reusable destination combobox and a clean
            form foundation for the future search flow.
          </p>
        </div>
        <div className="px-8 py-8">
          <SearchForm />
        </div>
      </div>
    </main>
  )
}
