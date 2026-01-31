import { useState } from "react";
import Filter from "./Filter";
import { AlertCircle } from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import SearchResult from "./SearchResult";
import { useGetSearchCourseQuery } from "@/features/api/courseApi";

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query") || "";

  const [selectedCategories, setSelectedCategories] = useState([]);
  const [sortByPrice, setSortByPrice] = useState("");

  const { data, isLoading } = useGetSearchCourseQuery({
    searchQuery: query,
    categories: selectedCategories,
    sortByPrice,
  });

  const courses = data?.courses || [];
  const isEmpty = !isLoading && courses.length === 0;

  const handleFilterChange = (categories, price) => {
    setSelectedCategories(categories);
    setSortByPrice(price);
  };
  console.log("Selected categories:", selectedCategories);
  console.log("Sort price:", sortByPrice);

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-8">
      <div className="my-6">
        <h1 className="text-2xl font-semibold">Results for "{query}"</h1>
        <p>
          Showing {courses.length} result{courses.length !== 1 && "s"}
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-10">
        <Filter onChange={handleFilterChange} />

        <div className="flex-1 space-y-6">
          {isLoading ? (
            Array.from({ length: 3 }).map((_, idx) => (
              <CourseCardSkeleton key={idx} />
            ))
          ) : isEmpty ? (
            <CourseNotFound />
          ) : (
            courses.map((course) => (
              <SearchResult key={course._id} course={course} />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchPage;

/* =======================
   COURSE CARD SKELETON
   ======================= */

const CourseCardSkeleton = () => {
  return (
    <div className="border rounded-lg p-4 flex gap-4">
      <Skeleton className="h-24 w-36 rounded-md" />

      <div className="flex-1 space-y-3">
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-4 w-1/2" />

        <div className="flex gap-3">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-4 w-16" />
        </div>
      </div>
    </div>
  );
};

/* =======================
   COURSE NOT FOUND
   ======================= */

const CourseNotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh]">
      <AlertCircle className="text-red-500 h-16 w-16 mb-4" />
      <h1 className="font-bold text-2xl md:text-4xl text-gray-800">
        Course Not Found
      </h1>
      <p className="text-lg text-gray-600 mb-2 text-center">
        Sorry, we couldn't find the course you're looking for.
      </p>
      <Link to="/">
        <Button variant="link">Browse All Courses</Button>
      </Link>
    </div>
  );
};
