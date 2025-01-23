import { authAPIs, endpoints } from '@/configs/APIs'
import { defineStore } from 'pinia'
// import { useToast } from 'vue-toastification'

// const toast = useToast()

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

interface Enrollment {
  id: number
  enrollmentDate: number
  course: Course
  user: User
}

export const useCourseEnrolled = defineStore('courseEnrolled', {
  state: () => ({
    courseList: [] as Enrollment[],
    progress: [],
  }),
  actions: {
    async loadCourseList() {
      try {
        const res = await authAPIs().get(`${endpoints.enrollments}/get-courses`)
        this.courseList = res.data
        console.log(res.data)
      } catch (err) {
        console.error(err)
      }
    },

    async loadProcess(courseId: number) {
      try {
        const res = await authAPIs().post(`${endpoints.progress}/course/${courseId}`)
        this.progress[courseId] = res.data
        return res.data
        // console.log('courseId: ' + courseId + ', progress: ' + res.data)
      } catch (err) {
        console.error(err)
      }
    },
  },
})
