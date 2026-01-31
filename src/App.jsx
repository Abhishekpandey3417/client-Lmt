import { createBrowserRouter, RouterProvider } from "react-router-dom";

import MainLayout from "./layout/MainLayout";
import Login from "./pages/Login";
import HeroSection from "./pages/student/HeroSection";
import Courses from "./pages/student/Courses";
import MyLearning from "./pages/student/MyLearning";
import Profile from "./pages/student/Profile";

import Sidebar from "./pages/admin/Sidebar";
import Dashboard from "./pages/admin/Dashboard";
import CourseTable from "./pages/admin/course/CourseTable";
import AddCourse from "./pages/admin/course/AddCourse";
import EditCourse from "./pages/admin/course/EditCourse";
import CreateLecture from "./pages/admin/lecture/CreateLecture";
import Editlecture from "./pages/admin/lecture/Editlecture";
import CourseDetail from "./pages/student/CourseDetail";
import PurchaseSuccess from "./pages/student/PurchaseSuccess";
import CourseLearn from "./pages/CourseLearn";
import SearchPage from "./pages/student/SearchPage";

import {
  AdminRoute,
  AuthenticatedUser,
  ProtectedRoute,
} from "./components/ProtectedRoutes";
import PurchasedCourseProtectedRoute from "./components/PurchaseCourseProtectedRoute";

import { ThemeProvider } from "@/components/theme-provider";

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: (
          <>
            <HeroSection />
            <Courses />
          </>
        ),
      },
      {
        path: "login",
        element: (
          <AuthenticatedUser>
            <Login />
          </AuthenticatedUser>
        ),
      },
      {
        path: "my-learning",
        element: (
          <ProtectedRoute>
            <MyLearning />
          </ProtectedRoute>
        ),
      },
      {
        path: "profile",
        element: (
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        ),
      },
      {
        path: "course/search",
        element: (
          <ProtectedRoute>
            <SearchPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "course-detail/:id",
        element: (
          <ProtectedRoute>
            <CourseDetail />
          </ProtectedRoute>
        ),
      },
      {
        path: "course-purchase/success",
        element: (
          <ProtectedRoute>
            <PurchasedCourseProtectedRoute>
              <PurchaseSuccess />
            </PurchasedCourseProtectedRoute>
          </ProtectedRoute>
        ),
      },
      {
        path: "student/courses/:courseId/learn",
        element: (
          <ProtectedRoute>
            <PurchasedCourseProtectedRoute>
              <CourseLearn />
            </PurchasedCourseProtectedRoute>
          </ProtectedRoute>
        ),
      },
      {
        path: "admin",
        element: (
          <AdminRoute>
            <Sidebar />
          </AdminRoute>
        ),
        children: [
          {
            path: "dashboard",
            element: <Dashboard />,
          },
          {
            path: "courses",
            children: [
              { index: true, element: <CourseTable /> },
              { path: "create", element: <AddCourse /> },
              { path: "edit/:id", element: <EditCourse /> },
              { path: "lectures/:id", element: <CreateLecture /> },
              { path: "lectures/edit/:courseId/:lectureId", element: <Editlecture /> },
              { path: "lectures/:courseId/:lectureId", element: <Editlecture /> },
            ],
          },
        ],
      },
    ],
  },
]);

function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <RouterProvider router={appRouter} />
    </ThemeProvider>
  );
}

export default App;
