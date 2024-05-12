import { createStore } from 'vuex'

import type { IAppState } from './types'
import { products } from './products'
import { categories } from './categories'
import { cart } from './cart'

export default createStore<IAppState>({
  state: { error: null } as IAppState,
  getters: {
    error: (s: IAppState) => s.error
  },
  mutations: {
    setError(state: IAppState, error: any) {
      state.error = error
    },
    clearError(state: IAppState) {
      state.error = null
    }
  },
  actions: {},
  modules: { categories, products, cart }
})
