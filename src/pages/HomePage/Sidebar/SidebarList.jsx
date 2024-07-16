import React from 'react'
import List from '@mui/material/List'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import SpaceDashboardIcon from '@mui/icons-material/SpaceDashboard'
import ColorLensIcon from '@mui/icons-material/ColorLens'
import HomeIcon from '@mui/icons-material/Home'

const SidebarList = () => (
  <List>
    <ListItemButton
      selected
      sx={{
        marginBottom: '8px',
        borderRadius: '6px',
        padding: '6px 16px',
        '&.Mui-selected:hover .MuiListItemIcon-root, &.Mui-selected:hover .MuiListItemText-primary':
          {
            color: (theme) => (theme.palette.mode === 'dark' ? '#fff' : '#0056E1')
          }
      }}>
      <ListItemIcon
        sx={{
          color: (theme) => (theme.palette.mode === 'dark' ? '#76CCFF' : '#0056E1'),
          minWidth: 'auto',
          mr: '8px'
        }}>
        <SpaceDashboardIcon sx={{ fontSize: '1.2rem' }} />
      </ListItemIcon>
      <ListItemText
        sx={{
          color: (theme) => (theme.palette.mode === 'dark' ? '#76CCFF' : '#0056E1'),
          '&.Mui-selected': {
            color: (theme) => (theme.palette.mode === 'dark' ? '#fff' : '#1976d2')
          }
        }}
        primary='Boards'
      />
    </ListItemButton>
    <ListItemButton
      sx={{
        marginBottom: '8px',
        padding: '6px 16px',
        '&.Mui-selected': {
          borderRadius: '6px',
          color: '#2c3e50',
          '&:hover': {
            backgroundColor: '#D9E5F2'
          }
        }
      }}>
      <ListItemIcon
        sx={{
          color: (theme) => (theme.palette.mode === 'dark' ? 'white' : '#333'),
          minWidth: 'auto',
          mr: '8px'
        }}>
        <ColorLensIcon sx={{ fontSize: '1.2rem' }} />
      </ListItemIcon>
      <ListItemText
        sx={{
          color: (theme) => (theme.palette.mode === 'dark' ? 'white' : '#333')
        }}
        primary='Template'
      />
    </ListItemButton>
    <ListItemButton
      sx={{
        marginBottom: '8px',
        padding: '6px 16px',
        '&.Mui-selected': {
          borderRadius: '6px',
          color: '#2c3e50',
          '&:hover': {
            backgroundColor: '#D9E5F2'
          }
        }
      }}>
      <ListItemIcon
        sx={{
          color: (theme) => (theme.palette.mode === 'dark' ? 'white' : '#333'),
          minWidth: 'auto',
          mr: '8px'
        }}>
        <HomeIcon sx={{ fontSize: '1.2rem' }} />
      </ListItemIcon>
      <ListItemText
        sx={{
          color: (theme) => (theme.palette.mode === 'dark' ? 'white' : '#333')
        }}
        primary='Home'
      />
    </ListItemButton>
  </List>
)

export default SidebarList
