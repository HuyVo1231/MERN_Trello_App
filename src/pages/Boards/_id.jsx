import Container from '@mui/material/Container'
import AppBar from '~/components/AppBar/AppBar'
import BoardBar from './BoardBar/BoardBar'
import CircularProgress from '@mui/material/CircularProgress'
import Box from '@mui/material/Box'
import BoardContent from './BoardContent/BoardContent'
import { useEffect, useState } from 'react'
import {
  fetchBoardDetailsAPI,
  createNewCardAPI,
  createNewColumnAPI,
  updateBoardDetailsAPI,
  updateColumnDetailsAPI,
  moveCardToDifferentColumnAPI,
  deleteColumnDetailsAPI,
  updateCardAPI
} from '~/apis'
import { isEmpty } from 'lodash'
import { generatePlaceholderCard } from '~/utils/formatters'
import { mapOrder } from '~/utils/sorts'
import { Typography } from '@mui/material'
import { toast } from 'react-toastify'
import { useParams } from 'react-router-dom'

function Board() {
  const [board, setBoard] = useState(null)
  const { boardId } = useParams()
  useEffect(() => {
    fetchBoardDetailsAPI(boardId).then((board) => {
      // Sắp xếp dữ liệu COLUMNS trước khi đưa xuống Conponents con
      board.columns = mapOrder(board.columns, board.columnOrderIds, '_id')

      board.columns.forEach((column) => {
        if (isEmpty(column.cards)) {
          column.cards = [generatePlaceholderCard(column)]
          column.cardOrderIds = [generatePlaceholderCard(column)._id]
        } else {
          // Sắp xếp dữ liệu CARD trước khi đưa xuống Conponents con
          column.cards = mapOrder(column.cards, column.cardOrderIds, '_id')
        }
      })
      setBoard(board)
    })
  }, [])

  // Call API and Refresh the board data
  const createNewColumn = async (newColumnData) => {
    const createdColumn = await createNewColumnAPI({
      ...newColumnData,
      boardId: board._id
    })

    // Cập nhật State board
    const newBoard = { ...board }
    newBoard.columns.push(createdColumn)
    newBoard.columnOrderIds.push(createdColumn._id)
    setBoard(newBoard)
  }

  // Call API and Refresh the board data
  const createNewCard = async (newCardData) => {
    const createdCard = await createNewCardAPI({
      ...newCardData,
      boardId: board._id
    })

    // Cập nhật State board card
    const newBoard = { ...board }
    const columnToUpdate = newBoard.columns.find((column) => column._id === createdCard.columnId)
    if (columnToUpdate) {
      if (columnToUpdate.cards.some((card) => card.FE_PlaceholderCard)) {
        columnToUpdate.cards = [createdCard]
        columnToUpdate.cardOrderIds = [createdCard._id]
      } else {
        columnToUpdate.cards.push(createdCard)
        columnToUpdate.cardOrderIds.push(createdCard._id)
      }
    }
    setBoard(newBoard)
  }

  // Function update move Column in Database
  const moveColumns = (dndOrderedColumn) => {
    // Xử lý giao diện trước cho nó mượt
    const dndOrderedColumnIds = dndOrderedColumn.map((c) => c._id)
    const newBoard = { ...board }
    newBoard.columns = dndOrderedColumn
    newBoard.columnOrderIds = dndOrderedColumnIds
    setBoard(newBoard)

    // Call API to update Column order
    updateBoardDetailsAPI(newBoard._id, { columnOrderIds: newBoard.columnOrderIds })
  }

  /**
   * Move Card in the same column when drag-and-drop
   * Call API to update order of cards in the same column
   **/
  const moveCardInTheSameColumn = (dndOrderedCards, dndOrderedCardIds, columnId) => {
    // Update data card cho state board
    const newBoard = { ...board }
    const columnToUpdate = newBoard.columns.find((column) => column._id === columnId)
    if (columnToUpdate) {
      columnToUpdate.cards = dndOrderedCards
      columnToUpdate.cardOrderIds = dndOrderedCardIds
    }

    setBoard(newBoard)

    // Call API update Column
    updateColumnDetailsAPI(columnId, { cardOrderIds: dndOrderedCardIds })
  }

  const moveCardToDifferentColumn = (
    currentCardId,
    prevColumnId,
    nextColumnId,
    dndOrderedColumn
  ) => {
    // update lại UI
    const dndOrderedColumnIds = dndOrderedColumn.map((c) => c._id)
    const newBoard = { ...board }
    newBoard.columns = dndOrderedColumn
    newBoard.columnOrderIds = dndOrderedColumnIds
    setBoard(newBoard)

    // Gọi API
    let prevCardOrderIds = dndOrderedColumn.find((c) => c._id === prevColumnId)?.cardOrderIds
    if (prevCardOrderIds[0].includes('placeholder-card')) {
      prevCardOrderIds = []
    }

    moveCardToDifferentColumnAPI({
      currentCardId,
      prevColumnId,
      prevCardOrderIds,
      nextColumnId,
      nextCardOrderIds: dndOrderedColumn.find((c) => c._id === nextColumnId)?.cardOrderIds
    })
  }

  const deleteColumnDetails = (columnId) => {
    const newBoard = { ...board }
    newBoard.columns = newBoard.columns.filter((c) => c._id !== columnId)
    newBoard.columnOrderIds = newBoard.columnOrderIds.filter((id) => id !== columnId)
    setBoard(newBoard)

    deleteColumnDetailsAPI(columnId).then((res) => {
      toast.success(res?.deletedResult)
    })
  }

  const handleUpdateCard = (updatedCard) => {
    // Tìm card cần cập nhật trong board
    const updatedBoard = { ...board }

    // Lặp qua các columns trong board
    updatedBoard.columns.forEach((column) => {
      // Tìm card cần cập nhật trong column
      const updatedCards = column.cards.map((card) =>
        card._id === updatedCard._id ? updatedCard : card
      )

      // Cập nhật lại danh sách card trong column
      column.cards = updatedCards
    })
    console.log(updatedCard)
    toast.success('Update card successfully')
    updateCardAPI(updatedCard._id, updatedCard)
    // Cập nhật lại board với column đã được cập nhật
    setBoard(updatedBoard)
  }

  if (!board) {
    return (
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 2,
          width: '100%',
          height: '100vh'
        }}>
        <CircularProgress />
        <Typography>Loading Board...</Typography>
      </Box>
    )
  }

  return (
    <Container
      disableGutters
      maxWidth={false}
      sx={{ height: '100vh', backgroundColor: 'primary.main' }}>
      <AppBar />
      <BoardBar board={board} />
      <BoardContent
        board={board}
        createNewColumn={createNewColumn}
        createNewCard={createNewCard}
        moveColumns={moveColumns}
        moveCardInTheSameColumn={moveCardInTheSameColumn}
        moveCardToDifferentColumn={moveCardToDifferentColumn}
        deleteColumnDetails={deleteColumnDetails}
        handleUpdateCard={handleUpdateCard}
      />
    </Container>
  )
}

export default Board
