import { Button } from "@/components/ui/button";
import React from "react";
import { Link, useParams } from "react-router-dom";
import CourseTab from "./CourseTab";

const EditCourse = () => {
  const { id } = useParams(); // 👈 THIS WAS MISSING

  return (
    <div className="flex-1">
      <div className="flex items-center justify-between mb-5">
        <h1 className="font-bold text-xl">
          Add detail information regarding course
        </h1>

        <Link to={`/admin/courses/lectures/${id}`}>
          <Button className="hover:text-blue-600" variant="link">
            Go to lectures page
          </Button>
        </Link>
      </div>
      <CourseTab courseId={id} /> {/* 👈 pass id */}
    </div>
  );
};

export default EditCourse;
