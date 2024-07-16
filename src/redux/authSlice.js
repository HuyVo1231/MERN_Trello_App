import { createSlice } from '@reduxjs/toolkit'
import { loginUserAPI } from '~/apis'

const initialState = {
  isLoggedIn: localStorage.getItem('isLoggedIn') === 'true',
  userData: {}, // Thêm userData nếu cần thiết
  loading: false,
  error: null,
  avatar:
    localStorage.getItem('avatar') ||
    'https://scontent.fvkg1-1.fna.fbcdn.net/v/t39.30808-6/313434867_3560997537465652_8620770415622417047_n.jpg?stp=cp6_dst-jpg&_nc_cat=103&ccb=1-7&_nc_sid=833d8c&_nc_ohc=9xcoMM9vKIcQ7kNvgGj3EDa&_nc_ht=scontent.fvkg1-1.fna&oh=00_AYDpY1coO5JcCVoTEYjd7XMw4jv4jrt-EOpA8ezkuv12qQ&oe=6697D6A4' // Avatar mặc định
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginStart(state) {
      state.loading = true
      state.error = null
    },
    loginSuccess(state, action) {
      state.isLoggedIn = true
      state.loading = false
      state.userData = action.payload
      state.error = null
      state.avatar = action.payload.avatar

      // Lưu thông tin avatar vào localStorage
      localStorage.setItem('avatar', action.payload.avatar)
      localStorage.setItem('isLoggedIn', 'true')
      localStorage.setItem('userId', action.payload.userId)
      // Lưu các dữ liệu cần thiết khác nếu cần
    },
    loginFailure(state, action) {
      state.loading = false
      state.error = action.payload
    },
    logout(state) {
      state.isLoggedIn = false
      state.userData = {}
      state.loading = false
      state.error = null
      localStorage.removeItem('isLoggedIn')
      localStorage.removeItem('avatar')
      localStorage.removeItem('userId')
    }
  }
})

export const { loginStart, loginSuccess, loginFailure, logout } = authSlice.actions

export const loginUser = (username, password) => async (dispatch) => {
  dispatch(loginStart())
  try {
    const result = await loginUserAPI(username, password)
    if (result.success) {
      dispatch(loginSuccess(result.data))
    } else {
      dispatch(loginFailure(result.message || 'Login failed.'))
    }
  } catch (error) {
    dispatch(loginFailure('An error occurred. Please try again.'))
    console.error('Login error:', error)
  }
}

export default authSlice.reducer
