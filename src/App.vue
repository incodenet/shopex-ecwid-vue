<script setup>
import HeaderLayout from './components/layout/header/header-layout.vue'
import FooterLayout from './components/layout/footer/footer-layout.vue'
</script>

<template>
  <div class="min-h-[100vh] flex flex-col">
    <HeaderLayout />
    <main class="flex-1">
      <RouterView />
    </main>
    <FooterLayout />
  </div>
</template>
