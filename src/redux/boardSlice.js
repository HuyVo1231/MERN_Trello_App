import { createSlice } from '@reduxjs/toolkit'
import { createNewBoardAPI } from '~/apis'

const initialState = {
  boards: JSON.parse(localStorage.getItem('boards')) || [],
  loading: false,
  error: null
}

const boardsSlice = createSlice({
  name: 'boards',
  initialState,
  reducers: {
    fetchBoardsSuccess(state, action) {
      state.boards = action.payload
      localStorage.setItem('boards', JSON.stringify(state.boards))
    },
    addBoardStart(state) {
      state.loading = true
      state.error = null
    },
    addBoardSuccess(state, action) {
      state.boards.push(action.payload)
      state.loading = false
      state.error = null
      localStorage.setItem('boards', JSON.stringify(state.boards))
    },
    addBoardFailure(state, action) {
      state.loading = false
      state.error = action.payload
    }
  }
})

export const { fetchBoardsSuccess, addBoardStart, addBoardSuccess, addBoardFailure } =
  boardsSlice.actions

export const addNewBoard = (boardData) => async (dispatch) => {
  dispatch(addBoardStart())
  try {
    const result = await createNewBoardAPI(boardData)
    if (result.success) {
      dispatch(addBoardSuccess(result.data))
    } else {
      dispatch(addBoardFailure(result.message || 'Add board failed.'))
    }
  } catch (error) {
    dispatch(addBoardFailure('An error occurred. Please try again.'))
    console.error('Add board error:', error)
  }
}

export default boardsSlice.reducer
