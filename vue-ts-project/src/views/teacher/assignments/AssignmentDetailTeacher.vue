<template>
  <main>
    <!-- <h1>{{ assignmentId }}</h1> -->
    <div>
      <div class="flex justify-between">
        <div>
          <p class="font-title-assignment">{{ assignmentStore.assignment.name }}</p>
          <div class="mt-5 ml-3">
            <p class="my-5">
              Created date:
              <span style="color: green; font-weight: bold">
                {{ formatDate(assignmentStore.assignment.createdDate) }}
              </span>
            </p>
            <p>
              Deadline:
              <span style="color: red; font-weight: bold">
                {{ formatDate(assignmentStore.assignment.dueDate) }}
              </span>
            </p>
          </div>
        </div>
        <div class="flex mt-5 format-count">
          <div>
            <svg
              width="24"
              height="24"
              viewBox="0 0 25 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              transform="rotate(0 0 0)"
            >
              <path
                d="M15.3289 11.4955C14.4941 11.4955 13.724 11.2188 13.1051 10.7522C13.3972 10.3301 13.6284 9.86262 13.786 9.36254C14.1827 9.7539 14.7276 9.99545 15.3289 9.99545C16.5422 9.99545 17.5258 9.01185 17.5258 7.79851C17.5258 6.58517 16.5422 5.60156 15.3289 5.60156C14.7276 5.60156 14.1827 5.84312 13.786 6.23449C13.6284 5.73441 13.3972 5.26698 13.1051 4.84488C13.7239 4.37824 14.4941 4.10156 15.3289 4.10156C17.3706 4.10156 19.0258 5.75674 19.0258 7.79851C19.0258 9.84027 17.3706 11.4955 15.3289 11.4955Z"
                fill="#66ae96"
              />
              <path
                d="M14.7723 13.1891C15.0227 13.437 15.2464 13.6945 15.4463 13.9566C16.7954 13.9826 17.7641 14.3143 18.4675 14.7651C19.2032 15.2366 19.6941 15.8677 20.0242 16.5168C20.3563 17.1698 20.5204 17.8318 20.6002 18.337C20.6398 18.5878 20.6579 18.795 20.6661 18.9365C20.6702 19.0071 20.6717 19.061 20.6724 19.0952L20.6726 19.1161L20.6727 19.1313L20.6727 19.1363L21.4197 19.1486C20.6793 19.1358 20.6728 19.136 20.6727 19.1363L20.6727 19.1376C20.6666 19.5509 20.9961 19.8914 21.4096 19.8985C21.8237 19.9057 22.1653 19.5758 22.1725 19.1617L21.4284 19.1488C22.1725 19.1617 22.1725 19.1621 22.1725 19.1617L22.1725 19.1599L22.1726 19.1575L22.1726 19.1511L22.1727 19.1319C22.1727 19.1163 22.1726 19.0951 22.1721 19.0686C22.1712 19.0158 22.1689 18.9419 22.1636 18.85C22.153 18.6665 22.1303 18.4094 22.0819 18.1029C21.9856 17.4936 21.7848 16.6697 21.3612 15.8368C20.9357 15 20.2801 14.1451 19.2768 13.5022C18.2708 12.8574 16.9604 12.4549 15.274 12.4549C14.8284 12.4549 14.4092 12.483 14.0148 12.5362C14.2852 12.7384 14.5376 12.9566 14.7723 13.1891Z"
                fill="#66ae96"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M5.13173 7.79855C5.13173 5.75678 6.7869 4.1016 8.82867 4.1016C10.8704 4.1016 12.5256 5.75678 12.5256 7.79855C12.5256 9.84031 10.8704 11.4955 8.82867 11.4955C6.7869 11.4955 5.13173 9.84031 5.13173 7.79855ZM8.82867 5.6016C7.61533 5.6016 6.63173 6.58521 6.63173 7.79855C6.63173 9.01189 7.61533 9.99549 8.82867 9.99549C10.042 9.99549 11.0256 9.01189 11.0256 7.79855C11.0256 6.58521 10.042 5.6016 8.82867 5.6016Z"
                fill="#66ae96"
              />
              <path
                d="M3.37502 19.1374C3.38126 19.5507 3.0517 19.8914 2.63812 19.8986C2.22397 19.9058 1.88241 19.5759 1.87522 19.1617L2.62511 19.1487C1.87522 19.1617 1.87523 19.1621 1.87522 19.1617L1.87519 19.1599L1.87516 19.1575L1.87509 19.1511L1.875 19.1319C1.87499 19.1163 1.87512 19.0951 1.87559 19.0687C1.87653 19.0158 1.87882 18.942 1.88413 18.85C1.89474 18.6665 1.91745 18.4094 1.96585 18.103C2.0621 17.4936 2.26292 16.6697 2.68648 15.8368C3.11206 15 3.76758 14.1452 4.77087 13.5022C5.77688 12.8575 7.08727 12.455 8.77376 12.455C10.4602 12.455 11.7706 12.8575 12.7767 13.5022C13.7799 14.1452 14.4355 15 14.861 15.8368C15.2846 16.6697 15.4854 17.4936 15.5817 18.103C15.6301 18.4094 15.6528 18.6665 15.6634 18.85C15.6687 18.942 15.671 19.0158 15.6719 19.0687C15.6724 19.0951 15.6725 19.1163 15.6725 19.1319L15.6724 19.1511L15.6724 19.1575L15.6723 19.1599C15.6723 19.1603 15.6723 19.1617 14.9282 19.1488L15.6723 19.1617C15.6651 19.5759 15.3235 19.9058 14.9094 19.8986C14.4959 19.8914 14.1664 19.5509 14.1725 19.1376L14.1725 19.1364C14.1726 19.1361 14.1791 19.1358 14.9199 19.1487L14.1725 19.1364L14.1725 19.1314L14.1724 19.1161L14.1722 19.0952C14.1716 19.061 14.17 19.0072 14.1659 18.9366C14.1577 18.7951 14.1396 18.5878 14.1 18.337C14.0202 17.8319 13.8561 17.1699 13.524 16.5168C13.1939 15.8677 12.703 15.2366 11.9673 14.7651C11.2343 14.2954 10.2132 13.955 8.77376 13.955C7.33434 13.955 6.31319 14.2954 5.58022 14.7651C4.84453 15.2366 4.35363 15.8677 4.02351 16.5168C3.6914 17.1699 3.52727 17.8319 3.44749 18.337C3.40787 18.5878 3.38981 18.7951 3.38163 18.9366C3.37756 19.0072 3.37596 19.061 3.37536 19.0952C3.37505 19.1123 3.375 19.1245 3.375 19.1314L3.37502 19.1374Z"
                fill="#66ae96"
              />
            </svg>
          </div>
          <div class="ml-3 mr-5" style="font-weight: bold">
            {{ assignmentStore.countAssignmentDone[assignmentStore.assignment.id] }} /
            {{ courseEnrolledStore.countUserEnrolled }}
          </div>
        </div>
      </div>
      <div
        v-for="(item, index) in assignmentStore.questions"
        :key="index"
        class="border-assignment mt-5"
      >
        <div>
          <p>Câu {{ index + 1 }}: {{ item.content }} - {{ item.id }}</p>
        </div>
        <div v-if="assignmentStore.assignment.tag.id == 5">
          <ul
            style="width: 1200px"
            class="flex mt-5 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          >
            <li
              v-for="(itemChoice, indexChoice) in assignmentStore.questions[index].choices"
              :key="indexChoice"
              class="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600"
            >
              <div class="flex items-center ps-3">
                <input
                  required
                  :checked="assignmentStore.getSelectedChoice(item.id) === itemChoice.id"
                  :id="`radio-choice-${index}-${indexChoice}`"
                  type="radio"
                  :value="itemChoice.content"
                  :name="`radio-choice-${index}`"
                  @change="assignmentStore.logChoiceId(item.id, itemChoice.id, assignmentId)"
                  class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                />
                <label
                  :for="`radio-choice-${index}-${indexChoice}`"
                  class="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  {{ itemChoice.content }}
                </label>
              </div>
            </li>
          </ul>
          <div class="my-4 mx-3">
            <p
              style="color: green; font-weight: bold"
              v-if="assignmentStore.correctAnswers[index]?.correctChoice?.isCorrect"
            >
              Correct answer:
              {{ assignmentStore.correctAnswers[index].correctChoice.content }}
            </p>
          </div>
        </div>
        <div v-else class="mt-5">
          <div
            v-for="essay in assignmentStore.listEssays"
            :key="essay.id"
            class="my-5 format-essay-user"
          >
            <div>
              <p
                class="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white font-semibold"
              >
                <img :src="essay.user.avatar" class="mr-2 w-6 h-6 rounded-full" alt="Jese Leos" />
                {{ essay.user?.username }}
              </p>
            </div>
            <textarea
              v-model="essay.content"
              style="width: 1000px"
              type="text"
              placeholder="Write your reply..."
              class="border border-gray-300 text-sm rounded-lg p-2.5"
              rows="6"
            >
            </textarea>
            <div>
              <form
                class="flex"
                @submit.prevent="
                  assignmentStore.addScoreEssay(assignmentId, essay.id, score, feedBack)
                "
              >
                <div v-if="assignmentStore.scoreEssay[essay.user.id]">
                  <div class="sm:col-span-2 mr-5">
                    <label
                      :for="'score-' + essay.id"
                      class="block mb-3 mt-2 text-sm font-medium text-gray-900 dark:text-white"
                      >Score: <span style="color: red">*</span>
                    </label>
                    <input
                      type="number"
                      name="score"
                      :id="'score-' + essay.id"
                      v-model="assignmentStore.scoreEssay[essay.user.id].score"
                      style="width: 200px"
                      class="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      required
                    />
                  </div>
                  <div class="sm:col-span-2 mr-5">
                    <label
                      :for="'feedback-' + essay.id"
                      class="block mb-3 mt-2 text-sm font-medium text-gray-900 dark:text-white"
                      >Feed back: <span style="color: red">*</span></label
                    >
                    <textarea
                      :id="'feedback-' + essay.id"
                      style="width: 500px"
                      type="text"
                      v-model="assignmentStore.scoreEssay[essay.user.id].feedBack"
                      placeholder="Write your reply..."
                      class="border border-gray-300 text-sm rounded-lg p-2.5"
                      rows="3"
                    >
                    </textarea>
                  </div>
                  <button
                    style="width: 130px; height: 40px"
                    type="submit"
                    disabled
                    class="mt-3 text-white bg-slate-400 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                  >
                    Submitted
                  </button>
                </div>
                <div v-else>
                  <div class="sm:col-span-2 mr-5">
                    <label
                      :for="'score-' + essay.id"
                      class="block mb-3 mt-2 text-sm font-medium text-gray-900 dark:text-white"
                      >Score: <span style="color: red">*</span>
                    </label>
                    <input
                      type="number"
                      name="score"
                      :id="'score-' + essay.id"
                      v-model="score"
                      style="width: 200px"
                      class="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      required
                    />
                  </div>
                  <div class="sm:col-span-2 mr-5">
                    <label
                      :for="'feedback-' + essay.id"
                      class="block mb-3 mt-2 text-sm font-medium text-gray-900 dark:text-white"
                      >Feed back: <span style="color: red">*</span></label
                    >
                    <textarea
                      :id="'feedback-' + essay.id"
                      style="width: 500px"
                      type="text"
                      v-model="feedBack"
                      placeholder="Write your reply..."
                      class="border border-gray-300 text-sm rounded-lg p-2.5"
                      rows="3"
                    >
                    </textarea>
                  </div>
                  <button
                    style="width: 130px; height: 40px"
                    type="submit"
                    class="text-white mt-10 bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    Submit
                  </button>
                </div>
              </form>
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
import { format } from 'date-fns'
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const assignmentId = Number(route.params.assignmentId)
const assignmentStore = useAssignmentStore()
const courseEnrolledStore = useCourseEnrolled()

