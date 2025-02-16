import APIs, { authAPIs, endpoints } from '@/configs/APIs'
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

interface Role {
  id: number
  name: string
}

interface Teacher {
  id: number
  position: string
  reason: string
  user: User
}

export const useUserStore = defineStore('userStore', {
  state: () => ({
    users: [] as User[],
    user: {} as User,
    students: [] as User[],
    teachers: [] as User[],
    totalPageTeacher: 0,
    pageTeacher: 0,
    countEnroll: 0,

    totalPages: 0,
    totalPageStudent: 0,
    page: 0,
    limit: 5,
    sortBy: 'id',
    order: 'asc',
    keyword: '',

    roles: [] as Role[],
    checkTeacher: {} as Teacher,
  }),
  actions: {
    async loadRole() {
      try {
        const res = await authAPIs().get(endpoints.role)
        this.roles = res.data
        console.log(this.roles)
      } catch (err) {
        console.error(err)
      }
    },

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

    async loadUserByRoleTeacher() {
      try {
        const res = await authAPIs().get(`${endpoints.user}/get-users/3`, {
          params: {
            page: this.pageTeacher,
            limit: this.limit,
            sortBy: this.sortBy,
            order: this.order,
            key: this.keyword,
          },
        })
        this.teachers = res.data.users
        this.totalPageTeacher = res.data.totalPages
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

    async sendEmail(email: string, username: string) {
      try {
        // console.log(email)
        await authAPIs().post(endpoints.email, {
          to: email,
          username: username,
          password: '123',
        })
      } catch (err) {
        console.error(err)
      }
    },

    async createTeacher(position: string, description: string, userId: number) {
      try {
        await authAPIs().post(endpoints.teacher, {
          position: position,
          description: description,
          user_id: userId,
        })
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

    async changeSortTeacher(field: string) {
      if (this.sortBy === field) {
        this.order = this.order === 'asc' ? 'desc' : 'asc' // Đảo hướng nếu cùng field
      } else {
        this.sortBy = field
        this.order = 'asc' // Reset về tăng dần khi đổi field
      }
      await this.loadUserByRoleTeacher()
    },

    async searchTeacher(keyword: string) {
      this.keyword = keyword
      await this.loadUserByRoleTeacher()
    },

    async changePageTeacher(newPage: number) {
      if (newPage >= 0 && newPage < this.totalPageTeacher) {
        this.pageTeacher = newPage
        await this.loadUserByRoleTeacher()
      }
    },

    async loadTeacher(userId: number) {
      try {
        const res = await APIs.get(`${endpoints.teacher}/user/${userId}`)
        this.checkTeacher = res.data
        console.log(res.data)
      } catch (err) {
        console.error(err)
      }
    },
  },
})
