import { authAPIs, endpoints } from '@/configs/APIs'
import { defineStore } from 'pinia'

interface Receipt {
  id: number
  orderDate: number
  totalPrice: number
  user: User
}

interface OrderDetail {
  id: number
  quantity: number
  price: number
  discount: number
  course: Course
  receipt: Receipt
}

interface Course {
  id: number
  name: string
  image: string
  description: string
  price: number
  discount: number
  isActive: boolean
}

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

export const useReceiptStore = defineStore('receiptStore', {
  state: () => ({
    receipts: [] as Receipt[],
    receiptDetail: [] as OrderDetail[],

    totalPages: 0,
    totalPagesDetail: 0,

    page: 0,
    limit: 5,
    sortBy: 'id',
    order: 'asc',
    keyword: '',
  }),
  actions: {
    // async loadReceipts() {
    //   try {
    //     const res = await authAPIs().get(endpoints.receipt, {
    //       params: {
    //         page: this.page,
    //         limit: this.limit,
    //         sortBy: this.sortBy,
    //         order: this.order,
    //         keyword: this.keyword,
    //       },
    //     })
    //     this.receipts = res.data.receipts
    //     this.totalPages = res.data.totalPages
    //     console.log(res.data)
    //   } catch (error) {
    //     console.error(error)
    //   }
    // },

    async loadReceiptDetails() {
      try {
        const res = await authAPIs().get(endpoints.receiptDetail, {
          params: {
            page: this.page,
            limit: this.limit,
            sortBy: this.sortBy,
            order: this.order,
            keyword: this.keyword,
          },
        })
        this.receiptDetail = res.data.receiptDetails
        this.totalPagesDetail = res.data.totalPages
        console.log(res.data)
      } catch (error) {
        console.error(error)
      }
    },

    async changeSort(field: string) {
      if (this.sortBy === field) {
        this.order = this.order === 'asc' ? 'desc' : 'asc' // Đảo hướng nếu cùng field
      } else {
        this.sortBy = field
        this.order = 'asc' // Reset về tăng dần khi đổi field
      }
      await this.loadReceiptDetails()
    },

    async search(keyword: string) {
      this.keyword = keyword
      await this.loadReceiptDetails()
    },

    async changePage(newPage: number) {
      if (newPage >= 0 && newPage < this.totalPagesDetail) {
        this.page = newPage
        await this.loadReceiptDetails()
      }
    },
  },
})
