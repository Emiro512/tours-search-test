export type Theme = "light" | "dark"

const THEME_STORAGE_KEY = "tours-search-theme"

export function getSystemTheme(): Theme {
  if (
    typeof window !== "undefined" &&
    window.matchMedia?.("(prefers-color-scheme: dark)").matches
  ) {
    return "dark"
  }

  return "light"
}

export function readStoredTheme(): Theme | null {
  if (typeof window === "undefined") {
    return null
  }

  const savedTheme = window.localStorage.getItem(THEME_STORAGE_KEY)

  return savedTheme === "light" || savedTheme === "dark" ? savedTheme : null
}

export function writeStoredTheme(theme: Theme) {
  window.localStorage.setItem(THEME_STORAGE_KEY, theme)
}
