<script setup lang="ts">
import router from '@/router'
import CategoriesSkeleton from './categories-skeleton.vue'
</script>

<script lang="ts">
import { mapGetters } from 'vuex'

interface IState {
  selectedCategoryId: number | null
}

export default {
  data: (): IState => ({
    selectedCategoryId: null
  }),

  computed: {
    ...mapGetters(['categories', 'isCategoriesLoading'])
  },
  watch: {
    async selectedCategoryId(newValue) {
      await this.$store.dispatch('getProducts', { categories: newValue })
    }
  },
  methods: {
    onCategoryChange(val: number | null) {
      const selectedCategoryId = this.selectedCategoryId === val ? null : val

      this.selectedCategoryId = selectedCategoryId

      if (selectedCategoryId) {
        router.push({
          path: '/',
          query: { category: selectedCategoryId }
        })
      } else {
        this.$router.replace({ query: undefined })
      }
    }
  },
  async mounted() {
    if (this.$route.query.category) {
      this.selectedCategoryId = Number(this.$route.query.category)
    }

    await this.$store.dispatch('getCategories')
  }
}
</script>

<template>
  <CategoriesSkeleton v-if="isCategoriesLoading" />
  <div
    v-else-if="!isCategoriesLoading && !categories.length"
    class="flex flex-wrap justify-center gap-2 mt-4 px-3">
    <div class="w-full text-center mb-[1%]">
      <h2 class="text-lg">Категории не найдены...</h2>
    </div>
  </div>
  <section v-else class="flex justify-center max-w-[1200px] px-[10px] mx-auto mt-7 mb-7">
    <div class="flex gap-6 overflow-auto">
      <div
        v-for="c in categories"
        :key="c.id"
        class="cursor-pointer text-center [&>div]:hover:shadow-light"
        @click="onCategoryChange(c.id)">
        <div
          class="transition-shadow text-center p-1 border rounded-sm w-[60px] mx-auto"
          :class="selectedCategoryId === c.id ? 'shadow-lg border border-success' : ''">
          <img :src="c.thumbnailUrl" alt="" class="w-full h-[50px] object-cover object-center" />
        </div>
        <span :class="selectedCategoryId === c.id ? 'font-bold' : ''">
          {{ c.name }}
        </span>
      </div>
    </div>
  </section>
</template>
