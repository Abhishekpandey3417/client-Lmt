import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const COURSE_LEARN_API = `${import.meta.env.VITE_API_URL}/course-learn`;

export const courseLearnApi = createApi({
  reducerPath: "courseLearnApi",

  baseQuery: fetchBaseQuery({
    baseUrl: COURSE_LEARN_API,
    credentials: "include",
  }),

  tagTypes: ["CourseLearn"],

  endpoints: (builder) => ({
    getCourseLearn: builder.query({
      query: (courseId) => `/${courseId}`,
      providesTags: ["CourseLearn"],
    }),

    updateLectureLearn: builder.mutation({
      query: ({ courseId, lectureId }) => ({
        url: `/${courseId}/lecture/${lectureId}`,
        method: "PUT",
      }),
      invalidatesTags: ["CourseLearn"],
    }),

    completeCourse: builder.mutation({
      query: (courseId) => ({
        url: `/${courseId}/completed`,
        method: "PUT",
      }),
      invalidatesTags: ["CourseLearn"],
    }),

    incompleteCourse: builder.mutation({
      query: (courseId) => ({
        url: `/${courseId}/incompleted`,
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