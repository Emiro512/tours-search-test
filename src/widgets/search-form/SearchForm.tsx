import type { FormEvent } from "react"
import { uiText } from "@/shared/config/ui-text"
import { Button } from "@/shared/ui/button/Button"
import { Combobox } from "@/shared/ui/combobox/Combobox"
import type { DestinationComboboxItem } from "@/widgets/search-form/model"
import { useDestinationCombobox } from "@/widgets/search-form/useDestinationCombobox"

function DestinationTypeIcon({ type }: { type: DestinationComboboxItem["type"] }) {
  if (type === "country") {
    return (
      <svg viewBox="0 0 20 20" className="h-4 w-4 fill-current" aria-hidden="true">
        <path d="M10 2a8 8 0 1 0 0 16 8 8 0 0 0 0-16Zm4.83 7h-2.1a13.5 13.5 0 0 0-1.1-4.05A6.03 6.03 0 0 1 14.83 9Zm-4.08 0H9.25A11.85 11.85 0 0 1 10 5.12 11.85 11.85 0 0 1 10.75 9ZM8.37 4.95A13.5 13.5 0 0 0 7.27 9h-2.1a6.03 6.03 0 0 1 3.2-4.05ZM5.17 11h2.1c.16 1.4.53 2.78 1.1 4.05A6.03 6.03 0 0 1 5.17 11Zm4.08 0h1.5A11.85 11.85 0 0 1 10 14.88 11.85 11.85 0 0 1 9.25 11Zm2.38 4.05c.57-1.27.94-2.65 1.1-4.05h2.1a6.03 6.03 0 0 1-3.2 4.05Z" />
      </svg>
    )
  }

  if (type === "city") {
    return (
      <svg viewBox="0 0 20 20" className="h-4 w-4 fill-current" aria-hidden="true">
        <path d="M3 16h14v2H3v-2Zm2-8 4-2 6 3v6h-2v-4H7v4H5V8Zm4 1h2v2H9V9Z" />
      </svg>
    )
  }

  return (
    <svg viewBox="0 0 20 20" className="h-4 w-4 fill-current" aria-hidden="true">
      <path d="M4 4h12a2 2 0 0 1 2 2v8h-2v-1H4v1H2V6a2 2 0 0 1 2-2Zm0 7h12V6H4v5Zm2-4h3v2H6V7Zm5 0h3v2h-3V7Z" />
    </svg>
  )
}

function DestinationItemPrefix({ item }: { item: DestinationComboboxItem }) {
  if (item.type === "country" && item.flag) {
    return (
      <img
        src={item.flag}
        alt=""
        className="h-5 w-7 shrink-0 rounded-sm object-cover"
        loading="lazy"
      />
    )
  }

  return <DestinationTypeIcon type={item.type} />
}

function DestinationTypeBadge({ type }: { type: DestinationComboboxItem["type"] }) {
  const label =
    type === "country"
      ? uiText.countryBadge
      : type === "city"
        ? uiText.cityBadge
        : uiText.hotelBadge

  return (
    <span className="rounded-full bg-slate-100 px-2 py-1 text-[11px] font-medium uppercase tracking-[0.12em] text-slate-500">
      {label}
    </span>
  )
}

function ClearButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      aria-label="Очистити поле"
      className="inline-flex h-7 w-7 items-center justify-center rounded-full text-slate-400 transition hover:bg-slate-100 hover:text-slate-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900/10"
      onClick={onClick}
    >
      <svg viewBox="0 0 20 20" className="h-4 w-4 fill-current" aria-hidden="true">
        <path d="M5.76 4.34 10 8.59l4.24-4.25 1.42 1.42L11.41 10l4.25 4.24-1.42 1.42L10 11.41l-4.24 4.25-1.42-1.42L8.59 10 4.34 5.76l1.42-1.42Z" />
      </svg>
    </button>
  )
}

export type SearchFormProps = {
  onSubmit?: (selection: DestinationComboboxItem | null) => void
}

export function SearchForm({ onSubmit }: SearchFormProps) {
  const destination = useDestinationCombobox()

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    onSubmit?.(destination.selectedItem)
  }

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div className="space-y-2">
        <label
          htmlFor="destination"
          className="text-sm font-medium text-slate-700"
        >
          {uiText.destinationLabel}
        </label>
        <Combobox
          inputId="destination"
          items={destination.items}
          value={destination.value}
          open={destination.open}
          placeholder={uiText.destinationPlaceholder}
          emptyText={destination.emptyText}
          isLoading={destination.isLoading}
          loadingText={uiText.loading}
          inputEndAdornment={
            destination.value ? <ClearButton onClick={destination.onClear} /> : null
          }
          onOpenChange={destination.setOpen}
          onInputClick={destination.onInputClick}
          onInputChange={destination.onInputChange}
          onSelectItem={destination.onSelectItem}
          renderItemPrefix={(item) => <DestinationItemPrefix item={item} />}
          shouldWrapItemPrefix={(item) => !(item.type === "country" && item.flag)}
          renderItemSuffix={(item) => <DestinationTypeBadge type={item.type} />}
        />
      </div>
      <Button type="submit" className="w-full sm:w-auto">
        {uiText.searchToursButton}
      </Button>
    </form>
  )
}
