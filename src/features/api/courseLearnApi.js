import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const COURSE_LEARN_API = "http://localhost:8080/api/v1";

export const courseLearnApi = createApi({
  reducerPath: "courseLearnApi",
  baseQuery: fetchBaseQuery({
    baseUrl: COURSE_LEARN_API,
    credentials: "include",
  }),
  tagTypes: ["CourseLearn"],

  endpoints: (builder) => ({
    getCourseLearn: builder.query({
      query: (courseId) => `/course-learn/${courseId}`,
      providesTags: ["CourseLearn"],
    }),

    updateLectureLearn: builder.mutation({
      query: ({ courseId, lectureId }) => ({
        url: `/course-learn/${courseId}/lecture/${lectureId}`,
        method: "PUT",
      }),
      invalidatesTags: ["CourseLearn"], // 🔥 THIS IS THE FIX
    }),

    completeCourse: builder.mutation({
      query: (courseId) => ({
        url: `/course-learn/${courseId}/completed`,
        method: "PUT",
      }),
      invalidatesTags: ["CourseLearn"],
    }),

    incompleteCourse: builder.mutation({
      query: (courseId) => ({
        url: `/course-learn/${courseId}/incompleted`,
        method: "PUT",
      }),
      invalidatesTags: ["CourseLearn"],
    }),
  }),
});

export const {
  useGetCourseLearnQuery,
  useUpdateLectureLearnMutation,
  useCompleteCourseMutation,
  useIncompleteCourseMutation,
} = courseLearnApi;
