import type { InputHTMLAttributes, ReactNode } from "react"
import { forwardRef } from "react"
import clsx from "clsx"

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  endAdornment?: ReactNode
}

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { className, endAdornment, ...props },
  ref,
) {
  return (
    <div className="relative w-full">
      <input
        ref={ref}
        className={clsx(
          "h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 hover:border-slate-300 focus:border-slate-400 focus-visible:ring-2 focus-visible:ring-slate-900/10 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:placeholder:text-slate-500 dark:hover:border-slate-600 dark:focus:border-slate-500 dark:focus-visible:ring-white/10",
          endAdornment ? "pr-12" : null,
          className,
        )}
        {...props}
      />
      {endAdornment ? (
        <div
          className="absolute inset-y-0 right-3 flex items-center"
          onMouseDown={(event) => event.preventDefault()}
        >
          {endAdornment}
        </div>
      ) : null}
    </div>
  )
})
