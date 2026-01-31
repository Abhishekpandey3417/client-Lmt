import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const SearchResult = ({ course }) => {
  const courseId = course?._id;
  console.log(course.courseThumbnail);


  return (
    <div className="border rounded-lg p-4 flex gap-4 hover:shadow-sm transition">
      <Link to={`/course-detail/${courseId}`} className="flex gap-4 w-full">
        <img
          src={course.courseThumbnail}
          alt="course-thumbnail"
          className="h-24 w-36 object-cover rounded-md"
        />

        <div className="flex-1">
          <h3 className="font-semibold text-lg mb-1 md:text-xl">
            {course.courseTitle}
          </h3>
          <p className="text-sm text-gray-600 mb-2">{course.subTitle}</p>
          <p className="text-sm text-gray-700">
            Instructor:{" "}
            <span className="font-bold">{course.creator?.name}</span>
          </p>
          <Badge className="w-fit mt-2 md:mt-0">{course.courseLevel}</Badge>
        </div>
      </Link>
      <div className="mt-4 md:mt-0 md:text-right w-full md:w-auto">
        <h1 className="font-bold text-lg md:text-xl">₹{course.coursePrice}</h1>
      </div>
    </div>
  );
};

export default SearchResult;
