<template>
  <main class="flex justify-center">
    <div class="flex justify-around">
      <div>
        <h2 class="mb-4 text-xl tracking-tight font-extrabold text-gray-900 dark:text-white">
          {{ assignmentStore.assignment.name }}
        </h2>
        <div class="mt-5 flex justify-around">
          <div v-if="assignmentStore.assignment?.tag?.id == 5">
            <form @submit.prevent="assignmentStore.addAnswer(assignmentId)">
              <div v-for="(item, index) in assignmentStore.questions" :key="index">
                <p>Câu {{ index + 1 }}: {{ item.content }}</p>
                <div class="my-3 ml-8">
                  <!-- <p>{{ assignmentStore.assignment.tag.id }}</p> -->
                  <ul
                    class="w-48 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
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
                          @change="
                            assignmentStore.logChoiceId(item.id, itemChoice.id, assignmentId)
                          "
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
                  <div v-if="assignmentStore.assignmentDone[assignmentId]" class="my-4 mx-3">
                    <p
                      style="color: green; font-weight: bold"
                      v-if="assignmentStore.correctAnswers[index]?.correctChoice?.isCorrect"
                    >
                      Correct answer:
                      {{ assignmentStore.correctAnswers[index].correctChoice.content }}
                    </p>
                  </div>
                </div>
              </div>

              <!--  -->
              <button
                disabled
                v-if="assignmentStore.assignmentDone[assignmentId]"
                style="width: 210px; margin-left: 3%; margin-top: 1%"
                type="submit"
                class="text-white bg-slate-400 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
              >
                Submitted
              </button>

              <button
                v-else
                style="width: 210px; margin-left: 3%; margin-top: 1%"
                type="submit"
                class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
              >
                Submit
              </button>
            </form>
          </div>
          <div v-else class="mr-36" style="width: 750px">
            <form @submit.prevent="assignmentStore.addEssay(assignmentId)">
              <div v-for="(item, index) in assignmentStore.questionEssay" :key="index">
                <p>Câu {{ index + 1 }}: {{ item.content }}</p>
                <div v-if="item.essays && item.essays.length">
                  <div class="my-3" v-for="(essay, essayIndex) in item.essays" :key="essayIndex">
                    <div
                      class="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700"
                    >
                      <label for="answer-essay" class="sr-only">Your answer</label>
                      <textarea
                        :value="essay.content"
                        id="answer-essay"
                        rows="6"
                        class="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none dark:text-white dark:placeholder-gray-400 dark:bg-gray-800"
                        placeholder="Write your answer here..."
                        required
                      ></textarea>
                    </div>
                  </div>
                </div>
                <div v-else>
                  <div
                    class="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700"
                  >
                    <label for="answer-essay-{{ index }}" class="sr-only">Your answer</label>
                    <textarea
                      v-model="content"
                      :id="'answer-essay' + index"
                      rows="6"
                      class="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none dark:text-white dark:placeholder-gray-400 dark:bg-gray-800"
                      placeholder="Write your answer here..."
                      @change="assignmentStore.logEssay(content, item.id, assignmentId)"
                      required
                    ></textarea>
                  </div>
                </div>
              </div>
              <div
                class="p-4 mb-4 text-sm text-yellow-800 rounded-lg bg-yellow-50 dark:bg-gray-800 dark:text-yellow-300"
                role="alert"
              >
                <span class="font-medium">Essay Submitted!</span> Your essay has been successfully
                submitted and is awaiting review. Your teacher will check it soon and provide a
                score along with feedback. Stay tuned!
              </div>

              <button
                disabled
                v-if="
                  assignmentStore.assignmentDone[assignmentId] ||
                  !isExpired(assignmentStore.assignment.dueDate)
                "
                style="width: 210px; margin-left: 3%; margin-top: 1%"
                type="submit"
                class="text-white bg-slate-400 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
              >
                Submitted
              </button>

              <button
                v-else
                style="width: 210px; margin-left: 3%; margin-top: 1%"
                type="submit"
                class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
              >
                Submit
              </button>
            </form>
          </div>
          <div v-if="assignmentStore.scores && assignmentStore.scores.length > 0">
            <div v-for="a in assignmentStore.scores" :key="a.id" class="border-score">
              <div>
                <p style="padding: 10px; margin-left: 35%; font-size: large; font-weight: bold">
                  Result
                </p>
              </div>
              <hr />
              <div>
                <p class="py-3 px-5">
                  Score:
                  <span
                    v-if="assignmentStore.assignment.tag.id == 5"
                    style="color: red; font-weight: bold"
                    >{{ a.score }} / {{ assignmentStore.questions.length }}</span
                  >
                  <span style="color: red; font-weight: bold" v-else>{{ a.score }}</span>
                </p>
                <p class="px-5">
                  Remark:
                  <span style="color: red; font-weight: bold">
                    {{ a.feedBack || 'No feedback available' }}
                  </span>
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
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const assignmentId = Number(route.params?.assignmentId)

const assignmentStore = useAssignmentStore()

const content = ref('')

const isExpired = (dueDate: number) => {
  const now = new Date()
  // console.log(now);
  return dueDate > now.getTime()
}

onMounted(async () => {
  await assignmentStore.loadAssignment(assignmentId)
  await assignmentStore.loadQuestions(assignmentId)
  await assignmentStore.loadQuestionEssay(assignmentId)

  await assignmentStore.loadAnswerChoices(assignmentId)
  await assignmentStore.loadScore(assignmentId)

  await assignmentStore.loadEssay(assignmentId)

  await assignmentStore.loadAssignmentDone(assignmentId)
})
</script>
<style scoped>
.border-score {
  border: 1px solid black;
  border-radius: 10px;
  width: 300px;
  height: auto;
  padding: 10px;
}
</style>
