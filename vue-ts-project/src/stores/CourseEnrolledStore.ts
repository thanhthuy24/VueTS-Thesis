import { authAPIs, endpoints } from '@/configs/APIs'
import router from '@/router'
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

interface Lesson {
  id: number
  name: string
}

interface Enrollment {
  id: number
  enrollmentDate: number
  course: Course
  user: User
}

interface Comment {
  id: number
  content: string
  createdDate: number
  lesson: Lesson
  user: User
}

export const useCourseEnrolled = defineStore('courseEnrolled', {
  state: () => ({
    courseList: [] as Enrollment[],
    progress: [],
    checkCourseEnrolled: Boolean,
    totalPages: 0,
    page: 0,
    limit: 6,
    comments: [] as Comment[],
  }),
  actions: {
    async loadCourseList() {
      try {
        const res = await authAPIs().get(`${endpoints.enrollments}/get-courses`)
        this.courseList = res.data
        // console.log(res.data)
      } catch (err) {
        console.error(err)
      }
    },

    async checkCourseEnrolled(userId: number, courseId: number) {
      try {
        const res = await authAPIs().get(`${endpoints.enrollments}/check-enrollment-boolean`, {
          params: {
            userId: userId,
            courseId: courseId,
          },
        })
        this.checkCourseEnrolled = res.data
        if (!res.data) {
          router.push('/forbidden')
        }
      } catch (err) {
        console.error(err)
      }
    },

    async loadCommentByLessonId(lessonId: number) {
      try {
        const res = await authAPIs().get(`${endpoints.comments}/${lessonId}`, {
          params: {
            page: this.page,
            limit: this.limit,
          },
        })
        this.comments = res.data.comments
        this.totalPages = res.data.totalPages
        // console.log(this.comments)
        // console.log('--------')
        // console.log(this.totalPages)
      } catch (err) {
        console.error(err)
      }
    },

    toggleCommentSetting(commentId: number) {
      const button = document.getElementById(`dropdownComment${commentId}Button`)
      const dropdown = document.getElementById(`dropdownComment${commentId}`)

      button?.addEventListener('click', () => {
        dropdown?.classList.toggle('hidden')
      })
    },

    async loadProcess(courseId: number) {
      try {
        const res = await authAPIs().post(`${endpoints.progress}/course/${courseId}`)
        this.progress[courseId] = res.data
        return res.data
      } catch (err) {
        console.error(err)
      }
    },
  },
})
