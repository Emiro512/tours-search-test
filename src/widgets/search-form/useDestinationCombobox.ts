import { useEffect, useMemo, useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { uiText } from "@/shared/config/ui-text"
import {
  getDestinationCountries,
  searchDestinationSuggestions,
} from "@/widgets/search-form/api"
import type { DestinationComboboxItem } from "@/widgets/search-form/model"

const GEO_SEARCH_DEBOUNCE_MS = 500

export function useDestinationCombobox() {
  const [value, setValue] = useState("")
  const [selectedItem, setSelectedItem] =
    useState<DestinationComboboxItem | null>(null)
  const [open, setOpen] = useState(false)
  const [mode, setMode] = useState<"countries" | "geo">("countries")
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      setDebouncedValue(value)
    }, GEO_SEARCH_DEBOUNCE_MS)

    return () => {
      window.clearTimeout(timeoutId)
    }
  }, [value])

  const countriesQuery = useQuery({
    queryKey: ["destination", "countries"],
    queryFn: getDestinationCountries,
    staleTime: 5 * 60 * 1000,
  })

  const geoQuery = useQuery({
    queryKey: ["destination", "geo", debouncedValue],
    queryFn: () => searchDestinationSuggestions(debouncedValue.trim()),
    enabled: mode === "geo" && debouncedValue.trim().length > 0,
  })

  const items = useMemo(() => {
    if (mode === "countries") {
      return countriesQuery.data ?? []
    }

    return geoQuery.data ?? []
  }, [countriesQuery.data, geoQuery.data, mode])

  const isLoading =
    mode === "countries"
      ? countriesQuery.isLoading || countriesQuery.isFetching
      : geoQuery.isLoading || geoQuery.isFetching
  const emptyText =
    mode === "countries"
      ? uiText.noCountriesAvailable
      : uiText.noDestinationsFound

  function handleInputClick() {
    setOpen(true)

    if (!value.trim() || selectedItem?.type === "country") {
      setMode("countries")
      return
    }

    setMode("geo")
  }

  function handleInputChange(nextValue: string) {
    setValue(nextValue)
    setSelectedItem(null)
    setOpen(true)
    setMode(nextValue.trim() ? "geo" : "countries")
  }

  function handleSelectItem(item: DestinationComboboxItem) {
    setSelectedItem(item)
    setValue(item.label)
    setOpen(false)
  }

  function handleClear() {
    setValue("")
    setSelectedItem(null)
    setMode("countries")
    setOpen(true)
  }

  return {
    value,
    items,
    open,
    isLoading,
    emptyText,
    selectedItem,
    setOpen,
    onInputClick: handleInputClick,
    onInputChange: handleInputChange,
    onSelectItem: handleSelectItem,
    onClear: handleClear,
  }
}
