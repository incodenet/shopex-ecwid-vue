import { ProductsStateEnum } from './enums/state.enum'
import type { Module } from 'vuex'
import type { IProductsState } from './types'
import { getProductByIdService, getProductsService } from '@/services/products'
import { ProductsActionsEnum } from './enums'

export const products: Module<IProductsState, {}> = {
  state: {
    [ProductsStateEnum.PRODUCTS]: [],
    [ProductsStateEnum.IS_PRODUCTS_LOADING]: false,
    [ProductsStateEnum.CURRENT_PRODUCT]: null
  },
  getters: {
    isProductsLoading: (s: IProductsState) => s.isProductsLoading,
    products: (s: IProductsState) => s.products,
    currentProduct: (s: IProductsState) => s.currentProduct
  },
  mutations: {
    [ProductsActionsEnum.SET_PRODUCTS_LOADING](state, isProductsLoading) {
      state.isProductsLoading = isProductsLoading
    },
    [ProductsActionsEnum.SET_PRODUCTS](state, products) {
      state.products = products
    },
    [ProductsActionsEnum.SET_CURRENT_PRODUCT](state, currentProduct) {
      state.currentProduct = currentProduct
    }
  },
  actions: {
    async getProducts({ commit }, params) {
      commit(ProductsActionsEnum.SET_CURRENT_PRODUCT, null)
      commit(ProductsActionsEnum.SET_PRODUCTS_LOADING, true)

      try {
        const { data } = await getProductsService({ ...params })

        commit(ProductsActionsEnum.SET_PRODUCTS, data.items)
      } catch (e) {
        console.error(e)
        throw e
      } finally {
        commit(ProductsActionsEnum.SET_PRODUCTS_LOADING, false)
      }
    },
    async getProductById({ commit }, { id, params }) {
      commit(ProductsActionsEnum.SET_PRODUCTS_LOADING, true)

      try {
        const { data } = await getProductByIdService({ id, params })

        commit(ProductsActionsEnum.SET_CURRENT_PRODUCT, data)
      } catch (e) {
        console.error(e)
        throw e
      } finally {
        commit(ProductsActionsEnum.SET_PRODUCTS_LOADING, false)
      }
    }
  }
}
