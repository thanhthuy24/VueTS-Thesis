<template>
  <nav
    class="mx-8 flex px-5 py-3 text-gray-700 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-800 dark:border-gray-700"
    aria-label="Breadcrumb"
  >
    <ol class="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
      <li class="inline-flex items-center">
        <a
          href="#"
          class="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white"
        >
          <svg
            class="w-3 h-3 me-2.5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z"
            />
          </svg>
          Home
        </a>
      </li>
      <li>
        <div class="flex items-center">
          <svg
            class="rtl:rotate-180 block w-3 h-3 mx-1 text-gray-400"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 6 10"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="m1 9 4-4-4-4"
            />
          </svg>
          <a
            href="#"
            class="ms-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ms-2 dark:text-gray-400 dark:hover:text-white"
            >Templates</a
          >
        </div>
      </li>
      <li aria-current="page">
        <div class="flex items-center">
          <svg
            class="rtl:rotate-180 w-3 h-3 mx-1 text-gray-400"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 6 10"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="m1 9 4-4-4-4"
            />
          </svg>
          <span class="ms-1 text-sm font-medium text-gray-500 md:ms-2 dark:text-gray-400"
            >Flowbite</span
          >
        </div>
      </li>
    </ol>
  </nav>
  <section class="flex-container container">
    <section class="flex-item-3">
      <div class="border-div-1">
        <div class="flex justify-between">
          <div class="mt-2 flex">
            <div
              class="ml-2 flex justify-center w-14 p-1 bg-yellow-100"
              style="border-radius: 10px"
            >
              <p class="mt-1">{{ CourseEnrolled.averageRating }}</p>
              <svg
                class="h-6 w-6 text-yellow-300 ml-1 mt-1"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z"
                />
              </svg>
            </div>

            <div class="ml-3 mt-1">
              based on <span class="style-review">{{ CourseEnrolled.countRatingAll }} reviews</span>
            </div>
          </div>
          <div>
            <svg
              class="my-2 mx-2"
              width="30"
              height="30"
              viewBox="0 0 24 24"
              fill="#343C54"
              xmlns="http://www.w3.org/2000/svg"
              transform="rotate(0 0 0)"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M11.8227 4.77124L12 4.94862L12.1773 4.77135C14.4244 2.52427 18.0676 2.52427 20.3147 4.77134C22.5618 7.01842 22.5618 10.6616 20.3147 12.9087L13.591 19.6324C12.7123 20.5111 11.2877 20.5111 10.409 19.6324L3.6853 12.9086C1.43823 10.6615 1.43823 7.01831 3.6853 4.77124C5.93237 2.52417 9.5756 2.52417 11.8227 4.77124ZM10.762 5.8319C9.10073 4.17062 6.40725 4.17062 4.74596 5.8319C3.08468 7.49319 3.08468 10.1867 4.74596 11.848L11.4697 18.5718C11.7625 18.8647 12.2374 18.8647 12.5303 18.5718L19.254 11.8481C20.9153 10.1868 20.9153 7.49329 19.254 5.83201C17.5927 4.17072 14.8993 4.17072 13.238 5.83201L12.5304 6.53961C12.3897 6.68026 12.199 6.75928 12 6.75928C11.8011 6.75928 11.6104 6.68026 11.4697 6.53961L10.762 5.8319Z"
                fill="#343C54"
              />
            </svg>
          </div>
        </div>
        <div>
          <p class="course-title">{{ courseStore.course?.name || 'Loading...' }}</p>
        </div>
        <div>
          <p class="mx-3 my-3">{{ courseStore.course?.description || 'Loading...' }}</p>
        </div>
        <div class="flex mx-3 my-3">
          <div class="flex">
            <img
              class="w-10 h-10 rounded"
              :src="courseStore.course?.teacher?.user?.avatar"
              alt="Default avatar"
            />
            <p class="mx-3 my-2 teacher-name">{{ courseStore.course?.teacher?.user?.username }}</p>
          </div>

          <div class="my-2" v-if="loginStore.isLoggedIn">
            <p style="color: #727d73">
              {{ courseStore.countEnrolled[courseId] }} students bought this course
            </p>
          </div>
          <div
            v-else
            style="margin-left: 24%"
            class="bg-purple-100 text-purple-800 text-xs font-medium me-2 w-36 px-2 py-2 rounded dark:bg-gray-700 dark:text-purple-400 border border-purple-400"
          >
            <p>LOGIN TO SEE DETAIL</p>
          </div>
        </div>
      </div>
      <div class="border-div-1 my-5">
        <div>
          <p style="font-size: large" class="mx-3 my-3">Course content</p>
        </div>
        <div class="flex">
          <div class="flex">
            <svg
              class="mx-3 my-3"
              width="25"
              height="25"
              viewBox="0 0 24 24"
              fill="#343C54"
              xmlns="http://www.w3.org/2000/svg"
              transform="rotate(0 0 0)"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M8.25 5C7.83579 5 7.5 5.33579 7.5 5.75V9.75C7.5 10.1642 7.83579 10.5 8.25 10.5H15.75C16.1642 10.5 16.5 10.1642 16.5 9.75V5.75C16.5 5.33579 16.1642 5 15.75 5H8.25ZM9 9V6.5H15V9H9Z"
                fill="#343C54"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M6.75 2C5.50736 2 4.5 3.00736 4.5 4.25V19C4.5 20.6569 5.84315 22 7.5 22H18.75C19.1642 22 19.5 21.6642 19.5 21.25C19.5 20.8358 19.1642 20.5 18.75 20.5H18V17.5H18.75C19.1642 17.5 19.5 17.1642 19.5 16.75V4.25C19.5 3.00736 18.4926 2 17.25 2H6.75ZM18 16V4.25C18 3.83579 17.6642 3.5 17.25 3.5H6.75C6.33579 3.5 6 3.83579 6 4.25V16.4013C6.44126 16.1461 6.95357 16 7.5 16H18ZM16.5 17.5V20.5H7.5C6.67157 20.5 6 19.8284 6 19C6 18.1716 6.67157 17.5 7.5 17.5H16.5Z"
                fill="#343C54"
              />
            </svg>
            <span class="my-3">{{ courseStore.countLesson[courseId] }} lessons</span>
          </div>
          <div class="flex">
            <svg
              class="mx-3 my-3 w-7 h-7 text-gray-800 dark:text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M14 6H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1Zm7 11-6-2V9l6-2v10Z"
              />
            </svg>
            <span class="my-3">{{ lessonStore.countVideoByCourse }} videos</span>
          </div>
        </div>
        <div class="mx-3 my-3">
          <div id="accordion-arrow-icon" data-accordion="open">
            <h2 id="accordion-arrow-icon-heading-1">
              <button
                type="button"
                class="flex items-center justify-between w-full p-5 font-medium rtl:text-right text-gray-900 bg-gray-100 border border-b-0 border-gray-200 rounded-t-xl focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-800 gap-3"
                data-accordion-target="#accordion-arrow-icon-body-1"
                aria-expanded="true"
                aria-controls="accordion-arrow-icon-body-1"
              >
                <span>{{ lessonStore.lesson?.name }}</span>
              </button>
            </h2>
            <div id="accordion-arrow-icon-body-1" aria-labelledby="accordion-arrow-icon-heading-1">
              <div
                v-for="video in lessonStore.lesson.videos"
                :key="video.id"
                class="flex p-5 border border-b-1 border-gray-200 dark:border-gray-700 dark:bg-gray-900"
              >
                <svg
                  class="mx-2"
                  width="25"
                  height="25"
                  viewBox="0 0 25 24"
                  fill="#343C54"
                  xmlns="http://www.w3.org/2000/svg"
                  transform="rotate(0 0 0)"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M19.4357 13.9174C20.8659 13.0392 20.8659 10.9608 19.4357 10.0826L9.55234 4.01389C8.05317 3.09335 6.125 4.17205 6.125 5.93128L6.125 18.0688C6.125 19.828 8.05317 20.9067 9.55234 19.9861L19.4357 13.9174ZM18.6508 11.3609C19.1276 11.6536 19.1276 12.3464 18.6508 12.6391L8.76745 18.7079C8.26772 19.0147 7.625 18.6552 7.625 18.0688L7.625 5.93128C7.625 5.34487 8.26772 4.9853 8.76745 5.29215L18.6508 11.3609Z"
                    fill="#343C54"
                  />
                </svg>
                <p class="mb-2 text-gray-500 dark:text-gray-400">
                  {{ video.description }} + {{ video.id }}
                </p>
              </div>
              <div
                v-for="assignment in lessonStore.assignment"
                :key="assignment.id"
                class="flex justify-between p-5 border border-b-1 border-gray-200 dark:border-gray-700 dark:bg-gray-900"
              >
                <div class="flex">
                  <svg
                    class="mx-2"
                    width="25"
                    height="25"
                    viewBox="0 0 24 24"
                    fill="#343C54"
                    xmlns="http://www.w3.org/2000/svg"
                    transform="rotate(0 0 0)"
                  >
                    <path
                      d="M10.9201 10.4379C10.9201 9.84143 11.4036 9.35792 12 9.35792C12.5965 9.35792 13.08 9.84143 13.08 10.4379C13.08 10.8035 12.8989 11.127 12.6182 11.3236C12.3475 11.5131 12.0204 11.7662 11.7572 12.0841C11.491 12.4055 11.25 12.8426 11.25 13.3841C11.25 13.7983 11.5858 14.1341 12 14.1341C12.4142 14.1341 12.75 13.7983 12.75 13.3841C12.75 13.3091 12.7807 13.1999 12.9125 13.0408C13.0471 12.8782 13.2442 12.7164 13.4785 12.5523C14.143 12.0871 14.58 11.3136 14.58 10.4379C14.58 9.01301 13.4249 7.85792 12 7.85792C10.5751 7.85792 9.42006 9.01301 9.42006 10.4379C9.42006 10.8521 9.75584 11.1879 10.1701 11.1879C10.5843 11.1879 10.9201 10.8521 10.9201 10.4379Z"
                      fill="#343C54"
                    />
                    <path
                      d="M11.9993 14.6421C11.5851 14.6421 11.2493 14.9779 11.2493 15.3921C11.2493 15.8063 11.5851 16.1421 11.9993 16.1421C12.4135 16.1421 12.75 15.8063 12.75 15.3921C12.75 14.9779 12.4135 14.6421 11.9993 14.6421Z"
                      fill="#343C54"
                    />
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2ZM3.5 12C3.5 7.30558 7.30558 3.5 12 3.5C16.6944 3.5 20.5 7.30558 20.5 12C20.5 16.6944 16.6944 20.5 12 20.5C7.30558 20.5 3.5 16.6944 3.5 12Z"
                      fill="#343C54"
                    />
                  </svg>
                  <!-- <div class="flex"> -->
                  <div class="text-gray-500 dark:text-gray-400">
                    <p>
                      {{ assignment.name }}
                    </p>
                  </div>
                </div>
                <div>
                  <div class="text-gray-500 dark:text-gray-400">
                    <p>{{ lessonStore.totalQuestion[assignment.id] }} Questions</p>
                  </div>
                </div>
                <!-- </div> -->
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="flex-item-2 border-div-1">
      <div class="mx-5 my-5">
        <div>
          <span
            class="font-badge bg-yellow-100 text-yellow-800 text-xs font-medium me-2 px-2.5 py-0.5 dark:bg-yellow-900 dark:text-yellow-300"
            >{{ courseStore.course.discount }}% sale</span
          >
        </div>
        <img :src="courseStore.course.image" class="image-tital-course" />
        <div class="flex">
          <div class="font-new-price">
            {{
              formatCurrencyWithRounding(
                courseStore.course.price * (1 - courseStore.course.discount / 100),
              )
            }}đ
          </div>
          <div class="font-price">{{ formatCurrencyWithRounding(courseStore.course.price) }}đ</div>
        </div>
        <!-- @click="
                cartStore.addToCart(
                  courseStore.course,
                  loginStore.currentUser?.id,
                  loginStore.token,
                )
              " -->
        <div class="mt-3">
          <RouterLink to="/cart">
            <button
              v-if="!CourseEnrolled.checkEnrollmentBoolean"
              @click="checkAddToCart"
              type="button"
              style="background-color: #e5b0ea; width: 100%; font-weight: bold; font-size: large"
              class="flex focus:outline-none text-white hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
            >
              <svg
                class="mx-2"
                width="25"
                height="25"
                viewBox="0 0 25 25"
                fill="#FFFFFF"
                xmlns="http://www.w3.org/2000/svg"
                transform="rotate(0 0 0)"
              >
                <path
                  d="M6.41032 9.23329C6.48046 6.19302 8.96698 3.75 12.0241 3.75C15.0813 3.75 17.5678 6.19308 17.6379 9.23338C20.0922 9.42706 22.0235 11.4801 22.0235 13.9842C22.0235 16.0917 20.6556 17.8797 18.7591 18.5087C18.8505 18.0617 18.8984 17.599 18.8984 17.125C18.8984 17.0203 18.8961 16.9162 18.8915 16.8126C19.8672 16.2478 20.5235 15.1927 20.5235 13.9842C20.5235 12.1806 19.0614 10.7184 17.2578 10.7184H16.8894C16.4752 10.7184 16.1394 10.3827 16.1394 9.96844V9.3653C16.1394 7.09248 14.2969 5.25 12.0241 5.25C9.75128 5.25 7.9088 7.09248 7.9088 9.3653V9.96844C7.9088 10.3827 7.57301 10.7184 7.1588 10.7184H6.78922C4.98558 10.7184 3.52344 12.1806 3.52344 13.9842C3.52344 15.1926 4.17977 16.2478 5.15541 16.8126C5.15078 16.9161 5.14844 17.0203 5.14844 17.125C5.14844 17.599 5.1964 18.0617 5.28773 18.5087C3.39135 17.8796 2.02344 16.0917 2.02344 13.9842C2.02344 11.4797 3.95539 9.42638 6.41032 9.23329Z"
                  fill="#FFFFFF"
                />
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M9.56836 11.75C9.23759 11.75 8.94588 11.9667 8.85033 12.2834L7.35033 17.2547C7.28179 17.4819 7.32479 17.7281 7.46629 17.9186C7.60778 18.1091 7.83107 18.2214 8.06836 18.2214H9.50701V21.75C9.50701 22.0533 9.68975 22.3268 9.97 22.4429C10.2503 22.559 10.5728 22.4948 10.7873 22.2803L16.5087 16.559C16.7232 16.3445 16.7874 16.0219 16.6713 15.7416C16.5552 15.4614 16.2817 15.2786 15.9784 15.2786H13.7897V12.5C13.7897 12.0858 13.454 11.75 13.0397 11.75H9.56836ZM9.07805 16.7214L10.1255 13.25H12.2897V16.0286C12.2897 16.2275 12.3688 16.4183 12.5094 16.559C12.6501 16.6996 12.8408 16.7786 13.0397 16.7786H14.1677L11.007 19.9393V17.4714C11.007 17.0572 10.6712 16.7214 10.257 16.7214H9.07805Z"
                  fill="#FFFFFF"
                />
              </svg>
              Buy course now
            </button>
          </RouterLink>
          <RouterLink
            :to="{ name: 'course-enrolled', params: { courseId: courseStore.course?.id } }"
          >
            <button
              v-if="CourseEnrolled.checkEnrollmentBoolean"
              type="button"
              style="background-color: #2e5077; width: 100%; font-weight: bold; font-size: large"
              class="flex focus:outline-none text-white hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
            >
              <svg
                class="mx-2"
                width="25"
                height="25"
                viewBox="0 0 25 25"
                fill="#FFFFFF"
                xmlns="http://www.w3.org/2000/svg"
                transform="rotate(0 0 0)"
              >
                <path
                  d="M6.41032 9.23329C6.48046 6.19302 8.96698 3.75 12.0241 3.75C15.0813 3.75 17.5678 6.19308 17.6379 9.23338C20.0922 9.42706 22.0235 11.4801 22.0235 13.9842C22.0235 16.0917 20.6556 17.8797 18.7591 18.5087C18.8505 18.0617 18.8984 17.599 18.8984 17.125C18.8984 17.0203 18.8961 16.9162 18.8915 16.8126C19.8672 16.2478 20.5235 15.1927 20.5235 13.9842C20.5235 12.1806 19.0614 10.7184 17.2578 10.7184H16.8894C16.4752 10.7184 16.1394 10.3827 16.1394 9.96844V9.3653C16.1394 7.09248 14.2969 5.25 12.0241 5.25C9.75128 5.25 7.9088 7.09248 7.9088 9.3653V9.96844C7.9088 10.3827 7.57301 10.7184 7.1588 10.7184H6.78922C4.98558 10.7184 3.52344 12.1806 3.52344 13.9842C3.52344 15.1926 4.17977 16.2478 5.15541 16.8126C5.15078 16.9161 5.14844 17.0203 5.14844 17.125C5.14844 17.599 5.1964 18.0617 5.28773 18.5087C3.39135 17.8796 2.02344 16.0917 2.02344 13.9842C2.02344 11.4797 3.95539 9.42638 6.41032 9.23329Z"
                  fill="#FFFFFF"
                />
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M9.56836 11.75C9.23759 11.75 8.94588 11.9667 8.85033 12.2834L7.35033 17.2547C7.28179 17.4819 7.32479 17.7281 7.46629 17.9186C7.60778 18.1091 7.83107 18.2214 8.06836 18.2214H9.50701V21.75C9.50701 22.0533 9.68975 22.3268 9.97 22.4429C10.2503 22.559 10.5728 22.4948 10.7873 22.2803L16.5087 16.559C16.7232 16.3445 16.7874 16.0219 16.6713 15.7416C16.5552 15.4614 16.2817 15.2786 15.9784 15.2786H13.7897V12.5C13.7897 12.0858 13.454 11.75 13.0397 11.75H9.56836ZM9.07805 16.7214L10.1255 13.25H12.2897V16.0286C12.2897 16.2275 12.3688 16.4183 12.5094 16.559C12.6501 16.6996 12.8408 16.7786 13.0397 16.7786H14.1677L11.007 19.9393V17.4714C11.007 17.0572 10.6712 16.7214 10.257 16.7214H9.07805Z"
                  fill="#FFFFFF"
                />
              </svg>
              Access course
            </button></RouterLink
          >
        </div>
        <div class="mt-3">
          <button
            type="button"
            style="width: 100%; font-weight: bold"
            class="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
          >
            Send message to teacher
          </button>
        </div>
        <div
          id="popup-modal"
          tabindex="-1"
          class="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
        >
          <div class="relative p-4 w-full max-w-md max-h-full">
            <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
              <button
                type="button"
                class="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                data-modal-hide="popup-modal"
              >
                <svg
                  class="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
                <span class="sr-only">Close modal</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  </section>
