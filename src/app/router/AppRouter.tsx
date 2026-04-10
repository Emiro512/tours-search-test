import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { HomePage } from "@/pages/home/HomePage"
import { TourDetailsPage } from "@/pages/tour-details/TourDetailsPage"

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/tour/:hotelId/:priceId",
    element: <TourDetailsPage />,
  },
])

export function AppRouter() {
  return <RouterProvider router={router} />
}
