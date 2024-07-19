import React, { useState, useEffect } from 'react'
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  CardActions,
  CircularProgress,
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Divider
} from '@mui/material'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import ContentCut from '@mui/icons-material/ContentCut'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import { generateRandomColor } from '~/utils/formatters'
import { useNavigate } from 'react-router-dom'
import { useConfirm } from 'material-ui-confirm'

const MainContent = ({ boards, loading, deleteBoard }) => {
  const confirmDeleteBoard = useConfirm()
  const navigate = useNavigate()
  const [anchorEl, setAnchorEl] = useState(null)
  const [selectedBoardId, setSelectedBoardId] = useState(null)
  const [boardColors, setBoardColors] = useState({})

  const open = Boolean(anchorEl)

  useEffect(() => {
    const colors = {}
    boards.forEach((board) => {
      colors[board._id] = generateRandomColor()
    })
    setBoardColors(colors)
  }, [boards])

  const handleMenuOpen = (event, boardId) => {
    setAnchorEl(event.currentTarget)
    setSelectedBoardId(boardId)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
    setSelectedBoardId(null)
  }

  const handleClick = (boardId) => {
    navigate(`/boards/${boardId}`)
  }

  const handleDeleteClick = () => {
    confirmDeleteBoard({
      description: 'This action will permanently delete your Board and its Columns! Are you sure?',
      title: 'Delete Board?',
      confirmationText: 'Confirm',
      cancellationText: 'Cancel',
      allowClose: false,
      buttonOrder: ['confirm', 'cancel']
    })
      .then(() => {
        deleteBoard(selectedBoardId)
        handleMenuClose()
      })
      .catch(() => {})
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
                    backgroundColor: boardColors[board._id],
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
                <CardActions sx={{ justifyContent: 'space-between' }}>
                  <Button size='medium' onClick={() => handleClick(board._id)}>
                    View board
                  </Button>
                  <IconButton onClick={(event) => handleMenuOpen(event, board._id)}>
                    <MoreVertIcon />
                  </IconButton>
                  <Menu
                    id='basic-menu-column-dropdown'
                    anchorEl={anchorEl}
                    open={open && selectedBoardId === board._id}
                    onClose={handleMenuClose}
                    MenuListProps={{
                      'aria-labelledby': 'basic-column-dropdown'
                    }}>
                    <MenuItem>
                      <ListItemIcon>
                        <ContentCut fontSize='small' />
                      </ListItemIcon>
                      <ListItemText>Cut</ListItemText>
                    </MenuItem>
                    <MenuItem>
                      <ListItemIcon>
                        <ContentCut fontSize='small' />
                      </ListItemIcon>
                      <ListItemText>Copy</ListItemText>
                    </MenuItem>
                    <MenuItem>
                      <ListItemIcon>
                        <ContentCut fontSize='small' />
                      </ListItemIcon>
                      <ListItemText>Paste</ListItemText>
                    </MenuItem>
                    <Divider />
                    <MenuItem
                      onClick={handleDeleteClick}
                      sx={{
                        '&:hover': {
                          color: 'warning.dark',
                          '& .delete-forever-icon': {
                            color: 'warning.dark'
                          }
                        }
                      }}>
                      <ListItemIcon className='delete-forever-icon'>
                        <DeleteForeverIcon fontSize='small' />
                      </ListItemIcon>
                      <ListItemText>Delete this board</ListItemText>
                    </MenuItem>
                  </Menu>
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