const formatDate = (timestamp: number) => {
  try {
    const date = new Date(timestamp) // Chuyển đổi timestamp thành đối tượng Date
    return format(date, 'dd/MM/yyyy') // Định dạng ngày theo kiểu dd/MM/yyyy
  } catch (error) {
    console.error('Lỗi khi định dạng ngày: ', error)
    return 'Invalid date'
  }
}

const handleSendScore = async (essayId: number) => {
  console.log('Done for essay: ' + essayId)
  // await assignmentStore.addScoreEssay(assignmentId, essayId, sc)
}

const score = ref(0)
const feedBack = ref('')

onMounted(async () => {
  await assignmentStore.loadAssignment(assignmentId)
  await assignmentStore.loadAssignmentByLessonId(assignmentStore.assignment.lesson.id)
  for (const assignment of assignmentStore.assignmentsByLesson[
    assignmentStore.assignment.lesson.id
  ] || []) {
    assignmentStore.countAssignmentDone[assignment.id] =
      (await assignmentStore.countAssignmentDoneByAssignment(assignment.id)) || 0
  }

  await assignmentStore.loadQuestions(assignmentId)
  await assignmentStore.loadEssaysByAssignmentId(assignmentId)
  await assignmentStore.loadScoreByAssignment(assignmentId)
})
</script>
<style scoped>
.font-title-assignment {
  font-size: 25px;
  font-weight: bold;
  margin: 10px;
}

.format-count {
  border: 1px solid rgb(0, 255, 157);
  border-radius: 10px;
  padding: 10px;
  height: 50px;
}

.border-assignment {
  /* width: 900px; */
  background-color: whitesmoke;
  margin-bottom: 10px;
  border-radius: 10px;
  padding: 20px;
}

.format-essay-user {
  border: 1px solid rgb(0, 88, 16);
  border-radius: 10px;
  padding: 20px;
}
</style>
