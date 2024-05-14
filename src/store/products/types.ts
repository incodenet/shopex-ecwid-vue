import type { TProduct } from '@/types/api'
import type { IAppState } from '../types'
import type { ProductsStateEnum } from './enums'

export interface IProductsState extends IAppState {
  [ProductsStateEnum.PRODUCTS]: TProduct[]
  [ProductsStateEnum.IS_PRODUCTS_LOADING]: boolean
  [ProductsStateEnum.CURRENT_PRODUCT]: TProduct | null
}
