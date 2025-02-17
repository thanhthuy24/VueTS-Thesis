import APIs, { authAPIs, endpoints } from '@/configs/APIs'
import { defineStore } from 'pinia'

interface Lesson {
  id: number
  name: string
  description: string
  videos: Video[]
  course: Course
  isActive: boolean
}

interface Video {
  id: number
  name: string
  description: string
  lesson: {
    id: number
    name: string
  }
}

interface Assignment {
  id: number
  name: string
  lesson: {
    id: number
    name: string
  }
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

export const useLessonStore = defineStore('lessonStore', {
  state: () => ({
    lesson: {} as Lesson,
    video: {} as Video,
    totalVideo: 0,
    assignment: [] as Assignment[],
    totalQuestion: {} as { [key: number]: number },
    lessonsByCourseId: {} as Lesson[],
    videoUrl: '',
    currentVideoId: 0,

    // Lesson Admin
    totalPages: 0,
    page: 0,
    limit: 5,
    lessonList: [] as Lesson[],
    sortBy: 'id',
    order: 'asc',
    keyword: '',
    countVideo: {} as Record<number, number>,

    listVideos: [] as Video[],

    countVideoByCourse: 0,
  }),

  actions: {
    async loadAllLessons() {
      try {
        const res = await authAPIs().get(endpoints.lessons, {
          params: {
            page: this.page,
            limit: this.limit,
            sortBy: this.sortBy,
            order: this.order,
            keyword: this.keyword,
          },
        })
        this.lessonList = res.data.lessons
        this.totalPages = res.data.totalPages
        console.log(res.data)

        const countPromise = this.lessonList.map((lesson) => this.loadVideos(lesson.id))
        await Promise.all(countPromise)
      } catch (err) {
        console.error(err)
      }
    },

    async changeSort(field: string) {
      if (this.sortBy === field) {
        this.order = this.order === 'asc' ? 'desc' : 'asc' // Đảo hướng nếu cùng field
      } else {
        this.sortBy = field
        this.order = 'asc' // Reset về tăng dần khi đổi field
      }
      await this.loadAllLessons()
    },

    async search(keyword: string) {
      this.keyword = keyword
      await this.loadAllLessons()
    },

    async changePage(newPage: number) {
      if (newPage >= 0 && newPage < this.totalPages) {
        this.page = newPage
        await this.loadAllLessons()
      }
    },

    async loadVideos(lessonId: number) {
      try {
        const res = await authAPIs().get(`${endpoints.videos}/count/lesson/${lessonId}`)
        this.totalVideo = res.data
        console.log(res.data)
        this.countVideo = {
          ...this.countVideo,
          [lessonId]: res.data,
        }
        console.log('count video: lessonid: ' + lessonId + ' video:' + this.countVideo[lessonId])
      } catch (err) {
        console.error(err)
      }
    },

    async countVideoByCourseId(courseId: number) {
      try {
        const res = await authAPIs().get(`${endpoints.videos}/count/course/${courseId}`)
        this.countVideoByCourse = res.data
      } catch (err) {
        console.error(err)
      }
    },

    async loadListVideosByLessonId(lessonId: number) {
      try {
        const res = await authAPIs().get(`${endpoints.videos}/lesson/${lessonId}`)
        this.listVideos = res.data
        console.log(res.data)
      } catch (err) {
        console.error(err)
      }
    },

    async loadLesson(courseId: number) {
      try {
        const res = await APIs.get(`${endpoints.lessons}/get-first-lesson/course/${courseId}`)
        this.lesson = res.data
      } catch (err) {
        console.error(err)
      }
    },

    async loadLessonsByCourseId(courseId: number) {
      try {
        const res = await authAPIs().get(`${endpoints.lessons}/auth/course/${courseId}`)
        this.lessonsByCourseId = res.data
        // console.log('lessons by courseId')
        // console.log(res.data)
      } catch (err) {
        console.error(err)
      }
    },

    async loadLessonById(lessonId: number) {
      try {
        const res = await authAPIs().get(`${endpoints.lessons}/auth/${lessonId}`)
        this.lesson = res.data
        console.log(res.data)
      } catch (err) {
        console.error(err)
      }
    },

    async loadAssignment(lessonId: number) {
      try {
        const res = await APIs.get(`${endpoints.assignments}/lesson/${lessonId}`)
        this.assignment = res.data
        console.log(res.data)
      } catch (err) {
        console.error(err)
      }
    },

    async countQuestion(assignmentId: number) {
      try {
        const res = await APIs.get(`${endpoints.questions}/count/assignment/${assignmentId}`)
        this.totalQuestion[assignmentId] = res.data
        console.log(res.data)
      } catch (err) {
        console.error(err)
      }
    },

    async saveVideoComplete(videoId: number) {
      try {
        await authAPIs().post(`${endpoints.videoComplete}`, {
          video_id: videoId,
        })
        console.log('Save video successfull')
      } catch (err) {
        console.error(err)
      }
    },

    async deleteLesson(lessonId: number) {
      try {
        await authAPIs().delete(`${endpoints.lessons}/${lessonId}`)
        await this.loadAllLessons()
      } catch (err) {
        console.error(err)
      }
    },

    chooseVideo(video: Video) {
      this.videoUrl = video.name
      this.currentVideoId = video.id
      console.log(this.videoUrl)
    },
  },
})
