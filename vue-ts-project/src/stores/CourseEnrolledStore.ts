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

interface Review {
  id: number
  ratingDate: number
  user: User
  rating: number
  comment: string
}

export const useCourseEnrolled = defineStore('courseEnrolled', {
  state: () => ({
    courseList: [] as Enrollment[],
    progress: [],
    checkCourseEnrolledBoolean: false as boolean,

    totalPages: 0,
    totalPagesReplyCmt: 0,
    totalPagesReview: 0,

    page: 0,
    limit: 2,

    pageReplyCmt: 0,
    limitReplyCmt: 3,

    pageReviews: 0,
    limitReviews: 10,

    comments: [] as Comment[],
    countComment: 0,
    commentReply: [] as ReplyComment[],

    contentComment: '',
    contentReplyComment: '',
    averageRating: 0,
    countRatingAll: 0,
    averagePerRate: [],
    countPerRate: [],

    review: [] as Review[],
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

    async addReplyComment(commentId: number, content: string) {
      try {
        const res = await authAPIs().post(`${endpoints.replyComment}`, {
          content: content,
          comment_id: commentId,
        })
        console.log(res.data)
        toast.success('reply comment successfully!!!')
        await this.loadReplyComment(commentId)
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

    async loadAverageRating(courseId: number) {
      try {
        const res = await authAPIs().get(`${endpoints.rating}/${courseId}`)
        this.averageRating = res.data
        // console.log(res.data)
      } catch (err) {
        console.error(err)
      }
    },

    async loadCountRatingAll(courseId: number) {
      try {
        const res = await authAPIs().get(`${endpoints.rating}/${courseId}/count`)
        this.countRatingAll = res.data
        console.log(res.data)
      } catch (err) {
        console.error(err)
      }
    },

    // tính phần trăm mà số lượng rate chiếm trong tổng số lượt rate, ví dụ: all: 4 rates, rate 5 có 2 => rate 5 chiếm 50%

    async loadAveragePerRate(courseId: number, rate: number) {
      try {
        const res = await authAPIs().get(`${endpoints.rating}/${courseId}/rating/${rate}`)
        this.averagePerRate[rate] = res.data
        console.log('rating: ' + rate + ' ~%:  ' + res.data)
      } catch (err) {
        console.error(err)
      }
    },

    // đếm số lượng rating theo từng rate từ 1 -> 5
    async loadCountPerRate(courseId: number, rate: number) {
      try {
        const res = await authAPIs().get(`${endpoints.rating}/${courseId}/rate/${rate}`)
        this.countPerRate[rate] = res.data
        console.log('rate: ' + rate + ': ' + res.data)
      } catch (err) {
        console.error(err)
      }
    },

    async loadReviews(courseId: number) {
      try {
        const res = await authAPIs().get(`${endpoints.rating}/course/${courseId}`, {
          params: {
            page: this.pageReviews,
            limit: this.limitReviews,
          },
        })
        this.review = res.data.ratings
        this.totalPagesReview = res.data.totalPages

        console.log(res.data)
      } catch (err) {
        console.error(err)
      }
    },

    async addReview(comment: string, rating: number, courseId: number) {
      try {
        const res = await authAPIs().post(endpoints.rating, {
          comment: comment,
          rating: rating,
          course_id: courseId,
        })
        console.log(res.data)
        await this.loadReviews(courseId)
        toast.success('Review course Successfully!!')
      } catch (err) {
        if (err.response && err.response.data === 'Rating already exist!!!') {
          toast.error('Rating already exist!!!')
        } else {
          toast.error('An error occurred. Please try again.')
        }
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
