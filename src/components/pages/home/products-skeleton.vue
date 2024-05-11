<template>
  <section class="grid grid-cols-4 max-w-[1200px] mx-auto gap-x-6 gap-y-4 mt-4 mb-[4%]">
    <div
      v-for="i in new Array(4)"
      :key="i"
      class="block p-2 rounded-sm hover:shadow-light bg-white">
      <div class="rounded-sm overflow-hiddein mb-1 min-h-[270px] skeleton"></div>
      <div class="grid gap-2">
        <strong class="skeleton rounded-[8px] min-h-[15px]"></strong>
        <h2 class="skeleton rounded-[8px] min-h-[15px]"></h2>
        <div class="skeleton min-h-[36px] rounded-[8px]"></div>
      </div>
    </div>
  </section>
</template>
