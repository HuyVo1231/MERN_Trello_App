import React from 'react'
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  CardActions,
  CircularProgress
} from '@mui/material'
import { generateRandomColor } from '~/utils/formatters'
import { useNavigate } from 'react-router-dom'

const MainContent = ({ boards, loading }) => {
  const navigate = useNavigate()

  const handleClick = (boardId) => {
    navigate(`/boards/${boardId}`)
  }

  return (
    <Box
      sx={{
        width: '100%',
        padding: '24px 12px',
        height: '100vh',
        overflowY: 'auto'
      }}>
      <Typography variant='h5' sx={{ fontWeight: '700' }} gutterBottom>
        Your boards:
      </Typography>
      {loading ? (
        <Box
          sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
          <CircularProgress />
        </Box>
      ) : (
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '16px'
          }}>
          {boards && boards.length > 0 ? (
            boards.map((board) => (
              <Card key={board._id} sx={{ width: '23%', maxHeight: '200px' }}>
                <Box
                  sx={{
                    height: '70px',
                    backgroundColor: generateRandomColor(),
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    overflow: 'hidden'
                  }}></Box>
                <CardContent sx={{ padding: '4px 12px' }}>
                  <Typography
                    gutterBottom
                    variant='h6'
                    component='div'
                    sx={{
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis'
                    }}>
                    {board.title}
                  </Typography>
                  <Typography
                    variant='body2'
                    color='text.secondary'
                    sx={{
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      maxHeight: '20px'
                    }}>
                    {board.description}
                  </Typography>
                </CardContent>
                <CardActions sx={{ justifyContent: 'flex-end' }}>
                  <Button size='medium' onClick={() => handleClick(board._id)}>
                    View board
                  </Button>
                </CardActions>
              </Card>
            ))
          ) : (
            <Typography variant='body1'>No boards found.</Typography>
          )}
        </Box>
      )}
    </Box>
  )
}

export default MainContent
