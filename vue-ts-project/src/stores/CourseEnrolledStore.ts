import { authAPIs, endpoints } from '@/configs/APIs'
import router from '@/router'
import { defineStore } from 'pinia'
import { useToast } from 'vue-toastification'

const toast = useToast()

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

interface ReplyComment {
  id: number
  content: string
  createdDate: number
  comment: Comment
  user: User
}

export const useCourseEnrolled = defineStore('courseEnrolled', {
  state: () => ({
    courseList: [] as Enrollment[],
    progress: [],
    checkCourseEnrolledBoolean: false as boolean,
    totalPages: 0,
    page: 0,
    limit: 2,
    comments: [] as Comment[],
    countComment: 0,
    commentReply: [] as ReplyComment[],
    pageReplyCmt: 0,
    limitReplyCmt: 3,
    totalPagesReplyCmt: 0,
    contentComment: '',
    contentReplyComment: '',
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
      const res = await authAPIs().get(`${endpoints.enrollments}/check-enrollment-boolean`, {
        params: {
          userId: userId,
          courseId: courseId,
        },
      })
      this.checkCourseEnrolledBoolean = res.data
      if (!res.data) {
        router.push('/forbidden')
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
      } catch (err) {
        console.error(err)
      }
    },

    async loadReplyComment(commentId: number) {
      try {
        const res = await authAPIs().get(`${endpoints.replyComment}/${commentId}`, {
          params: {
            page: this.pageReplyCmt,
            limit: this.limitReplyCmt,
          },
        })
        this.commentReply[commentId] = res.data.replycomments
        this.totalPagesReplyCmt = res.data.totalPages
        console.log(res.data)
      } catch (err) {
        console.error(err)
      }
    },

    async countCommentByLesson(lessonId: number) {
      try {
        const res = await authAPIs().get(`${endpoints.comments}/count/lesson/${lessonId}`)
        this.countComment = res.data
      } catch (err) {
        console.error(err)
      }
    },

    async addComment(lessonId: number, content: string) {
      // console.log('add comment in lesson ' + lessonId + ', with content: ' + content)
      try {
        const res = await authAPIs().post(`${endpoints.comments}`, {
          content: content,
          lesson_id: lessonId,
        })
        console.log(res.data)
        toast.success('Comment successfully!!!')
        await this.loadCommentByLessonId(lessonId)
      } catch (err) {
        console.error(err)
      }
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

    async changePage(newPage: number, lessonId: number) {
      if (newPage >= 0 && newPage < this.totalPages) {
        this.page = newPage
        await this.loadCommentByLessonId(lessonId)
      }
    },
  },
})
