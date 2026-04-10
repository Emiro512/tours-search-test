import { Skeleton } from "@/shared/ui/skeleton/Skeleton"

export function TourDetailsSkeleton() {
  return (
    <div
      className="overflow-hidden rounded-[2rem] bg-white shadow-[0_30px_80px_-50px_rgba(15,23,42,0.45)] dark:bg-slate-900 dark:shadow-[0_30px_80px_-50px_rgba(0,0,0,0.85)]"
      aria-label="Завантаження деталей туру..."
    >
      <Skeleton className="h-72 rounded-none sm:h-96" />
      <div className="space-y-6 p-6 sm:p-8">
        <div className="space-y-3">
          <Skeleton className="h-4 w-36" />
          <Skeleton className="h-9 w-2/3" />
          <Skeleton className="h-4 w-48" />
        </div>
        <div className="grid gap-4 rounded-3xl border border-slate-200 bg-slate-50 p-5 sm:grid-cols-2 dark:border-slate-800 dark:bg-slate-950">
          <div className="space-y-2">
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-8 w-32" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-6 w-44" />
          </div>
        </div>
        <div className="space-y-3">
          <Skeleton className="h-6 w-20" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
          <Skeleton className="h-4 w-2/3" />
        </div>
      </div>
    </div>
  )
}
