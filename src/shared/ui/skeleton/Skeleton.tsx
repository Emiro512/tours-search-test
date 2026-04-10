import clsx from "clsx"

type SkeletonProps = {
  className?: string
}

export function Skeleton({ className }: SkeletonProps) {
  return (
    <div
      className={clsx("animate-pulse rounded-2xl bg-slate-200 dark:bg-slate-800", className)}
      aria-hidden="true"
    />
  )
}
