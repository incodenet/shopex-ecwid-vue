import NotFoundLayout from '@/components/pages/not-found/not-found-layout.vue'
import HomePage from '@/components/pages/home/home-page.vue'
import ProductPage from '@/components/pages/product/product-page.vue'
import ShoppingCartPage from '@/components/pages/shopping-cart/shopping-cart-page.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePage
      // component: () => import('../pages/HomePage.vue')
    },
    {
      path: '/product/:id',
      name: 'product',
      component: ProductPage
    },
    {
      path: '/cart',
      name: 'cart',
      component: ShoppingCartPage
    },
    { path: '/:pathMatch(.*)*', component: NotFoundLayout }
  ]
})

export default router
