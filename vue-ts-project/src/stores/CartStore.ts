// import { authAPIs, endpoints } from '@/configs/APIs'
import { authAPIs, endpoints } from '@/configs/APIs'
import { defineStore } from 'pinia'
import { useToast } from 'vue-toastification'
import { v4 as uuidv4 } from 'uuid'
import axios from 'axios'

const toast = useToast()
const EXCHANGE_RATE_API =
  'https://portal.vietcombank.com.vn/Usercontrols/TVPortal.TyGia/pXML.aspx?b=10'
// const loginStore = useLoginStore()
// const USD = 25485,04;

export const useCartStore = defineStore('cartStore', {
  state: () => ({
    cart: [] as Array<{ id: number; name: string; price: number; discount: number; quantity: 1 }>,
    totalItems: 0,
    courseErolled: [] as Array<{ id: number; name: string }>,
  }),
  actions: {
    async getExchangeRate() {
      try {
        const response = await axios.get(EXCHANGE_RATE_API)
        // Xử lý dữ liệu từ XML (nếu cần)
        const parser = new DOMParser()
        const xmlDoc = parser.parseFromString(response.data, 'text/xml')
        const usdRate = xmlDoc.querySelector('Exrate[CurrencyCode="USD"]')?.getAttribute('Sell')
        return usdRate ? parseFloat(usdRate.replace(/,/g, '')) : 0
      } catch (error) {
        console.error('Lỗi khi lấy tỷ giá:', error)
        throw new Error('Không thể lấy tỷ giá hối đoái')
      }
    },

    async checkoutByPaypal(totalPrice: number, token: string) {
      try {
        const res = await authAPIs().post(
          `${endpoints.paypal}/create-payment?amount=${totalPrice}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        )
        window.location.href = res.data
      } catch (err) {
        console.error(err)
      }
    },

    async checkoutCancel() {
      try {
        const urlParams = new URLSearchParams(window.location.search)
        const token = urlParams.get('token')
        const res = await authAPIs().get(`${endpoints.paypal}/cancel?token=${token}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        window.location.href = res.data
      } catch (err) {
        console.error(err)
      }
    },

    async checkoutSuccess(token1: string) {
      try {
        const urlParams = new URLSearchParams(window.location.search)
        const token = urlParams.get('token')
        const paymentId = urlParams.get('paymentId')
        const payerId = urlParams.get('PayerID')

        await authAPIs().get(
          `${endpoints.paypal}/success?paymentId=${paymentId}&token=${token}&PayerID=${payerId}`,
          {
            headers: {
              Authorization: `Bearer ${token1}`,
            },
          },
        )

        toast.success('Thanh toán thành công!')
        await this.createReceipt(token1)
        window.location.href = '/home'
      } catch (err) {
        console.error(err)
      }
    },

    async checkoutByMoMo(totalPrice: number, token: string) {
      try {
        // toast.warning('This course in cart before!!')
        const newOrderId = uuidv4()
        console.log(newOrderId)
        const res = await authAPIs().post(
          `${endpoints.payment}/create-payment`,
          {
            orderId: newOrderId,
            amount: totalPrice, // Sử dụng .value vì đây là ref
            returnUrl: 'http://localhost:8082/check-payment',
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        )

        const payUrl = res.data.payUrl
        if (payUrl) {
          window.location.href = payUrl
        } else {
          console.error('payUrl không tồn tại')
        }
      } catch (err) {
        console.error('Thanh toán thất bại: ' + err)
      }
    },

    async checkoutSuccessMoMo(token: string) {
      toast.success('Thanh toán thành công!!')
      await this.createReceipt(token)
      await new Promise((resolve) => setTimeout(resolve, 3000))
      window.location.href = '/home'
    },

    async createReceipt(token: string) {
      try {
        await authAPIs().post(`${endpoints.payment}/update-payment`, this.cart, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        this.removeAll()
      } catch (err) {
        console.error(err)
      }
    },

    async addToCart(
      course: { id: number; name: string; price: number; discount: number; quantity: 1 },
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
