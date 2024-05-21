<script setup lang="ts">
import emptyCart from '@/assets/img/empty-cart.svg'
</script>
<script lang="ts">
import 'vue3-carousel/dist/carousel.css'
import { defineComponent } from 'vue'
import { mapGetters } from 'vuex'
import ShoppingCartSkeleton from './shopping-cart-skeleton.vue'
import PShoppingCartItem from '@/components/primitives/shopping-cart-item/p-shopping-cart-item.vue'
import { calculateCheckoutSum } from '@/utils'
import type { TProduct } from '@/types/api'

export default defineComponent({
  components: {
    ShoppingCartSkeleton,
    PShoppingCartItem
  },
  data: () => ({
    isPurchaseLoading: false,
    isLoading: true
  }),
  computed: {
    ...mapGetters(['shoppingCartItems', 'isShoppingCartLoading'])
  },
  methods: {
    disableLoading() {
      return setTimeout(() => {
        this.isPurchaseLoading = false
        this.isLoading = false
      }, 1500)
    },
    placeOrder(details: Record<string, any>) {
      this.isPurchaseLoading = true

      this.$store.dispatch('proccessToCheckout', details)

      this.disableLoading()
    },
    beforeDestroy() {
      clearTimeout(this.disableLoading())
    }
  },
  mounted() {
    this.disableLoading()
  }
})
</script>

<template>
  <div class="max-w-[1200px] mx-auto p-3 md:p-5">
    <shopping-cart-skeleton v-if="isLoading" />
    <div
      class="flex flex-wrap justify-center gap-2"
      v-else-if="!isLoading && !shoppingCartItems.length">
      <h2 class="text-lg w-full text-center mb-[5%]">{{ $t('errors.cartIsEmpty') }}</h2>
      <img :src="emptyCart" class="max-w-[500px] w-full" />
    </div>

    <div class="flex flex-wrap align-start md:mt-4 mb-[4%] row" v-else>
      <div class="w-full column">
        <h1 class="mb-6 text-xl font-bold">{{ $t('pages.cart') }}</h1>
      </div>
      <div class="max-w-[100%] flex-[0_0_100%] lg:max-w-[75%] lg:flex-[0_0_75%] column">
        <p-shopping-cart-item
          v-for="product in shoppingCartItems"
          :key="product.id"
          :product="product" />
      </div>
      <div class="max-w-[100%] flex-[0_0_100%] lg:max-w-[25%] lg:flex-[0_0_25%] column">
        <div class="shadow-light p-3 rounded-sm">
          <div>
            <strong>{{ shoppingCartItems.length }}</strong>
            {{ $t('labels.items') }}
          </div>
          <div class="flex justify-between gap-2 mb-4 text-lg">
            <strong>{{ $t('labels.sum') }}</strong>
            <strong>
              {{ calculateCheckoutSum(shoppingCartItems.map((it: TProduct) => it.price)) }}
              ₽
            </strong>
          </div>
          <p-button size="large" :text="$t('buttons.order')" @click="placeOrder({ id: '1' })">
            <template #prefix>
              <p-icon name="ri-loader-line" animation="spin" v-if="isPurchaseLoading" />
            </template>
          </p-button>
        </div>
      </div>
    </div>
  </div>
</template>
