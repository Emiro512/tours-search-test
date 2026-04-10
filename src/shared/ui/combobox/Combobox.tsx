import type { ReactNode } from "react"
import { useId, useRef, useState } from "react"
import clsx from "clsx"
import { Input } from "@/shared/ui/input/Input"
import { Popover } from "@/shared/ui/popover/Popover"
import { Spinner } from "@/shared/ui/spinner/Spinner"

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
  inputEndAdornment?: ReactNode
  renderItemPrefix?: (item: TItem) => ReactNode
  shouldWrapItemPrefix?: (item: TItem) => boolean
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
  inputEndAdornment,
  renderItemPrefix,
  shouldWrapItemPrefix,
  renderItemSuffix,
}: ComboboxProps<TItem>) {
  const listboxId = useId()
  const inputRef = useRef<HTMLInputElement>(null)
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const effectiveActiveIndex =
    open && !isLoading && items.length > 0
      ? activeIndex !== null && activeIndex < items.length
        ? activeIndex
        : 0
      : null

  function closeDropdown() {
    setActiveIndex(null)
    onOpenChange(false)
  }

  function selectItem(item: TItem) {
    onSelectItem(item)
    setActiveIndex(null)
    queueMicrotask(() => {
      inputRef.current?.focus()
    })
  }

  return (
    <Popover
      open={open}
      onOpenChange={onOpenChange}
      renderReference={({ setReference }) => (
        <div ref={setReference}>
          <Input
            ref={inputRef}
            id={inputId}
            value={value}
            placeholder={placeholder}
            endAdornment={inputEndAdornment}
            role="combobox"
            aria-expanded={open}
            aria-controls={listboxId}
            aria-activedescendant={
              effectiveActiveIndex !== null
                ? `${listboxId}-${items[effectiveActiveIndex]?.id}`
                : undefined
            }
            aria-autocomplete="list"
            autoComplete="off"
            onClick={onInputClick}
            onChange={(event) => onInputChange(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Escape" && open) {
                event.preventDefault()
                closeDropdown()
                return
              }

              if (event.key === "Tab" && open) {
                setActiveIndex(null)
                onOpenChange(false)
                return
              }

              if (!open || isLoading || items.length === 0) {
                return
              }

              if (event.key === "ArrowDown") {
                event.preventDefault()
                setActiveIndex(
                  effectiveActiveIndex === null
                    ? 0
                    : (effectiveActiveIndex + 1) % items.length,
                )
                return
              }

              if (event.key === "ArrowUp") {
                event.preventDefault()
                setActiveIndex(
                  effectiveActiveIndex === null
                    ? items.length - 1
                    : (effectiveActiveIndex - 1 + items.length) % items.length,
                )
                return
              }

              if (event.key === "Enter" && effectiveActiveIndex !== null) {
                event.preventDefault()
                selectItem(items[effectiveActiveIndex])
              }
            }}
          />
        </div>
      )}
    >
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl dark:border-slate-700 dark:bg-slate-900">
        <ul id={listboxId} role="listbox" className="max-h-80 overflow-y-auto p-2">
          {isLoading ? (
            <li className="flex items-center gap-3 px-3 py-3 text-sm text-slate-500 dark:text-slate-400">
              <Spinner className="h-4 w-4" />
              {loadingText}
            </li>
          ) : null}
          {!isLoading && items.length === 0 ? (
            <li className="px-3 py-3 text-sm text-slate-500 dark:text-slate-400">{emptyText}</li>
          ) : null}
          {!isLoading
            ? items.map((item, index) => (
                <li
                  key={item.id}
                  id={`${listboxId}-${item.id}`}
                  role="option"
                  aria-selected={index === effectiveActiveIndex}
                >
                  <button
                    type="button"
                    className={clsx(
                      "flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left transition hover:bg-slate-50 dark:hover:bg-slate-800",
                      index === effectiveActiveIndex ? "bg-slate-100 dark:bg-slate-800" : null,
                    )}
                    onMouseEnter={() => setActiveIndex(index)}
                    onClick={() => selectItem(item)}
                  >
                    {renderItemPrefix
                      ? shouldWrapItemPrefix?.(item) === false
                        ? renderItemPrefix(item)
                        : (
                            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                              {renderItemPrefix(item)}
                            </span>
                          )
                      : null}
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-sm font-medium text-slate-900 dark:text-slate-100">
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
