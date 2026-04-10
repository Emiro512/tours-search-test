import { describe, expect, it } from "vitest"
import { aggregateTours } from "@/services/tours/toursAggregator"
import type { ApiHotelsMapDto } from "@/services/api/api.types"
import type { SearchResult } from "@/services/search/search.types"

const hotels: ApiHotelsMapDto = {
  "101": {
    id: 101,
    name: "Sea View Hotel",
    img: "/sea-view.jpg",
    cityId: 10,
    cityName: "Antalya",
    countryId: "tr",
    countryName: "Turkey",
  },
  "202": {
    id: 202,
    name: "Mountain Resort",
    img: "/mountain.jpg",
    cityId: 20,
    cityName: "Bansko",
    countryId: "bg",
    countryName: "Bulgaria",
  },
}

const searchResult: SearchResult = {
  token: "search-token",
  prices: [
    {
      id: "expensive-price",
      hotelId: "101",
      amount: 1400,
      currency: "usd",
      startDate: "2026-06-01",
      endDate: "2026-06-08",
    },
    {
      id: "missing-hotel-price",
      hotelId: "999",
      amount: 300,
      currency: "usd",
      startDate: "2026-06-03",
      endDate: "2026-06-10",
    },
    {
      id: "cheap-price",
      hotelId: "202",
      amount: 700,
      currency: "usd",
      startDate: "2026-05-01",
      endDate: "2026-05-08",
    },
  ],
}

describe("aggregateTours", () => {
  it("merges prices with hotels by hotelId", () => {
    const tours = aggregateTours(searchResult, hotels)

    expect(tours).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          priceId: "expensive-price",
          hotelId: "101",
          hotelName: "Sea View Hotel",
          hotelImage: "/sea-view.jpg",
          countryName: "Turkey",
          cityName: "Antalya",
          amount: 1400,
        }),
      ]),
    )
  })

  it("filters out unmatched items", () => {
    const tours = aggregateTours(searchResult, hotels)

    expect(tours).toHaveLength(2)
    expect(tours.some((tour) => tour.priceId === "missing-hotel-price")).toBe(false)
  })

  it("sorts results by amount ascending", () => {
    const tours = aggregateTours(searchResult, hotels)

    expect(tours.map((tour) => tour.priceId)).toEqual([
      "cheap-price",
      "expensive-price",
    ])
  })
})
