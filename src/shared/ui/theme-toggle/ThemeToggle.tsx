import { uiText } from "@/shared/config/ui-text"
import { useTheme } from "@/shared/theme/useTheme"

function SunIcon() {
  return (
    <svg viewBox="0 0 20 20" className="h-4 w-4 fill-current">
      <path d="M10 4a1 1 0 0 1-1-1V2a1 1 0 1 1 2 0v1a1 1 0 0 1-1 1Zm0 12a1 1 0 0 1 1 1v1a1 1 0 1 1-2 0v-1a1 1 0 0 1 1-1Zm8-7a1 1 0 1 1 0 2h-1a1 1 0 1 1 0-2h1ZM4 10a1 1 0 0 1-1 1H2a1 1 0 1 1 0-2h1a1 1 0 0 1 1 1Zm11.66-5.66a1 1 0 0 1 0 1.42l-.7.7a1 1 0 0 1-1.42-1.42l.7-.7a1 1 0 0 1 1.42 0ZM6.46 13.54a1 1 0 0 1 0 1.42l-.7.7a1 1 0 0 1-1.42-1.42l.7-.7a1 1 0 0 1 1.42 0Zm9.2 2.12a1 1 0 0 1-1.42 0l-.7-.7a1 1 0 0 1 1.42-1.42l.7.7a1 1 0 0 1 0 1.42ZM6.46 5.04a1 1 0 0 1-1.42 1.42l-.7-.7a1 1 0 0 1 1.42-1.42l.7.7ZM10 6a4 4 0 1 1 0 8 4 4 0 0 1 0-8Z" />
    </svg>
  )
}

function MoonIcon() {
  return (
    <svg viewBox="0 0 20 20" className="h-4 w-4 fill-current">
      <path d="M15.8 13.4A7 7 0 0 1 6.6 4.2 7 7 0 1 0 15.8 13.4Z" />
    </svg>
  )
}

export function ThemeToggle() {
  const { isDark, toggleTheme } = useTheme()

  return (
    <button
      type="button"
      className="relative inline-flex h-9 w-[72px] self-end overflow-hidden rounded-full border border-white/30 bg-white/70 p-1 text-slate-500 shadow-[0_10px_30px_-18px_rgba(15,23,42,0.7)] backdrop-blur transition hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 sm:self-auto dark:border-slate-700 dark:bg-slate-950/80 dark:text-slate-400 dark:hover:bg-slate-900 dark:focus-visible:ring-white/20"
      aria-label={uiText.themeToggleLabel}
      aria-pressed={isDark}
      onClick={toggleTheme}
    >
      <span
        className="absolute left-1 top-1 h-7 w-7 rounded-full bg-white shadow-md ring-1 ring-slate-900/5 transition-transform duration-200 dark:translate-x-9 dark:bg-slate-100"
        aria-hidden="true"
      />
      <span
        className="relative z-10 flex h-7 w-7 items-center justify-center text-amber-500 transition dark:text-slate-500"
        aria-hidden="true"
      >
        <SunIcon />
      </span>
      <span
        className="relative z-10 ml-auto flex h-7 w-7 items-center justify-center text-slate-400 transition dark:text-slate-950"
        aria-hidden="true"
      >
        <MoonIcon />
      </span>
    </button>
  )
}
