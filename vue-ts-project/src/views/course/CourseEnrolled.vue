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
            <RouterLink :to="{ name: 'course-rating-list', params: { courseId: courseId } }">
              <div class="flex ml-3">
                <p
                  class="mt-1 mr-2 text-2xl font-semibold leading-none text-gray-900 dark:text-white"
                >
                  {{ courseEnrolled.averageRating }}
                </p>
                <svg
                  class="h-8 w-8 text-yellow-300"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z"
                  />
                </svg>
                <div class="mt-1 ml-2 text-gray-600">
                  {{ courseEnrolled.countRatingAll }} ratings
                </div>
              </div></RouterLink
            >

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
                  <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    <th
                      scope="row"
                      class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      Certificate
                    </th>
                    <td class="px-6 py-4">
                      <button
                        @click="
                          courseEnrolled.downLoadCertificate(
                            loginStore.currentUser?.firstName +
                              ' ' +
                              loginStore.currentUser?.lastName,
                            courseStore.course.name,
                          )
                        "
                        type="button"
                        class="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                      >
                        Download Certificate
                      </button>
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
                  <p class="flex text-gray-500 dark:text-gray-400">
                    <span v-if="c.sentiment === 'Positive'"
                      ><svg
                        width="20"
                        height="20"
                        viewBox="0 0 25 25"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        transform="rotate(0 0 0)"
                      >
                        <path
                          d="M12.0234 2.5C12.4377 2.5 12.7734 2.83579 12.7734 3.25V4.75C12.7734 5.16421 12.4377 5.5 12.0234 5.5C11.6092 5.5 11.2734 5.16421 11.2734 4.75V3.25C11.2734 2.83579 11.6092 2.5 12.0234 2.5Z"
                          fill="#d27f00"
                        />
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M6.52344 12.5C6.52344 9.46243 8.98587 7 12.0234 7C15.061 7 17.5234 9.46243 17.5234 12.5C17.5234 15.5376 15.061 18 12.0234 18C8.98587 18 6.52344 15.5376 6.52344 12.5ZM12.0234 8.5C9.8143 8.5 8.02344 10.2909 8.02344 12.5C8.02344 14.7091 9.8143 16.5 12.0234 16.5C14.2326 16.5 16.0234 14.7091 16.0234 12.5C16.0234 10.2909 14.2326 8.5 12.0234 8.5Z"
                          fill="#d27f00"
                        />
                        <path
                          d="M19.0948 6.49127C19.3877 6.19837 19.3877 5.7235 19.0948 5.43061C18.8019 5.13771 18.327 5.13771 18.0341 5.43061L16.9735 6.49127C16.6806 6.78416 16.6806 7.25903 16.9735 7.55193C17.2664 7.84482 17.7412 7.84482 18.0341 7.55193L19.0948 6.49127Z"
                          fill="#d27f00"
                        />
                        <path
                          d="M22.0234 12.5C22.0234 12.9142 21.6877 13.25 21.2734 13.25H19.7734C19.3592 13.25 19.0234 12.9142 19.0234 12.5C19.0234 12.0858 19.3592 11.75 19.7734 11.75H21.2734C21.6877 11.75 22.0234 12.0858 22.0234 12.5Z"
                          fill="#d27f00"
                        />
                        <path
                          d="M18.0341 19.5694C18.327 19.8623 18.8019 19.8623 19.0948 19.5694C19.3877 19.2765 19.3877 18.8016 19.0948 18.5087L18.0341 17.4481C17.7412 17.1552 17.2664 17.1552 16.9735 17.4481C16.6806 17.741 16.6806 18.2158 16.9735 18.5087L18.0341 19.5694Z"
                          fill="#d27f00"
                        />
                        <path
                          d="M12.0234 19.5C12.4377 19.5 12.7734 19.8358 12.7734 20.25V21.75C12.7734 22.1642 12.4377 22.5 12.0234 22.5C11.6092 22.5 11.2734 22.1642 11.2734 21.75V20.25C11.2734 19.8358 11.6092 19.5 12.0234 19.5Z"
                          fill="#d27f00"
                        />
                        <path
                          d="M7.0733 18.5147C7.36619 18.2218 7.36619 17.7469 7.0733 17.454C6.78041 17.1612 6.30553 17.1612 6.01264 17.454L4.95198 18.5147C4.65909 18.8076 4.65909 19.2825 4.95198 19.5754C5.24487 19.8683 5.71975 19.8683 6.01264 19.5754L7.0733 18.5147Z"
                          fill="#d27f00"
                        />
                        <path
                          d="M5.02344 12.5C5.02344 12.9142 4.68765 13.25 4.27344 13.25H2.77344C2.35922 13.25 2.02344 12.9142 2.02344 12.5C2.02344 12.0858 2.35922 11.75 2.77344 11.75H4.27344C4.68765 11.75 5.02344 12.0858 5.02344 12.5Z"
                          fill="#d27f00"
                        />
                        <path
                          d="M6.01264 7.54596C6.30553 7.83885 6.78041 7.83885 7.0733 7.54596C7.36619 7.25306 7.36619 6.77819 7.0733 6.4853L6.01264 5.42463C5.71975 5.13174 5.24487 5.13174 4.95198 5.42463C4.65909 5.71753 4.65909 6.1924 4.95198 6.48529L6.01264 7.54596Z"
                          fill="#d27f00"
                        />
                      </svg>
                    </span>
                    <span v-else-if="c.sentiment === 'Negative'">
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 25 25"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        transform="rotate(0 0 0)"
                      >
                        <path
                          d="M6.41032 9.23329C6.48046 6.19302 8.96698 3.75 12.0241 3.75C15.0813 3.75 17.5678 6.19308 17.6379 9.23338C20.0922 9.42706 22.0235 11.4801 22.0235 13.9842C22.0235 16.0917 20.6556 17.8797 18.7591 18.5087C18.8505 18.0617 18.8984 17.599 18.8984 17.125C18.8984 17.0203 18.8961 16.9162 18.8915 16.8126C19.8672 16.2478 20.5235 15.1927 20.5235 13.9842C20.5235 12.1806 19.0614 10.7184 17.2578 10.7184H16.8894C16.4752 10.7184 16.1394 10.3827 16.1394 9.96844V9.3653C16.1394 7.09248 14.2969 5.25 12.0241 5.25C9.75128 5.25 7.9088 7.09248 7.9088 9.3653V9.96844C7.9088 10.3827 7.57301 10.7184 7.1588 10.7184H6.78922C4.98558 10.7184 3.52344 12.1806 3.52344 13.9842C3.52344 15.1926 4.17977 16.2478 5.15541 16.8126C5.15078 16.9161 5.14844 17.0203 5.14844 17.125C5.14844 17.599 5.1964 18.0617 5.28773 18.5087C3.39135 17.8796 2.02344 16.0917 2.02344 13.9842C2.02344 11.4797 3.95539 9.42638 6.41032 9.23329Z"
                          fill="#0005fe"
                        />
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M13.786 12.4249C13.757 12.1367 13.5646 11.8909 13.2917 11.7936C13.0189 11.6963 12.7143 11.7648 12.5095 11.9697L7.53809 16.941C7.32359 17.1555 7.25943 17.4781 7.37551 17.7584C7.4916 18.0386 7.76507 18.2214 8.06842 18.2214H9.8984L10.2608 21.8251C10.2898 22.1133 10.4823 22.3591 10.7551 22.4564C11.028 22.5537 11.3325 22.4852 11.5374 22.2803L16.5088 17.309C16.7233 17.0945 16.7875 16.7719 16.6714 16.4916C16.5553 16.2114 16.2818 16.0286 15.9785 16.0286H14.1485L13.786 12.4249ZM10.5768 16.7214H9.87908L12.4518 14.1486L12.7239 16.8537C12.7624 17.2369 13.085 17.5286 13.4701 17.5286H14.1678L11.595 20.1014L11.323 17.3963C11.2844 17.0131 10.9619 16.7214 10.5768 16.7214Z"
                          fill="#0005fe"
                        />
                      </svg>
                    </span>
                    <span v-else
                      ><svg
                        width="20"
                        height="20"
                        viewBox="0 0 25 25"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        transform="rotate(0 0 0)"
                      >
                        <path
                          d="M7.64304 2.5086C8.05683 2.52736 8.37706 2.87801 8.3583 3.2918L8.35784 3.30179C8.33908 3.71558 7.98843 4.03581 7.57464 4.01705C7.16085 3.99828 6.84062 3.64763 6.85938 3.23384L6.85984 3.22385C6.8786 2.81006 7.22925 2.48983 7.64304 2.5086Z"
                          fill="#cf87ff"
                        />
                        <path
                          d="M11.3684 4.25343C11.6477 4.55929 11.6262 5.03368 11.3204 5.313L11.313 5.31975C11.0071 5.59907 10.5327 5.57756 10.2534 5.2717C9.97409 4.96584 9.9956 4.49145 10.3015 4.21213L10.3088 4.20538C10.6147 3.92606 11.0891 3.94757 11.3684 4.25343Z"
                          fill="#cf87ff"
                        />
                        <path
                          d="M4.5457 10.4845C4.82503 10.7903 4.80351 11.2647 4.49765 11.544L4.49027 11.5508C4.18441 11.8301 3.71002 11.8086 3.4307 11.5027C3.15137 11.1969 3.17289 10.7225 3.47875 10.4431L3.48613 10.4364C3.79199 10.1571 4.26638 10.1786 4.5457 10.4845Z"
                          fill="#cf87ff"
                        />
                        <path
                          d="M2.75533 8.41825C3.16911 8.43701 3.51977 8.11678 3.53853 7.70299C3.55729 7.28921 3.23706 6.93855 2.82328 6.91979L2.81329 6.91934C2.3995 6.90057 2.04885 7.2208 2.03008 7.63459C2.01132 8.04838 2.33155 8.39903 2.74534 8.4178L2.75533 8.41825Z"
                          fill="#cf87ff"
                        />
                        <path
                          d="M4.79331 5.02411C4.48745 5.30343 4.01306 5.28192 3.73374 4.97606L3.72699 4.96868C3.44767 4.66282 3.46918 4.18843 3.77504 3.90911C4.0809 3.62978 4.55529 3.65129 4.83461 3.95715L4.84136 3.96454C5.12068 4.2704 5.09917 4.74479 4.79331 5.02411Z"
                          fill="#cf87ff"
                        />
                        <path
                          d="M5.83617 7.80718C5.87532 6.94375 6.60702 6.27553 7.47045 6.31469C8.03886 6.34046 8.52267 6.66636 8.77576 7.1324C9.15455 6.80377 9.56545 6.51122 10.003 6.26007C9.48747 5.43216 8.58635 4.86375 7.5384 4.81623C5.84739 4.73954 4.41439 6.04822 4.33771 7.73923C4.27739 9.06942 5.07428 10.24 6.2402 10.7163C6.31356 10.6906 6.38762 10.6664 6.46235 10.6438C6.60077 10.2071 6.77688 9.78728 6.98682 9.38802C6.29575 9.19981 5.80236 8.55259 5.83617 7.80718Z"
                          fill="#cf87ff"
                        />
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M13.8613 6.73438C17.151 6.73438 19.8616 9.27843 20.1035 12.5106C21.2548 13.2235 22.0234 14.4989 22.0234 15.9549C22.0234 18.191 20.2108 20.0036 17.9748 20.0036H8.07212C5.83609 20.0036 4.02344 18.191 4.02344 15.9549C4.02344 13.8474 5.63378 12.1159 7.69116 11.9239C8.19609 8.97566 10.7732 6.73438 13.8613 6.73438ZM18.621 12.9676C18.6135 10.3545 16.4807 8.23438 13.8613 8.23438C11.3321 8.23438 9.25574 10.2116 9.10979 12.7002C9.08654 13.0966 8.75823 13.4062 8.36108 13.4062H8.07212C6.66452 13.4062 5.52344 14.5473 5.52344 15.9549C5.52344 17.3625 6.66452 18.5036 8.07212 18.5036H17.9748C19.3824 18.5036 20.5234 17.3625 20.5234 15.9549C20.5234 14.9341 19.9232 14.0518 19.0532 13.6448C18.7902 13.5217 18.6218 13.258 18.621 12.9676Z"
                          fill="#cf87ff"
                        />
                      </svg>
                    </span>
                    <span class="ml-2">{{ c.content }}</span>
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
                      style="width: 595px"
                      type="text"
                      placeholder="Write your reply..."
                      class="border border-gray-300 text-sm rounded-lg p-2.5"
                      rows="3"
                    >
                    </textarea>
                    <button
                      type="submit"
                      class="mt-1 mb-3 bg-blue-500 text-white rounded-lg px-4 py-2"
                    >
                      Submit
                    </button>
                  </form>
                </div>
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
                        <time pubdate datetime="2022-02-12" title="February 12th, 2022">{{
                          formatDateUpdate(reply.createdDate)
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
              <RouterLink :to="{ name: 'assignment-choice', params: { assignmentId: item.id } }">
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
              </RouterLink>
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
const replyText = ref('')

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

const handleReplyComment = async (commentId: number, content: string) => {
  replyText.value = ''
  await courseEnrolled.addReplyComment(commentId, content)
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

const replyInputVisible = ref<{ [key: number]: boolean }>({})
const toggleReplyButton = (commentId: number) => {
  replyInputVisible.value = {
    ...replyInputVisible.value,
    [commentId]: !replyInputVisible.value[commentId],
  }
}

onMounted(async () => {
  videoUrl.value = ''
  await courseEnrolled.checkCourseEnrolled(userId, courseId)

  await courseStore.loadCourseById(courseId)
  await assignmentStore.loadAssignments(courseId)
  await lessonStore.loadLessonsByCourseId(courseId)

  await courseEnrolled.loadAverageRating(courseId)
  await courseEnrolled.loadCountRatingAll(courseId)

  for (const a of assignmentStore.assignments) {
    const res = await assignmentStore.loadAssignmentDone(a.id)
    assignmentDone.value[a.id] = res
  }
  await courseEnrolled.checkProgressCertificate(courseId, userId)
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
