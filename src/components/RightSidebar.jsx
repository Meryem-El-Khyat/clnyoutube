import { useSelector, useDispatch } from "react-redux";
import { Clock, Eye, Calendar } from "lucide-react";
import Avatar from "react-avatar";

export default function RightSidebar() {
  const dispatch = useDispatch();
  const { playlists, selectedPlaylistId } = useSelector((state) => state.playlists);
  const selectedVideoId = useSelector((state) => state.videos.selectedVideoId);
  const searchQuery = useSelector((state) => state.search.query);

  // Find selected playlist
  const selectedPlaylist = playlists.find((p) => p.idPlaylist === selectedPlaylistId);

  if (!selectedPlaylist) {
    return (
      <div className="w-full md:w-72 bg-gray-50 dark:bg-gray-800 border-l dark:border-gray-700 p-4">
        <div className="flex flex-col items-center justify-center h-full py-10">
          <div className="w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center mb-4">
            <Clock className="h-8 w-8 text-gray-400 dark:text-gray-500" />
          </div>
          <p className="text-gray-500 dark:text-gray-400 text-center">Select a playlist to view videos</p>
        </div>
      </div>
    );
  }

  // Filter videos based on search query
  const filteredVideos = selectedPlaylist.videos.filter(
    (video) =>
      video.titre.toLowerCase().includes(searchQuery.toLowerCase()) ||
      video.auteur.nom.toLowerCase().includes(searchQuery.toLowerCase()) ||
      video.auteur.prenom.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="w-full md:w-72 bg-gray-50 dark:bg-gray-800 border-l dark:border-gray-700 overflow-y-auto">
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold dark:text-white">{selectedPlaylist.titre}</h2>
          <span className="text-sm bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded-full text-gray-700 dark:text-gray-300">
            {filteredVideos.length} videos
          </span>
        </div>

        <div className="space-y-3">
          {filteredVideos.map((video) => (
            <button
              key={video.id}
              onClick={() => dispatch({ type: 'videos/selectVideo', payload: video.id })}
              className={`w-full flex flex-col p-2 rounded-md transition-all ${
                selectedVideoId === video.id
                  ? "bg-primary/10 border border-primary shadow-sm"
                  : "hover:bg-gray-200 dark:hover:bg-gray-700 border border-transparent"
              }`}
            >
              <div className="relative w-full aspect-video mb-2 bg-gray-200 dark:bg-gray-700 rounded-md overflow-hidden group">
                <Avatar
                  name={video.titre}
                  size="100%"
                  textSizeRatio={2}
                  colors={['#FF5733', '#33FF57', '#3357FF', '#F033FF', '#FF33A8']}
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                  <Eye className="h-8 w-8 text-white" />
                </div>
                <div className="absolute bottom-1 right-1 bg-black/70 text-white text-xs px-1.5 py-0.5 rounded">
                  {video.duree}
                </div>
              </div>

              <div className="flex">
                <div className="w-8 h-8 rounded-full overflow-hidden mr-2 flex-shrink-0">
                  <Avatar
                    name={`${video.auteur.prenom} ${video.auteur.nom}`}
                    size="32"
                    round={true}
                    colors={['#FF5733', '#33FF57', '#3357FF', '#F033FF', '#FF33A8']}
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <h3 className={`text-sm font-medium truncate ${selectedVideoId === video.id ? 'text-primary' : 'dark:text-white'}`}>
                    {video.titre}
                  </h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                    {video.auteur.prenom} {video.auteur.nom}
                  </p>
                  <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 mt-1">
                    <Clock className="h-3 w-3 mr-1" />
                    <span>{video.duree}</span>
                    <span className="mx-1">•</span>
                    <Calendar className="h-3 w-3 mr-1" />
                    <span>2 days ago</span>
                  </div>
                </div>
              </div>
            </button>
          ))}

          {filteredVideos.length === 0 && (
            <div className="text-center py-8 px-4">
              <div className="w-16 h-16 mx-auto bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center mb-4">
                <Eye className="h-8 w-8 text-gray-400 dark:text-gray-500" />
              </div>
              <p className="text-gray-500 dark:text-gray-400">No videos found matching "{searchQuery}"</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}