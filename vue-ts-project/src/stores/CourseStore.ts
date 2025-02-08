import APIs, { authAPIs, endpoints } from '@/configs/APIs'
import { defineStore } from 'pinia'

interface Course {
  id: number
  name: string
  image: string
  description: string
  price: number
  discount: number
  teacher: Teacher
  isActive: boolean
  category: Category
  tag: Tag
}

interface Teacher {
  id: number
  user: {
    username: string
    avatar: string
    firstName: string
    lastName: string
  }
  position: string
  description: string
}

interface Category {
  id: number
  name: string
}

interface Tag {
  id: number
  name: string
}

export const useCourseStore = defineStore('courseStore', {
  state: () => ({
    categories: [] as Category[],
    tags: [] as Tag[],
    teachers: [] as Teacher[],
    courses: [] as Course[],

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

    category: {} as Category,
    tag: {} as Tag,
    teacher: {} as Teacher,
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

    async loadTags() {
      try {
        const res = await authAPIs().get(endpoints.tags)
        this.tags = res.data
      } catch (err) {
        console.error(err)
      }
    },

    async loadTeachers() {
      try {
        const res = await authAPIs().get(endpoints.teachers)
        this.teachers = res.data
      } catch (err) {
        console.error(err)
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

    async loadCourseAdmin() {
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
      if (newPage >= 0 && newPage < this.totalPages) {
        this.page = newPage
        await this.loadCourses()
      }
    },

    async loadCourseById(courseId: number) {
      try {
        const res = await APIs.get(`${endpoints.courses}/${courseId}`)
        this.course = res.data
        this.category = res.data.category
        this.tag = res.data.tag
        this.teacher = res.data.teacher
      } catch (err) {
        console.error(err)
      }
    },

    async deleteCourse(courseId: number) {
      try {
        await authAPIs().delete(`${endpoints.courses}/${courseId}`)
        console.log('delete successful')
        await this.loadCourses()
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
