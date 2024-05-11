<template>
  <section class="flex max-w-[1200px] gap-6 mx-auto justify-center mt-4">
    <div
      class="cursor-pointer text-center [&>div]:hover:shadow-lg"
      v-for="i in new Array(1)"
      :key="i">
      <div
        class="transition-shadow text-center p-1 border min-h-[70px] min-w-[70px] skeleton rounded-sm"></div>
      <span class="min-h-[10px] min-w-[50px] skeleton inline-block"></span>
    </div>
    <div class="cursor-pointer text-center [&>div]:hover:shadow-lg rounded-sm">
      <div
        class="transition-shadow text-center p-1 border min-h-[70px] min-w-[70px] skeleton rounded-sm"></div>
      <span class="min-h-[10px] min-w-[50px] skeleton inline-block rounded-sm"></span>
    </div>
  </section>
</template>
