import { configureStore } from "@reduxjs/toolkit"
import themeReducer from "./slices/themeSlice"
import playlistReducer from "./slices/playlistSlice"
import videoReducer from "./slices/videoSlice"
import searchReducer from "./slices/searchSlice"

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    playlists: playlistReducer,
    videos: videoReducer,
    search: searchReducer,
  },
})

