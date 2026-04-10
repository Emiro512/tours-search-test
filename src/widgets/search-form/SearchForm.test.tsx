import { render, screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, expect, it, vi } from "vitest"
import { SearchForm } from "@/widgets/search-form/SearchForm"
import type { DestinationComboboxItem } from "@/widgets/search-form/model"

const country: DestinationComboboxItem = {
  id: "ua",
  label: "Україна",
  type: "country",
  countryId: "ua",
}

vi.mock("@/widgets/search-form/useDestinationCombobox", async () => {
  const React = await import("react")

  return {
    useDestinationCombobox() {
      const [selectedItem, setSelectedItem] =
        React.useState<DestinationComboboxItem | null>(null)

      return {
        value: selectedItem?.label ?? "",
        items: [country],
        open: true,
        isLoading: false,
        emptyText: "Нічого не знайдено",
        selectedItem,
        setOpen: vi.fn(),
        onInputClick: vi.fn(),
        onInputChange: vi.fn(),
        onSelectItem: setSelectedItem,
        onClear: vi.fn(),
      }
    },
  }
})

describe("SearchForm", () => {
  it("submits the selected destination", async () => {
    const user = userEvent.setup()
    const onSubmit = vi.fn()

    render(<SearchForm onSubmit={onSubmit} />)

    await user.click(screen.getByRole("button", { name: /україна/i }))
    await waitFor(() => {
      expect(screen.getByRole("combobox")).toHaveValue("Україна")
    })

    await user.click(screen.getByRole("button", { name: /шукати тури/i }))

    expect(onSubmit).toHaveBeenCalledWith(country)
  })
})
