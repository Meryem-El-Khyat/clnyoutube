import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  playlists: [],
  selectedPlaylistId: null,
}

export const playlistSlice = createSlice({
  name: "playlists",
  initialState,
  reducers: {
    setPlaylists: (state, action) => {
      state.playlists = action.payload
    },
    selectPlaylist: (state, action) => {
      state.selectedPlaylistId = action.payload
    },
  },
})

export const { setPlaylists, selectPlaylist } = playlistSlice.actions

export default playlistSlice.reducer

