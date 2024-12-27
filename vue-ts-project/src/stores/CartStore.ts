// import { authAPIs, endpoints } from '@/configs/APIs'
import { authAPIs, endpoints } from '@/configs/APIs'
import { defineStore } from 'pinia'
import { useToast } from 'vue-toastification'

const toast = useToast()

export const useCartStore = defineStore('cartStore', {
  state: () => ({
    cart: [] as Array<{ id: number; name: string; price: number; discount: number }>,
    totalItems: 0,
    courseErolled: [] as Array<{ id: number; name: string }>,
  }),
  actions: {
    async addToCart(
      course: { id: number; name: string; price: number; discount: number },
      userId: number,
      token: string,
    ) {
      try {
        const res = await authAPIs().get(
          `${endpoints.enrollments}/check-enrollment-boolean?userId=${userId}&courseId=${course.id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        )
        if (res.data === true) {
          toast.warning('This course is enrolled before!!')
        } else {
          const isAlreadyInCart = this.cart.some((item) => item.id === course.id)
          if (isAlreadyInCart) {
            toast.warning('This course in cart before!!')
          } else {
            this.cart.push(course)
            this.totalItems = this.cart.length
            localStorage.setItem('totalItems', this.totalItems.toString())
            localStorage.setItem('cart', JSON.stringify(this.cart))
            toast.success('Add to cart successfully!!')
          }
        }
      } catch (error) {
        console.error('Error adding course to cart:', error)
      }
    },

    initialize() {
      const savedTotalItems = localStorage.getItem('totalItems')
      console.log(this.cart)
      // Chuyển đổi từ string sang number (nếu tồn tại)
      if (savedTotalItems) {
        this.totalItems = parseInt(savedTotalItems, 10)
        this.cart = JSON.parse(localStorage.getItem('cart') || 'null')
      }
    },

    removeAll() {
      this.totalItems = 0
      this.cart = []
      localStorage.removeItem('totalItems')
      localStorage.removeItem('cart')
    },

    removeFromCart(id: number) {
      try {
        this.cart = this.cart.filter((course) => course.id !== id)
        this.totalItems = this.cart.length
        localStorage.setItem('totalItems', this.totalItems.toString())
        localStorage.setItem('cart', JSON.stringify(this.cart))
      } catch (err) {
        console.error('Error removing course to cart:', err)
      }
    },
  },
})
