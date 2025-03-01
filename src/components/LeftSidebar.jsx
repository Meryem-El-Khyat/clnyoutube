import { Home, Bookmark, Clock, ThumbsUp, History, PlaySquare, Film, Flame, Music, Gamepad2, Newspaper, Lightbulb } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import Avatar from "react-avatar";

export default function LeftSidebar() {
  const dispatch = useDispatch();
  const { playlists, selectedPlaylistId } = useSelector((state) => state.playlists);
  const searchQuery = useSelector((state) => state.search.query);

  // Filter playlists based on search query
  const filteredPlaylists = playlists.filter((playlist) =>
    playlist.titre.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handlePlaylistSelect = (playlistId) => {
    dispatch({ type: 'playlists/selectPlaylist', payload: playlistId });

    // Select first video of the playlist
    const selectedPlaylist = playlists.find((p) => p.idPlaylist === playlistId);
    if (selectedPlaylist && selectedPlaylist.videos.length > 0) {
      dispatch({ type: 'videos/selectVideo', payload: selectedPlaylist.videos[0].id });
    }
  };


  return (
    <div className="w-64 bg-white dark:bg-gray-800 border-r dark:border-gray-700 hidden md:block overflow-y-auto">
      <div className="p-4">

        <div>
          <h3 className="text-xs font-semibold uppercase text-gray-500 dark:text-gray-400 mb-3 px-2">My Playlists</h3>
          <ul className="space-y-1">
            {filteredPlaylists.map((playlist) => (
              <li key={playlist.idPlaylist}>
                <button
                  onClick={() => handlePlaylistSelect(playlist.idPlaylist)}
                  className={`w-full flex items-center p-2 rounded-lg transition-all ${
                    selectedPlaylistId === playlist.idPlaylist
                      ? "bg-primary/10 text-primary font-medium"
                      : "hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white"
                  }`}
                >
                  <div className="w-8 h-8 rounded-md overflow-hidden mr-3 flex-shrink-0 bg-gray-200 dark:bg-gray-700">
                    <Avatar
                      name={playlist.titre}
                      size="32"
                      textSizeRatio={2}
                      colors={['#FF5733', '#33FF57', '#3357FF', '#F033FF', '#FF33A8']}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="truncate">{playlist.titre}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{playlist.videos.length} videos</p>
                  </div>
                </button>
              </li>
            ))}

            {filteredPlaylists.length === 0 && (
              <div className="text-center py-4 text-gray-500 dark:text-gray-400">No playlists found</div>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}