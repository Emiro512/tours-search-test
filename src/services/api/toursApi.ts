import { providedApi } from "@/services/api/providedApi"
import type {
  ApiErrorDto,
  ApiPriceOfferDto,
  ApiSearchPricesResponseDto,
  ApiStartSearchResponseDto,
  ApiStopSearchResponseDto,
} from "@/services/api/api.types"

async function parseJsonResponse<T>(response: Response): Promise<T> {
  return (await response.json()) as T
}

async function parseRejectedResponse(errorResponse: Response): Promise<never> {
  throw (await parseJsonResponse<ApiErrorDto>(errorResponse))
}

export async function startSearchPrices(
  countryId: string,
): Promise<ApiStartSearchResponseDto> {
  try {
    const response = await providedApi.startSearchPrices(countryId)

    return parseJsonResponse<ApiStartSearchResponseDto>(response)
  } catch (error) {
    if (error instanceof Response) {
      return parseRejectedResponse(error)
    }

    throw error
  }
}

export async function getSearchPrices(
  token: string,
): Promise<ApiSearchPricesResponseDto> {
  try {
    const response = await providedApi.getSearchPrices(token)

    return parseJsonResponse<ApiSearchPricesResponseDto>(response)
  } catch (error) {
    if (error instanceof Response) {
      return parseRejectedResponse(error)
    }

    throw error
  }
}

export async function stopSearchPrices(
  token: string,
): Promise<ApiStopSearchResponseDto> {
  try {
    const response = await providedApi.stopSearchPrices(token)

    return parseJsonResponse<ApiStopSearchResponseDto>(response)
  } catch (error) {
    if (error instanceof Response) {
      return parseRejectedResponse(error)
    }

    throw error
  }
}

export async function getPrice(priceId: string): Promise<ApiPriceOfferDto> {
  try {
    const response = await providedApi.getPrice(priceId)

    return parseJsonResponse<ApiPriceOfferDto>(response)
  } catch (error) {
    if (error instanceof Response) {
      return parseRejectedResponse(error)
    }

    throw error
  }
}
