/*import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { AvatarImage, Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";

const Course = ({ course }) => {
  return (
    <Link to={`/course-detail/${course._id}`}>
      <Card className="overflow-hidden rounded-lg bg-white dark:bg-gray-800 shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
        
        <div className="relative">
          <img
            src={
              course.courseThumbnail ||
              "https://placehold.co/600x400?text=Course"
            }
            alt={course.courseTitle}
            className="w-full h-36 object-cover rounded-t-lg"
          />
        </div>

        <CardContent className="px-5 py-4 space-y-3">
        
          <h1 className="font-bold text-lg truncate hover:underline">
            {course.courseTitle}
          </h1>

        
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Avatar className="w-8 h-8">
                <AvatarImage
                  src={course.creator?.photoUrl || "https://github.com/shadcn.png"}
                />
                <AvatarFallback>
                  {course.creator?.name?.charAt(0) || "U"}
                </AvatarFallback>
              </Avatar>

              <span className="text-sm font-medium">
                {course.creator?.name || "Unknown Instructor"}
              </span>
            </div>

          
            <Badge className="bg-blue-500 text-white text-xs capitalize">
              {course.level || "Beginner"}
            </Badge>
          </div>

          
          <div className="text-lg font-bold">
            ₹{course.coursePrice ?? "Free"}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default Course;*/

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { AvatarImage, Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";

const Course = ({ course }) => {
  console.log(course.creator);

  return (
    <Link to={`/course-detail/${course._id}`}>
      <Card className="overflow-hidden rounded-lg bg-white dark:bg-gray-800 shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
        <div className="relative">
          <img
            src={
              course.courseThumbnail ||
              "https://placehold.co/600x400?text=Course"
            }
            alt={course.courseTitle}
            className="w-full h-36 object-cover rounded-t-lg"
          />
        </div>

        <CardContent className="px-5 py-4 space-y-3">
          <h1 className="font-bold text-lg truncate hover:underline">
            {course.courseTitle}
          </h1>

          {/* Creator + Level */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Avatar className="w-8 h-8">
                <AvatarImage
                  src={
                    course.creator?.photoUrl || "https://github.com/shadcn.png"
                  }
                />
                <AvatarFallback>
                  {course.creator?.name?.charAt(0) || "U"}
                </AvatarFallback>
              </Avatar>

              <span className="text-sm font-medium">
                {course.creator && course.creator.name
                  ? course.creator.name
                  : "Unknown Instructor"}
              </span>
            </div>

            <Badge className="bg-blue-500 text-white text-xs capitalize">
              {course.courseLevel || "Beginner"}
            </Badge>
          </div>

          <div className="text-lg font-bold">
            ₹{course.coursePrice ?? "Free"}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default Course;
