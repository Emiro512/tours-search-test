import type {
  ApiCountriesMapDto,
  ApiGeoResponseDto,
} from "@/services/api/api.types"
import { providedApi } from "@/services/api/providedApi"
import type { DestinationComboboxItem } from "@/widgets/search-form/model"

async function parseResponseJson<T>(response: Response): Promise<T> {
  return (await response.json()) as T
}

export async function getDestinationCountries(): Promise<
  DestinationComboboxItem[]
> {
  const response = await providedApi.getCountries()
  const countries = await parseResponseJson<ApiCountriesMapDto>(response)

  return Object.values(countries).map((country) => ({
    id: country.id,
    label: country.name,
    type: "country",
    countryId: country.id,
    flag: country.flag,
  }))
}

export async function searchDestinationSuggestions(
  query: string,
): Promise<DestinationComboboxItem[]> {
  const response = await providedApi.searchGeo(query)
  const geo = await parseResponseJson<ApiGeoResponseDto>(response)

  return Object.values(geo).map((item) => ({
    id: String(item.id),
    label: item.name,
    type: item.type,
    countryId: "countryId" in item ? item.countryId : String(item.id),
    flag: "flag" in item ? item.flag : undefined,
  }))
}
