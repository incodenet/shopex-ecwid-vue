import { api } from '@/constants'

export const BaseUrl = `/api/${api.storeId}`

export const ApiUrl = {
  categories: `/categories`,
  products: `/products`,
  productById: (id: string) => `/products/${id}`
} as const
