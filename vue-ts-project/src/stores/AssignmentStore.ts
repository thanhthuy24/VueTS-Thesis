import { authAPIs, endpoints } from '@/configs/APIs'
import { defineStore } from 'pinia'

interface Lesson {
  id: number
  name: string
  description: string
}

interface Assignment {
  id: number
  name: string
  createdDate: number
  dueDate: number
  lesson: Lesson
}

export const useAssignmentStore = defineStore('assignmentStore', {
  state: () => ({
    assignments: [] as Assignment[],
    assignmentDone: [] as Assignment[],
  }),
  actions: {
    async loadAssignments(courseId: number) {
      try {
        const res = await authAPIs().get(`${endpoints.assignments}/course/${courseId}`)
        this.assignments = res.data
        // console.log(this.assignments)
      } catch (err) {
        console.error(err)
      }
    },
    async loadAssignmentDone(assignmentId: number) {
      try {
        const res = await authAPIs().get(`${endpoints.assignmentDone}/assignment/${assignmentId}`)
        this.assignmentDone[assignmentId] = res.data
        // console.log(this.assignmentDone + '-----')
        return res.data
      } catch (err) {
        console.error(err)
      }
    },
  },
})
