import { configureStore, createSlice } from "@reduxjs/toolkit";

const gameListSlice = createSlice({
  name: "gameList",
  initialState: {list: [] },
  reducers: {
    addGames: (state, action) => {
      state.value = action.payload
    }
  }
})

export const { addGames } = gameListSlice.actions

export const store = configureStore({
  reducer: {
    gameList: gameListSlice.reducer
  }
})

console.log("==store", store.getState())