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
      path: '/register-account',
      name: 'register-account',
      meta: {
        layout: 'NoHeaderLayout',
      },
      component: () => import('@/views/login/UserRegister.vue'),
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
    {
      path: '/admin/lesson-create-admin/by-course/:courseId',
      meta: { requiresAuth: true, role: 'ADMIN', layout: 'AdminLayout' },
      name: 'lesson-create-admin',
      component: () => import('../views/admin/lesson/LessonCreateAdmin.vue'),
    },
    {
      path: '/admin/lesson-update-admin/:lessonId',
      meta: { requiresAuth: true, role: 'ADMIN', layout: 'AdminLayout' },
      name: 'lesson-update-admin',
      component: () => import('../views/admin/lesson/LessonUpdateAdmin.vue'),
    },
    {
      path: '/admin/register-list-admin',
      meta: { requiresAuth: true, role: 'ADMIN', layout: 'AdminLayout' },
      name: 'register-list-admin',
      component: () => import('../views/admin/register/RegisterFormList.vue'),
    },
    {
      path: '/admin/register-detail-admin/:registerId',
      meta: { requiresAuth: true, role: 'ADMIN', layout: 'AdminLayout' },
      name: 'register-detail-admin',
      component: () => import('../views/admin/register/RegisterFormDetail.vue'),
    },
    {
      path: '/admin/transaction-list-admin',
      meta: { requiresAuth: true, role: 'ADMIN', layout: 'AdminLayout' },
      name: 'transaction-list-admin',
      component: () => import('../views/admin/transaction/TransactionList.vue'),
    },
    {
      path: '/admin/user-list-admin',
      meta: { requiresAuth: true, role: 'ADMIN', layout: 'AdminLayout' },
      name: 'user-list-admin',
      component: () => import('../views/admin/user/UserListAdmin.vue'),
    },
    {
      path: '/admin/user-detail-admin/:userId',
      meta: { requiresAuth: true, role: 'ADMIN', layout: 'AdminLayout' },
      name: 'user-detail-admin',
      component: () => import('../views/admin/user/UserDetailAdmin.vue'),
    },
    {
      path: '/admin/create-account',
      meta: { requiresAuth: true, role: 'ADMIN', layout: 'AdminLayout' },
      name: 'create-account',
      component: () => import('../views/admin/register/CreateAccount.vue'),
    },
    {
      path: '/admin/teacher-list-admin',
      meta: { requiresAuth: true, role: 'ADMIN', layout: 'AdminLayout' },
      name: 'teacher-list-admin',
      component: () => import('../views/admin/teacher/TeacherListAdmin.vue'),
    },

    // LAYOUT FOR TEACHER
    {
      path: '/teacher',
      meta: { requiresAuth: true, role: 'TEACHER', layout: 'NoHeaderLayout' },
      name: 'teacher-layout',
      component: () => import('../components/layouts/TeacherLayout.vue'),
    },
    {
      path: '/teacher/teacher-layout-course/:courseId',
      meta: { requiresAuth: true, role: 'TEACHER' },
      name: 'teacher-layout-course',
      component: () => import('../components/layouts/TeacherLayoutCourse.vue'),
    },
    {
      path: '/teacher/course-detail-teacher/:courseId',
      meta: { requiresAuth: true, role: 'TEACHER', layout: 'TeacherLayoutCourse' },
      name: 'course-detail-teacher',
      component: () => import('../views/teacher/courses/CousesDetailTeacher.vue'),
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
