export function formatPrice(amount: number, currency: string): string {
  return new Intl.NumberFormat("uk-UA", {
    style: "currency",
    currency: currency.toUpperCase(),
    maximumFractionDigits: 0,
  }).format(amount)
}