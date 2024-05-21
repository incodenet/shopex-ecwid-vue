<script setup lang="ts">
import { palette } from '@/constants'
import BrandLogo from '@/components/icons/IconMainLogo.vue'
</script>
<script lang="ts">
import { mapGetters } from 'vuex'
import { LocalesEnum } from '@/enums'

export default {
  computed: {
    ...mapGetters(['shoppingCartItems'])
  },
  methods: {
    changeLocale() {
      this.$i18n.locale = this.$i18n.locale === LocalesEnum.EN ? LocalesEnum.RU : LocalesEnum.EN
    }
  }
}
</script>

<template>
  <header class="px-4 py-2 shadow-sm sticky top-0 z-10 bg-white flex justify-between items-center">
    <RouterLink to="/" class="w-[45px] inline-flex items-center gap-2">
      <div><BrandLogo /></div>
      <div class="bold text-xl">Shopex</div>
    </RouterLink>

    <div class="flex item-center gap-2">
      <p-button :text="$i18n.locale.toUpperCase()" size="xsmall" @click="changeLocale"></p-button>
      <RouterLink to="/cart" class="inline-block relative">
        <span
          v-if="shoppingCartItems?.length"
          class="min-w-[20px] bg-danger rounded-sm text-white inline-block text-center bold text-sm absolute top-[-8px] right-[-8px]">
          {{ shoppingCartItems?.length }}
        </span>
        <p-icon
          name="bi-cart4"
          :scale="1.8"
          :fill="palette.info.primary"
          :hover="true"
          class="hover:text-success-secondary" />
      </RouterLink>
    </div>
  </header>
</template>
