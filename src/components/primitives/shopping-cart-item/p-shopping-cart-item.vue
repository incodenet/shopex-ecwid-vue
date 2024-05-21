<script lang="ts">
import { Carousel, Slide } from 'vue3-carousel'

export default {
  components: {
    Carousel,
    Slide
  },
  name: 'p-shopping-cart-item',
  props: ['product'],
  methods: {
    removeProduct(id: number) {
      this.$store.dispatch('removeProductFromCart', id)
    }
  }
}
</script>

<template>
  <div class="flex flex-wrap gap-5 shadow-light rounded-sm mb-5 relative">
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
      <p-icon name="md-clear-outlined" :scale="1" class="hover:text-danger" />
    </div>
  </div>
</template>
