import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useGetCreatorCoursesQuery } from "@/features/api/courseApi";
import { Edit } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";

const CourseTable = () => {
  const { data, isLoading } = useGetCreatorCoursesQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

  const navigate = useNavigate();

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className="bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 rounded-lg p-4">
      <Button onClick={() => navigate("/admin/courses/create")}>
        Create a new course
      </Button>

      <Table>
        <TableCaption>A list of your created courses.</TableCaption>

        <TableHeader>
          <TableRow>
            <TableHead className="w-[200px]">Course ID</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {data?.courses?.length > 0 ? (
            data.courses.map((course) => (
              <TableRow key={course._id}>
                <TableCell className="font-medium">{course._id}</TableCell>

                <TableCell>{course.courseTitle}</TableCell>
                <TableCell>{course.category}</TableCell>

                <TableCell>
                  {course.coursePrice !== undefined
                    ? `₹${course.coursePrice}`
                    : "—"}
                </TableCell>
                <TableCell>
                  <Badge
                    className={
                      course.isPublished
                        ? "bg-green-600 text-white hover:bg-green-600"
                        : "bg-gray-400 text-white hover:bg-gray-400"
                    }
                  >
                    {course.isPublished ? "Published" : "Draft"}
                  </Badge>
                </TableCell>

                <TableCell className="text-right">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() =>
                      navigate(`/admin/courses/edit/${course._id}`)
                    }
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={6} className="text-center">
                No courses found
              </TableCell>
            </TableRow>
          )}
        </TableBody>

        <TableFooter>
          <TableRow>
            <TableCell colSpan={5}>Total Courses</TableCell>
            <TableCell className="text-right">
              {data?.courses?.length || 0}
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
};

export default CourseTable;
