import React from 'react'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import ListItemText from '@mui/material/ListItemText'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import ContentCut from '@mui/icons-material/ContentCut'
import Cloud from '@mui/icons-material/Cloud'
import Divider from '@mui/material/Divider'
import Tooltip from '@mui/material/Tooltip'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import AddCardIcon from '@mui/icons-material/AddCard'
import Button from '@mui/material/Button'
import DragHandleIcon from '@mui/icons-material/DragHandle'
import ListCard from './ListCards/ListCards'
import { mapOrder } from '~/utils/sorts'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { Opacity } from '@mui/icons-material'

function Column({ column }) {
    // Xử lý kéo thả
    const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
        id: column._id,
        data: { ...column },
    })

    const dndKitColumnStyles = {
        // touchAction: 'none', // Dành cho Sensor Default dạng PointerSensor
        // Xử dụng Translate thay Transform để khọng bị lỗi Stretch
        transform: CSS.Translate.toString(transform),
        transition,
        height: '100%',
        opacity: isDragging ? 0.8 : undefined,
    }

    // Render card. Maporder dùng thuật toán sắp xếp
    const orderedCards = mapOrder(column?.cards, column?.cardOrderIds, '_id')
    const [anchorEl, setAnchorEl] = React.useState(null)
    const open = Boolean(anchorEl)
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget)
    }

    // Handle Close
    const handleClose = () => {
        setAnchorEl(null)
    }
    return (
        <div ref={setNodeRef} style={dndKitColumnStyles} {...attributes}>
            <Box
                {...listeners}
                sx={{
                    minWidth: '300px',
                    maxWidth: '300px',
                    bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#333643' : '#ebecf0'),
                    ml: 2,
                    borderRadius: '6px',
                    height: 'fit-content',
                    maxHeight: (theme) => `calc(${theme.trello.boardContentHeight} - ${theme.spacing(5)})`,
                }}>
                {/* Box Column Header*/}
                <Box
                    sx={{
                        height: (theme) => theme.trello.colunmHeaderHeight,
                        p: 2,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                    }}>
                    <Typography
                        variant='h6'
                        sx={{
                            fontSize: '1rem',
                            fontWeight: 'bold',
                            cursor: 'pointer',
                        }}>
                        {column?.title}
                    </Typography>
                    <Box>
                        <Tooltip title='More options'>
                            <ExpandMoreIcon
                                id='basic-column-dropdown'
                                aria-controls={open ? 'basic-menu-column-dropdown' : undefined}
                                aria-haspopup='true'
                                aria-expanded={open ? 'true' : undefined}
                                onClick={handleClick}
                                sx={{
                                    color: 'text.primary',
                                    cursor: 'pointer',
                                }}
                            />
                        </Tooltip>
                        <Menu
                            id='basic-menu-column-dropdown'
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleClose}
                            MenuListProps={{
                                'aria-labelledby': 'basic-column-dropdown',
                            }}>
                            <MenuItem>
                                <ListItemIcon>
                                    <AddCardIcon fontSize='small' />
                                </ListItemIcon>
                                <ListItemText>Add new card</ListItemText>
                            </MenuItem>
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
                            <MenuItem>
                                <ListItemIcon>
                                    <DeleteForeverIcon fontSize='small' />
                                </ListItemIcon>
                                <ListItemText>Remove this column</ListItemText>
                            </MenuItem>
                            <MenuItem>
                                <ListItemIcon>
                                    <Cloud fontSize='small' />
                                </ListItemIcon>
                                <ListItemText>Archive this column</ListItemText>
                            </MenuItem>
                        </Menu>
                    </Box>
                </Box>
                {/* Box List Card*/}
                <ListCard cards={orderedCards} />
                {/* Box Column Footer*/}
                <Box
                    sx={{
                        height: (theme) => theme.trello.colunmFooterHeight,
                        p: 2,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                    }}>
                    <Button startIcon={<AddCardIcon />}>Add new card</Button>
                    <Tooltip title='Drag to move'>
                        <DragHandleIcon />
                    </Tooltip>
                </Box>
            </Box>
        </div>
    )
}

export default Column
