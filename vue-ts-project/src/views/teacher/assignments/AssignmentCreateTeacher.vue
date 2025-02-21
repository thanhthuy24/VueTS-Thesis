<template>
  <main>
    <section class="bg-white dark:bg-gray-900">
      <div class="flex justify-between">
        <h1 class="mt-5 font-large">Add Assignment</h1>
        <div class="mt-3">
          <button
            type="button"
            class="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
          >
            Cancel
          </button>
          <router-link :to="{ name: 'assignment-list-teacher', params: { courseId: courseId } }">
            <button
              type="button"
              class="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              List assignment
            </button>
          </router-link>
        </div>
      </div>
      <div>
        <h1>Let's check your update today!!</h1>
      </div>
      <div class="border-style ml-7 mt-5">
        <div>
          <p class="font-large ml-6 my-5">Description</p>
        </div>
        <div>
          <form class="ml-6 mb-5" @submit.prevent="createAssignment">
            <div class="sm:col-span-2 mr-5">
              <label
                for="name"
                class="block mb-3 mt-2 text-sm font-medium text-gray-900 dark:text-white"
                >Assignment Name: <span style="color: red">*</span></label
              >
              <input
                type="text"
                name="name"
                v-model="name"
                id="name"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="Type your course name"
                required
              />
            </div>

            <div class="flex">
              <div class="sm:col-span-2 mr-5 mt-3">
                <label
                  for="name"
                  class="block mb-3 mt-2 text-sm font-medium text-gray-900 dark:text-white"
                  >Due date: <span style="color: red">*</span></label
                >
                <Datepicker
                  v-model="pickedDate"
                  :min-date="getToday()"
                  placeholder="Chọn ngày"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                />
              </div>
              <div class="mr-5">
                <label
                  for="tag"
                  class="block mb-3 mt-5 text-sm font-medium text-gray-900 dark:text-white"
                  >Tag: <span style="color: red">*</span></label
                >
                <select
                  v-model="selectedTagId"
                  id="tag"
                  @change="selectedTag"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                >
                  <option
                    v-for="(item, id) in courseStore.tags.filter(
                      (tag) => tag.id === 5 || tag.id === 6,
                    )"
                    :key="id"
                    :value="item.id"
                    selected
                  >
                    {{ item.name }}
                  </option>
                </select>
              </div>
              <div class="mr-5">
                <label
                  for="lesson"
                  class="block mb-3 mt-5 text-sm font-medium text-gray-900 dark:text-white"
                  >Lesson: <span style="color: red">*</span></label
                >
                <select
                  v-model="lessonId"
                  id="lesson"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                >
                  <option
                    v-for="(item, id) in lessonStore.lessonsByCourseId"
                    :value="item.id"
                    :key="id"
                    selected
                  >
                    {{ item.name }}
                  </option>
                </select>
              </div>
            </div>
            <button
              style="width: 130px; margin-left: 87%"
              type="submit"
              class="text-white mt-5 bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
      <div class="mt-5 ml-7 format-create-quiz" v-if="selectedTagId === 5">
        <div>
          <p>Create questions and choices</p>
        </div>
        <div class="flex">
          <form @submit.prevent="createQuestionChoice">
            <!-- createQuestionChoice(assignmentStore.question.id) -->
            <div class="mt-5">
              <div class="sm:col-span-2 mr-5" style="width: 420px">
                <label
                  for="question-content"
                  class="block mb-3 mt-2 text-sm font-medium text-gray-900 dark:text-white"
                  >Question: <span style="color: red">*</span></label
                >
                <input
                  v-model="questionContent"
                  type="text"
                  name="question-content"
                  id="question-content"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Type your course name"
                  required
                />
              </div>
            </div>
            <!-- 54545454545454 -->
            <!-- Inputs for choices -->
            <label
              for="question-content"
              class="block mb-3 mt-5 text-sm font-medium text-gray-900 dark:text-white"
              >Choices: <span style="color: red">*</span></label
            >
            <div v-for="(choice, index) in choices" :key="index" class="mt-3 flex items-center">
              <div v-if="index < choices.length - 1">
                <input
                  v-model="choice.content"
                  type="text"
                  :placeholder="`Choice ${String.fromCharCode(65 + index)}`"
                  class="border border-gray-300 rounded-lg p-2 mr-3 w-64"
                />
              </div>
              <div v-else>
                <p class="my-2" style="color: red; font-weight: bold">Đáp án đúng</p>
                <input
                  v-model="choice.content"
                  type="text"
                  :placeholder="`Choice ${String.fromCharCode(65 + index)}`"
                  class="border border-gray-300 rounded-lg p-2 mr-3 w-64"
                />
              </div>
            </div>

            <!-- 54545454545454 -->
            <!-- <div>
              <div class="flex mt-5">
                <label
                  for="choice-A"
                  class="w-24 lock mb-3 mt-2 text-sm font-medium text-gray-900 dark:text-white"
                  >Choice A: <span style="color: red">*</span></label
                >
                <input
                  type="text"
                  @change="
                    assignmentStore.logChoiceCreate(
                      contentChoiceA,
                      assignmentStore.question.id,
                      isChoiceACorrect,
                    )
                  "
                  v-model="contentChoiceA"
                  name="choice-A"
                  id="choice-A"
                  class="w-52 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Type your course name"
                  required
                />
                <div class="flex items-center me-4 ml-5">
                  <input
                    id="green-checkbox"
                    v-model="isChoiceACorrect"
                    type="checkbox"
                    value=""
                    class="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-green-500 dark:focus:ring-green-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label
                    for="green-checkbox"
                    class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >is correct</label
                  >
                </div>
              </div>
              <div class="flex mt-5">
                <label
                  for="choice-A"
                  class="w-24 lock mb-3 mt-2 text-sm font-medium text-gray-900 dark:text-white"
                  >Choice B: <span style="color: red">*</span></label
                >
                <input
                  v-model="contentChoiceB"
                  type="text"
                  @change="
                    assignmentStore.logChoiceCreate(
                      contentChoiceB,
                      assignmentStore.question.id,
                      isChoiceBCorrect,
                    )
                  "
                  name="choice-A"
                  id="choice-A"
                  class="w-52 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Type your course name"
                  required
                />
                <div class="flex items-center me-4 ml-5">
                  <input
                    id="green-checkbox"
                    type="checkbox"
                    v-model="isChoiceBCorrect"
                    value=""
                    class="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-green-500 dark:focus:ring-green-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label
                    for="green-checkbox"
                    class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >is correct</label
                  >
                </div>
              </div>
              <div class="flex mt-5">
                <label
                  for="choice-A"
                  class="w-24 lock mb-3 mt-2 text-sm font-medium text-gray-900 dark:text-white"
                  >Choice C: <span style="color: red">*</span></label
                >
                <input
                  v-model="contentChoiceC"
                  type="text"
                  name="choice-A"
                  id="choice-A"
                  class="w-52 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Type your course name"
                  required
                />
                <div class="flex items-center me-4 ml-5">
                  <input
                    id="green-checkbox"
                    type="checkbox"
                    value=""
                    class="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-green-500 dark:focus:ring-green-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label
                    for="green-checkbox"
                    class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >is correct</label
                  >
                </div>
              </div>
              <div class="flex mt-5">
                <label
                  for="choice-A"
                  class="w-24 lock mb-3 mt-2 text-sm font-medium text-gray-900 dark:text-white"
                  >Choice D: <span style="color: red">*</span></label
                >
                <input
                  type="text"
                  v-model="contentChoiceD"
                  name="choice-A"
                  id="choice-A"
                  class="w-52 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Type your course name"
                  required
                />
                <div class="flex items-center me-4 ml-5">
                  <input
                    id="green-checkbox"
                    type="checkbox"
                    value=""
                    class="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-green-500 dark:focus:ring-green-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label
                    for="green-checkbox"
                    class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >is correct</label
                  >
                </div>
              </div>
            </div> -->
            <div>
              <button
                style="width: 130px"
                type="submit"
                class="text-white mt-5 bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Submit
              </button>
            </div>
          </form>
          <div class="ml-5 p-5" style="border-left: 1px solid whitesmoke">
            <div>
              <p>Show questions:</p>
            </div>
            <div v-for="(item, index) in assignmentStore.questionChoice" :key="index">
              <p>Câu {{ index + 1 }}: {{ item.content }}</p>
              <div class="my-3 ml-8">
                <!-- <p>{{ assignmentStore.assignment.tag.id }}</p> -->
                <ul
                  class="w-48 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                >
                  <li
                    v-for="(itemChoice, indexChoice) in assignmentStore.questionChoice[index]
                      .choices"
                    :key="indexChoice"
                    class="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600"
                  >
                    <div class="flex items-center ps-3">
                      <label
                        :for="`radio-choice-${index}-${indexChoice}`"
                        class="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                      >
                        {{ itemChoice.content }}
                      </label>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>
