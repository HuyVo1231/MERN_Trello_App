import React, { useState } from 'react'
import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import AddCardIcon from '@mui/icons-material/AddCard'
import SidebarList from './Sidebar/SidebarList'
import CreateBoardDialog from './Sidebar/CreateBoardDialog'

const Sidebar = ({ createNewBoard }) => {
  const [open, setOpen] = useState(false)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        height: 'auto',
        flexDirection: 'column',
        padding: '16px'
      }}>
      <SidebarList />
      <Divider />
      <ListItemButton
        onClick={handleClickOpen}
        sx={{
          width: '100%',
          '&.Mui-selected': {
            backgroundColor: '#e0f7fa',
            color: '#000',
            '&:hover': {
              backgroundColor: '#b2ebf2'
            }
          }
        }}>
        <ListItemIcon
          sx={{
            color: (theme) => (theme.palette.mode === 'dark' ? 'white' : '#0056E1'),
            minWidth: 'auto',
            mr: '8px'
          }}>
          <AddCardIcon sx={{ fontSize: '1.2rem' }} />
        </ListItemIcon>
        <ListItemText
          sx={{
            color: (theme) => (theme.palette.mode === 'dark' ? 'white' : '#0056E1')
          }}
          primary='Create new board'
        />
      </ListItemButton>
      <CreateBoardDialog open={open} handleClose={handleClose} createNewBoard={createNewBoard} />
    </Box>
  )
}

export default Sidebar
