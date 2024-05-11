import type { Module } from 'vuex'
import type { ICategoriesState } from './types'
import { getCategoriesService } from '@/services/categories'

export const categories: Module<ICategoriesState, {}> = {
  state: {
    categories: [],
    isCategoriesLoading: false
  },
  getters: {
    isCategoriesLoading: (s: ICategoriesState) => s.isCategoriesLoading,
    categories: (s: ICategoriesState) => s.categories
  },
  mutations: {
    setCategoriesLoading(state, isCategoriesLoading) {
      state.isCategoriesLoading = isCategoriesLoading
    },
    setCategories(state, categories) {
      state.categories = categories
    }
  },
  actions: {
    async getCategories({ commit }, params) {
      commit('setCategoriesLoading', true)

      try {
        const { data } = await getCategoriesService({ ...params })

        commit('setCategories', data.items)
      } catch (e) {
        console.error(e)
        throw e
      } finally {
        commit('setCategoriesLoading', false)
      }
    }
  }
}
