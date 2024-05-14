import type { Module } from 'vuex'
import type { IShoppingCartState } from './types'
import router from '@/router'
import { ShoppingCartActionsEnum } from './enums/actions.enum'
import { routePaths } from '@/router/constants'
import { CheckoutStatesEnum } from '@/enums'
import { ShoppingCartStateEnum } from './enums'

export const cart: Module<IShoppingCartState, {}> = {
  state: {
    [ShoppingCartStateEnum.SHOPPING_CART_ITEMS]: [],
    [ShoppingCartStateEnum.IS_SHOPPING_CART_LOADING]: false,
    [ShoppingCartStateEnum.CHECKOUT_STATE]: null
  },
  getters: {
    isShoppingCartLoading: (s: IShoppingCartState) => s.isShoppingCartLoading,
    shoppingCartItems: (s: IShoppingCartState) => s.shoppingCartItems,
    checkoutState: (s: IShoppingCartState) => s.checkoutState
  },
  mutations: {
    [ShoppingCartActionsEnum.SET_LOADING](state, isLoading) {
      state.isShoppingCartLoading = isLoading
    },
    [ShoppingCartActionsEnum.SET_SHOPPING_CART_ITEMS](state, item) {
      state.shoppingCartItems = [...state.shoppingCartItems.filter((p) => p.id !== item.id), item]
    },
    [ShoppingCartActionsEnum.REMOVE_PRODUCT_FROM_SHOPPING_CART](state, id) {
      state.shoppingCartItems = state.shoppingCartItems.filter((p) => p.id !== id)
    },
    [ShoppingCartActionsEnum.CLEAR_SHOPPING_CART](state) {
      state.shoppingCartItems = []
    },
    [ShoppingCartActionsEnum.SET_CHECKOUT_STATE](state, checkoutState) {
      state.checkoutState = checkoutState
    }
  },
  actions: {
    addProductToCart({ commit }, product) {
      try {
        commit(ShoppingCartActionsEnum.SET_SHOPPING_CART_ITEMS, product)
      } catch (e) {
        console.error(e)
        throw e
      }
    },
    removeProductFromCart({ commit }, id) {
      try {
        commit(ShoppingCartActionsEnum.REMOVE_PRODUCT_FROM_SHOPPING_CART, id)
      } catch (e) {
        console.error(e)
        throw e
      }
    },
    clearCheckoutState({ commit }) {
      commit(ShoppingCartActionsEnum.SET_CHECKOUT_STATE, null)
    },
    proccessToCheckout({ commit }, params) {
      commit(ShoppingCartActionsEnum.SET_LOADING, true)

      console.log(params)

      try {
        commit(ShoppingCartActionsEnum.SET_CHECKOUT_STATE, CheckoutStatesEnum.SUCCESS)

        setTimeout(() => {
          commit(ShoppingCartActionsEnum.CLEAR_SHOPPING_CART)
          router.push({ path: routePaths.home })
        }, 1500)
      } catch (e) {
        console.error(e)
        throw e
      } finally {
        commit(ShoppingCartActionsEnum.SET_LOADING, false)
      }
    }
  }
}
