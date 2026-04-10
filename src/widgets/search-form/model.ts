export type DestinationComboboxItem = {
  id: string
  label: string
  type: "country" | "city" | "hotel"
  countryId?: string
  flag?: string
}
