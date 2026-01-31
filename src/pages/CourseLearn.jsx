import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  useCompleteCourseMutation,
  useGetCourseLearnQuery,
  useIncompleteCourseMutation,
  useUpdateLectureLearnMutation,
} from "@/features/api/courseLearnApi";
import { CheckCircle, CheckCircle2, CirclePlay } from "lucide-react";
import { toast } from "sonner";

const CourseLearn = () => {
  const { courseId } = useParams();

  const { data, isLoading, isError, refetch } =
    useGetCourseLearnQuery(courseId);

  const [updateLectureLearn] = useUpdateLectureLearnMutation();

  const [
    completeCourse,
    { isSuccess: completedSuccess, data: markCompleteData },
  ] = useCompleteCourseMutation();

  const [
    inCompleteCourse,
    { isSuccess: inCompletedSuccess, data: markInCompleteData },
  ] = useIncompleteCourseMutation();

  const [currentLecture, setCurrentLecture] = useState(null);

  useEffect(() => {
    if (completedSuccess) {
      toast.success(markCompleteData?.message || "Course completed");
      refetch();
    }
    if (inCompletedSuccess) {
      toast.success(markInCompleteData?.message || "Course marked incomplete");
      refetch();
    }
  }, [completedSuccess, inCompletedSuccess, refetch]);

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Failed to load course details.</p>;

  const { courseDetails, courseLearn, completed } = data.data;

  const activeLecture = currentLecture || courseDetails.lectures?.[0] || null;

  const activeLectureIndex = courseDetails.lectures.findIndex(
    (lec) => String(lec._id) === String(activeLecture?._id),
  );

  const isLectureViewed = (lectureId) =>
    courseLearn.some(
      (l) => String(l.lectureId) === String(lectureId) && l.viewed === true,
    );

  const handleLectureClick = async (lecture) => {
    setCurrentLecture(lecture);

    // 🔒 Do nothing if already viewed
    if (isLectureViewed(lecture._id)) return;

    try {
      await updateLectureLearn({
        courseId,
        lectureId: lecture._id,
      }).unwrap();

      refetch();
    } catch (error) {
      console.error("Failed to update lecture progress", error);
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-4 mt-20">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">{courseDetails.courseTitle}</h1>

        <Button
          onClick={() =>
            completed ? inCompleteCourse(courseId) : completeCourse(courseId)
          }
          variant={completed ? "outline" : "default"}
        >
          {completed ? (
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4" />
              <span>Completed</span>
            </div>
          ) : (
            "Mark as completed"
          )}
        </Button>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        {/* LEFT */}
        <div className="flex-1 md:w-3/5 rounded-lg shadow-lg p-4">
          {activeLecture && (
            <>
              <video
                src={activeLecture.videoUrl}
                controls
                className="w-full max-h-[360px] object-contain rounded-lg mb-4"
              />

              <h3 className="font-medium text-lg">
                Lecture {activeLectureIndex + 1}: {activeLecture.lectureTitle}
              </h3>
            </>
          )}
        </div>

        {/* RIGHT */}
        <div className="flex flex-col w-full md:w-2/5 border-t md:border-t-0 md:border-l border-gray-200 md:pl-4 pt-4 md:pt-0">
          <h2 className="font-semibold text-xl mb-4">Course Lectures</h2>

          <div className="flex-1 overflow-y-auto">
            {courseDetails.lectures.map((lecture) => {
              const isViewed = isLectureViewed(lecture._id);

              return (
                <Card
                  key={lecture._id}
                  className="mb-4 cursor-pointer hover:bg-gray-50"
                  onClick={() => handleLectureClick(lecture)}
                >
                  <CardContent className="flex items-center justify-between p-4">
                    <div className="flex items-center">
                      {isViewed ? (
                        <CheckCircle2
                          size={22}
                          className="text-green-500 mr-2"
                        />
                      ) : (
                        <CirclePlay size={22} className="text-blue-500 mr-2" />
                      )}

                      <CardTitle className="text-base font-medium">
                        {lecture.lectureTitle}
                      </CardTitle>
                    </div>

                    {isViewed && (
                      <Badge className="bg-green-200 text-green-700">
                        Completed
                      </Badge>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseLearn;
