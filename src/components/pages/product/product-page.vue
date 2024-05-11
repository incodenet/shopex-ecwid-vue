<script setup lang="ts">
import IconShoppingCart from '../../icons/IocnShoppingCart.vue'
import ProductSkeleton from './product-skeleton.vue'
import image from '@/assets/img/not-found.png'
</script>
<script lang="ts">
import './product.styles.css'
import 'vue3-carousel/dist/carousel.css'
import { defineComponent } from 'vue'
import { Carousel, Slide } from 'vue3-carousel'
import { mapGetters } from 'vuex'

export default defineComponent({
  components: {
    Carousel,
    Slide
  },
  data: () => ({
    currentSlide: 0
  }),
  computed: {
    ...mapGetters(['currentProduct', 'isProductsLoading'])
  },
  methods: {
    slideTo(val: number) {
      console.log(val)
      this.currentSlide = val
    }
  },
  async mounted() {
    const id = this.$route.params.id

    await this.$store.dispatch('getProductById', { id })
  }
})
</script>

<template>
  <div class="max-w-[1200px] mx-auto p-5">
    <ProductSkeleton v-if="isProductsLoading" />
    <div class="flex flex-wrap justify-center gap-2" v-else-if="!currentProduct">
      <h2 class="text-lg w-full text-center mb-[5%]">Товар не найден...</h2>
      <img :src="image" width="300" />
    </div>

    <div class="inline-flex align-start gap-6 mt-4 mb-[4%]" v-else>
      <div class="max-w-[50%] flex-[0_0_50%]">
        <div class="card-content white-text">
          <Carousel
            id="gallery"
            :items-to-show="1"
            :wrap-around="false"
            v-model="currentSlide"
            class="rounded-sm overflow-hidden mb-4 bg-grey-5 shadow-light">
            <Slide v-for="slide in currentProduct.media.images" :key="slide">
              <img :src="slide.imageOriginalUrl" :alt="slide.name" />
            </Slide>
          </Carousel>

          <Carousel
            v-if="currentProduct.media.images.length > 0"
            id="thumbnails"
            :items-to-show="3"
            :wrap-around="false"
            snapAlign="start"
            v-model="currentSlide"
            class="bg-grey-5"
            ref="carousel">
            <Slide v-for="(slide, i) in currentProduct.media.images" :key="slide">
              <div
                class="carousel__item cursor-pointer w-full h-[180px] overflow-hidden"
                :class="currentSlide === i ? 'border border-success' : ''"
                @mouseover="slideTo(i)">
                <img :src="slide.imageOriginalUrl" :alt="slide.name" />
              </div>
            </Slide>
          </Carousel>
        </div>
      </div>

      <div class="max-w-[40%]">
        <div class="mb-5">
          <div class="flex items-center justify-between gap-4">
            <h1 class="text-lg font-bold">{{ currentProduct.name.replace('ОБРАЗЕЦ.', '') }}</h1>
            <strong class="text-lg text-primary whitespace-nowrap">
              {{ currentProduct.defaultDisplayedPriceFormatted }}
            </strong>
          </div>
          <hr class="my-4" />
          <p v-html="currentProduct.description" class="text-base"></p>
        </div>
        <hr class="my-5" />
        <div>
          <div v-for="option in currentProduct.options" :key="option">
            <div class="font-bold mb-2">{{ option.name }}</div>

            <div class="flex gap-2">
              <div
                v-for="(choise, i) in option.choices"
                :key="choise"
                class="shadow-sm border rounded-[4px] min-w-[40px] min-h-[40px] leading-[40px] text-center cursor-pointer text-md font-bold"
                :class="option.defaultChoice === i ? 'border-success' : ''">
                <div>
                  {{ choise.text }}
                </div>
              </div>
            </div>
          </div>
        </div>
        <hr class="my-5" v-if="currentProduct.options.length" />
        <div>
          <div
            class="bg-success font-medium min-h-[42px] flex items-center justify-center gap-2 rounded-[8px] transition-all hover:opacity-[0.9] cursor-pointer">
            <IconShoppingCart class="w-[20px]" />
            Купить
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
