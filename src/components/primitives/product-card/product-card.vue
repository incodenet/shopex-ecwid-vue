<script lang="ts">
export default {
  name: 'product-card',
  props: ['product'],
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
      <div
        class="bg-success font-medium min-h-[36px] flex items-center justify-center gap-2 rounded-[8px] mt-1 transition-all hover:opacity-[0.9] cursor-pointer"
        @click.prevent="addToCard(product)">
        <v-icon :name="product.id === productId ? 'md-done' : 'bi-cart-plus-fill'" :scale="1.4" />
        {{ $t('buttons.toCart') }}
      </div>
    </div>
  </router-link>
</template>
