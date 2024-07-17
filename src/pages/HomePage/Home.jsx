import { Box, Pagination } from '@mui/material'
import React, { useState, useEffect } from 'react'
import AppBar from '~/components/AppBar/AppBar'
import Sidebar from './Sidebar'
import MainContent from './MainContent'
import { fetchUserBoardAPI, createNewBoardAPI, deleteBoardByUserIdAPI } from '~/apis'

const Home = () => {
  const [boards, setBoards] = useState([])
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [loading, setLoading] = useState(true)
  const pageSize = 10
  const userId = localStorage.getItem('userId')

  useEffect(() => {
    const fetchBoards = async () => {
      setLoading(true)
      try {
        const data = await fetchUserBoardAPI(userId, page, pageSize)
        setBoards(data || [])
        setTotalPages(10)
      } catch (error) {
        console.error('Error fetching boards:', error)
        setBoards([])
      } finally {
        setLoading(false)
      }
    }

    fetchBoards()
  }, [page, userId])

  const createNewBoard = async (data) => {
    try {
      const createdNewBoard = await createNewBoardAPI(data)
      setBoards((prev) => [...prev, createdNewBoard])
    } catch (error) {
      console.error('Error creating new board:', error)
    }
  }

  const deleteBoard = async (boardId) => {
    try {
      await deleteBoardByUserIdAPI(boardId, userId)
      setBoards((prev) => prev.filter((b) => b._id !== boardId))
    } catch (error) {
      console.error('Error deleting board:', error)
    }
  }

  const handlePageChange = (event, value) => {
    setPage(value)
  }

  return (
    <Box>
      <AppBar />
      <Box
        sx={{
          display: 'flex',
          bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#34495E' : 'white')
        }}>
        <Box sx={{ width: '25%' }}>
          <Sidebar createNewBoard={createNewBoard} />
        </Box>
        <Box sx={{ width: '75%' }}>
          <MainContent boards={boards} loading={loading} deleteBoard={deleteBoard} />
          <Box sx={{ display: 'flex', justifyContent: 'center', padding: '16px' }}>
            <Pagination
              count={totalPages}
              page={page}
              onChange={handlePageChange}
              color='primary'
            />
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default Home
