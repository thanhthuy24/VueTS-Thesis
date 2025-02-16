<!-- <script setup lang="ts">
import UserLayout from './components/layouts/UserLayout.vue'
</script>

<template>
  <UserLayout />
</template>

<script lang="ts">
export default {
  name: 'App',
  components: {
    UserLayout,
  },
  computed: {
    isLoginPage() {
      return this.$route.name === 'UserLogin'
    },
  },
}
</script> -->

<template>
  <component :is="layout">
    <RouterView />
  </component>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import NoHeaderLayout from './components/layouts/NoHeaderLayout.vue'
import UserLayout from './components/layouts/UserLayout.vue'
import AdminLayout from './components/layouts/AdminLayout.vue'
import TeacherLayoutCourse from './components/layouts/TeacherLayoutCourse.vue'

import { onMounted } from 'vue'
import { onMessageListener, requestForToken } from '@/firebase/firebase'

onMounted(async () => {
  await requestForToken()

  onMessageListener().then((payload) => {
    console.log('Foreground message received:', payload)
  })
})

const route = useRoute()
const layout = computed(() => {
  if (route.meta.layout === 'NoHeaderLayout') {
    return NoHeaderLayout
  } else if (route.meta.layout === 'AdminLayout') {
    return AdminLayout
  } else if (route.meta.layout === 'TeacherLayoutCourse') {
    return TeacherLayoutCourse
  } else {
    return UserLayout // Mặc định là layout của User
  }
  // return route.meta.layout === 'NoHeaderLayout' ? NoHeaderLayout : UserLayout
})
</script>

<!-- <style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style> -->
