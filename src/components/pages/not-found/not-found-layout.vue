<script setup lang="ts">
import image from '@/assets/img/page-not-found.png'
</script>

<template>
  <div class="flex flex-wrap justify-center gap-2 mt-4">
    <div class="w-full text-center mb-[5%]">
      <h2 class="text-lg">Страница не найдена...</h2>
      <RouterLink to="/" class="inline-flex hover:text-info">
        <div class="bold text-md">В главную</div>
      </RouterLink>
    </div>
    <img :src="image" width="300" />
  </div>
</template>
