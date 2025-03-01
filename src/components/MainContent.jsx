import { useSelector } from "react-redux";
import VideoPlayer from "./VideoPlayer";
import VideoDetails from "./VideoDetails";
import CommentSection from "./CommentSection";
import { Film, Loader } from "lucide-react";

export default function MainContent() {
  const { playlists, selectedPlaylistId } = useSelector((state) => state.playlists);
  const selectedVideoId = useSelector((state) => state.videos.selectedVideoId);

  // Find selected playlist and video
  const selectedPlaylist = playlists.find((p) => p.idPlaylist === selectedPlaylistId);
  const selectedVideo = selectedPlaylist?.videos.find((v) => v.id === selectedVideoId);

  if (!selectedVideo) {
    return (
      <div className="flex-1 p-4 flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center py-12 px-4 max-w-md">
          <div className="w-20 h-20 mx-auto bg-gray-200 dark:bg-gray-800 rounded-full flex items-center justify-center mb-6">
            <Film className="h-10 w-10 text-gray-400 dark:text-gray-500" />
          </div>
          <h2 className="text-xl font-semibold mb-2 dark:text-white">No video selected</h2>
          <p className="text-gray-500 dark:text-gray-400 mb-6">
            Select a video from the sidebar to start watching content from your favorite creators.
          </p>
          <div className="animate-pulse flex justify-center">
            <Loader className="h-5 w-5 text-primary animate-spin" />
            <span className="ml-2 text-gray-600 dark:text-gray-300">Waiting for selection...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto bg-white dark:bg-gray-900">
      <div className="max-w-4xl mx-auto p-4">
        <VideoPlayer video={selectedVideo} />
        <VideoDetails video={selectedVideo} />
        <CommentSection comments={selectedVideo.commentaires} />
      </div>
    </div>
  );
}