</template>

<script setup lang="ts">
import { useCartStore } from '@/stores/CartStore'
import { useCourseEnrolled } from '@/stores/CourseEnrolledStore'
import { useCourseStore } from '@/stores/CourseStore'
import { useLessonStore } from '@/stores/LessonStore'
import { useLoginStore } from '@/stores/LoginStore'
import { onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const courseStore = useCourseStore()
const loginStore = useLoginStore()
const lessonStore = useLessonStore()
const cartStore = useCartStore()
const CourseEnrolled = useCourseEnrolled()

const formatCurrencyWithRounding = (value: number) => {
  const roundedValue = Math.floor(value) + (value % 1 >= 0.5 ? 1 : 0)
  return roundedValue.toLocaleString().replace(/\B(?=(\d{3})+(?!))/g, ',')
}

const checkAddToCart = (event: Event) => {
  event.preventDefault()
  if (loginStore.isLoggedIn === false) {
    router.push('/forbidden')
  } else {
    cartStore.addToCart(courseStore.course, loginStore.currentUser?.id, loginStore.token)
    router.push('/cart')
  }
}

// const courseId = route.params.courseId || route.query.courseId
const courseIdParam = route.params.courseId
const courseId = Number(courseIdParam)
const userId = Number(loginStore.currentUser?.id)
onMounted(async () => {
  await CourseEnrolled.checkEnrollment(userId, courseId)

  await CourseEnrolled.loadCountRatingAll(courseId)
  await CourseEnrolled.loadAverageRating(courseId)

  await courseStore.loadCourseById(courseId)
  await courseStore.countEnrollments(courseId)
  await courseStore.countLessons(courseId)
  await courseStore.addViewCourse(courseId)

  await lessonStore.countVideoByCourseId(courseId)

  await lessonStore.loadLesson(courseId)

  const lessonId = lessonStore.lesson.id // Lấy id của lesson
  if (lessonId) {
    await lessonStore.loadAssignment(lessonId) // Gọi hàm loadAssignment
  }
  lessonStore.assignment.forEach(async (assignment) => {
    await lessonStore.countQuestion(assignment.id)
  })
})
</script>
<style scoped>
.flex-container {
  display: flex;
  width: 100%;
  height: 100vh;
}

.flex-item-3 {
  flex: 4;
  margin-top: 20px;
  margin-left: 20px;
  /* background-color: aqua; */
}

.flex-item-2 {
  flex: 1;
  margin: 20px;
}

.border-div-1 {
  border: 1px solid #eff3ea;
  border-radius: 10px;
}

.style-review {
  text-decoration: underline;
  color: purple;
}

.course-title {
  font-size: 30px;
  font-weight: bold;
  margin: 10px;
}

.teacher-name {
  font-weight: bold;
  color: #cb9df0;
  /* font-family: ; */
}

.image-tital-course {
  width: 100%; /* Chiều rộng full container */
  height: 200px; /* Chiều cao cố định (tuỳ chỉnh theo nhu cầu) */
  object-fit: cover; /* Ảnh được cắt để vừa thẻ, giữ tỷ lệ */
  object-position: center; /* Định vị trung tâm ảnh */
}

.font-new-price {
  font-size: large;
  margin-top: 16px;
  font-weight: bold;
  color: #686d76;
}

.font-price {
  text-decoration: line-through;
  font-size: large;
  margin-top: 16px;
  margin-left: 5px;
  font-weight: bold;
  color: #b2b1b9;
}

.font-badge {
  font-size: 15px;
  margin-top: 16px;
  /* margin-left: 5px; */
  color: #eb5a3c;
}
</style>
