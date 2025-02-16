import { authAPIs, endpoints } from '@/configs/APIs'
import { defineStore } from 'pinia'
import { useToast } from 'vue-toastification'

const toast = useToast()
interface User {
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
}

interface Form {
  id: number
  reason: string
  position: string
  status: false
  user: User
}

export const useRegisterFormStore = defineStore('registerFormStore', {
  state: () => ({
    form: {} as Form,
    listForm: [] as Form[],

    allFormAdmin: [] as Form[],
    registerFormById: {
      id: 0,
      reason: '',
      position: '',
      status: false,
      user: {
        username: '',
      },
    } as Form,
  }),
  actions: {
    async registerForm(position: string, reason: string) {
      try {
        const res = await authAPIs().post(endpoints.register, {
          position: position,
          reason: reason,
        })
        this.form = res.data
        console.log(res.data)
        toast.success('Register successfully!!!')
      } catch (err) {
        console.error(err)
        toast.error('Register failed! Please check information again!')
      }
    },

    async loadRegisterForm() {
      try {
        const res = await authAPIs().get(`${endpoints.register}/list-form/user`)
        this.listForm = res.data
        console.log(res.data)
      } catch (err) {
        console.error(err)
      }
    },

    async loadRegisterFormAdmin() {
      try {
        const res = await authAPIs().get(`${endpoints.register}`)
        this.allFormAdmin = res.data
        console.log(res.data)
      } catch (err) {
        console.error(err)
      }
    },

    async loadRegisterById(registerId: number) {
      try {
        const res = await authAPIs().get(`${endpoints.register}/${registerId}`)
        this.registerFormById = res.data
        console.log(res.data)
      } catch (err) {
        console.error(err)
      }
    },

    async submitRegisterForm(registerId: number) {
      try {
        await authAPIs().patch(`${endpoints.register}/update/${registerId}`, {
          position: this.registerFormById.position,
          reason: this.registerFormById.reason,
          status: true,
          user_id: this.registerFormById.user.id,
        })
        await this.loadRegisterById(registerId)
        toast.success('Submit register form successfully!!!')
      } catch (err) {
        console.error(err)
      }
    },

    async submitRegisterFormIcon(
      registerId: number,
      position: string,
      reason: string,
      userId: number,
    ) {
      try {
        await authAPIs().patch(`${endpoints.register}/update/${registerId}`, {
          position: position,
          reason: reason,
          status: true,
          user_id: userId,
        })
        await this.loadRegisterById(registerId)
        toast.success('Submit register form successfully!!!')
      } catch (err) {
        console.error(err)
      }
    },

    async sendNotification(token: string) {
      try {
        await authAPIs().post(`${endpoints.notifications}/send`, {
          params: {
            title: 'Register Form',
            body: 'New register form has been created!',
            token: token,
          },
        })
      } catch (err) {
        console.error(err)
      }
    },
  },
})
