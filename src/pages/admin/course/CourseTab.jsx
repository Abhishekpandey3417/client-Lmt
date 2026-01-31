import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import RichTextEditor from "@/components/RichTextEditor";
import { toast } from "sonner";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useParams, useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import {
  useEditCourseMutation,
  useTogglePublishCourseMutation,
  useGetCourseByIdQuery,
  useGetCourseLectureQuery,
} from "@/features/api/courseApi";

const CourseTab = () => {
  const navigate = useNavigate();
  const { id: courseId } = useParams();

  const [input, setInput] = useState({
    courseTitle: "",
    subTitle: "",
    description: "",
    category: "",
    courseLevel: "",
    coursePrice: "",
    courseThumbnail: "",
  });

  const [previewThumbnail, setPreviewThumbnail] = useState("");

  // 🔹 Fetch course
  const { data: courseData, refetch } = useGetCourseByIdQuery(courseId, {
    skip: !courseId,
  });

  // 🔹 Fetch lectures (for publish validation)
  const { data: lectureData } = useGetCourseLectureQuery(courseId, {
    skip: !courseId,
  });

  const hasLectures =
    lectureData?.lectures && lectureData.lectures.length > 0;

  // 🔹 Mutations
  const [editCourse, { isLoading, isSuccess, error, data }] =
    useEditCourseMutation();

  const [togglePublishCourse, { isLoading: publishLoading }] =
    useTogglePublishCourseMutation();

  // 🔹 Populate form
  useEffect(() => {
    if (courseData?.course) {
      const course = courseData.course;

      setInput({
        courseTitle: course.courseTitle || "",
        subTitle: course.subTitle || "",
        description: course.description || "",
        category: course.category || "",
        courseLevel: course.courseLevel || "",
        coursePrice: course.coursePrice || "",
        courseThumbnail: "",
      });

      setPreviewThumbnail(course.courseThumbnail || "");
    }
  }, [courseData]);

  // 🔹 Handlers
  const changeEventHandler = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({ ...prev, [name]: value }));
  };

  const selectCategory = (value) => {
    setInput((prev) => ({ ...prev, category: value }));
  };

  const selectCourseLevel = (value) => {
    setInput((prev) => ({ ...prev, courseLevel: value }));
  };

  const selectThumbnail = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setInput((prev) => ({ ...prev, courseThumbnail: file }));

    const reader = new FileReader();
    reader.onloadend = () => setPreviewThumbnail(reader.result);
    reader.readAsDataURL(file);
  };

  const updateCourseHandler = async () => {
    await editCourse({
      courseId,
      courseData: input,
    });
  };

  const publishStatusHandler = async () => {
    try {
      const publish = !courseData?.course?.isPublished;

      const res = await togglePublishCourse({
        courseId,
        publish,
      }).unwrap();

      toast.success(res?.message || "Status updated");
      refetch();
    } catch (err) {
      toast.error(err?.data?.message || "Failed to update publish status");
    }
  };

  // 🔹 Toast feedback
  useEffect(() => {
    if (isSuccess) {
      toast.success(data?.message || "Course updated successfully");
      navigate("/admin/courses");
    }

    if (error) {
      toast.error(error?.data?.message || "Failed to update course");
    }
  }, [isSuccess, error, data, navigate]);

  return (
    <Card>
      <CardHeader className="flex flex-row justify-between items-center">
        <div>
          <CardTitle>Basic Course Information</CardTitle>
          <CardDescription>
            Make changes to your course and save when done.
          </CardDescription>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            disabled={publishLoading || !hasLectures}
            onClick={publishStatusHandler}
          >
            {courseData?.course?.isPublished ? "Unpublish" : "Publish"}
          </Button>

          <Button variant="destructive">Remove Course</Button>
        </div>
      </CardHeader>

      <CardContent>
        <div className="space-y-4 mt-5">
          <div>
            <Label>Title</Label>
            <Input
              name="courseTitle"
              value={input.courseTitle}
              onChange={changeEventHandler}
            />
          </div>

          <div>
            <Label>Subtitle</Label>
            <Input
              name="subTitle"
              value={input.subTitle}
              onChange={changeEventHandler}
            />
          </div>

          <div>
            <Label>Description</Label>
            <RichTextEditor input={input} setInput={setInput} />
          </div>

          <div className="flex gap-5">
            <div>
              <Label>Category</Label>
              <Select onValueChange={selectCategory}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="React">React</SelectItem>
                    <SelectItem value="Astrology">Astrology</SelectItem>
                    <SelectItem value="Backend Course">Backend Course</SelectItem>
                    <SelectItem value="Frontend Course">Frontend Course</SelectItem>
                    <SelectItem value="Node JS">Node JS</SelectItem>
                    <SelectItem value="Next JS">Next JS</SelectItem>
                    <SelectItem value="Mongo DB">Mongo DB</SelectItem>
                    <SelectItem value="Python">Python</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Course Level</Label>
              <Select onValueChange={selectCourseLevel}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="Beginner">Beginner</SelectItem>
                    <SelectItem value="Intermediate">Intermediate</SelectItem>
                    <SelectItem value="Advanced">Advanced</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Price (INR)</Label>
              <Input
                type="number"
                name="coursePrice"
                value={input.coursePrice}
                onChange={changeEventHandler}
              />
            </div>
          </div>

          <div>
            <Label>Course Thumbnail</Label>
            <Input type="file" accept="image/*" onChange={selectThumbnail} />
            {previewThumbnail && (
              <img
                src={previewThumbnail}
                className="mt-3 max-h-64 rounded-md border"
              />
            )}
          </div>

          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => navigate("/admin/courses")}
            >
              Cancel
            </Button>

            <Button disabled={isLoading} onClick={updateCourseHandler}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Please wait
                </>
              ) : (
                "Save"
              )}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CourseTab;
