"use client"
import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import Header from "./Header"
import LeftSidebar from "./LeftSidebar"
import MainContent from "./MainContent"
import RightSidebar from "./RightSidebar"
import { setPlaylists, selectPlaylist } from "../redux/slices/playlistSlice"
import { selectVideo } from "../redux/slices/videoSlice"
import { playlistsData } from "../data/playlists"

export default function AppLayout() {
  const dispatch = useDispatch()
  const isDarkMode = useSelector((state) => state.theme.darkMode)

  useEffect(() => {
    // Initialize playlists from data
    dispatch(setPlaylists(playlistsData))

    // Select first playlist and video by default
    if (playlistsData.length > 0) {
      dispatch(selectPlaylist(playlistsData[0].idPlaylist))

      if (playlistsData[0].videos.length > 0) {
        dispatch(selectVideo(playlistsData[0].videos[0].id))
      }
    }
  }, [dispatch])

  return (
    <div className={`min-h-screen flex flex-col ${isDarkMode ? "dark" : ""}`}>
      <div className="dark:bg-gray-900 dark:text-white min-h-screen transition-colors duration-200">
        <Header />
        <div className="flex flex-col md:flex-row h-[calc(100vh-64px)]">
          <LeftSidebar />
          <MainContent />
          <RightSidebar />
        </div>
      </div>
    </div>
  )
}

