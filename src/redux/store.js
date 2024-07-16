import { configureStore } from '@reduxjs/toolkit'
import authReducer from '~/redux/authSlice'
// import boardReducer from '~/redux/boardSlice'

const store = configureStore({
  reducer: {
    auth: authReducer
    // board: boardReducer
  }
})

export default store
