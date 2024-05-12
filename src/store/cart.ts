import type { Module } from 'vuex'
import type { ICartState } from './types'

export const cart: Module<ICartState, {}> = {
  state: {
    items: [],
    isCartLoading: false,
    checkoutState: null
  },
  getters: {
    isCartLoading: (s: ICartState) => s.isCartLoading,
    items: (s: ICartState) => s.items,
    checkoutState: (s: ICartState) => s.checkoutState
  },
  mutations: {
    setCartLoading(state, isCartLoading) {
      state.isCartLoading = isCartLoading
    },
    setCartItems(state, item) {
      state.items = [...state.items, item]
    },
    removeProductFromItems(state, id) {
      console.log(id)
      state.items = state.items.filter((p) => p.id !== id)
    },
    setCheckoutState(state, checkoutState) {
      state.checkoutState = checkoutState
    }
  },
  actions: {
    addProductToCart({ commit }, product) {
      try {
        commit('setCartItems', product)
      } catch (e) {
        console.error(e)
        throw e
      }
    },
    removeProductFromCart({ commit }, id) {
      try {
        commit('removeProductFromItems', id)
      } catch (e) {
        console.error(e)
        throw e
      }
    },
    async proccessToCheckout({ commit }, params) {
      commit('setCartLoading', true)

      try {
        commit('setCheckoutState', 'success')
      } catch (e) {
        console.error(e)
        throw e
      } finally {
        commit('setCartLoading', false)
      }
    }
  }
}
