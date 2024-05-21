import './assets/css/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import primitives from '@/components/primitives'
import { i18n } from './constants'

const app = createApp(App)

app.use(router).use(store).use(i18n)

primitives.forEach((primitive) => {
  app.component(primitive.name!, primitive)
})

app.mount('#app')
