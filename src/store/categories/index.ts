import { CategoriesStateEnum } from './enums/state.enum'
import type { Module } from 'vuex'
import type { ICategoriesState } from './types'
import { getCategoriesService } from '@/services/categories'
import { CategoriesActionsEnum } from './enums'

export const categories: Module<ICategoriesState, {}> = {
  state: {
    [CategoriesStateEnum.CATEGORIES]: [],
    [CategoriesStateEnum.IS_CATEGORIES_LOADING]: false
  },
  getters: {
    isCategoriesLoading: (s: ICategoriesState) => s.isCategoriesLoading,
    categories: (s: ICategoriesState) => s.categories
  },
  mutations: {
    [CategoriesActionsEnum.SET_CATEGORIES_LOADING](state, isCategoriesLoading) {
      state.isCategoriesLoading = isCategoriesLoading
    },
    [CategoriesActionsEnum.SET_CATEGORIES](state, categories) {
      state.categories = categories
    }
  },
  actions: {
    async getCategories({ commit }, params) {
      commit(CategoriesActionsEnum.SET_CATEGORIES_LOADING, true)

      try {
        const { data } = await getCategoriesService({ ...params })

        commit(CategoriesActionsEnum.SET_CATEGORIES, data.items)
      } catch (e) {
        console.error(e)
        throw e
      } finally {
        commit(CategoriesActionsEnum.SET_CATEGORIES_LOADING, false)
      }
    }
  }
}
