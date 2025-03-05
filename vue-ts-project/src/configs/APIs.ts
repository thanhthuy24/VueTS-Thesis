import axios from 'axios'

const BASE_URL = 'http://localhost:8080/api/'

export const endpoints = {
  user: '/users',
  role: '/roles',
  login: '/users/login',
  currentUser: '/users/current-user',

  categories: '/categories',
  courses: '/courses',
  lessons: '/lessons',
  videos: '/videos',

  assignments: '/assignments',
  assignmentDone: '/assignment-done',

  questions: '/questions',

  choices: '/choices',

  answerChoices: '/answer-choices',
  score: '/score',

  essays: '/essays',

  enrollments: '/enrollments',

  comments: '/comments',
  replyComment: '/reply',

  register: '/register',

  progress: '/progress',

  payment: '/payment',
  paypal: '/paypal',
  receiptDetail: '/receipt_details',
  receipt: '/receipts',

  rating: '/rating',

  videoComplete: '/video-completed',

  tags: '/tags',

  teachers: '/teachers/all',
  courseTeacher: '/course-teacher',

  teacher: '/teachers',
  email: '/email',

  notifications: '/notifications',

  'get-notification': '/get-notification',

  token: '/token',
  certificate: '/certificate',

  view: '/views',
  'login-social': '/login',

  recommend: '/ai-recommend',
}

export const authAPIs = () => {
  return axios.create({
    baseURL: BASE_URL,
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  })
}

export default axios.create({
  baseURL: BASE_URL,
})
