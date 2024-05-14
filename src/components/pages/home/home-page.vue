<script setup lang="ts">
import CategoriesSelector from '@/components/containers/categories-selector/categories-selector.vue'
import PProductCard from '@/components/primitives/product-card/p-product-card.vue'
import ProductsSkeleton from './products-skeleton.vue'
import notFound from '@/assets/img/not-found.png'
</script>
<script lang="ts">
import { mapGetters } from 'vuex'
import type { TProduct } from '@/types/api'

export default {
  computed: {
    ...mapGetters(['products', 'isProductsLoading', 'checkoutState'])
  },
  methods: {
    addToCard(product: TProduct) {
      this.$store.dispatch('addProductToCart', product)
    },
    clearCheckoutStatus() {
      return setTimeout(() => this.$store.dispatch('clearCheckoutState'), 3000)
    },
    beforeDestroy() {
      clearTimeout(this.clearCheckoutStatus())
    }
  },
  async mounted() {
    const params = { categories: this.$route.query.category }

    await this.$store.dispatch('getProducts', params)

    this.clearCheckoutStatus()
  },
  components: {
    CategoriesSelector,
    PProductCard
  }
}
</script>

<template>
  <categories-selector />

  <ProductsSkeleton v-if="isProductsLoading" />
  <div
    v-else-if="!isProductsLoading && !products.length"
    class="flex flex-wrap justify-center gap-2 mt-4 px-3">
    <div class="w-full text-center mb-[1%]">
      <h2 class="text-lg">{{ $t('errors.productsNotFound') }}</h2>
    </div>
    <img :src="notFound" class="max-w-[500px] w-full" />
  </div>
  <section v-else class="max-w-[1200px] mx-auto mb-[4%]">
    <div class="grid grid-cols-card gap-y-1 gap-x-6">
      <p-product-card v-for="p in products" :key="p.id" :value="p.id" :product="p" />
    </div>
  </section>
  <div
    class="fixed bottom-0 md:bottom-5 left-[50%] translate-x-[-50%] md:max-w-[98%] rounded-sm z-10 px-5 py-3 shadow-light flex items-center gap-2 toast bg-white w-full md:w-auto"
    v-if="checkoutState === 'success'">
    <v-icon name="io-checkmark-done-circle-sharp" :scale="1.6" fill="green" />
    {{ $t('message.purchaseSuccess') }}
  </div>
</template>
