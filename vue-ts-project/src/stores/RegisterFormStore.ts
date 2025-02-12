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
  },
})
