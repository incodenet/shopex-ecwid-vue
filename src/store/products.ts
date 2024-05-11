import type { Module } from 'vuex'
import type { IProductsState } from './types'
import { getProductByIdService, getProductsService } from '@/services/products'

export const products: Module<IProductsState, {}> = {
  state: {
    products: [],
    isProductsLoading: false,
    currentProduct: null
  },
  getters: {
    isProductsLoading: (s: IProductsState) => s.isProductsLoading,
    products: (s: IProductsState) => s.products,
    currentProduct: (s: IProductsState) => s.currentProduct
  },
  mutations: {
    setProductsLoading(state, isProductsLoading) {
      state.isProductsLoading = isProductsLoading
    },
    setProducts(state, products) {
      state.products = products
    },
    setCurrentProduct(state, currentProduct) {
      state.currentProduct = currentProduct
    }
  },
  actions: {
    async getProducts({ commit }, params) {
      commit('setCurrentProduct', null)
      commit('setProductsLoading', true)

      try {
        const { data } = await getProductsService({ ...params })

        commit('setProducts', data.items)
      } catch (e) {
        console.error(e)
        throw e
      } finally {
        commit('setProductsLoading', false)
      }
    },
    async getProductById({ commit }, { id, params }) {
      commit('setProductsLoading', true)

      try {
        const { data } = await getProductByIdService({ id, params })

        commit('setCurrentProduct', data)
      } catch (e) {
        console.error(e)
        throw e
      } finally {
        commit('setProductsLoading', false)
      }
    }
  }
}
