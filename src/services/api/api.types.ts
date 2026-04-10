export type ApiCountryDto = {
  id: string
  name: string
  flag: string
}

export type ApiCityDto = {
  id: number
  name: string
  countryId?: string
}

export type ApiHotelDto = {
  id: number
  name: string
  img: string
  cityId: number
  cityName: string
  countryId: string
  countryName: string
}

export type ApiHotelDetailsDto = ApiHotelDto & {
  description?: string
  services?: Record<string, string>
}

export type ApiPriceOfferDto = {
  id: string
  amount: number
  currency: "usd"
  startDate: string
  endDate: string
  hotelID?: string
}

export type ApiStartSearchResponseDto = {
  token: string
  waitUntil: string
}

export type ApiSearchPricesResponseDto = {
  prices: ApiPricesMapDto
}

export type ApiStopSearchResponseDto = {
  message: string
  status?: "cancelled"
}

export type ApiErrorDto = {
  code: number
  error: true
  message: string
  waitUntil?: string
}

export type ApiCountriesMapDto = Record<string, ApiCountryDto>
export type ApiHotelsMapDto = Record<string, ApiHotelDto>
export type ApiPricesMapDto = Record<string, ApiPriceOfferDto>

export type ApiGeoCountryDto = ApiCountryDto & {
  type: "country"
}

export type ApiGeoCityDto = ApiCityDto & {
  type: "city"
}

export type ApiGeoHotelDto = ApiHotelDto & {
  type: "hotel"
}

export type ApiGeoEntityDto =
  | ApiGeoCountryDto
  | ApiGeoCityDto
  | ApiGeoHotelDto

export type ApiGeoResponseDto = Record<string, ApiGeoEntityDto>
