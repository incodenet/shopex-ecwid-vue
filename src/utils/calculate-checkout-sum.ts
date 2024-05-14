export const calculateCheckoutSum = (prices: number[]) =>
  prices
    .reduce((a, b) => {
      return a + b
    }, 0)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
