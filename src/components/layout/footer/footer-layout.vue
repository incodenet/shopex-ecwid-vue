<script setup lang="ts">
import BrandLogo from '../../icons/IconMainLogo.vue'
import IconVue from '../../icons/IconVue.vue'
</script>

<template>
  <footer class="px-4 py-2 border-y bg-white flex justify-between items-center">
    <RouterLink to="/" class="inline-flex items-center gap-2">
      <div><BrandLogo class="w-[35px]" /></div>
      <div class="bold text-md">Shopex</div>
    </RouterLink>
    <div class="text-sm">© 2024 · SVG Repo LLC</div>
    <div class="flex gap-2 items-center text-sm">
      Powered by
      <a href="https://vuejs.org/" target="_blank" rel="noopener">
        <IconVue class="w-[30px]" />
      </a>
    </div>
  </footer>
</template>
