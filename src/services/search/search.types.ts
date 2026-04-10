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
