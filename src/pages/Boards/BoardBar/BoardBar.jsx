import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'
import DashboardIcon from '@mui/icons-material/Dashboard'
import VpnLockIcon from '@mui/icons-material/VpnLock'
import AddToDriveIcon from '@mui/icons-material/AddToDrive'
import BoltIcon from '@mui/icons-material/Bolt'
import FilterListIcon from '@mui/icons-material/FilterList'
import Avatar from '@mui/material/Avatar'
import AvatarGroup from '@mui/material/AvatarGroup'
import Tooltip from '@mui/material/Tooltip'
import { Button } from '@mui/material'
import PersonAddIcon from '@mui/icons-material/PersonAdd'
import { capitalizeFirstLetter } from '~/utils/formatters'

const MENU_STYLES = {
    color: 'white',
    bgcolor: 'transparent',
    border: 'none',
    padding: '5px',
    borderRadius: '4px',
    '& .MuiSvgIcon-root': {
        color: 'white',
    },
    '&:hover': {
        bgcolor: 'primary.50',
    },
}

function BoardBar({ board }) {
    return (
        <Box
            sx={{
                backgroundColor: '#fff',
                width: '100%',
                height: (theme) => theme.trello.boardBarHeight,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: 2,
                paddingX: 2,
                overflowX: 'auto',
                borderBottom: '1px solid white',
                bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#34495e' : '#1976d2'),
            }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Chip sx={MENU_STYLES} icon={<DashboardIcon />} label={board?.title} clickable />
                {board?.type && (
                    <Chip
                        sx={MENU_STYLES}
                        icon={<VpnLockIcon />}
                        label={capitalizeFirstLetter(board?.type) + ' Workspaces'}
                        clickable
                    />
                )}
                <Chip sx={MENU_STYLES} icon={<AddToDriveIcon />} label='Add to Google Drive' clickable />
                <Chip sx={MENU_STYLES} icon={<BoltIcon />} label='Automation' clickable />{' '}
                <Chip sx={MENU_STYLES} icon={<FilterListIcon />} label='Filters' clickable />
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Button
                    sx={{
                        color: 'white',
                        borderColor: 'white',
                        '&:hover': {
                            borderColor: 'white',
                        },
                    }}
                    variant='outlined'
                    startIcon={<PersonAddIcon />}>
                    Invite
                </Button>
                <AvatarGroup
                    max={5}
                    sx={{
                        gap: '10px',
                        '& .MuiAvatar-root': {
                            width: 34,
                            height: 34,
                            fontSize: 16,
                            border: 'none',
                            color: 'white',
                            cursor: 'pointer',
                            '&:first-of-type': {
                                bgcolor: '#a4b0be',
                            },
                        },
                    }}>
                    <Tooltip title='Nhật Huy'>
                        <Avatar
                            alt='Nhật HuyDev'
                            src='https://cdn.24h.com.vn/upload/3-2023/images/2023-07-09/Than-hinh-muot-muon-muot-cua-gai-xinh-xu-Han-co-trieu-fan-han-kyung-1688907525-217-width1440height1728.jpeg'
                        />
                    </Tooltip>
                    <Tooltip title='Nhật Huy'>
                        <Avatar
                            alt='Nhật HuyDev'
                            src='https://cdn.24h.com.vn/upload/3-2023/images/2023-07-09/Than-hinh-muot-muon-muot-cua-gai-xinh-xu-Han-co-trieu-fan-han-kyung-1688907525-217-width1440height1728.jpeg'
                        />
                    </Tooltip>
                    <Tooltip title='Nhật Huy'>
                        <Avatar
                            alt='Nhật HuyDev'
                            src='https://cdn.24h.com.vn/upload/3-2023/images/2023-07-09/Than-hinh-muot-muon-muot-cua-gai-xinh-xu-Han-co-trieu-fan-han-kyung-1688907525-217-width1440height1728.jpeg'
                        />
                    </Tooltip>
                    <Tooltip title='Nhật Huy'>
                        <Avatar
                            alt='Nhật HuyDev'
                            src='https://cdn.24h.com.vn/upload/3-2023/images/2023-07-09/Than-hinh-muot-muon-muot-cua-gai-xinh-xu-Han-co-trieu-fan-han-kyung-1688907525-217-width1440height1728.jpeg'
                        />
                    </Tooltip>
                    <Tooltip title='Nhật Huy'>
                        <Avatar
                            alt='Nhật HuyDev'
                            src='https://cdn.24h.com.vn/upload/3-2023/images/2023-07-09/Than-hinh-muot-muon-muot-cua-gai-xinh-xu-Han-co-trieu-fan-han-kyung-1688907525-217-width1440height1728.jpeg'
                        />
                    </Tooltip>
                    <Tooltip title='Nhật Huy'>
                        <Avatar
                            alt='Nhật HuyDev'
                            src='https://cdn.24h.com.vn/upload/3-2023/images/2023-07-09/Than-hinh-muot-muon-muot-cua-gai-xinh-xu-Han-co-trieu-fan-han-kyung-1688907525-217-width1440height1728.jpeg'
                        />
                    </Tooltip>
                    <Tooltip title='Nhật Huy'>
                        <Avatar
                            alt='Nhật HuyDev'
                            src='https://cdn.24h.com.vn/upload/3-2023/images/2023-07-09/Than-hinh-muot-muon-muot-cua-gai-xinh-xu-Han-co-trieu-fan-han-kyung-1688907525-217-width1440height1728.jpeg'
                        />
                    </Tooltip>
                </AvatarGroup>
            </Box>
        </Box>
    )
}

export default BoardBar