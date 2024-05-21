<script setup lang="ts">
import ProductSkeleton from './product-skeleton.vue'
import notFound from '@/assets/img/not-found.png'
</script>
<script lang="ts">
import 'vue3-carousel/dist/carousel.css'
import { defineComponent } from 'vue'
import { Carousel, Slide } from 'vue3-carousel'
import { mapGetters } from 'vuex'
import type { TProduct } from '@/types/api'

export default defineComponent({
  components: {
    Carousel,
    Slide
  },
  data: (): any => ({
    currentSlide: 0,
    productId: null
  }),
  watch: {
    productId() {
      if (this.productId) {
        this.clearProductId()
      }
    }
  },
  computed: {
    ...mapGetters(['currentProduct', 'categories', 'isProductsLoading'])
  },
  methods: {
    slideTo(val: number) {
      this.currentSlide = val
    },
    addToCard(product: TProduct) {
      this.$store.dispatch('addProductToCart', product)
      this.productId = product.id
    },
    clearProductId() {
      return setTimeout(() => (this.productId = null), 500)
    },
    goBack() {
      this.$router.go(-1)
    },
    beforeDestroy() {
      clearTimeout(this.clearProductId())
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
      <h2 class="text-lg w-full text-center mb-[5%]">{{ $t('errors.productNotFound') }}</h2>
      <img :src="notFound" class="max-w-[500px] w-full" />
    </div>

    <div class="row flex flex-wrap align-start mt-4 mb-[4%]" v-else>
      <div class="w-full column">
        <div class="mb-6 text-md">
          <p-icon
            name="md-chevronleft"
            :scale="1.5"
            class="cursor-pointer mr-1 hover:fill-primary transition-all"
            @click="goBack" />
          <router-link to="/" class="hover:underline">{{ $t('links.home') }}</router-link>

          {{
            `/ ${categories.filter((c) => c.id === currentProduct.categories[0]?.id)[0]?.name || currentProduct.name.replace('ОБРАЗЕЦ.', '')}`
          }}
        </div>
      </div>
      <div class="w-full md:max-w-[50%] lg:flex-[0_0_50%] column">
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

      <div class="w-full md:max-w-[50%] lg:flex-[0_0_40%] column">
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
            <p-icon name="io-checkmark-done-circle-sharp" :scale="1.6" fill="green" />
            <div class="flex gap-2">
              <div
                v-for="(choise, i) in option.choices"
                :key="choise"
                class="shadow-sm border rounded-[4px] min-w-[40px] min-h-[40px] leading-[40px] text-center text-md font-bold cursor-not-allowed"
                :class="[option.defaultChoice === i ? 'border-success' : '']">
                <div>
                  {{ choise.text }}
                </div>
              </div>
            </div>
          </div>
        </div>
        <hr class="my-5" v-if="currentProduct.options.length" />
        <div>
          <p-button
            size="large"
            :text="$t('buttons.toCart')"
            @click.prevent="addToCard(currentProduct)">
            <template #prefix>
              <p-icon
                :name="currentProduct.id === productId ? 'md-done' : 'bi-cart-plus-fill'"
                :scale="1.4" />
            </template>
          </p-button>
        </div>
      </div>
    </div>
  </div>
</template>
