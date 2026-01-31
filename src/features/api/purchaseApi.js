import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
//import { userLoggedIn } from "@/features/slices/authSlice"; // adjust path

const COURSE_PURCHASE_API = "http://localhost:8080/api/v1/purchase";

export const purchaseApi = createApi({
  reducerPath: "purchaseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: COURSE_PURCHASE_API,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    createCheckoutSession: builder.mutation({
      query: ({ courseId }) => ({
        url: `/checkout/create-checkout-session`,
        method: "POST",
        body: { courseId }, // send as object to match backend
      }),
    }),
    getCourseDetailWithStatus: builder.query({
      query: (courseId) => ({
        url: `/course/${courseId}/detail-with-status`,
        method: "GET",
      }),
    }),
    getPurchasedCourses: builder.query({
      query: () => ({
        url: `/`,
        method: "GET",
      }),
    }),

    confirmPurchase: builder.mutation({
      query: ({ purchaseId }) => ({
        url: "/confirm",
        method: "POST",
        body: { purchaseId },
      }),
    }),
  }),
});

export const {
  useCreateCheckoutSessionMutation,
  useGetCourseDetailWithStatusQuery,
  useGetPurchasedCoursesQuery,
  useConfirmPurchaseMutation,
} = purchaseApi;
