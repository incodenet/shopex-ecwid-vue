<script setup lang="ts">
import emptyCart from '@/assets/img/empty-cart.svg'
</script>
<script lang="ts">
import 'vue3-carousel/dist/carousel.css'
import { defineComponent } from 'vue'
import { Carousel, Slide } from 'vue3-carousel'
import { mapGetters } from 'vuex'
import ShoppingCartSkeleton from './shopping-cart-skeleton.vue'

export default defineComponent({
  components: {
    Carousel,
    Slide,
    ShoppingCartSkeleton
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
    removeProduct(id: number) {
      this.$store.dispatch('removeProductFromCart', id)
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
      <h2 class="text-lg w-full text-center mb-[5%]">Корзина пока пуста...</h2>
      <img :src="emptyCart" class="max-w-[500px] w-full" />
    </div>

    <div class="flex flex-wrap align-start md:mt-4 mb-[4%] row" v-else>
      <div class="w-full column">
        <h1 class="mb-6 text-xl font-bold">Корзина</h1>
      </div>
      <div class="max-w-[100%] flex-[0_0_100%] lg:max-w-[75%] lg:flex-[0_0_75%] column">
        <div>
          <div
            v-for="product in shoppingCartItems"
            :key="product.id"
            class="flex flex-wrap gap-5 shadow-light rounded-sm mb-5 relative">
            <div class="max-w-[100%] flex-[0_0_100%] md:max-w-[200px] md:flex-[0_0_200px]">
              <Carousel
                :items-to-show="1"
                :wrap-around="false"
                class="rounded-sm overflow-hidden bg-grey-5 shadow-light">
                <Slide
                  v-for="slide in product.media.images"
                  :key="slide"
                  class="md:max-w-[200px] md:max-h-[200px] w-full">
                  <img :src="slide.imageOriginalUrl" :alt="slide.name" class="w-full" />
                </Slide>
              </Carousel>
            </div>
            <div class="flex-1 px-3 pb-3">
              <div class="flex justify-between gap-2 mt-3">
                <h2 class="text-md font-bold hover:text-primary cursor-pointer">
                  <router-link :to="`/product/${product.id}`">
                    {{ product.name.replace('ОБРАЗЕЦ.', '') }}
                  </router-link>
                </h2>
                <strong class="text-md text-primary whitespace-nowrap">
                  {{ product.defaultDisplayedPriceFormatted }}
                </strong>
              </div>
              <hr class="my-3" />
              <p v-html="product.description" class="text-base line-clamp-2"></p>
              <div class="flex gap-2">
                <div
                  v-for="(choise, i) in product.choices"
                  :key="choise"
                  class="shadow-sm border rounded-[4px] min-w-[40px] min-h-[40px] leading-[40px] text-center cursor-pointer text-md font-bold"
                  :class="product.defaultChoice === i ? 'border-success' : ''">
                  <div>
                    {{ choise.text }}
                  </div>
                </div>
              </div>
            </div>
            <div
              @click="removeProduct(product.id)"
              class="cursor-pointer absolute top-0 right-0 md:top-[-15px] md:right-[-15px] bg-white border rounded-full p-0.5">
              <v-icon name="md-clear-outlined" :scale="1" class="hover:text-danger" />
            </div>
          </div>
        </div>
      </div>
      <div class="max-w-[100%] flex-[0_0_100%] lg:max-w-[25%] lg:flex-[0_0_25%] column">
        <div class="shadow-light p-3 rounded-sm">
          <div>Товары, {{ shoppingCartItems.length }} шт.</div>
          <div class="flex justify-between gap-2 mb-4 text-lg">
            <strong>Итого</strong>
            <strong>
              {{
                shoppingCartItems
                  .map((it) => it.price)
                  .reduce((a, b) => {
                    return a + b
                  }, 0)
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
              }}
              ₽
            </strong>
          </div>
          <div
            class="bg-success font-medium min-h-[42px] flex items-center justify-center gap-2 rounded-[8px] transition-all hover:opacity-[0.9] cursor-pointer"
            @click="placeOrder({ id: 'dd' })">
            <v-icon name="ri-loader-line" animation="spin" v-if="isPurchaseLoading" />
            Заказать
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
