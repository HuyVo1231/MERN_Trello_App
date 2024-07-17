import axios from 'axios'
import { API_ROOT } from '~/utils/constants'

// fetchUserBoard
export const fetchUserBoardAPI = async (userId, page, pageSize) => {
  const response = await axios.get(`${API_ROOT}/v1/boards/getBoardsByUserId/${userId}`, {
    params: { page, pageSize }
  })
  return response.data
}

// Board
export const fetchBoardDetailsAPI = async (boardId) => {
  const response = await axios.get(`${API_ROOT}/v1/boards/${boardId}`)
  return response.data
}
export const deleteBoardByUserIdAPI = async (boardId, boardOwner) => {
  const response = await axios.delete(`${API_ROOT}/v1/boards/deleteBoardsByUserId/`, {
    data: {
      idBoard: boardId,
      boardOwner: boardOwner
    }
  })
}

export const createNewBoardAPI = async (newBoard) => {
  const response = await axios.post(`${API_ROOT}/v1/boards/`, newBoard)
  return response.data
}

export const updateBoardDetailsAPI = async (boardId, updateData) => {
  const response = await axios.put(`${API_ROOT}/v1/boards/${boardId}`, updateData)
  return response.data
}

export const moveCardToDifferentColumnAPI = async (updateData) => {
  const response = await axios.put(`${API_ROOT}/v1/boards/supports/moving_card`, updateData)
  return response.data
}

// Column
export const createNewColumnAPI = async (newColumnData) => {
  const response = await axios.post(`${API_ROOT}/v1/columns`, newColumnData)
  return response.data
}

export const updateColumnDetailsAPI = async (columnId, updateData) => {
  const response = await axios.put(`${API_ROOT}/v1/columns/${columnId}`, updateData)
  return response.data
}

export const deleteColumnDetailsAPI = async (columnId) => {
  const response = await axios.delete(`${API_ROOT}/v1/columns/${columnId}`)
  return response.data
}

// Card
export const createNewCardAPI = async (newCordData) => {
  const response = await axios.post(`${API_ROOT}/v1/cards`, newCordData)
  return response.data
}

// Login
export const loginUserAPI = async (username, password) => {
  const response = await axios.post(`${API_ROOT}/v1/user/login`, {
    username,
    password
  })
  return response.data
}

// Create user
export const registerUserAPI = async (userData) => {
  try {
    const response = await axios.post(`${API_ROOT}/v1/user/register`, userData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    return response.data
  } catch (error) {
    throw new Error(error.response.data.message || 'Registration failed. Please try again.')
  }
}
