import './assets/css/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { OhVueIcon, addIcons } from 'oh-vue-icons'

import {
  ViFileTypeVue,
  BiGithub,
  BiCartPlusFill,
  BiCart4,
  MdClearOutlined
} from 'oh-vue-icons/icons'

addIcons(ViFileTypeVue, BiGithub, BiCartPlusFill, BiCart4, MdClearOutlined)

const app = createApp(App)

app.use(router).use(store)
app.component('v-icon', OhVueIcon)

app.mount('#app')
