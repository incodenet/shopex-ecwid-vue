import './assets/css/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { OhVueIcon, addIcons } from 'oh-vue-icons'
import { createI18n } from 'vue-i18n'

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
import { messages } from './constants'

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

const i18n = createI18n({
  globalInjection: true,
  locale: 'ru',
  fallbackLocale: 'ru',
  legacy: false,
  messages
})

const app = createApp(App)

app.use(router).use(store).use(i18n)
app.component('v-icon', OhVueIcon)

app.mount('#app')
