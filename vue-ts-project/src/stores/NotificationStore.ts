import { authAPIs, endpoints } from '@/configs/APIs'
import { defineStore } from 'pinia'

interface Notiication {
  id: number
  title: string
  message: string
  isRead: boolean
  createdDate: number
  user: User
}

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

export const useNotificationStore = defineStore('notificationStore', {
  state: () => ({
    notifications: [] as Notiication[],
    page: 0,
    limit: 5,
    totalPages: 0,
    isLoading: false,
  }),
  actions: {
    async loadNotifications() {
      if (this.isLoading || (this.page >= this.totalPages && this.page != 0)) {
        return
      }

      this.isLoading = true

      try {
        const res = await authAPIs().get(endpoints['get-notification'], {
          params: {
            page: this.page,
            limit: this.limit,
          },
        })
        this.notifications = [...this.notifications, ...res.data.notifications]

        this.totalPages = res.data.totalPages
        this.page += 1
        // console.log(res.data.notifications)
      } catch (err) {
        console.error('Lỗi khi tải thông báo:', err)
      } finally {
        this.isLoading = false
      }
    },

    async markReadNotification(notificationId: number) {
      try {
        // console.log('update is read')
        await authAPIs().patch(`${endpoints['get-notification']}/mark-read/${notificationId}`)
        await this.loadNotifications()
      } catch (err) {
        console.error(err)
      }
    },
  },
})