<script lang="ts" setup>
import Datepicker from 'vue3-datepicker'
import { computed, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useLessonStore } from '@/stores/LessonStore'
import { useCourseStore } from '@/stores/CourseStore'
import { authAPIs, endpoints } from '@/configs/APIs'

import { useToast } from 'vue-toastification'
import { useAssignmentStore } from '@/stores/AssignmentStore'

const toast = useToast()

const pickedDate = ref(new Date())

const route = useRoute()
const courseId = Number(route.params.courseId)

const lessonStore = useLessonStore()
const courseStore = useCourseStore()
const assignmentStore = useAssignmentStore()

const selectedTagId = ref(0)
const selectedTag = () => {
  const selectedTag = courseStore.tags.find((tag) => tag.id === selectedTagId.value)
  tagId.value = selectedTag.id
  if (selectedTag) {
    console.log(selectedTag.id)
  }
}

const name = ref<string>('')
const dueDate = computed(() => pickedDate.value)
const lessonId = ref<number | null>(null)
const tagId = ref<number | null>(null)

const createAssignment = async () => {
  const formData = new FormData()

  formData.append('name', name.value)
  if (dueDate.value < new Date()) {
    toast.error('Due date must be after the current date.')
    return
  }
  formData.append('dueDate', dueDate.value.toString())
  formData.append('courseId', courseId.toString())

  if (tagId.value != null && tagId.value !== undefined) {
    formData.append('tagId', tagId.value.toString())
  }

  // Check if teacherId is not undefined or null
  if (lessonId.value != null && lessonId.value !== undefined) {
    formData.append('lessonId', lessonId.value.toString())
  }
  try {
    const res = await authAPIs().post(endpoints.assignments, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    // name.value = ''
    // tagId.value = null
    // lessonId.value = null
    console.log(res.data)
    assignmentIdCreated.value = res.data.id
    toast.success('Create assignment successfully!!')
  } catch (err) {
    console.error(err)
  }
}

const assignmentIdCreated = ref(0)
const questionIdCreated = ref(0)
const questionContent = ref<string>('')

const choices = ref([
  { content: '', isCorrect: false },
  { content: '', isCorrect: false },
  { content: '', isCorrect: false },
  { content: '', isCorrect: true },
])

const createQuestionChoice = async () => {
  console.log(choices.value)
  await assignmentStore.addQuestion(assignmentIdCreated.value, questionContent.value)
  questionIdCreated.value = assignmentStore.questionId
  console.log(questionIdCreated.value)

  choices.value.forEach((choice) => {
    assignmentStore.logChoiceCreate(choice.content, questionIdCreated.value, choice.isCorrect)
  })
  questionContent.value = ''
  choices.value = [
    { content: '', isCorrect: false },
    { content: '', isCorrect: false },
    { content: '', isCorrect: false },
    { content: '', isCorrect: true },
  ]
  await assignmentStore.createChoice()

  await assignmentStore.loadQuestionChoiceByAssignmentId(assignmentIdCreated.value)
}

const getToday = () => {
  const today = new Date()
  today.setHours(0, 0, 0, 0) // Đặt thời gian về 00:00:00
  return today
}

onMounted(async () => {
  await lessonStore.loadLessonsByCourseId(courseId)
  await courseStore.loadTags()
})
</script>
<style scoped>
.font-large {
  font-size: large;
  font-weight: bold;
}

.border-style {
  border: 1px solid black;
  width: 1200px;
}

.format-create-quiz {
  border: 1px solid black;
  border-radius: 15px;
  width: 1155px;
  padding: 25px;
}
</style>
