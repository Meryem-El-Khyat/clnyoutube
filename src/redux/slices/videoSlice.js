import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  selectedVideoId: null,
}

export const videoSlice = createSlice({
  name: "videos",
  initialState,
  reducers: {
    selectVideo: (state, action) => {
      state.selectedVideoId = action.payload
    },
  },
})

export const { selectVideo } = videoSlice.actions

export default videoSlice.reducer

