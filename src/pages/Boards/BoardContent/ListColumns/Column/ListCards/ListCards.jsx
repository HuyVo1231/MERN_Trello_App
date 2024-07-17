import Box from '@mui/material/Box'
import Card from './Card/Card'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'

function ListCard({ cards, handleUpdateCard }) {
  return (
    <SortableContext items={cards.map((card) => card._id)} strategy={verticalListSortingStrategy}>
      <Box
        sx={{
          p: '0px 5px 5px 5px',
          m: '0 5px',
          display: 'flex',
          flexDirection: 'column',
          gap: 1,
          overflowX: 'hidden',
          overflowY: 'auto',
          maxHeight: (theme) => `calc(${theme.trello.boardContentHeight} - 
                    ${theme.spacing(5)} - 
                    ${theme.trello.colunmHeaderHeight} - 
                    ${theme.trello.colunmFooterHeight})`,
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: '#ced0da',
            borderRadius: '8px'
          },
          '&::-webkit-scrollbar-thumb:hover': {
            backgroundColor: '#bfc2cf'
          }
        }}>
        {cards?.map(function (card) {
          return <Card key={card._id} card={card} handleUpdateCard={handleUpdateCard} />
        })}
      </Box>
    </SortableContext>
  )
}

export default ListCard
