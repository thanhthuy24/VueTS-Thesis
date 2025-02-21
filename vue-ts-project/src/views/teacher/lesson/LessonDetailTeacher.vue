<template>
  <main class="mt-5">
    <div
      class="p-4 mb-4 mr-10 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
      role="alert"
    >
      <span class="font-medium">Choose a video in lessons to follow!!</span>
    </div>
    <div class="flex">
      <div style="width: 700px">
        <div>
          <video ref="videoPlayer" style="width: 980px" controls>
            <source :src="videoUrl" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
        <div>
          <div style="cursor: pointer">
            <p class="mt-5 font-large">List videos:</p>
            <div
              v-for="video in lessonStore.listVideos"
              :key="video.id"
              @click="chooseVideo(video)"
              class="mt-5 p-5 border border-b-1 border-gray-200 dark:border-gray-700 dark:bg-gray-900"
            >
              <p class="mb-2 text-gray-500 dark:text-gray-400">
                {{ video.description }}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div class="ml-5 mr-10 format-comment-lesson">
        <div class="flex justify-between items-center mb-6">
          <h2 class="text-lg lg:text-2xl font-bold text-gray-900 dark:text-white">
            Discussion ({{ courseEnrolled.countComment }})
          </h2>
        </div>
        <form class="mb-6" @submit.prevent="handleAddComment(lessonId, contentComment)">
          <div
            class="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700"
          >
            <label for="comment" class="sr-only">Your comment</label>
            <textarea
              id="comment"
              v-model="contentComment"
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
        <div v-if="courseEnrolled.comments && courseEnrolled.comments.length > 0">
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
                    />
                    {{ c.user.username }}
                  </p>
                  <p class="text-sm text-gray-600 dark:text-gray-400">
                    <time pubdate datetime="2022-02-08" title="February 8th, 2022">
                      {{ formatDateUpdate(c.createdDate) }}</time
                    >
                  </p>
                  <span
                    v-if="c.user?.role.id == 3"
                    class="ml-5 bg-yellow-100 text-yellow-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-yellow-900 dark:text-yellow-300"
                    >Teacher</span
                  >
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
                  @click="toggleReplyButton(c.id)"
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
            <div v-if="replyInputVisible[c.id]" style="margin-left: 7%">
              <form @submit.prevent="handleReplyComment(c.id, replyText)">
                <textarea
                  v-model="replyText"
                  style="width: 400px"
                  type="text"
                  placeholder="Write your reply..."
                  class="border border-gray-300 text-sm rounded-lg p-2.5"
                  rows="3"
                >
                </textarea>
                <button type="submit" class="mt-1 mb-3 bg-blue-500 text-white rounded-lg px-4 py-2">
                  Submit
                </button>
              </form>
            </div>
            <!--   -->
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
                      :src="reply.user.avatar"
                      class="mr-2 w-6 h-6 rounded-full"
                      alt="Jese Leos"
                    />
                    {{ reply.user?.username }}
                  </p>
                  <p class="text-sm text-gray-600 dark:text-gray-400">
                    <time pubdate datetime="2022-02-12" title="February 12th, 2022">{{
                      formatDateUpdate(reply.createdDate)
                    }}</time>
                  </p>
                  <span
                    v-if="reply.user?.role.id == 3"
                    class="ml-5 bg-yellow-100 text-yellow-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-yellow-900 dark:text-yellow-300"
                    >Teacher</span
                  >
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
        <div v-else class="p-4 md:p-5 text-center">
          <svg
            class="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
          </svg>
          <h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
            No comments in here!!
          </h3>
        </div>
      </div>
      <!--  -->
    </div>
  </main>
</template>
<script lang="ts" setup>
import { useCourseEnrolled } from '@/stores/CourseEnrolledStore'
import { useLessonStore } from '@/stores/LessonStore'
import PaginationLayout from '@/views/pagination/PaginationLayout.vue'
import { onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const lessonStore = useLessonStore()
const courseEnrolled = useCourseEnrolled()

const lessonId = Number(route.params.lessonId)

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

const contentComment = ref('')
const replyText = ref('')

const handleAddComment = async (lessonId: number, content: string) => {
  contentComment.value = ''
  await courseEnrolled.addComment(lessonId, content)
}

const handleReplyComment = async (commentId: number, content: string) => {
  replyText.value = ''
  await courseEnrolled.addReplyComment(commentId, content)
}

const replyInputVisible = ref<{ [key: number]: boolean }>({})
const toggleReplyButton = (commentId: number) => {
  replyInputVisible.value = {
    ...replyInputVisible.value,
    [commentId]: !replyInputVisible.value[commentId],
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

const handlePageChange = async (newPage: number) => {
  await courseEnrolled.changePage(newPage, getLessonId.value)
  for (const comment of courseEnrolled.comments) {
    await courseEnrolled.loadReplyComment(comment.id)
  }
}

const getLessonId = ref(0)

onMounted(async () => {
  getLessonId.value = lessonId
  videoUrl.value = ''
  await lessonStore.loadListVideosByLessonId(lessonId)
  await courseEnrolled.loadCommentByLessonId(lessonId)
  await courseEnrolled.countCommentByLesson(lessonId)
  for (const comment of courseEnrolled.comments) {
    await courseEnrolled.loadReplyComment(comment.id)
  }
})
// const loadComments = async (lessonId: number) => {
//   getLessonId.value = lessonId
//   await course(async () => {
//   await lessonStore.loadListVideosByLessonId(lessonId)
//   // await c
//   await courseEnrolled.loadCommentByLessonId(lessonId)
//   await courseEnrolled.countCommentByLesson(lessonId)
//   for (const comment of courseEnrolled.comments) {
//     await courseEnrolled.loadReplyComment(comment.id)
//   }
//
// })
</script>
<style scoped>
.font-large {
  font-size: large;
  font-weight: bold;
}

.format-comment-lesson {
  border: 1px solid rgb(229, 222, 222);
  border-radius: 10px;
  width: 500px;
  padding: 10px;
}
</style>
