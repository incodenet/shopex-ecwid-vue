<script setup lang="ts">
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
      this.selectedCategoryId = this.selectedCategoryId === val ? null : val
    }
  },
  async mounted() {
    await this.$store.dispatch('getCategories')
  }
}
</script>

<template>
  <CategoriesSkeleton v-if="isCategoriesLoading" />

  <section v-else class="flex max-w-[1200px] gap-6 mx-auto justify-center mt-4 sticky">
    <div
      v-for="c in categories"
      :key="c.id"
      class="cursor-pointer text-center [&>div]:hover:shadow-light"
      @click="onCategoryChange(c.id)">
      <div
        class="transition-shadow text-center p-1 border rounded-sm"
        :class="selectedCategoryId === c.id ? 'shadow-lg' : ''">
        <img :src="c.thumbnailUrl" alt="" class="max-w-[70px]" />
      </div>
      <span :class="selectedCategoryId === c.id ? 'font-bold' : ''">
        {{ c.name }}
      </span>
    </div>
  </section>
</template>
