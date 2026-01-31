import BuyCourseButton from "@/components/BuyCourseButton";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useGetCourseDetailWithStatusQuery } from "@/features/api/purchaseApi";
import { PlayCircle, Lock, BadgeInfo } from "lucide-react";
import React from "react";
import { useParams, useNavigate } from "react-router-dom";

const CourseDetail = () => {
  const { id: courseId } = useParams();
  const navigate = useNavigate();

  const { data, isLoading, isError } =
    useGetCourseDetailWithStatusQuery(courseId);

  if (isLoading) return <h1>Loading...</h1>;
  if (isError) return <h1>Failed to load course detail</h1>;

  const { course, purchased } = data;

  const firstLecture = course?.lectures?.[0];

  const canPlayVideo =
    !!firstLecture?.videoUrl && (purchased || firstLecture?.isPreviewFree);

  const handleContinueCourse = () => {
    if (purchased) {
      navigate(`/student/courses/${courseId}/learn`);
    }
  };

  return (
    <div className="mt-20 space-y-5">
      {/* HEADER */}
      <div className="bg-[#2D2F31] text-white">
        <div className="max-w-7xl mx-auto py-8 px-4 md:px-8 flex flex-col gap-2">
          <h1 className="font-bold text-2xl md:text-3xl">
            {course?.courseTitle}
          </h1>
          <p className="text-base md:text-lg">Course Sub-title</p>

          <p>
            Created By{" "}
            <span className="text-[#C0C4FC] underline italic">
              {course?.creator?.name}
            </span>
          </p>

          <div className="flex items-center gap-2 text-sm">
            <BadgeInfo size={16} />
            <p>Last updated: {course?.createdAt.split("T")[0]}</p>
          </div>

          <p>Student enrolled: {course?.enrolledStudents.length}</p>
        </div>
      </div>

      {/* CONTENT */}
      <div className="max-w-7xl mx-auto my-5 px-4 md:px-8 flex flex-col lg:flex-row gap-10">
        {/* LEFT */}
        <div className="w-full lg:w-1/2 space-y-5">
          <h1 className="font-bold text-xl md:text-2xl">Description</h1>

          <p
            className="text-sm md:text-lg"
            dangerouslySetInnerHTML={{ __html: course.description }}
          />

          <Card>
            <CardHeader>
              <CardTitle>Course Content</CardTitle>
              <CardDescription>
                {course.lectures.length} lectures
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-3">
              {course.lectures.map((lecture, idx) => (
                <div key={idx} className="flex items-center gap-3 text-sm">
                  <span>
                    {lecture.isPreviewFree || purchased ? (
                      <PlayCircle size={14} />
                    ) : (
                      <Lock size={14} />
                    )}
                  </span>
                  <p>{lecture.lectureTitle}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* RIGHT */}
        <div className="w-full lg:w-1/3 lg:ml-28">
          <Card>
            <CardContent className="p-4 pl-4 flex flex-col">
              {/* VIDEO */}
              <div className="relative w-full h-[220px] sm:h-[260px] md:h-[300px] bg-black rounded overflow-hidden mb-4 flex items-center justify-center">
                {canPlayVideo ? (
                  <video
                    src={firstLecture.videoUrl}
                    controls
                    preload="metadata"
                    playsInline
                    style={{ width: "100%", height: "100%" }}
                    onLoadedMetadata={() =>
                      console.log("video metadata loaded")
                    }
                    onError={(e) => console.error("video playback error", e)}
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center text-white text-center px-4">
                    <Lock size={32} className="mb-2" />
                    <p className="text-sm">
                      Purchase this course to unlock the video
                    </p>
                  </div>
                )}
              </div>

              <h1 className="font-semibold">
                {firstLecture?.lectureTitle || "Preview Lecture"}
              </h1>

              <Separator className="my-2" />

              <h1 className="text-lg md:text-xl font-semibold">
                {course.coursePrice ? `₹${course.coursePrice}` : "Free"}
              </h1>
            </CardContent>

            <CardFooter className="flex justify-center p-4 pl-16">
              {purchased ? (
                <Button
                  onClick={handleContinueCourse}
                  className="w-full -ml-13"
                >
                  Continue Course
                </Button>
              ) : (
                <BuyCourseButton courseId={courseId} />
              )}
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;
