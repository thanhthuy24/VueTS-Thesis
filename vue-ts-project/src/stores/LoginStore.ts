import APIs, { authAPIs, endpoints } from '@/configs/APIs'
import router from '@/router'
import dayjs from 'dayjs'
import { defineStore } from 'pinia'
import { useToast } from 'vue-toastification'

const toast = useToast()
export const useLoginStore = defineStore('loginStore', {
  state: () => ({
    // Boolean, String trong typescript là kiểu Constructor
    // => Nên dùng kiểu dữ liệu nguyên thủy (boolean, string, ...)

    isLoggedIn: false as boolean,
    statusWarning: false as boolean,

    avatarURL: '',
    token: '' as string,
    role: '' as string,
    username: '' as string,
    password: '' as string,

    oldPassword: '' as string,
    newPassword: '' as string,
    retypePassword: '' as string,

    currentUser: null as {
      id: number
      username: string
      avatar: string
      email: string
      phone: string
      firstName: string
      lastName: string | null
      dateOfBirth: Date | null
      role: {
        id: number
        name: string
      }
    } | null,
  }),
  actions: {
    async loadLogin() {
      try {
        const res = await APIs.post(endpoints.login, {
          username: this.username,
          password: this.password,
        })
        this.token = res.data
        localStorage.setItem('token', this.token)

        // lưu thời điểm hết hạn
        const expireTime = dayjs().add(3, 'hour').toISOString()
        localStorage.setItem('expireTime', expireTime)

        const response = await APIs.get(endpoints.currentUser, {
          headers: {
            Authorization: `Bearer ${this.token}`,
          },
        })
        this.currentUser = response.data
        console.log(this.currentUser)
        this.role = response.data.role.name
        this.isLoggedIn = true
        this.statusWarning = false

        localStorage.setItem('currentUser', JSON.stringify(this.currentUser))
        localStorage.setItem('role', this.role)

        if (this.role === 'ADMIN') {
          router.push('/admin') // Chuyển hướng đến trang Admin
        } else if (this.role === 'USER') {
          router.push('/home') // Chuyển hướng đến trang User
        } else if (this.role === 'TEACHER') {
          router.push('/teacher')
        } else {
          router.push('/login') // Chuyển hướng mặc định
        }
      } catch (err) {
        this.isLoggedIn = false
        this.statusWarning = true
        console.error(err)
      }
    },

    async changePassword(userId: number, token: string) {
      try {
        await authAPIs().patch(
          `${endpoints.user}/change-password/${userId}`,
          {
            oldPassword: this.oldPassword,
            newPassword: this.newPassword,
            retypePassword: this.retypePassword,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        )
        // console.log(res.data)
        toast.success('Change password successfully!!!')
      } catch (err) {
        console.error(err)
      }
    },

    async updateAvatar(userId: number, file: File, token: string) {
      try {
        const dateBirth = new Date(this.currentUser?.dateOfBirth).toISOString().split('T')[0]
        // tạo form data
        const formData = new FormData()
        formData.append('file', file)
        formData.append('lastName', this.currentUser?.lastName)
        formData.append('firstName', this.currentUser?.firstName)
        formData.append('email', this.currentUser?.email)
        formData.append('phone', this.currentUser?.phone)
        formData.append('dateOfBirth', dateBirth)
        formData.append('username', this.currentUser?.username)

        const res = await authAPIs().patch(`${endpoints.user}/update-avatar/${userId}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
          },
        })

        this.avatarURL = res.data.avatar
        this.currentUser = res.data
        localStorage.setItem('currentUser', JSON.stringify(this.currentUser))
        toast.success('Update avatar successfully!!')
      } catch (err) {
        console.error(err)
      }
    },

    initialize() {
      const token = localStorage.getItem('token')
      const expireTime = localStorage.getItem('expireTime')

      if (token && expireTime) {
        const now = dayjs()
        const expire = dayjs(expireTime)

        if (now.isBefore(expire)) {
          // token còn hiệu lực
          this.token = token

          this.currentUser = JSON.parse(localStorage.getItem('currentUser') || 'null')
          this.role = localStorage.getItem('role') || ''
          this.isLoggedIn = true
        } else {
          // token hết hiệu lực
          this.logout()
        }
      }
    },

    logout() {
      this.isLoggedIn = false
      this.statusWarning = false
      this.token = ''
      this.currentUser = null
      localStorage.removeItem('token')
      localStorage.removeItem('expireTime')
    },

    loginAcc(username: string, password: string) {
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      ;(this.username = username), (this.password = password), this.loadLogin()
    },

    handleChangePass(oldPassword: string, newPassword: string, retypePassword: string) {
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      ;(this.oldPassword = oldPassword),
        (this.newPassword = newPassword),
        (this.retypePassword = retypePassword),
        this.changePassword(this.currentUser?.id, this.token)
    },
  },
})
