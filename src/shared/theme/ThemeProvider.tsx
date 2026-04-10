import type { PropsWithChildren } from "react"
import { useEffect, useMemo, useState } from "react"
import {
  getSystemTheme,
  readStoredTheme,
  writeStoredTheme,
} from "@/shared/theme/theme.storage"
import type { Theme } from "@/shared/theme/theme.storage"
import { ThemeContext } from "@/shared/theme/useTheme"

function getInitialTheme(): Theme {
  return readStoredTheme() ?? getSystemTheme()
}

export function ThemeProvider({ children }: PropsWithChildren) {
  const [theme, setTheme] = useState<Theme>(getInitialTheme)

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark")
    writeStoredTheme(theme)
  }, [theme])

  const value = useMemo(
    () => ({
      theme,
      isDark: theme === "dark",
      setTheme,
      toggleTheme: () => setTheme((current) => current === "dark" ? "light" : "dark"),
    }),
    [theme],
  )

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}
