import axios from 'axios'

const BASE_URL = 'http://localhost:8080/api/'

export const endpoints = {
  user: '/users',
  login: '/users/login',
  currentUser: '/users/current-user',

  categories: '/categories',
  courses: '/courses',
  lessons: '/lessons',
  videos: '/videos',

  assignments: '/assignments',
  assignmentDone: '/assignment-done',

  questions: '/questions',

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
