import type { TCategory, TProduct } from '@/types/api'

export interface IAppState {
  error?: any
}

export interface ICategoriesState extends IAppState {
  categories: TCategory[]
  isCategoriesLoading: boolean
}

export interface IProductsState extends IAppState {
  products: TProduct[]
  isProductsLoading: boolean
  currentProduct: TProduct | null
}

export interface ICartState extends IAppState {
  items: TProduct[]
  isCartLoading: boolean
  checkoutState: 'success' | 'error' | null
}
