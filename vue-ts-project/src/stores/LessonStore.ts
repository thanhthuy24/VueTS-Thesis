import APIs, { authAPIs, endpoints } from '@/configs/APIs'
import { defineStore } from 'pinia'

interface Lesson {
  id: number
  name: string
  description: string
  videos: Video[]
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

export const useLessonStore = defineStore('lessonStore', {
  state: () => ({
    lesson: {} as Lesson,
    video: {} as Video,
    totalVideo: 0,
    assignment: [] as Assignment[],
    totalQuestion: {} as { [key: number]: number },
  }),

  actions: {
    async loadVideos(lessonId: number) {
      try {
        const res = await authAPIs().get(`${endpoints.videos}/count/lesson/${lessonId}`)
        this.totalVideo = res.data
        console.log(res.data)
      } catch (err) {
        console.error(err)
      }
    },

    async loadLesson(courseId: number) {
      try {
        const res = await APIs.get(`${endpoints.lessons}/get-first-lesson/course/${courseId}`)
        this.lesson = res.data
        console.log('lessons')
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
  },
})
