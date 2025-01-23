import APIs, { authAPIs, endpoints } from '@/configs/APIs'
import { defineStore } from 'pinia'

interface Course {
  id: number
  name: string
  image: string
  description: string
  price: number
  discount: number
  teacher: {
    user: {
      username: string
      avatar: string
    }
  }
}

export const useCourseStore = defineStore('courseStore', {
  state: () => ({
    categories: [] as Array<{ id: number; name: string }>,
    courses: [] as Array<{
      id: number
      name: string
      image: string
      description: string
      price: number
      discount: number
      teacher: {
        position: string
        description: string
        user: {
          username: string
        }
      }
    }>,

    course: {} as Course,
    totalPages: 0,
    page: 0,
    limit: 6,
    cateFilter: null as number | null,
    minPrice: null as number | null,
    maxPrice: null as number | null,
    countLesson: {} as Record<number, number>,
    countEnrolled: {} as Record<number, number>,
    courseErolled: [],
  }),

  actions: {
    async loadCates() {
      try {
        const res = await APIs.get(endpoints.categories)
        this.categories = res.data
      } catch (error) {
        console.error(error)
      }
    },

    async checkCourseEnrolled(courseId: number, userId: number, token: string) {
      try {
        const res = await authAPIs().get(
          `${endpoints.enrollments}/check-enrollment?userId=${userId}&courseId=${courseId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        )
        this.courseErolled = res.data
      } catch (err) {
        console.error(err)
      }
    },

    async loadCourses() {
      try {
        const res = await APIs.get(`${endpoints.courses}/filter-cate`, {
          params: {
            categoryId: this.cateFilter,
            page: this.page,
            limit: this.limit,
          },
        })
        this.courses = res.data.courses
        this.totalPages = res.data.totalPages

        const countPromise = this.courses.map((course) => this.countLessons(course.id))
        await Promise.all(countPromise)

        const countPromiseEnroll = this.courses.map((course) => this.countEnrollments(course.id))
        await Promise.all(countPromiseEnroll)

        // const checkEnrolled = this.courses.map((course) => this.checkCourseEnrolled(course.id, ))
      } catch (err) {
        console.error(err)
      }
    },

    async loadCoursesByPrice() {
      try {
        const res = await APIs.get(`${endpoints.courses}/filter-price`, {
          params: {
            minPrice: this.minPrice,
            maxPrice: this.maxPrice,
            page: this.page,
            limit: this.limit,
          },
        })
        this.courses = res.data.courses
        this.totalPages = res.data.totalPages
      } catch (err) {
        console.error(err)
      }
    },

    async countLessons(courseId: number) {
      try {
        const res = await authAPIs().get(`${endpoints.lessons}/course/${courseId}/count`)
        this.countLesson = {
          ...this.countLesson,
          [courseId]: res.data,
        }
      } catch (err) {
        console.error(err)
      }
    },

    async countEnrollments(courseId: number) {
      try {
        const res = await authAPIs().get(`${endpoints.enrollments}/course/${courseId}/count`)
        this.countEnrolled = {
          ...this.countEnrolled,
          [courseId]: res.data,
        }
      } catch (err) {
        console.error(err)
      }
    },

    async changePage(newPage: number) {
      if (newPage >= 0 && newPage <= this.totalPages) {
        this.page = newPage
        await this.loadCourses()
      }
    },

    async loadCourseById(courseId: number) {
      try {
        const res = await APIs.get(`${endpoints.courses}/${courseId}`)
        this.course = res.data
        console.log(res.data)
      } catch (err) {
        console.error(err)
      }
    },

    filterCate(cateId: number | null) {
      this.cateFilter = cateId
      this.page = 0
      this.loadCourses()
    },

    filterPrice(minPrice: number | null, maxPrice: number | null) {
      this.minPrice = minPrice
      this.maxPrice = maxPrice
      this.page = 0
      this.loadCoursesByPrice()
    },
  },
})
