<script lang="ts">
import { OhVueIcon, addIcons } from 'oh-vue-icons'
import {
  ViFileTypeVue,
  BiGithub,
  BiCartPlusFill,
  BiCart4,
  MdClearOutlined,
  RiLoaderLine,
  IoCheckmarkDoneCircleSharp,
  MdDone,
  MdChevronleft
} from 'oh-vue-icons/icons'

addIcons(
  ViFileTypeVue,
  BiGithub,
  BiCartPlusFill,
  BiCart4,
  MdClearOutlined,
  RiLoaderLine,
  IoCheckmarkDoneCircleSharp,
  MdDone,
  MdChevronleft
)

export default {
  name: 'p-icon',
  components: { 'v-icon': OhVueIcon }
}
</script>

<template>
  <v-icon><slot></slot></v-icon>
</template>
