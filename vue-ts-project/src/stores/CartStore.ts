import { defineStore } from 'pinia'

export const useCartStore = defineStore('cartStore', {
  state: () => ({
    cart: [] as Array<{ id: number; name: string; price: number; discount: number }>,
    totalItems: 0,
  }),
  actions: {
    async addToCart(course: { id: number; name: string; price: number; discount: number }) {
      try {
        this.cart.push(course)
        // console.log(this.cart)
        this.totalItems = this.cart.length
        localStorage.setItem('totalItems', this.totalItems.toString())
        localStorage.setItem('cart', JSON.stringify(this.cart))
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
