import { authAPIs, endpoints } from '@/configs/APIs'
import { defineStore } from 'pinia'

interface User {
  id: number
  username: string
  avatar: string
  email: string
  phone: string
  firstName: string
  lastName: string | null
  dateOfBirth: number
  active: boolean
  role: {
    id: number
    name: string
  }
}

export const useUserStore = defineStore('userStore', {
  state: () => ({
    users: [] as User[],
    user: {} as User,
    students: [] as User[],

    countEnroll: 0,

    totalPages: 0,
    totalPageStudent: 0,
    page: 0,
    limit: 5,
    sortBy: 'id',
    order: 'asc',
    keyword: '',
  }),
  actions: {
    async loadAllUsers() {
      try {
        const res = await authAPIs().get(`${endpoints.user}/all-users`, {
          params: {
            page: this.page,
            limit: this.limit,
            sortBy: this.sortBy,
            order: this.order,
            keyword: this.keyword,
          },
        })
        this.users = res.data.users
        this.totalPages = res.data.totalPages
        console.log(res.data)
      } catch (error) {
        console.error(error)
      }
    },

    async loadUsersByRole() {
      try {
        const res = await authAPIs().get(`${endpoints.user}/get-users/1`, {
          params: {
            page: this.page,
            limit: this.limit,
            sortBy: this.sortBy,
            order: this.order,
            key: this.keyword,
          },
        })
        this.students = res.data.users
        this.totalPages = res.data.totalPages
        console.log(res.data)
      } catch (error) {
        console.error(error)
      }
    },

    async loadUserById(userId: number) {
      try {
        const res = await authAPIs().get(`${endpoints.user}/${userId}`)
        this.user = res.data
        console.log(res.data)
      } catch (err) {
        console.error(err)
      }
    },

    async countEnrollByUser(userId: number) {
      try {
        const res = await authAPIs().get(`${endpoints.enrollments}/count-enroll/${userId}`)
        this.countEnroll = res.data
        console.log(res.data)
      } catch (err) {
        console.error(err)
      }
    },

    async changeActiveStatus(userId: number) {
      try {
        await authAPIs().patch(`${endpoints.user}/update-active/${userId}`)
        await this.loadUsersByRole()
      } catch (err) {
        console.error(err)
      }
    },

    async changeSort(field: string) {
      if (this.sortBy === field) {
        this.order = this.order === 'asc' ? 'desc' : 'asc' // Đảo hướng nếu cùng field
      } else {
        this.sortBy = field
        this.order = 'asc' // Reset về tăng dần khi đổi field
      }
      await this.loadUsersByRole()
    },

    async search(keyword: string) {
      this.keyword = keyword
      await this.loadUsersByRole()
    },

    async changePage(newPage: number) {
      if (newPage >= 0 && newPage < this.totalPages) {
        this.page = newPage
        await this.loadUsersByRole()
      }
    },
  },
})
