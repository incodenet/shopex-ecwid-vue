<script setup lang="ts">
import CategoriesSelector from '@/components/containers/categories-selector/categories-selector.vue'
import ProductsSkeleton from './products-skeleton.vue'
import IconShoppingCart from '../../icons/IocnShoppingCart.vue'
</script>
<script lang="ts">
import { mapGetters } from 'vuex'

export default {
  data: (): any => ({}),
  computed: {
    ...mapGetters(['products', 'isProductsLoading'])
  },
  async mounted() {
    await this.$store.dispatch('getProducts')
  }
}
</script>

<template>
  <CategoriesSelector />

  <ProductsSkeleton v-if="isProductsLoading" />
  <section v-else class="grid grid-cols-4 max-w-[1200px] mx-auto gap-x-6 gap-y-4 mt-4 mb-[4%]">
    <router-link
      v-for="p in products"
      :key="p.id"
      :value="p.id"
      :to="`/product/${p.id}`"
      class="block p-2 rounded-sm hover:shadow-light bg-white [&>div>img]:hover:scale-[100%]">
      <div class="rounded-sm overflow-hidden mb-1">
        <img :src="p.thumbnailUrl" :alt="p.title" class="origin-top transition-all scale-[104%]" />
      </div>
      <div class="grid">
        <strong class="text-md text-primary whitespace-nowrap">
          {{ p.defaultDisplayedPriceFormatted }}
        </strong>
        <h2 class="font-medium">
          {{ p.name.replace('ОБРАЗЕЦ.', '') }}
        </h2>
        <div
          class="bg-success font-medium min-h-[36px] flex items-center justify-center gap-2 rounded-[8px] mt-1 transition-all hover:opacity-[0.9] cursor-pointer">
          <IconShoppingCart class="w-[20px]" />
          Купить
        </div>
      </div>
    </router-link>
  </section>
</template>
