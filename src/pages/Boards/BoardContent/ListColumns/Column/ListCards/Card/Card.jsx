import { Card as MuiCard } from '@mui/material'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import GroupIcon from '@mui/icons-material/Group'
import CommentIcon from '@mui/icons-material/Comment'
import AttachmentIcon from '@mui/icons-material/Attachment'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { mapOrder } from '~/utils/sorts'
import { BorderAll } from '@mui/icons-material'

function Card({ card }) {
    // Xử lý kéo thả
    const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
        id: card._id,
        data: { ...card },
    })

    const dndKitCardStyles = {
        // touchAction: 'none', // Dành cho Sensor Default dạng PointerSensor

        // Xử dụng Translate thay Transform để khọng bị lỗi Stretch
        transform: CSS.Translate.toString(transform),
        transition,
        opacity: isDragging ? 0.5 : undefined,
        border: isDragging ? '1px solid #2ecc71' : undefined,
        display: card?.FE_PlaceholderCard ? 'none' : 'block',
    }

    // Render card. Maporder dùng thuật toán sắp xếp
    const orderedCards = mapOrder(card?.cards, card?.cardOrderIds, '_id')

    const shouldShowCardAction = () => {
        return !!card?.memberIds?.length || !!card?.comments?.length || !!card?.attachments?.length
    }

    return (
        <MuiCard
            ref={setNodeRef}
            style={dndKitCardStyles}
            {...attributes}
            {...listeners}
            sx={{
                cursor: 'pointer',
                boxShadow: '0 1px 1px rgba(0,0,0,0.2)',
                overflow: 'unset',
            }}>
            {card?.cover && (
                <CardMedia
                    sx={{
                        height: '140px',
                        width: '100%',
                        cursor: 'pointer',
                    }}
                    image={card?.cover}
                />
            )}
            <CardContent sx={{ p: 1.5, '&:last-child': { p: 1.5 } }}>
                <Typography>{card?.title}</Typography>
            </CardContent>
            {shouldShowCardAction() && (
                <CardActions sx={{ p: '0 4px 8px 4px' }}>
                    {!!card?.memberIds?.length && (
                        <Button size='small' startIcon={<GroupIcon />}>
                            20
                        </Button>
                    )}
                    {!!card?.comments?.length && (
                        <Button size='small' startIcon={<CommentIcon />}>
                            15
                        </Button>
                    )}
                    {!!card?.attachments?.length && (
                        <Button size='small' startIcon={<AttachmentIcon />}>
                            10
                        </Button>
                    )}
                </CardActions>
            )}
        </MuiCard>
    )
}

export default Card
