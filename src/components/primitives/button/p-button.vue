<script lang="ts">
import type { PropType } from 'vue'
type TButtonSizes = 'large' | 'small' | 'xsmall'

export default {
  name: 'p-button',
  props: {
    text: String,
    size: String as PropType<TButtonSizes>
  }
}
</script>

<template>
  <div
    :class="`bg-success font-medium flex items-center justify-center gap-2 rounded-[8px] mt-1 px-2 transition-all hover:opacity-[0.9] cursor-pointer ${size === 'large' ? 'min-h-[42px]' : size === 'xsmall' ? 'min-h-[25px]' : 'min-h-[36px]'}`">
    <slot name="prefix"></slot>
    {{ text }}
    <slot name="suffix"></slot>
  </div>
</template>
