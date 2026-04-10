import {
  getSearchPrices,
  startSearchPrices,
} from "@/services/api/toursApi"
import type { ApiErrorDto, ApiPriceOfferDto } from "@/services/api/api.types"
import {
  SearchServiceError,
  type SearchPrice,
  type SearchResult,
} from "@/services/search/search.types"

const MAX_FAILURE_RETRIES = 2

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

function waitFor(waitUntil: string): Promise<void> {
  const delay = getDelay(waitUntil)

  return new Promise((resolve) => {
    setTimeout(resolve, delay)
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

async function loadSearchPrices(token: string): Promise<SearchPrice[]> {
  let attempt = 0

  for (;;) {
    try {
      const result = await getSearchPrices(token)

      return normalizePrices(result.prices)
    } catch (error) {
      if (isNotReadyError(error) && error.waitUntil) {
        await waitFor(error.waitUntil)
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
  const { token, waitUntil } = await startSearch(countryId)

  await waitFor(waitUntil)

  const prices = await loadSearchPrices(token)

  return {
    token,
    prices,
  }
}
