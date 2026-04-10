import { uiText } from "@/shared/config/ui-text"
import { Skeleton } from "@/shared/ui/skeleton/Skeleton"

export function TourResultsSkeleton() {
  return (
    <div
      className="grid w-full grid-cols-1 gap-5 py-4 sm:grid-cols-2 sm:py-[25px]"
      aria-label={uiText.loadingTours}
    >
      {[0, 1].map((item) => (
        <div
          key={item}
          className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900"
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
  )
}
