import React from 'react'
import Box from '@mui/material/Box'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Divider from '@mui/material/Divider'
import ListItemIcon from '@mui/material/ListItemIcon'
import Avatar from '@mui/material/Avatar'
import Tooltip from '@mui/material/Tooltip'
import IconButton from '@mui/material/IconButton'
import PersonAdd from '@mui/icons-material/PersonAdd'
import Settings from '@mui/icons-material/Settings'
import Logout from '@mui/icons-material/Logout'
function Profile() {
    const [anchorEl, setAnchorEl] = React.useState(null)
    const open = Boolean(anchorEl)
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget)
    }
    const handleClose = () => {
        setAnchorEl(null)
    }

    return (
        <Box>
            <Tooltip title='Account settings'>
                <IconButton
                    onClick={handleClick}
                    size='small'
                    sx={{ padding: 0 }}
                    aria-controls={open ? 'basic-menu-profile' : undefined}
                    aria-haspopup='true'
                    aria-expanded={open ? 'true' : undefined}>
                    <Avatar
                        sx={{ width: 30, height: 30 }}
                        src='https://scontent.fvca1-3.fna.fbcdn.net/v/t39.30808-6/347250745_2810748825727645_4362687771346460334_n.jpg?stp=cp6_dst-jpg&_nc_cat=111&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeFe7MmDWU91T1PO8XPd5-oTHcmPyrpG0nMdyY_KukbSc172FREdp2AwPAvsDTmBRGLipT9RxP0mabsxbBPTE19Y&_nc_ohc=QyLUtG2ZHWEQ7kNvgGpBi4F&_nc_ht=scontent.fvca1-3.fna&oh=00_AYA82Oe486JEK8l7g0aoU6lzVRX83NQtXYnzqhIEatXRWg&oe=66492842'
                        alt='Avatar'></Avatar>
                </IconButton>
            </Tooltip>
            <Menu
                id='basic-menu-profile'
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button-profile',
                }}>
                <MenuItem onClick={handleClose}>
                    <Avatar sx={{ width: 28, height: 28, mr: 2 }} /> Profile
                </MenuItem>
                <MenuItem onClick={handleClose}>
                    <Avatar sx={{ width: 28, height: 28, mr: 2 }} /> My account
                </MenuItem>
                <Divider />
                <MenuItem>
                    <ListItemIcon>
                        <PersonAdd fontSize='small' />
                    </ListItemIcon>
                    Add another account
                </MenuItem>
                <MenuItem>
                    <ListItemIcon>
                        <Settings fontSize='small' />
                    </ListItemIcon>
                    Settings
                </MenuItem>
                <MenuItem>
                    <ListItemIcon>
                        <Logout fontSize='small' />
                    </ListItemIcon>
                    Logout
                </MenuItem>
            </Menu>
        </Box>
    )
}

export default Profile
