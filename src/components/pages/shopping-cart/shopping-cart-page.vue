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
    currentSlide: 0
  }),
  computed: {
    ...mapGetters(['items', 'isCartLoading'])
  },
  methods: {
    placeOrder(val: number) {
      this.currentSlide = val
    },
    removeProduct(id: number) {
      this.$store.dispatch('removeProductFromCart', id)
    }
  }
})
</script>

<template>
  <div class="max-w-[1200px] mx-auto p-5">
    <shopping-cart-skeleton v-if="isCartLoading" />
    <div class="flex flex-wrap justify-center gap-2" v-else-if="!isCartLoading && !items.length">
      <h2 class="text-lg w-full text-center mb-[5%]">Корзина пока пуста...</h2>
      <img :src="emptyCart" class="max-w-[500px]" />
    </div>

    <div class="flex flex-wrap align-start mt-4 mb-[4%] row" v-else>
      <div class="w-full column">
        <h1 class="mb-6 text-xl font-bold">Корзина</h1>
      </div>
      <div class="max-w-[75%] flex-[0_0_75%] column">
        <div>
          <div
            v-for="product in items"
            :key="product.id"
            class="flex gap-5 shadow-light rounded-sm mb-5 p-2 relative">
            <div class="max-w-[200px] flex-[0_0_200px]">
              <Carousel
                :items-to-show="1"
                :wrap-around="false"
                class="rounded-sm overflow-hidden bg-grey-5 shadow-light">
                <Slide
                  v-for="slide in product.media.images"
                  :key="slide"
                  class="max-w-[200px] max-h-[200px]">
                  <img :src="slide.imageOriginalUrl" :alt="slide.name" />
                </Slide>
              </Carousel>
            </div>
            <div class="flex-1">
              <div class="flex justify-between gap-2 mt-2">
                <h2 class="text-md font-bold">{{ product.name.replace('ОБРАЗЕЦ.', '') }}</h2>
                <strong class="text-md text-primary whitespace-nowrap">
                  {{ product.defaultDisplayedPriceFormatted }}
                </strong>
              </div>
              <hr class="my-4" />
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
              class="cursor-pointer absolute top-[-15px] right-[-15px] bg-white border rounded-full p-0.5">
              <v-icon name="md-clear-outlined" :scale="1.2" class="hover:text-danger" />
            </div>
          </div>
        </div>
      </div>
      <div class="max-w-[25%] flex-[0_0_25%] column">
        <div class="shadow-light p-3 rounded-sm">
          <div>Товары, {{ items.length }} шт.</div>
          <div class="flex justify-between gap-2 mb-4 text-lg">
            <strong>Итого</strong>
            <strong>
              {{
                items
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
            class="bg-success font-medium min-h-[42px] flex items-center justify-center gap-2 rounded-[8px] transition-all hover:opacity-[0.9] cursor-pointer">
            Заказать
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
