import { QueryProvider } from "@/app/providers/QueryProvider"
import { AppRouter } from "@/app/router/AppRouter"
import { ThemeProvider } from "@/shared/theme/ThemeProvider"

function App() {
  return (
    <ThemeProvider>
      <QueryProvider>
        <AppRouter />
      </QueryProvider>
    </ThemeProvider>
  )
}

export default App
