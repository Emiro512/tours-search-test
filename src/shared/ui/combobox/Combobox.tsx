import type { ReactNode } from "react"
import { useId } from "react"
import clsx from "clsx"
import { Input } from "@/shared/ui/input/Input"
import { Popover } from "@/shared/ui/popover/Popover"

type ComboboxItem = {
  id: string
  label: string
}

type ComboboxProps<TItem extends ComboboxItem> = {
  items: TItem[]
  value: string
  open: boolean
  inputId?: string
  placeholder?: string
  emptyText?: string
  loadingText?: string
  isLoading?: boolean
  onInputChange: (value: string) => void
  onInputClick: () => void
  onOpenChange: (open: boolean) => void
  onSelectItem: (item: TItem) => void
  renderItemPrefix?: (item: TItem) => ReactNode
  renderItemSuffix?: (item: TItem) => ReactNode
}

export function Combobox<TItem extends ComboboxItem>({
  items,
  value,
  open,
  inputId,
  placeholder,
  emptyText = "No results found",
  loadingText = "Loading...",
  isLoading = false,
  onInputChange,
  onInputClick,
  onOpenChange,
  onSelectItem,
  renderItemPrefix,
  renderItemSuffix,
}: ComboboxProps<TItem>) {
  const listboxId = useId()

  return (
    <Popover
      open={open}
      onOpenChange={onOpenChange}
      renderReference={({ setReference }) => (
        <div ref={setReference}>
          <Input
            id={inputId}
            value={value}
            placeholder={placeholder}
            role="combobox"
            aria-expanded={open}
            aria-controls={listboxId}
            aria-autocomplete="list"
            autoComplete="off"
            onClick={onInputClick}
            onChange={(event) => onInputChange(event.target.value)}
          />
        </div>
      )}
    >
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl">
        <ul id={listboxId} role="listbox" className="max-h-80 overflow-y-auto p-2">
          {isLoading ? (
            <li className="px-3 py-3 text-sm text-slate-500">{loadingText}</li>
          ) : null}
          {!isLoading && items.length === 0 ? (
            <li className="px-3 py-3 text-sm text-slate-500">{emptyText}</li>
          ) : null}
          {!isLoading
            ? items.map((item) => (
                <li key={item.id}>
                  <button
                    type="button"
                    className={clsx(
                      "flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left transition hover:bg-slate-50",
                    )}
                    onClick={() => onSelectItem(item)}
                  >
                    {renderItemPrefix ? (
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-slate-100 text-slate-600">
                        {renderItemPrefix(item)}
                      </span>
                    ) : null}
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-sm font-medium text-slate-900">
                        {item.label}
                      </span>
                    </span>
                    {renderItemSuffix ? (
                      <span className="shrink-0">{renderItemSuffix(item)}</span>
                    ) : null}
                  </button>
                </li>
              ))
            : null}
        </ul>
      </div>
    </Popover>
  )
}
