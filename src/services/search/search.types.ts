export type SearchPrice = {
  id: string
  hotelId: string
  amount: number
  currency: string
  startDate: string
  endDate: string
}

export type SearchResult = {
  token: string
  prices: SearchPrice[]
}

export class SearchServiceError extends Error {
  code?: number

  constructor(message: string, code?: number) {
    super(message)
    this.name = "SearchServiceError"
    this.code = code
  }
}

export class SearchCancelledError extends Error {
  constructor() {
    super("Search was cancelled.")
    this.name = "SearchCancelledError"
  }
}

export function isSearchCancelledError(
  error: unknown,
): error is SearchCancelledError {
  return error instanceof SearchCancelledError
}
