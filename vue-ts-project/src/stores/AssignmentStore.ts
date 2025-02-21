import { authAPIs, endpoints } from '@/configs/APIs'
import { defineStore } from 'pinia'
import { useToast } from 'vue-toastification'

const toast = useToast()
interface Lesson {
  id: number
  name: string
  description: string
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

interface Assignment {
  id: number
  name: string
  createdDate: number
  dueDate: number
  lesson: Lesson
  tag: Tag
}

interface Question {
  id: number
  content: string
  choices: Choice[]
}

interface Essay {
  id: number
  content: string
  created_date: number
  assignment_id: number
  question_id: number
}

interface AnswerEssay {
  id: number
  content: string
  created_date: number
  assignment: Assignment
  question: Question
  user: User
}

interface QuestionEssay {
  id: number
  content: string
  essays: Essay[]
}

interface QuestionChoice {
  id: number
  content: string
  choices: Choice[]
}

interface Choice {
  id: number
  content: string
  isCorrect: boolean
  question_id: number
}

interface ChoiceCreate {
  content: string
  is_correct: boolean
  question_id: number
}

interface AnswerChoice {
  // id: number
  assignment_id: number
  question_id: number
  choice_id: number
}

interface Tag {
  id: number
  name: number
}

interface Score {
  id: number
  score: number
  feedBack: string
  assignment: Assignment
  user: User
}

export const useAssignmentStore = defineStore('assignmentStore', {
  state: () => ({
    assignments: [] as Assignment[],
    assignment: {} as Assignment,
    assignmentDone: [] as Assignment[],
    assignmentsByLesson: {} as Record<number, Assignment[]>,

    assignmentTeacher: [] as Assignment[],

    questions: [] as Question[],
    questionEssay: [] as QuestionEssay[],
    question: {} as Question,
    questionId: 0,

    questionChoice: [] as QuestionChoice[],

    choice: [] as ChoiceCreate[],

    essays: {} as Essay,
    answerEssays: [] as AnswerEssay[],
    listEssays: {} as AnswerEssay[],

    scoreEssay: {} as Score[],

    answerChoices: [] as AnswerChoice[],
    answers: [] as AnswerChoice[],

    correctAnswers: [] as Choice[],
    score: {} as Score,

    countAssignmentDone: {} as Record<number, number>,

    assignmentByLessonTemp: {} as Assignment[],

    page: 0,
    limit: 10,
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

    async loadAssignmentByLessonId(lessonId: number) {
      try {
        const res = await authAPIs().get(`${endpoints.assignments}/lesson/${lessonId}`)
        this.assignmentsByLesson[lessonId] = res.data // Lưu bài tập theo lessonId
      } catch (err) {
        console.error(err)
        this.assignmentsByLesson[lessonId] = [] // Nếu lỗi, đặt giá trị rỗng để tránh lỗi khi render
      }
    },

    // async loadAssignmentTemp(lessonId: number) {
    //   try {
    //     const res = await authAPIs().get(`${endpoints.assignments}/lesson/${lessonId}`)
    //     this.assignmentByLessonTemp = res.data // Lưu bài tập theo lessonId
    //   } catch (err) {
    //     console.error(err) // Nếu lỗi, đặt giá trị rỗng để tránh lỗi khi render
    //   }
    // },

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
        // console.log(this.assignmentDone)
        // return res.data
      } catch (err) {
        console.error(err)
      }
    },

    async countAssignmentDoneByAssignment(assignmentId: number) {
      try {
        const res = await authAPIs().get(
          `${endpoints.assignmentDone}/assignment/${assignmentId}/count`,
        )
        return res.data
      } catch (err) {
        console.error(err)
      }
    },

    async addQuestion(assignmentId: number, content: string) {
      try {
        const res = await authAPIs().post(endpoints.questions, {
          content: content,
          assignment_id: assignmentId,
        })
        this.question = res.data
        this.questionId = res.data.id
        toast.success('Create question successfully!!')
        this.choice = []
      } catch (err) {
        console.error(err)
      }
    },

    logChoiceCreate(content: string, questionId: number, isCorrect: boolean) {
      this.choice.push({
        content: content,
        question_id: questionId,
        is_correct: isCorrect,
      })

      // console.log(questionId)
    },

    async createChoice() {
      try {
        await authAPIs().post(endpoints.choices, this.choice)
        toast.success('Create choices successully!!')
        // await this.loadQuestionChoiceByAssignmentId(assignmentId)
      } catch (err) {
        console.error(err)
      }
    },

    async loadQuestions(assignmentId: number) {
      try {
        const res = await authAPIs().get(`${endpoints.questions}/assignment/${assignmentId}`)
        this.questions = res.data
        this.correctAnswers = this.questions.map((question) => {
          // console.log(this.questions)
          const correctChoice = question.choices.find((choice) => choice.isCorrect)
          return {
            questionId: question.id,
            correctChoice: correctChoice ? correctChoice : null,
          }
        })
      } catch (err) {
        console.error(err)
      }
    },

    async loadQuestionChoiceByAssignmentId(assignmentId: number) {
      try {
        const res = await authAPIs().get(`${endpoints.questions}/assignment/${assignmentId}`)
        this.questionChoice = res.data
        console.log(res.data)
      } catch (err) {
        console.error(err)
      }
    },

    async loadQuestionEssay(assignmentId: number) {
      try {
        const res = await authAPIs().get(`${endpoints.questions}/essay/assignment/${assignmentId}`)
        this.questionEssay = res.data
        this.essays = res.data.essays
        // console.log(res.data)
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

    async addEssay(assignmentId: number) {
      console.log(this.answerEssays)
    },

    async loadEssaysByAssignmentId(assignmentId: number) {
      try {
        const res = await authAPIs().get(`${endpoints.essays}/assignment/${assignmentId}`, {
          params: {
            page: this.page,
            limit: this.limit,
          },
        })
        this.listEssays = res.data.essays
        console.log(res.data.essays)
      } catch (err) {
        console.error(err)
      }
    },

    logEssay(content: string, questionId: number, assignmentId: number) {
      const existingEssay = this.answerEssays.find((e) => e.question_id === questionId)
      if (existingEssay) {
        existingEssay.content = content
      } else {
        this.answerEssays.push({
          content: content,
          question_id: questionId,
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

    async addScoreEssay(assignmentId: number, essayId: number, score: number, feedBack: string) {
      try {
        await authAPIs().post(`${endpoints.score}/essay/${essayId}`, {
          assignment_id: assignmentId,
          essay_id: essayId,
          score: score,
          feedback: feedBack,
        })
        toast.success('Done!!')
        await this.loadScoreByAssignment(assignmentId)
      } catch (err) {
        toast.error('Score is existed!!')
        console.error(err)
      }
    },

    async loadScoreByAssignment(assignmentId: number) {
      try {
        const res = await authAPIs().get(`${endpoints.score}/${assignmentId}`)
        res.data.forEach((item: Score) => {
          this.scoreEssay[item.user.id] = item
        })
        console.log(res.data)
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

    async loadEssay(assignmentId: number) {
      try {
        const res = await authAPIs().get(`${endpoints.essays}/assignment/${assignmentId}`, {
          params: {
            page: this.page,
            limit: this.limit,
          },
        })
        this.essays = res.data.essays
        // console.log(res.data.essays)
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
