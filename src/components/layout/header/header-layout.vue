<script setup lang="ts">
import BrandLogo from '../../icons/IconMainLogo.vue'
import IconShoppingCart from '../../icons/IocnShoppingCart.vue'
</script>

<template>
  <header class="px-4 py-2 shadow-sm sticky top-0 z-10 bg-white flex justify-between items-center">
    <RouterLink to="/" class="w-[45px] inline-flex items-center gap-2">
      <div><BrandLogo /></div>
      <div class="bold text-xl">Shopex</div>
    </RouterLink>

    <nav>
      <RouterLink to="/cart" class="inline-block relative">
        <span
          class="min-w-[20px] bg-danger rounded-sm text-white inline-block text-center bold text-sm absolute top-[-8px] right-[-8px]">
          1
        </span>
        <IconShoppingCart class="w-[30px]" />
      </RouterLink>
    </nav>
  </header>
</template>
