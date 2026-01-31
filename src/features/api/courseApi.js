import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const COURSE_API = "http://localhost:8080/api/v1/course";

export const courseApi = createApi({
  reducerPath: "courseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: COURSE_API,
    credentials: "include",

    fetchFn: (input, init) =>
      fetch(input, {
        ...init,
        cache: "no-store",
      }),
  }),

  // ❌ DO NOT put User here
  tagTypes: ["Lectures"],

  endpoints: (builder) => ({
    createCourse: builder.mutation({
      query: ({ courseTitle, category }) => ({
        url: "/create",
        method: "POST",
        body: { courseTitle, category },
      }),
    }),

    getSearchCourse: builder.query({
      query: ({ searchQuery, categories, sortByPrice }) => {
        let queryString = `/search?query=${encodeURIComponent(searchQuery)}`;

        if (categories?.length) {
          queryString += `&categories=${categories
            .map(encodeURIComponent)
            .join(",")}`;
        }

        if (sortByPrice) {
          queryString += `&sortByPrice=${encodeURIComponent(sortByPrice)}`;
        }

        return { url: queryString, method: "GET" };
      },
      refetchOnMountOrArgChange: true,
    }),

    getPublishedCourses: builder.query({
      query: () => ({
        url: "/published-courses",
        method: "GET",
      }),
    }),

    // ✅ enrollment ONLY updates backend
    enrollCourse: builder.mutation({
      query: (courseId) => ({
        url: `/courses/${courseId}/enroll`,
        method: "POST",
      }),
      async onQueryStarted(_, { queryFulfilled, dispatch }) {
        try {
          const { data } = await queryFulfilled;

          if (data?.user) {
            dispatch({
              type: "auth/userLoggedIn",
              payload: { user: data.user },
            });
          }
        } catch (err) {
          console.error("Enroll failed", err);
        }
      },
    }),

    getCreatorCourses: builder.query({
      query: () => ({
        url: "/get",
        method: "GET",
      }),
    }),

    getCourseCategories: builder.query({
      query: () => ({
        url: "/categories",
        method: "GET",
      }),
    }),

    editCourse: builder.mutation({
      query: ({ courseId, courseData }) => {
        const formData = new FormData();

        Object.entries(courseData).forEach(([key, value]) => {
          if (value !== undefined && value !== "") {
            formData.append(key, value);
          }
        });

        return {
          url: `/edit/${courseId}`,
          method: "PUT",
          body: formData,
        };
      },
    }),

    getCourseById: builder.query({
      query: (courseId) => ({
        url: `/get/${courseId}`,
        method: "GET",
      }),
    }),

    createLecture: builder.mutation({
      query: ({ courseId, lectureTitle }) => ({
        url: `/lecture/create/${courseId}`,
        method: "POST",
        body: { lectureTitle },
      }),
    }),

    getCourseLecture: builder.query({
      query: (courseId) => ({
        url: `/lecture/get/${courseId}`,
        method: "GET",
      }),
      providesTags: ["Lectures"],
    }),

    editLecture: builder.mutation({
      query: ({
        courseId,
        lectureId,
        lectureTitle,
        videoInfo,
        isPreviewFree,
      }) => ({
        url: `/lecture/edit/${courseId}/${lectureId}`,
        method: "PUT",
        body: {
          lectureTitle,
          videoInfo,
          isPreviewFree,
        },
      }),
    }),

    removeLecture: builder.mutation({
      query: (lectureId) => ({
        url: `/lecture/remove/${lectureId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Lectures"],
    }),

    getLectureById: builder.query({
      query: (lectureId) => ({
        url: `/lecture/single/${lectureId}`,
        method: "GET",
      }),
      transformResponse: (response) => ({
        lecture: {
          ...response.lecture,
          lectureTitle: response.lecture.lectureTitle ?? "",
        },
      }),
    }),

    togglePublishCourse: builder.mutation({
      query: ({ courseId, publish }) => ({
        url: `/publish/${courseId}?publish=${publish}`,
        method: "PATCH",
      }),
    }),
  }),
});

export const {
  useCreateCourseMutation,
  useGetSearchCourseQuery,
  useGetPublishedCoursesQuery,
  useGetCreatorCoursesQuery,
  useEnrollCourseMutation,
  useGetCourseCategoriesQuery,
  useEditCourseMutation,
  useGetCourseByIdQuery,
  useCreateLectureMutation,
  useGetCourseLectureQuery,
  useEditLectureMutation,
  useRemoveLectureMutation,
  useGetLectureByIdQuery,
  useTogglePublishCourseMutation,
} = courseApi;
