import { useDeferredValue, useMemo, useState } from "react"
import { useQuery } from "@tanstack/react-query"
import {
  getDestinationCountries,
  searchDestinationSuggestions,
} from "@/widgets/search-form/api"
import type { DestinationComboboxItem } from "@/widgets/search-form/model"

export function useDestinationCombobox() {
  const [value, setValue] = useState("")
  const [selectedItem, setSelectedItem] =
    useState<DestinationComboboxItem | null>(null)
  const [open, setOpen] = useState(false)
  const [mode, setMode] = useState<"countries" | "geo">("countries")
  const deferredValue = useDeferredValue(value)

  const countriesQuery = useQuery({
    queryKey: ["destination", "countries"],
    queryFn: getDestinationCountries,
    staleTime: 5 * 60 * 1000,
  })

  const geoQuery = useQuery({
    queryKey: ["destination", "geo", deferredValue],
    queryFn: () => searchDestinationSuggestions(deferredValue.trim()),
    enabled: mode === "geo" && deferredValue.trim().length > 0,
  })

  const items = useMemo(() => {
    if (mode === "countries") {
      return countriesQuery.data ?? []
    }

    return geoQuery.data ?? []
  }, [countriesQuery.data, geoQuery.data, mode])

  const isLoading =
    mode === "countries" ? countriesQuery.isLoading : geoQuery.isLoading

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

  return {
    value,
    items,
    open,
    isLoading,
    selectedItem,
    setOpen,
    onInputClick: handleInputClick,
    onInputChange: handleInputChange,
    onSelectItem: handleSelectItem,
  }
}
