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
                  Discussion ({{ courseEnrolled.countComment }})
                </h2>
              </div>
              <form class="mb-6" @submit.prevent="handleAddComment(getLessonId, contentComment)">
                <div
                  class="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700"
                >
                  <label for="comment" class="sr-only">Your comment</label>
                  <textarea
                    v-model="contentComment"
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
              <div v-for="c in courseEnrolled.comments" :key="c.id">
                <article class="p-6 mb-5 text-base bg-white rounded-lg dark:bg-gray-900">
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
                    <div class="flex">
                      <div class="mr-8">
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          transform="rotate(0 0 0)"
                        >
                          <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M20.8749 2.51272C20.1915 1.8293 19.0835 1.8293 18.4001 2.51272L13.2418 7.67095C12.879 8.03379 12.6511 8.50974 12.5959 9.0199L12.4069 10.7668C12.3824 10.9926 12.4616 11.2173 12.6222 11.3778C12.7827 11.5384 13.0074 11.6176 13.2332 11.5931L14.9801 11.4041C15.4903 11.3489 15.9662 11.121 16.3291 10.7582L21.4873 5.59994C22.1707 4.91652 22.1707 3.80848 21.4873 3.12506L20.8749 2.51272ZM18.5981 4.43601L19.564 5.40191L15.2684 9.69751C15.1474 9.81846 14.9888 9.89443 14.8187 9.91283L13.9984 10.0016L14.0872 9.18126C14.1056 9.01121 14.1815 8.85256 14.3025 8.73161L18.5981 4.43601Z"
                            fill="#343C54"
                          />
                          <path
                            d="M5.5 3.25H15.5411L14.0411 4.75H5.5C5.08579 4.75 4.75 5.08579 4.75 5.5V18.5C4.75 18.9142 5.08579 19.25 5.5 19.25H18.5C18.9142 19.25 19.25 18.9142 19.25 18.5V9.95823L20.75 8.45823V18.5C20.75 19.7426 19.7426 20.75 18.5 20.75H5.5C4.25736 20.75 3.25 19.7426 3.25 18.5V5.5C3.25 4.25736 4.25736 3.25 5.5 3.25Z"
                            fill="#343C54"
                          />
                        </svg>
                      </div>
                      <div>
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 25 25"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          transform="rotate(0 0 0)"
                        >
                          <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M6.27344 3.41016C6.27344 2.99594 5.93765 2.66016 5.52344 2.66016C5.10922 2.66016 4.77344 2.99594 4.77344 3.41016V21.9102C4.77344 22.3244 5.10922 22.6602 5.52344 22.6602C5.93765 22.6602 6.27344 22.3244 6.27344 21.9102V15.9102H19.0234C19.2779 15.9102 19.5151 15.7811 19.6533 15.5674C19.7914 15.3537 19.8118 15.0845 19.7074 14.8524L17.7344 10.4679C17.6463 10.2722 17.6463 10.0481 17.7344 9.85238L19.7074 5.46793C19.8118 5.23585 19.7914 4.96664 19.6533 4.75293C19.5151 4.53921 19.2779 4.41016 19.0234 4.41016H6.27344V3.41016ZM6.27344 5.91016V14.4102H17.8635L16.3665 11.0835C16.1023 10.4963 16.1023 9.82403 16.3665 9.23684L17.8635 5.91016H6.27344Z"
                            fill="#343C54"
                          />
                        </svg>
                      </div>
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
                <article
                  v-for="reply in courseEnrolled.commentReply[c.id]"
                  :key="reply.id"
                  class="mt-5 p-6 mb-3 ml-6 lg:ml-12 text-base bg-white rounded-lg dark:bg-gray-900"
                >
                  <footer class="flex justify-between items-center mb-2">
                    <div class="flex items-center">
                      <p
                        class="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white font-semibold"
                      >
                        <img
                          class="mr-2 w-6 h-6 rounded-full"
                          :src="reply.user.avatar"
                          alt="Jese Leos"
                        />{{ reply.user?.username }}
                      </p>
                      <p class="text-sm text-gray-600 dark:text-gray-400">
                        <time pubdate datetime="2022-02-12" title="February 12th, 2022"
                          >Feb. 12, 2022</time
                        >
                      </p>
                    </div>
                    <div class="flex">
                      <div class="mr-8">
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          transform="rotate(0 0 0)"
                        >
                          <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M20.8749 2.51272C20.1915 1.8293 19.0835 1.8293 18.4001 2.51272L13.2418 7.67095C12.879 8.03379 12.6511 8.50974 12.5959 9.0199L12.4069 10.7668C12.3824 10.9926 12.4616 11.2173 12.6222 11.3778C12.7827 11.5384 13.0074 11.6176 13.2332 11.5931L14.9801 11.4041C15.4903 11.3489 15.9662 11.121 16.3291 10.7582L21.4873 5.59994C22.1707 4.91652 22.1707 3.80848 21.4873 3.12506L20.8749 2.51272ZM18.5981 4.43601L19.564 5.40191L15.2684 9.69751C15.1474 9.81846 14.9888 9.89443 14.8187 9.91283L13.9984 10.0016L14.0872 9.18126C14.1056 9.01121 14.1815 8.85256 14.3025 8.73161L18.5981 4.43601Z"
                            fill="#343C54"
                          />
                          <path
                            d="M5.5 3.25H15.5411L14.0411 4.75H5.5C5.08579 4.75 4.75 5.08579 4.75 5.5V18.5C4.75 18.9142 5.08579 19.25 5.5 19.25H18.5C18.9142 19.25 19.25 18.9142 19.25 18.5V9.95823L20.75 8.45823V18.5C20.75 19.7426 19.7426 20.75 18.5 20.75H5.5C4.25736 20.75 3.25 19.7426 3.25 18.5V5.5C3.25 4.25736 4.25736 3.25 5.5 3.25Z"
                            fill="#343C54"
                          />
                        </svg>
                      </div>
                      <div>
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 25 25"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          transform="rotate(0 0 0)"
                        >
                          <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M6.27344 3.41016C6.27344 2.99594 5.93765 2.66016 5.52344 2.66016C5.10922 2.66016 4.77344 2.99594 4.77344 3.41016V21.9102C4.77344 22.3244 5.10922 22.6602 5.52344 22.6602C5.93765 22.6602 6.27344 22.3244 6.27344 21.9102V15.9102H19.0234C19.2779 15.9102 19.5151 15.7811 19.6533 15.5674C19.7914 15.3537 19.8118 15.0845 19.7074 14.8524L17.7344 10.4679C17.6463 10.2722 17.6463 10.0481 17.7344 9.85238L19.7074 5.46793C19.8118 5.23585 19.7914 4.96664 19.6533 4.75293C19.5151 4.53921 19.2779 4.41016 19.0234 4.41016H6.27344V3.41016ZM6.27344 5.91016V14.4102H17.8635L16.3665 11.0835C16.1023 10.4963 16.1023 9.82403 16.3665 9.23684L17.8635 5.91016H6.27344Z"
                            fill="#343C54"
                          />
                        </svg>
                      </div>
                    </div>
                  </footer>
                  <p class="text-gray-500 dark:text-gray-400">
                    {{ reply.content }}
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
              </div>
              <PaginationLayout
                :currentPage="courseEnrolled.page"
                :totalPage="courseEnrolled.totalPages"
                @page-change="handlePageChange"
              />
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
            <h2 @click="loadComments(lesson.id)" id="accordion-arrow-icon-heading-1">
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
              id="accordion-arrow-icon-body-1"
              aria-labelledby="accordion-arrow-icon-heading-1"
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
import { onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import PaginationLayout from '../pagination/PaginationLayout.vue'

const route = useRoute()
const courseEnrolled = useCourseEnrolled()
const courseStore = useCourseStore()
const assignmentStore = useAssignmentStore()
const lessonStore = useLessonStore()
const loginStore = useLoginStore()

const courseIdParam = route.params.courseId
const courseId = Number(courseIdParam)
const userId = Number(loginStore.currentUser?.id)

const contentComment = ref('')

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

const handleAddComment = async (lessonId: number, content: string) => {
  contentComment.value = ''
  await courseEnrolled.addComment(lessonId, content)
}

const chooseVideo = (video: Video) => {
  lessonStore.chooseVideo(video)
  videoUrl.value = lessonStore.videoUrl // Cập nhật videoUrl
}

const getLessonId = ref(0)

const loadComments = async (lessonId: number) => {
  getLessonId.value = lessonId
  await courseEnrolled.loadCommentByLessonId(lessonId)
  await courseEnrolled.countCommentByLesson(lessonId)
  for (const comment of courseEnrolled.comments) {
    await courseEnrolled.loadReplyComment(comment.id)
  }
}

const handlePageChange = async (newPage: number) => {
  await courseEnrolled.changePage(newPage, getLessonId.value)
  for (const comment of courseEnrolled.comments) {
    await courseEnrolled.loadReplyComment(comment.id)
  }
}

onMounted(async () => {
  videoUrl.value = ''
  await courseEnrolled.checkCourseEnrolled(userId, courseId)

  await courseStore.loadCourseById(courseId)
  await assignmentStore.loadAssignments(courseId)
  await lessonStore.loadLessonsByCourseId(courseId)

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
