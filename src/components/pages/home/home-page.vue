<script setup lang="ts">
import CategoriesSelector from '@/components/containers/categories-selector/categories-selector.vue'
import ProductsSkeleton from './products-skeleton.vue'
import notFound from '@/assets/img/not-found.png'
</script>
<script lang="ts">
import { mapGetters } from 'vuex'
import type { TProduct } from '@/types/api'

export default {
  data: (): any => ({
    productId: null
  }),
  computed: {
    ...mapGetters(['products', 'isProductsLoading', 'checkoutState'])
  },
  watch: {
    productId() {
      if (this.productId) {
        this.clearProductId()
      }
    }
  },
  methods: {
    addToCard(product: TProduct) {
      this.$store.dispatch('addProductToCart', product)
      this.productId = product.id
    },
    clearCheckoutStatus() {
      return setTimeout(() => this.$store.dispatch('clearCheckoutState'), 3000)
    },
    clearProductId() {
      return setTimeout(() => (this.productId = null), 500)
    },
    beforeDestroy() {
      clearTimeout(this.clearCheckoutStatus())
      clearTimeout(this.clearProductId())
    }
  },
  async mounted() {
    const params = { categories: this.$route.query.category }

    await this.$store.dispatch('getProducts', params)

    this.clearCheckoutStatus()
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
    <div class="grid grid-cols-card gap-y-1 gap-x-6">
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
            <v-icon :name="p.id === productId ? 'md-done' : 'bi-cart-plus-fill'" :scale="1.4" />
            В корзину
          </div>
        </div>
      </router-link>
    </div>
  </section>

  <div
    class="fixed bottom-0 md:bottom-5 left-[50%] translate-x-[-50%] md:max-w-[98%] rounded-sm z-10 px-5 py-3 shadow-light flex items-center gap-2 toast bg-white w-full md:w-auto"
    v-if="checkoutState === 'success'">
    <v-icon name="io-checkmark-done-circle-sharp" :scale="1.6" fill="green" />
    Ваш заказ успешно обработан!
  </div>
</template>
