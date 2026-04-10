import type { ButtonHTMLAttributes, ReactNode } from "react"
import { forwardRef } from "react"
import clsx from "clsx"

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  isLoading?: boolean
  loadingText?: ReactNode
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  function Button(
    {
      children,
      className,
      type = "button",
      disabled,
      isLoading = false,
      loadingText = "Завантаження...",
      ...props
    },
    ref,
  ) {
    return (
      <button
        ref={ref}
        type={type}
        disabled={disabled || isLoading}
        className={clsx(
          "inline-flex h-12 cursor-pointer items-center justify-center rounded-xl bg-slate-900 px-5 text-sm font-medium text-white transition duration-150 hover:bg-slate-800 active:scale-[0.98] active:bg-slate-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900/20 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:bg-slate-300 disabled:text-slate-500 disabled:shadow-none disabled:hover:bg-slate-300 disabled:active:scale-100 dark:bg-slate-100 dark:text-slate-950 dark:hover:bg-white dark:focus-visible:ring-white/20 dark:focus-visible:ring-offset-slate-950 dark:disabled:bg-slate-800 dark:disabled:text-slate-500 dark:disabled:hover:bg-slate-800",
          className,
        )}
        {...props}
      >
        {isLoading ? loadingText : children}
      </button>
    )
  },
)
