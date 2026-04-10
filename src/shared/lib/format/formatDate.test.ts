import { describe, expect, it } from "vitest"
import { formatDate } from "@/shared/lib/format/formatDate"

describe("formatDate", () => {
  it("formats a valid date as DD.MM.YYYY", () => {
    expect(formatDate("2026-04-11")).toBe("11.04.2026")
  })

  it("returns the original input for an invalid date", () => {
    expect(formatDate("not-a-date")).toBe("not-a-date")
  })
})
