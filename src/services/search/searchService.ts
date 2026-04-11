import {
  getSearchPrices,
  startSearchPrices,
  stopSearchPrices,
} from "@/services/api/toursApi"
import type { ApiErrorDto, ApiPriceOfferDto } from "@/services/api/api.types"
import {
  SearchCancelledError,
  SearchServiceError,
  type SearchPrice,
  type SearchResult,
} from "@/services/search/search.types"

const MAX_FAILURE_RETRIES = 2

type SearchSession = {
  id: number
  cancelled: boolean
  token?: string
  timerId?: ReturnType<typeof setTimeout>
  resolveWait?: () => void
}

let activeSession: SearchSession | null = null
let nextSessionId = 0

function isApiError(error: unknown): error is ApiErrorDto {
  return (
    typeof error === "object" &&
    error !== null &&
    "message" in error &&
    "error" in error
  )
}

function isNotReadyError(error: unknown): error is ApiErrorDto {
  return isApiError(error) && error.code === 425
}

function toSearchServiceError(error: unknown): SearchServiceError {
  if (isApiError(error)) {
    return new SearchServiceError(error.message, error.code)
  }

  if (error instanceof Error) {
    return new SearchServiceError(error.message)
  }

  return new SearchServiceError("Search request failed.")
}

function getDelay(waitUntil: string): number {
  const timestamp = new Date(waitUntil).getTime()
  const now = Date.now()

  return Math.max(timestamp - now, 0)
}

function isCurrentSession(session: SearchSession) {
  return activeSession === session && !session.cancelled
}

function ensureCurrentSession(session: SearchSession) {
  if (!isCurrentSession(session)) {
    throw new SearchCancelledError()
  }
}

function waitFor(waitUntil: string, session: SearchSession): Promise<void> {
  const delay = getDelay(waitUntil)

  return new Promise((resolve) => {
    session.resolveWait = resolve
    session.timerId = setTimeout(() => {
      session.timerId = undefined
      session.resolveWait = undefined
      resolve()
    }, delay)
  })
}

function normalizePrices(prices: Record<string, ApiPriceOfferDto>): SearchPrice[] {
  return Object.values(prices).flatMap((price) => {
    if (!price.hotelID) {
      return []
    }

    return [
      {
        id: price.id,
        hotelId: price.hotelID,
        amount: price.amount,
        currency: price.currency,
        startDate: price.startDate,
        endDate: price.endDate,
      },
    ]
  })
}

async function startSearch(countryId: string) {
  let attempt = 0

  while (attempt <= MAX_FAILURE_RETRIES) {
    try {
      return await startSearchPrices(countryId)
    } catch (error) {
      if (isNotReadyError(error)) {
        throw new SearchServiceError(
          "Search start returned an unexpected not-ready response.",
          error.code,
        )
      }

      if (attempt === MAX_FAILURE_RETRIES) {
        throw toSearchServiceError(error)
      }

      attempt += 1
    }
  }

  throw new SearchServiceError("Search request failed.")
}

async function cancelSession(session: SearchSession | null) {
  if (!session || session.cancelled) {
    return
  }

  session.cancelled = true

  if (session.timerId) {
    clearTimeout(session.timerId)
    session.timerId = undefined
  }

  session.resolveWait?.()
  session.resolveWait = undefined

  if (session.token) {
    try {
      await stopSearchPrices(session.token)
    } catch {
      // A failed cancellation should not block the replacement search.
    }
  }
}

async function createSearchSession(): Promise<SearchSession> {
  await cancelSession(activeSession)

  const session = {
    id: nextSessionId,
    cancelled: false,
  }

  nextSessionId += 1
  activeSession = session

  return session
}

async function loadSearchPrices(
  token: string,
  session: SearchSession,
): Promise<SearchPrice[]> {
  let attempt = 0

  for (;;) {
    ensureCurrentSession(session)

    try {
      const result = await getSearchPrices(token)

      ensureCurrentSession(session)

      return normalizePrices(result.prices)
    } catch (error) {
      ensureCurrentSession(session)

      if (isNotReadyError(error) && error.waitUntil) {
        await waitFor(error.waitUntil, session)
        continue
      }

      if (attempt === MAX_FAILURE_RETRIES) {
        throw toSearchServiceError(error)
      }

      attempt += 1
    }
  }

  throw new SearchServiceError("Search request failed.")
}

export async function runSearch(countryId: string): Promise<SearchResult> {
  const session = await createSearchSession()

  try {
    const { token, waitUntil } = await startSearch(countryId)

    if (!isCurrentSession(session)) {
      await stopSearchPrices(token)
      throw new SearchCancelledError()
    }

    session.token = token

    await waitFor(waitUntil, session)
    ensureCurrentSession(session)

    const prices = await loadSearchPrices(token, session)
    ensureCurrentSession(session)

    return {
      token,
      prices,
    }
  } finally {
    if (activeSession === session) {
      activeSession = null
    }
  }
}
