// import UserLayout from '@/components/layouts/UserLayout.vue'
import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/UserHomePage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/home',
      name: 'HomeView',
      component: HomeView,
    },
    {
      path: '/login',
      name: 'UserLogin',
      meta: {
        layout: 'NoHeaderLayout',
      },
      component: () => import('@/views/login/UserLogin.vue'),
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue'),
    },
    {
      path: '/cart',
      name: 'cart',
      component: () => import('../views/cart/CartCourse.vue'),
    },
    {
      path: '/course-detail/:courseId',
      name: 'course-detail',
      component: () => import('../views/course/CourseDetail.vue'),
    },
    {
      path: '/paypal/success',
      meta: {
        layout: 'NoHeaderLayout',
      },
      name: 'success',
      component: () => import('../views/cart/PaypalSuccess.vue'),
    },
    {
      path: '/paypal/cancel',
      meta: {
        layout: 'NoHeaderLayout',
      },
      name: 'cancel',
      component: () => import('../views/cart/PaypalCancel.vue'),
    },
  ],
})

export default router
