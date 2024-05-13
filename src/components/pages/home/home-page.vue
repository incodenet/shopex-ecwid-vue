<script setup lang="ts">
import CategoriesSelector from '@/components/containers/categories-selector/categories-selector.vue'
import ProductsSkeleton from './products-skeleton.vue'
import notFound from '@/assets/img/not-found.png'
</script>
<script lang="ts">
import { mapGetters } from 'vuex'
import type { TProduct } from '@/types/api'

export default {
  data: (): any => ({}),
  computed: {
    ...mapGetters(['products', 'isProductsLoading'])
  },
  methods: {
    addToCard(product: TProduct) {
      this.$store.dispatch('addProductToCart', product)
    }
  },
  async mounted() {
    await this.$store.dispatch('getProducts')
  },
  components: {
    CategoriesSelector
  }
}
</script>

<template>
  <CategoriesSelector />

  <ProductsSkeleton v-if="isProductsLoading" />
  <div
    v-else-if="!isProductsLoading && !products.length"
    class="flex flex-wrap justify-center gap-2 mt-4 px-3">
    <div class="w-full text-center mb-[1%]">
      <h2 class="text-lg">Продукты не найдены...</h2>
    </div>
    <img :src="notFound" class="max-w-[300px] w-full" />
  </div>

  <section v-else class="max-w-[1200px] mx-auto mb-[4%]">
    <div class="grid grid-cols-card gap-y-4 gap-x-6">
      <router-link
        v-for="p in products"
        :key="p.id"
        :value="p.id"
        :to="`/product/${p.id}`"
        class="block p-2 rounded-sm hover:shadow-light transition-shadow bg-white [&>div>img]:hover:scale-[100%]">
        <div class="rounded-sm overflow-hidden mb-1">
          <img
            :src="p.thumbnailUrl"
            :alt="p.title"
            class="origin-top transition-all scale-[104%] w-full" />
        </div>
        <div class="grid">
          <strong class="text-md text-primary whitespace-nowrap">
            {{ p.defaultDisplayedPriceFormatted }}
          </strong>
          <h2 class="font-medium">
            {{ p.name.replace('ОБРАЗЕЦ.', '') }}
          </h2>
          <div
            class="bg-success font-medium min-h-[36px] flex items-center justify-center gap-2 rounded-[8px] mt-1 transition-all hover:opacity-[0.9] cursor-pointer"
            @click.prevent="addToCard(p)">
            <v-icon name="bi-cart-plus-fill" :scale="1.4" />
            Купить
          </div>
        </div>
      </router-link>
    </div>
  </section>
</template>
