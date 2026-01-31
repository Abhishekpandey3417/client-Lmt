/*import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import React from "react";
import LectureTab from "./LectureTab";
import { Link, useParams } from "react-router-dom";

const Editlecture = () => {
  const params = useParams();
  const courseId = params.id;
  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <Link to={`/admin/courses/lectures/${courseId}/lecture`}>
            <Button size="icon" variant="outline" className="rounded-full">
              <ArrowLeft size={16} />
            </Button>
          </Link>
          <h1 className="font-bold text-xl">Update Your Lecture.</h1>
        </div>
        
      </div>
      <LectureTab />
    </div>
  );
};

export default Editlecture;*/

import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import LectureTab from "./LectureTab";
import { useParams } from "react-router-dom";

const Editlecture = () => {
  const { id: courseId } = useParams();

  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <Button
            size="icon"
            variant="outline"
            className="rounded-full"
            onClick={() => window.history.back()}
          >
            <ArrowLeft size={16} />
          </Button>
          <h1 className="font-bold text-xl">Update Your Lecture.</h1>
        </div>
      </div>

      <LectureTab />
    </div>
  );
};

export default Editlecture;

