import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axios from "axios";
import { Switch } from "@/components/ui/switch";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { useParams } from "react-router-dom";
import { Progress } from "@/components/ui/progress";
import {
  useEditLectureMutation,
  useRemoveLectureMutation,
  useGetLectureByIdQuery,
} from "@/features/api/courseApi";
import { Loader2 } from "lucide-react";

const MEDIA_API = "http://localhost:8080/api/v1/media";

const LectureTab = () => {
  const { courseId, lectureId } = useParams();

  const { data: lectureData, isLoading: lectureLoading } =
    useGetLectureByIdQuery(lectureId, {
      skip: !lectureId,
      refetchOnFocus: false,
      refetchOnReconnect: false,
    });

  const [lectureTitle, setLectureTitle] = useState("");
  const [uploadVideoInfo, setUploadVideoInfo] = useState(null);
  const [isFree, setIsFree] = useState(false);
  const [mediaProgress, setMediaProgress] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isInitialized, setIsInitialized] = useState(false);

  const [editLecture, { data, error, isSuccess, isLoading }] =
    useEditLectureMutation();

  const [
    removeLecture,
    { data: removeData, isSuccess: removeSuccess, isLoading: removeLoading },
  ] = useRemoveLectureMutation();

  // ======================
  // VIDEO UPLOAD HANDLER
  // ======================
  const fileChangeHandler = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    setMediaProgress(true);

    try {
      const res = await axios.post(`${MEDIA_API}/upload-video`, formData, {
        onUploadProgress: ({ loaded, total }) => {
          setUploadProgress(Math.round((loaded * 100) / total));
        },
      });

      if (res.data.success) {
        setUploadVideoInfo({
          videoUrl: res.data.data.secure_url, // ✅ FIXED
          publicId: res.data.data.public_id,
        });
        setIsFree(true);
        toast.success(res.data.message);
      }
    } catch (err) {
      toast.error("Video upload failed");
    } finally {
      setMediaProgress(false);
    }
  };

  // ======================
  // UPDATE LECTURE
  // ======================
  const editLectureHandler = async () => {
    await editLecture({
      lectureTitle,
      videoInfo: uploadVideoInfo,
      isPreviewFree: isFree,
      courseId,
      lectureId,
    });
  };

  // ======================
  // REMOVE LECTURE
  // ======================
  const removeLectureHandler = async () => {
    await removeLecture(lectureId);
  };

  // ======================
  // TOAST HANDLERS
  // ======================
  useEffect(() => {
    if (isSuccess) toast.success(data.message);
    if (error) toast.error(error.data?.message || "Update failed");
  }, [isSuccess, error, data]);

  useEffect(() => {
    if (removeSuccess) toast.success(removeData.message);
  }, [removeSuccess, removeData]);

  // ======================
  // AUTO-FILL EXISTING DATA
  // ======================
  useEffect(() => {
    if (!lectureData?.lecture || isInitialized) return;

    const lecture = lectureData.lecture;

    setLectureTitle(lecture.lectureTitle || "");
    setIsFree(Boolean(lecture.isPreviewFree));

    if (lecture.videoUrl && lecture.publicId) {
      setUploadVideoInfo({
        videoUrl: lecture.videoUrl,
        publicId: lecture.publicId,
      });
    }

    setIsInitialized(true);
  }, [lectureData, isInitialized]);

  // ======================
  // UI
  // ======================
  return (
    <Card className="w-full max-w-xl">
      <CardHeader className="space-y-4">
        <div>
          <CardTitle>Edit Lecture</CardTitle>
          <CardDescription>
            Make changes and click save when done.
          </CardDescription>
        </div>

        <Button
          disabled={removeLoading}
          variant="destructive"
          className="w-fit -mt-2"
          onClick={removeLectureHandler}
        >
          {removeLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Please wait
            </>
          ) : (
            "Remove Lecture"
          )}
        </Button>
      </CardHeader>

      <CardContent className="space-y-4">
        <div>
          <Label>Title</Label>
          <Input
            value={lectureTitle}
            onChange={(e) => setLectureTitle(e.target.value)}
            placeholder="Introduction to React"
          />
        </div>

        <div>
          <Label>Video</Label>
          <Input type="file" accept="video/*" onChange={fileChangeHandler} />
        </div>

        <div className="flex items-center space-x-2">
          <Switch
            checked={isFree}
            onCheckedChange={setIsFree}
            disabled={!uploadVideoInfo}
          />
          <Label>Is this video FREE</Label>
        </div>

        {mediaProgress && (
          <div>
            <Progress value={uploadProgress} />
            <p>{uploadProgress}% uploaded</p>
          </div>
        )}

        <Button
          disabled={lectureLoading || isLoading}
          onClick={editLectureHandler}
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Please wait
            </>
          ) : (
            "Update Lecture"
          )}
        </Button>
      </CardContent>
    </Card>
  );
};

export default LectureTab;
