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

  enrollments: '/enrollments',

  comments: '/comments',
  replyComment: '/reply',

  progress: '/progress',

  payment: '/payment',
  paypal: '/paypal',

  rating: '/rating',

  videoComplete: '/video-completed',
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
