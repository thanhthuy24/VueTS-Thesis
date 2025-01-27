<template>
  <main class="flex justify-center">
    <div class="flex justify-around">
      <div>
        <h2 class="mb-4 text-xl tracking-tight font-extrabold text-gray-900 dark:text-white">
          {{ assignmentStore.assignment.name }}
        </h2>
        <div class="mt-5 flex justify-around">
          <div>
            <form @submit.prevent="assignmentStore.addAnswer(assignmentId)">
              <div v-for="(item, index) in assignmentStore.questions" :key="index">
                <p>Câu {{ index + 1 }}: {{ item.content }}</p>
                <div class="my-3 ml-8">
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
          <div v-if="assignmentStore.score">
            <div class="border-score">
              <div>
                <p style="padding: 10px; margin-left: 35%; font-size: large; font-weight: bold">
                  Result
                </p>
              </div>
              <hr />
              <div>
                <p class="py-3 px-5">
                  Score:
                  <span style="color: red; font-weight: bold"
                    >{{ assignmentStore.score.score }} /
                    {{ assignmentStore.questions.length }}</span
                  >
                </p>
                <p class="px-5">
                  Remark:
                  <span style="color: red; font-weight: bold">{{
                    assignmentStore.score.feedBack
                  }}</span>
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
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const assignmentId = Number(route.params?.assignmentId)

const assignmentStore = useAssignmentStore()

onMounted(async () => {
  await assignmentStore.loadAssignment(assignmentId)
  await assignmentStore.loadQuestions(assignmentId)
  await assignmentStore.loadAnswerChoices(assignmentId)
  await assignmentStore.loadScore(assignmentId)
})
</script>
<style scoped>
.border-score {
  border: 1px solid black;
  border-radius: 10px;
  width: 300px;
  height: 200px;
  padding: 10px;
}
</style>
