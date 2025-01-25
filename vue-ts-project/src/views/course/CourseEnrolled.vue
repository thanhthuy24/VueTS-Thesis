<template>
  <main class="ml-14 mt-10">
    <div
      class="p-4 mb-4 mr-10 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
      role="alert"
    >
      <span class="font-medium">Choose a video in lessons to follow!!</span>
    </div>
    <div class="flex">
      <div style="width: 980px; border: 1px solid black">
        <div>
          <video
            ref="videoPlayer"
            style="width: 980px"
            controls
            @ended="lessonStore.saveVideoComplete(lessonStore.currentVideoId)"
          >
            <source :src="videoUrl" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>

        <div class="mb-4 border-b border-gray-200 dark:border-gray-700">
          <ul
            class="flex flex-wrap -mb-px text-sm font-medium text-center"
            id="default-tab"
            data-tabs-toggle="#default-tab-content"
            role="tablist"
          >
            <li class="me-2" role="presentation">
              <button
                class="inline-block p-4 border-b-2 rounded-t-lg"
                id="overview-tab"
                data-tabs-target="#overview"
                type="button"
                role="tab"
                aria-controls="overview"
                aria-selected="false"
              >
                Overview
              </button>
            </li>
            <li class="me-2" role="presentation">
              <button
                class="inline-block p-4 border-b-2 rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
                id="forum-tab"
                data-tabs-target="#forum"
                type="button"
                role="tab"
                aria-controls="forum"
                aria-selected="false"
              >
                Forum
              </button>
            </li>
            <li class="me-2" role="presentation">
              <button
                class="inline-block p-4 border-b-2 rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
                id="assignment-tab"
                data-tabs-target="#assignment"
                type="button"
                role="tab"
                aria-controls="assignment"
                aria-selected="false"
              >
                Assignment
              </button>
            </li>
          </ul>
        </div>
        <div id="default-tab-content">
          <div
            class="hidden p-4 rounded-lg bg-gray-50 dark:bg-gray-800"
            id="overview"
            role="tabpanel"
            aria-labelledby="overview-tab"
          >
            <p class="font-title-course">{{ courseStore.course.name }}</p>
            <p class="ml-3 my-5">Created date: {{ formatDate(courseStore.course?.createdDate) }}</p>

            <div class="relative overflow-x-auto">
              <table
                class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400"
              >
                <tbody>
                  <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    <th
                      scope="row"
                      class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      Description
                    </th>
                    <td class="px-6 py-4">{{ courseStore.course?.description }}</td>
                  </tr>
                  <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    <th
                      scope="row"
                      class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      Instructor
                    </th>
                    <td class="px-6 py-4">
                      <p class="my-3 mx-3">{{ courseStore.course?.teacher?.user?.username }}</p>
                      <p class="my-3 mx-3">Vị trí: {{ courseStore.course?.teacher?.position }}</p>
                      <p class="my-3 mx-3">Mô tả: {{ courseStore.course?.teacher?.description }}</p>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div
            class="hidden p-4 rounded-lg bg-gray-50 dark:bg-gray-800"
            id="forum"
            role="tabpanel"
            aria-labelledby="forum-tab"
          >
            <div class="max-w-2xl mx-auto px-4">
              <div class="flex justify-between items-center mb-6">
                <h2 class="text-lg lg:text-2xl font-bold text-gray-900 dark:text-white">
                  Discussion (20)
                </h2>
              </div>
              <form class="mb-6">
                <div
                  class="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700"
                >
                  <label for="comment" class="sr-only">Your comment</label>
                  <textarea
                    id="comment"
                    rows="6"
                    class="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none dark:text-white dark:placeholder-gray-400 dark:bg-gray-800"
                    placeholder="Write a comment..."
                    required
                  ></textarea>
                </div>
                <button
                  type="submit"
                  class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                >
                  Post comment
                </button>
              </form>
              <article
                v-for="c in courseEnrolled.comments"
                :key="c.id"
                class="p-6 text-base bg-white rounded-lg dark:bg-gray-900"
              >
                <footer class="flex justify-between items-center mb-2">
                  <div class="flex items-center">
                    <p
                      class="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white font-semibold"
                    >
                      <img
                        class="mr-2 w-6 h-6 rounded-full"
                        :src="c.user.avatar"
                        alt="Michael Gough"
                      />{{ c.user.username }}
                    </p>
                    <p class="text-sm text-gray-600 dark:text-gray-400">
                      <time pubdate datetime="2022-02-08" title="February 8th, 2022">{{
                        formatDateUpdate(c.createdDate)
                      }}</time>
                    </p>
                  </div>
                  <button
                    :id="`dropdownComment${c.id}Button`"
                    :data-dropdown-toggle="`dropdownComment${c.id}`"
                    class="inline-flex items-center p-2 text-sm font-medium text-center text-gray-500 dark:text-gray-400 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-50 dark:bg-gray-900 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                    type="button"
                  >
                    <svg
                      class="w-4 h-4"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 16 3"
                    >
                      <path
                        d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z"
                      />
                    </svg>
                    <span class="sr-only">Comment settings</span>
                  </button>
                  <!-- Dropdown menu -->
                  <div
                    :id="`dropdownComment${c.id}`"
                    class="hidden z-10 w-36 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600"
                  >
                    <ul
                      class="py-1 text-sm text-gray-700 dark:text-gray-200"
                      aria-labelledby="dropdownMenuIconHorizontalButton"
                    >
                      <li>
                        <a
                          href="#"
                          class="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                          >Edit</a
                        >
                      </li>
                      <li>
                        <a
                          href="#"
                          class="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                          >Remove</a
                        >
                      </li>
                      <li>
                        <a
                          href="#"
                          class="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                          >Report</a
                        >
                      </li>
                    </ul>
                  </div>
                </footer>
                <p class="text-gray-500 dark:text-gray-400">
                  {{ c.content }}
                </p>
                <div class="flex items-center mt-4 space-x-4">
                  <button
                    type="button"
                    class="flex items-center text-sm text-gray-500 hover:underline dark:text-gray-400 font-medium"
                  >
                    <svg
                      class="mr-1.5 w-3.5 h-3.5"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 20 18"
                    >
                      <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M5 5h5M5 8h2m6-3h2m-5 3h6m2-7H2a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h3v5l5-5h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1Z"
                      />
                    </svg>
                    Reply
                  </button>
                </div>
              </article>
              <!-- <article
                class="mt-5 p-6 mb-3 ml-6 lg:ml-12 text-base bg-white rounded-lg dark:bg-gray-900"
              >
                <footer class="flex justify-between items-center mb-2">
                  <div class="flex items-center">
                    <p
                      class="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white font-semibold"
                    >
                      <img
                        class="mr-2 w-6 h-6 rounded-full"
                        src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                        alt="Jese Leos"
                      />Jese Leos
                    </p>
                    <p class="text-sm text-gray-600 dark:text-gray-400">
                      <time pubdate datetime="2022-02-12" title="February 12th, 2022"
                        >Feb. 12, 2022</time
                      >
                    </p>
                  </div>
                  <button
                    id="dropdownComment2Button"
                    data-dropdown-toggle="dropdownComment2"
                    class="inline-flex items-center p-2 text-sm font-medium text-center text-gray-500 dark:text-gray-40 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-50 dark:bg-gray-900 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                    type="button"
                  >
                    <svg
                      class="w-4 h-4"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 16 3"
                    >
                      <path
                        d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z"
                      />
                    </svg>
                    <span class="sr-only">Comment settings</span>
                  </button>
                  Dropdown menu
                  <div
                    id="dropdownComment2"
                    class="hidden z-10 w-36 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600"
                  >
                    <ul
                      class="py-1 text-sm text-gray-700 dark:text-gray-200"
                      aria-labelledby="dropdownMenuIconHorizontalButton"
                    >
                      <li>
                        <a
                          href="#"
                          class="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                          >Edit</a
                        >
                      </li>
                      <li>
                        <a
                          href="#"
                          class="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                          >Remove</a
                        >
                      </li>
                      <li>
                        <a
                          href="#"
                          class="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                          >Report</a
                        >
                      </li>
                    </ul>
                  </div>
                </footer>
                <p class="text-gray-500 dark:text-gray-400">
                  Much appreciated! Glad you liked it ☺️
                </p>
                <div class="flex items-center mt-4 space-x-4">
                  <button
                    type="button"
                    class="flex items-center text-sm text-gray-500 hover:underline dark:text-gray-400 font-medium"
                  >
                    <svg
                      class="mr-1.5 w-3.5 h-3.5"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 20 18"
                    >
                      <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M5 5h5M5 8h2m6-3h2m-5 3h6m2-7H2a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h3v5l5-5h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1Z"
                      />
                    </svg>
                    Reply
                  </button>
                </div>
              </article> -->
            </div>
          </div>
          <div
            class="hidden p-4 rounded-lg bg-gray-50 dark:bg-gray-800"
            id="assignment"
            role="tabpanel"
            aria-labelledby="assignment-tab"
          >
            <div
              v-for="item in assignmentStore.assignments"
              :key="item.id"
              class="border-assignment"
            >
              <div class="flex justify-between">
                <p style="font-weight: bold">{{ item.name }}</p>

                <button
                  v-if="assignmentStore.assignmentDone[item.id]"
                  :style="{
                    width: '100px',
                    borderRadius: '5px',
                    backgroundColor: 'green',
                    color: 'white',
                  }"
                >
                  Done
                </button>
                <button
                  v-else
                  :style="{
                    width: '100px',
                    borderRadius: '5px',
                    backgroundColor: isExpired(item.dueDate) ? 'blue' : 'red',
                    color: 'white',
                  }"
                >
                  {{ isExpired(item.dueDate) ? 'Do now!!' : 'Time out' }}
                </button>
              </div>
              <div class="mt-5">
                <p>
                  Deadline:
                  <span style="color: red">
                    {{ formatDate(item.dueDate) }}
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div
          v-for="lesson in lessonStore.lessonsByCourseId"
          :key="lesson.id"
          id="accordion-arrow-icon"
          data-accordion="open"
          style="width: 500px"
          class="ml-5 mr-10"
        >
          <div>
            <h2 @click="loadComments(lesson.id)" :id="`accordion-arrow-icon-heading-${lesson.id}}`">
              <button
                type="button"
                class="flex items-center justify-between w-full p-5 font-medium rtl:text-right text-gray-900 bg-gray-100 border border-b-0 border-gray-200 rounded-t-xl focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-800 gap-3"
                data-accordion-target="#accordion-arrow-icon-body-1"
                aria-expanded="true"
                aria-controls="accordion-arrow-icon-body-1"
              >
                <span>{{ lesson.name }}</span>
              </button>
            </h2>
            <div
              style="cursor: pointer"
              v-if="lesson.videos && lesson.videos.length > 0"
              :id="`accordion-arrow-icon-body-${lesson.id}`"
              :aria-labelledby="`accordion-arrow-icon-heading-${lesson.id}`"
            >
              <div
                v-for="video in lesson.videos"
                :key="video.id"
                @click="chooseVideo(video)"
                class="p-5 border border-b-0 border-gray-200 dark:border-gray-700 dark:bg-gray-900"
              >
                <p class="mb-2 text-gray-500 dark:text-gray-400">
                  {{ video.description }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
<script lang="ts" setup>
import { useAssignmentStore } from '@/stores/AssignmentStore'
import { useCourseEnrolled } from '@/stores/CourseEnrolledStore'
import { useCourseStore } from '@/stores/CourseStore'
import { useLessonStore } from '@/stores/LessonStore'
import { useLoginStore } from '@/stores/LoginStore'
import { format } from 'date-fns'
import { comment } from 'postcss'
import { onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const courseEnrolled = useCourseEnrolled()
const courseStore = useCourseStore()
const assignmentStore = useAssignmentStore()
const lessonStore = useLessonStore()
const loginStore = useLoginStore()

const courseIdParam = route.params.courseId
const courseId = Number(courseIdParam)
const userId = Number(loginStore.currentUser?.id)

const formatDate = (timestamp: number) => {
  try {
    const date = new Date(timestamp) // Chuyển đổi timestamp thành đối tượng Date
    return format(date, 'dd/MM/yyyy') // Định dạng ngày theo kiểu dd/MM/yyyy
  } catch (error) {
    console.error('Lỗi khi định dạng ngày: ', error)
    return 'Invalid date'
  }
}

const formatDateUpdate = (timestamp: number) => {
  try {
    const date = new Date(timestamp) // Chuyển đổi timestamp thành đối tượng Date
    const options = { month: 'short', day: '2-digit', year: 'numeric' }
    const formattedDate = date.toLocaleDateString('en-US', options)
    return formattedDate
  } catch (error) {
    console.error('Lỗi khi định dạng ngày: ', error)
    return 'Invalid date'
  }
}

const isExpired = (dueDate: number) => {
  const now = new Date()
  // console.log(now);
  return dueDate > now.getTime()
}

const assignmentDone = ref<Record<number, number>>({})

const videoPlayer = ref<HTMLVideoElement | null>(null)
const videoUrl = ref(lessonStore.videoUrl)

watch(videoUrl, () => {
  if (videoPlayer.value) {
    videoPlayer.value.load()
  }
})

const chooseVideo = (video: Video) => {
  lessonStore.chooseVideo(video)
  videoUrl.value = lessonStore.videoUrl // Cập nhật videoUrl
}

const loadComments = async (lessonId: number) => {
  console.log('hii comment: ' + lessonId)
  await courseEnrolled.loadCommentByLessonId(lessonId)
}

const toggleCommentSetting = (commentId: number) => {
  const button = document.getElementById(`dropdownComment${commentId}Button`)
  const dropdown = document.getElementById(`dropdownComment${commentId}`)

  button?.addEventListener('click', () => {
    dropdown?.classList.toggle('hidden')
  })
}

onMounted(async () => {
  videoUrl.value = ''
  await courseEnrolled.checkCourseEnrolled(userId, courseId)
  // toggleCommentSetting()
  await courseStore.loadCourseById(courseId)
  await assignmentStore.loadAssignments(courseId)
  await lessonStore.loadLessonsByCourseId(courseId)
  // await courseEnrolled.loadCommentByLessonId()

  for (const a of assignmentStore.assignments) {
    const res = await assignmentStore.loadAssignmentDone(a.id)
    assignmentDone.value[a.id] = res
  }
})
</script>
<style scoped>
.font-title-course {
  font-size: 25px;
  font-weight: bold;
  margin: 10px;
}
.border-assignment {
  width: 900px;
  background-color: whitesmoke;
  margin-bottom: 10px;
  border-radius: 10px;
  padding: 20px;
}
</style>
