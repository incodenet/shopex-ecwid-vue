<script lang="ts">
import type { PropType } from 'vue'
import PButton from '../button/p-button.vue'
import type { TProduct } from '@/types/api'
export default {
  components: { PButton },
  name: 'p-product-card',
  props: {
    product: Object as PropType<TProduct>
  },
  data: (): any => ({
    productId: null
  }),
  watch: {
    productId() {
      if (this.productId) {
        this.clearProductId()
      }
    }
  },
  methods: {
    addToCard(product) {
      this.$store.dispatch('addProductToCart', product)
      this.productId = product.id
    },
    clearProductId() {
      return setTimeout(() => (this.productId = null), 500)
    },
    beforeDestroy() {
      clearTimeout(this.clearProductId())
    }
  }
}
</script>

<template>
  <router-link
    :to="`/product/${product.id}`"
    class="block p-2 rounded-sm hover:shadow-light transition-shadow bg-white [&>div>img]:hover:scale-[100%]">
    <div class="rounded-sm overflow-hidden mb-1">
      <img
        :src="product.thumbnailUrl"
        :alt="product.title"
        class="origin-top transition-all scale-[104%] w-full" />
    </div>
    <div class="grid">
      <strong class="text-md text-primary whitespace-nowrap">
        {{ product.defaultDisplayedPriceFormatted }}
      </strong>
      <h2 class="font-medium">
        {{ product.name.replace('ОБРАЗЕЦ.', '') }}
      </h2>
      <p-button :text="$t('buttons.toCart')" @click.prevent="addToCard(product)">
        <template #prefix>
          <v-icon :name="product.id === productId ? 'md-done' : 'bi-cart-plus-fill'" :scale="1.4" />
        </template>
      </p-button>
    </div>
  </router-link>
</template>
