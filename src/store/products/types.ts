import type { TProduct } from '@/types/api'
import type { ProductsStateEnum } from './enums'

export interface IProductsState {
  [ProductsStateEnum.PRODUCTS]: TProduct[]
  [ProductsStateEnum.IS_PRODUCTS_LOADING]: boolean
  [ProductsStateEnum.CURRENT_PRODUCT]: TProduct | null
}
