import { authAPIs, endpoints } from '@/configs/APIs'
import { defineStore } from 'pinia'
import { useToast } from 'vue-toastification'

const toast = useToast()
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

interface Question {
  id: number
  content: string
  choices: Choice[]
}

interface Choice {
  id: number
  content: string
  isCorrect: boolean
}

interface AnswerChoice {
  // id: number
  assignment_id: number
  question_id: number
  choice_id: number
}

// interface AssignmentDone {
//   id: number
//   createdDate: number
//   assignment: Assignment
// }

interface Score {
  id: number
  score: number
  feedBack: string
  assignment: Assignment
}

export const useAssignmentStore = defineStore('assignmentStore', {
  state: () => ({
    assignments: [] as Assignment[],
    assignment: {} as Assignment,
    assignmentDone: [] as Assignment[],

    questions: [] as Question[],

    answerChoices: [] as AnswerChoice[],
    answers: [] as AnswerChoice[],

    correctAnswers: [] as Choice[],
    score: {} as Score,
  }),
  actions: {
    async loadAssignments(courseId: number) {
      try {
        const res = await authAPIs().get(`${endpoints.assignments}/course/${courseId}`)
        this.assignments = res.data
      } catch (err) {
        console.error(err)
      }
    },

    async loadAssignment(assignmentId: number) {
      try {
        const res = await authAPIs().get(`${endpoints.assignments}/${assignmentId}`)
        this.assignment = res.data
        // console.log(res.data)
      } catch (err) {
        console.error(err)
      }
    },

    async addAssignmentDone(assignmentId: number) {
      try {
        await authAPIs().post(`${endpoints.assignmentDone}`, {
          assignment_id: assignmentId,
        })
      } catch (err) {
        console.error(err)
      }
    },

    async loadAssignmentDone(assignmentId: number) {
      try {
        const res = await authAPIs().get(`${endpoints.assignmentDone}/assignment/${assignmentId}`)
        this.assignmentDone[assignmentId] = res.data
        return res.data
      } catch (err) {
        console.error(err)
      }
    },

    async loadQuestions(assignmentId: number) {
      try {
        const res = await authAPIs().get(`${endpoints.questions}/assignment/${assignmentId}`)
        this.questions = res.data
        this.correctAnswers = this.questions.map((question) => {
          // console.log(question.choices)
          const correctChoice = question.choices.find((choice) => choice.isCorrect)
          return {
            questionId: question.id,
            correctChoice: correctChoice ? correctChoice : null,
          }
        })
        // console.log(res.data)
        // console.log(this.correctAnswers)
      } catch (err) {
        console.error(err)
      }
    },

    async loadAnswerChoices(assignmentId: number) {
      try {
        const res = await authAPIs().get(`${endpoints.answerChoices}/assignment/${assignmentId}`)
        this.answerChoices = res.data
      } catch (err) {
        console.error(err)
      }
    },

    async addAnswer(assignmentId: number) {
      // console.log(this.answers)
      try {
        await authAPIs().post(`${endpoints.answerChoices}/${assignmentId}`, this.answers)
        toast.success('Do this assignment successully!!')
        // assignment đã hoàn thành
        await this.addAssignmentDone(assignmentId)
        // load assignment đã hoàn thành
        await this.loadAssignmentDone(assignmentId)
        // tạo điểm cho assignment
        await this.addScore(assignmentId)
        await this.loadScore(assignmentId)
      } catch (err) {
        console.error(err)
      }
    },

    logChoiceId(questionId: number, choiceId: number, assignmentId: number) {
      const existingAnswer = this.answers.find((ans) => ans.question_id === questionId)
      if (existingAnswer) {
        existingAnswer.choice_id = choiceId
      } else {
        this.answers.push({
          question_id: questionId,
          choice_id: choiceId,
          assignment_id: assignmentId,
        })
      }
    },

    async addScore(assignmentId: number) {
      try {
        const res = await authAPIs().post(`${endpoints.score}`, {
          assignment_id: assignmentId,
        })
        this.score = res.data
      } catch (err) {
        console.error(err)
      }
    },

    async loadScore(assignmentId: number) {
      try {
        const res = await authAPIs().get(`${endpoints.score}/${assignmentId}`)
        this.score = res.data
      } catch (err) {
        console.error(err)
      }
    },

    getSelectedChoice(questionId: number) {
      const answer = this.answerChoices.find((ans) => ans.question_id === questionId)
      return answer ? answer.choice_id : null
    },
  },
})
