import clsx from "clsx"

type SpinnerProps = {
  className?: string
}

export function Spinner({ className }: SpinnerProps) {
  return (
    <span
      className={clsx(
        "inline-block h-4 w-4 animate-spin rounded-full border-2 border-slate-300 border-t-slate-700",
        className,
      )}
      aria-hidden="true"
    />
  )
}
