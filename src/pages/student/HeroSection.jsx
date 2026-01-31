import { useState } from "react";
import { Input } from "../../components/ui/input";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const searchHandler = (e) => {
    e.preventDefault();

    if (!searchQuery.trim()) return;

    navigate(`/course/search?query=${encodeURIComponent(searchQuery)}`);
  };

  return (
    <div
      className="
  relative
  bg-gradient-to-r
  from-blue-500 to-indigo-600
  dark:from-blue-900 dark:to-indigo-900
  pt-16 pb-12 px-4 text-center
"
    >
      <div className="max-w-3xl mx-auto">
        <h1 className="text-white text-4xl font-bold mb-4">
          Find the Best Courses for you.
        </h1>

        <p className="text-gray-200 mb-8">
          Discover, learn, and upskill with our wide range of courses.
        </p>

        <form
          onSubmit={searchHandler}
          className="flex items-center bg-white rounded-full shadow-lg overflow-hidden max-w-xl mx-auto mb-6"
        >
          <Input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for courses, topics, or skills"
            className="flex-grow border-none px-6 py-3"
          />

          <Button type="submit" className="px-6 py-3">
            Search
          </Button>
        </form>

        <Button
          onClick={() => navigate(`/course/search?query`)}
          className="bg-white text-blue-600 rounded-full"
        >
          Explore Courses
        </Button>
      </div>
    </div>
  );
};

export default HeroSection;
