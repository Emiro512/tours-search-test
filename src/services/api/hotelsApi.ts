import { providedApi } from "@/services/api/providedApi"
import type {
  ApiErrorDto,
  ApiHotelDetailsDto,
  ApiHotelsMapDto,
} from "@/services/api/api.types"

async function parseJsonResponse<T>(response: Response): Promise<T> {
  return (await response.json()) as T
}

async function parseRejectedResponse(errorResponse: Response): Promise<never> {
  throw (await parseJsonResponse<ApiErrorDto>(errorResponse))
}

export async function getHotels(countryId: string): Promise<ApiHotelsMapDto> {
  const response = await providedApi.getHotels(countryId)

  return parseJsonResponse<ApiHotelsMapDto>(response)
}

export async function getHotel(
  hotelId: number | string,
): Promise<ApiHotelDetailsDto> {
  try {
    const response = await providedApi.getHotel(hotelId)

    return parseJsonResponse<ApiHotelDetailsDto>(response)
  } catch (error) {
    if (error instanceof Response) {
      return parseRejectedResponse(error)
    }

    throw error
  }
}
