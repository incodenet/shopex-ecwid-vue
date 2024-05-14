import type { TProduct } from '@/types/api'
import type { IAppState } from '../types'
import type { ShoppingCartStateEnum } from './enums'
import type { CheckoutStatesEnum } from '@/enums'

export interface IShoppingCartState extends IAppState {
  [ShoppingCartStateEnum.SHOPPING_CART_ITEMS]: TProduct[]
  [ShoppingCartStateEnum.IS_SHOPPING_CART_LOADING]: boolean
  [ShoppingCartStateEnum.CHECKOUT_STATE]: `${CheckoutStatesEnum}` | null
}
