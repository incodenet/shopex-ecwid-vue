<script setup lang="ts">
import BrandLogo from '@/components/icons/IconMainLogo.vue'
</script>

<template>
  <footer
    class="px-4 py-2 gap-3 md:gap-0 border-y bg-white flex flex-wrap justify-between items-center">
    <RouterLink to="/" class="inline-flex items-center justify-center w-full md:w-auto gap-2">
      <div><BrandLogo class="w-[35px]" /></div>
      <div class="bold text-md">Shopex</div>
    </RouterLink>
    <div class="text-sm w-full md:w-auto text-center">
      © 2024 ·
      <a href="https://www.lightspeedhq.com/" target="_blank" rel="noopener">Lightspeed</a>
      ·
      <a href="https://api-docs.ecwid.com/reference/overview" target="_blank" rel="noopener">
        Ecwid
      </a>
    </div>
    <div class="flex gap-2 items-center text-sm justify-center md:w-auto w-full">
      Powered by
      <a href="https://vuejs.org/" target="_blank" rel="noopener">
        <p-icon name="vi-file-type-vue" />
      </a>
      <a href="https://github.com/incodenet/shopex-ecwid-vue" target="_blank" rel="noopener">
        <p-icon name="bi-github" />
      </a>
    </div>
  </footer>
</template>
