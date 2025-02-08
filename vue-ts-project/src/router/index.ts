// import UserLayout from '@/components/layouts/UserLayout.vue'
import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/UserHomePage.vue'
import { useLoginStore } from '@/stores/LoginStore'

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
      meta: { requiresAuth: true },
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
    {
      path: '/forbidden',
      meta: {
        layout: 'NoHeaderLayout',
      },
      name: 'forbidden',
      component: () => import('../views/warning/403Forbidden.vue'),
    },
    {
      path: '/user-dashboard',
      meta: { requiresAuth: true },
      name: 'user-dashboard',
      component: () => import('../views/user/UserDashboard.vue'),
    },
    {
      path: '/course-enrolled/:courseId',
      meta: { requiresAuth: true },
      name: 'course-enrolled',
      component: () => import('../views/course/CourseEnrolled.vue'),
    },
    {
      path: '/course-enrolled-list',
      meta: { requiresAuth: true },
      name: 'course-enrolled-list',
      component: () => import('../views/course/CourseEnrolledList.vue'),
    },
    {
      path: '/course-rating-list/:courseId',
      meta: { requiresAuth: true },
      name: 'course-rating-list',
      component: () => import('../views/course/CourseRating.vue'),
    },
    {
      path: '/register-form',
      meta: { requiresAuth: true },
      name: 'register-form',
      component: () => import('../views/register/RegisterForm.vue'),
    },
    {
      path: '/register-form-list',
      meta: { requiresAuth: true },
      name: 'register-form-list',
      component: () => import('../views/register/RegisterFormList.vue'),
    },
    {
      path: '/assignment-choice/:assignmentId',
      meta: { requiresAuth: true },
      name: 'assignment-choice',
      component: () => import('../views/assignment/AssignmentChoice.vue'),
    },
    {
      path: '/assignment-essay/:assignmentId',
      meta: { requiresAuth: true },
      name: 'assignment-essay',
      component: () => import('../views/assignment/AssignmentEssay.vue'),
    },

    // ROUTER FOR ADMIN

    {
      path: '/admin',
      meta: { requiresAuth: true, role: 'ADMIN' },
      name: 'admin-layout',
      component: () => import('../components/layouts/AdminLayout.vue'),
    },
    {
      path: '/admin/course-list-admin',
      meta: { requiresAuth: true, role: 'ADMIN', layout: 'AdminLayout' },
      name: 'course-list-admin',
      component: () => import('../views/admin/course/CourseListAdmin.vue'),
    },
    {
      path: '/admin/course-create-admin',
      meta: { requiresAuth: true, role: 'ADMIN', layout: 'AdminLayout' },
      name: 'course-create-admin',
      component: () => import('../views/admin/course/CourseCreateAdmin.vue'),
    },
    {
      path: '/admin/course-update-admin/:courseId',
      meta: { requiresAuth: true, role: 'ADMIN', layout: 'AdminLayout' },
      name: 'course-update-admin',
      component: () => import('../views/admin/course/CourseUpdateAdmin.vue'),
    },
    {
      path: '/admin/lesson-list-admin',
      meta: { requiresAuth: true, role: 'ADMIN', layout: 'AdminLayout' },
      name: 'lesson-list-admin',
      component: () => import('../views/admin/lesson/LessonListAdmin.vue'),
    },
  ],
})

router.beforeEach((to, from, next) => {
  const loginStore = useLoginStore()
  const isLoggedIn = loginStore.currentUser !== null

  if (to.meta.requiresAuth && !isLoggedIn) {
    next({ path: '/forbidden' })
  } else {
    next()
  }
})

export default router
