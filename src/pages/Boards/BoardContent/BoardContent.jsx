import Box from '@mui/material/Box'
import ListColumns from './ListColumns/ListColumns'
import {
  DndContext,
  useSensor,
  useSensors,
  // MouseSensor,
  // TouchSensor,
  DragOverlay,
  defaultDropAnimationSideEffects,
  closestCorners,
  rectIntersection,
  pointerWithin,
  getFirstCollision,
  closestCenter
} from '@dnd-kit/core'
import { MouseSensor, TouchSensor } from '~/customLibrary/DndKitSensors'
import { arrayMove } from '@dnd-kit/sortable'
import { useCallback, useEffect, useRef, useState } from 'react'
import { cloneDeep, isEmpty } from 'lodash'
import Column from './ListColumns/Column/Column'
import Card from './ListColumns/Column/ListCards/Card/Card'
import { generatePlaceholderCard } from '~/utils/formatters'

const ACTIVE_DRAG_ITEM_TYPE = {
  COLUMN: 'ACTIVE_DRAG_ITEM_TYPE_COLUMN',
  CARD: 'ACTIVE_DRAG_ITEM_TYPE_CARD'
}

function BoardContent({
  board,
  createNewColumn,
  createNewCard,
  moveColumns,
  moveCardInTheSameColumn,
  moveCardToDifferentColumn,
  deleteColumnDetails,
  handleUpdateCard
}) {
  // Sensor
  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: { distance: 10 }
  })
  // Touch delay of 250ms, and a 5px offset.
  const touchSensor = useSensor(TouchSensor, {
    activationConstraint: { delay: 250, tolerance: 5 }
  })
  // Prioritize the combination of mouse and touch to enhance UX (User experience).
  const sensors = useSensors(mouseSensor, touchSensor)

  // Set state when the column changes
  const [orderedColumns, setOrderedColumns] = useState([])
  // Only one element can be dragged at a time
  const [activeDragItemId, setActiveDragItemId] = useState(null)
  const [activeDragItemType, setActiveDragItemType] = useState(null)
  const [activeDragItemData, setActiveDragItemData] = useState(null)
  const [oldColumnWhenDraggingCard, setOldColumnWhenDraggingCard] = useState(null)

  const lastOverId = useRef(null)

  useEffect(() => {
    // Columns đã được sắp xếp ở Components cha
    setOrderedColumns(board.columns)
  }, [board])

  const findColumnByCardId = (cardId) => {
    // Tìm cột chứa thẻ dựa trên ID của thẻ
    return orderedColumns.find((column) => column?.cards?.map((card) => card._id)?.includes(cardId))
  }

  // Function move card
  const moveCardBetweenDiffrentColumns = (
    overColumn,
    overCardId,
    active,
    over,
    activeColumn,
    activeDraggingCardId,
    activeDraggingCardData,
    triggerFrom
  ) => {
    setOrderedColumns((prevColumn) => {
      // Find index of overCard in over Column
      const overCardIndex = overColumn?.cards?.findIndex((card) => card._id === overCardId)

      // Caculate new card index
      let newCardIndex
      const isBelowOverItem =
        active.rect?.current?.translated &&
        active.rect.current.translated.top > over.rect.top + over.rect.height
      const modifier = isBelowOverItem ? 1 : 0
      newCardIndex = overCardIndex >= 0 ? overCardIndex + modifier : overColumn?.cards?.length + 1

      // Clone the OrderedColumn array into a new one and then process the data
      const nextColumns = cloneDeep(prevColumn)
      const nextActiveColumn = nextColumns.find((column) => column._id === activeColumn._id)
      const nextOverColumn = nextColumns.find((column) => column._id === overColumn._id)

      // Old Column
      if (nextActiveColumn) {
        // Remove the card from the active column
        nextActiveColumn.cards = nextActiveColumn.cards.filter(
          (card) => card._id !== activeDraggingCardId
        )

        // Check cards empty, and FE_PlaceholderCard
        if (isEmpty(nextActiveColumn.cards)) {
          nextActiveColumn.cards = [generatePlaceholderCard(nextActiveColumn)]
        }
        // Update 'cardOrderIds' to synchronize with the data
        nextActiveColumn.cardOrderIds = nextActiveColumn.cards.map((card) => card._id)
      }

      // New Column
      if (nextOverColumn) {
        // Check the activeDraggingCard already exists in the nextOverColumn
        nextOverColumn.cards = nextOverColumn.cards.filter(
          (card) => card._id !== activeDraggingCardId
        )

        const rebuild_activeDraggingCardData = {
          ...activeDraggingCardData,
          columnId: nextOverColumn._id,
          boardId: nextOverColumn.boardId
        }

        // Add the card from the over column
        nextOverColumn.cards = nextOverColumn.cards.toSpliced(
          newCardIndex,
          0,
          rebuild_activeDraggingCardData
        )

        // Delete Placeholder Card
        nextOverColumn.cards = nextOverColumn.cards.filter((card) => !card.FE_PlaceholderCard)

        // Update 'cardOrderIds' to synchronize with the data
        nextOverColumn.cardOrderIds = nextOverColumn.cards.map((card) => card._id)
      }

      // Gọi API ở đây khi DragEnd, vì DragOver cũng Run hàm này, nên không được gọi nhiều lần. Chỉ cần 1 lần
      if (triggerFrom === 'handleDragEnd') {
        /** Khi kéo khác column cần các tham số, id đang kéo, column cũ,
         *  column mới, và nextColumns để update board **/
        moveCardToDifferentColumn(
          activeDraggingCardId,
          oldColumnWhenDraggingCard._id,
          nextOverColumn._id,
          nextColumns
        )
      }

      return nextColumns
    })
  }

  // Trigger when you start to drag an item
  const handleDragStart = (event) => {
    setActiveDragItemId(event?.active?.id)
    setActiveDragItemType(
      event?.active?.data?.current?.columnId
        ? ACTIVE_DRAG_ITEM_TYPE.CARD
        : ACTIVE_DRAG_ITEM_TYPE.COLUMN
    )
    setActiveDragItemData(event?.active?.data?.current)
    if (event?.active?.data?.current?.columnId) {
      setOldColumnWhenDraggingCard(findColumnByCardId(event?.active?.id))
    }
  }

  // Trigger while dragging an item
  const handleDragOver = (event) => {
    // Only handle the card, not handle the column
    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) return

    // Handle the column when the card is dragging
    const { active, over } = event

    // Must have an 'Over' position, otherwise 'return'
    if (!over || !active) return

    const {
      id: activeDraggingCardId,
      data: { current: activeDraggingCardData }
    } = active
    const { id: overCardId } = over

    // Find the two column_IDs and compare them. If two column_Ids equal,
    // then we dragging the card, otherwise we dragging the column
    const activeColumn = findColumnByCardId(activeDraggingCardId)
    const overColumn = findColumnByCardId(overCardId)
    if (!activeColumn || !overColumn) return

    // Only handle two diffrent columns, because the two identical columns
    // have already been processed in HandleDragEnd
    if (activeColumn._id !== overColumn._id) {
      moveCardBetweenDiffrentColumns(
        overColumn,
        overCardId,
        active,
        over,
        activeColumn,
        activeDraggingCardId,
        activeDraggingCardData,
        'handleDragOver'
      )
    }
  }

  //  Trigger when an item finishes dragging
  const handleDragEnd = (event) => {
    const { active, over } = event

    // Have to 'Over' otherwise return false
    if (!over || !active) return

    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.CARD) {
      const {
        id: activeDraggingCardId,
        data: { current: activeDraggingCardData }
      } = active
      const { id: overCardId } = over

      const activeColumn = findColumnByCardId(activeDraggingCardId)
      const overColumn = findColumnByCardId(overCardId)

      if (!overColumn) return

      if (oldColumnWhenDraggingCard._id !== overColumn._id) {
        moveCardBetweenDiffrentColumns(
          overColumn,
          overCardId,
          active,
          over,
          activeColumn,
          activeDraggingCardId,
          activeDraggingCardData,
          'handleDragEnd'
        )
      } else {
        // Caculate index of old and new card
        const oldCardIndex = oldColumnWhenDraggingCard?.cards?.findIndex(
          (c) => c._id === activeDragItemId
        )
        const newCardIndex = overColumn?.cards?.findIndex((c) => c._id === overCardId)

        // Set new position of Card in Column
        const dndOrderedCards = arrayMove(
          oldColumnWhenDraggingCard?.cards,
          oldCardIndex,
          newCardIndex
        )
        const dndOrderedCardId = dndOrderedCards.map((card) => card._id)

        // Gọi Update State để tránh Flickering trong khi phải chờ API thì giao diện cập nhật trước.
        // Set state of Ogrinal Column
        setOrderedColumns((prevColumn) => {
          // Clone column
          const nextColumns = cloneDeep(prevColumn)
          // Find the column is dragging
          const targetColumn = nextColumns.find((column) => column._id === overColumn._id)
          // Set cards and cardOrderIds
          targetColumn.cards = dndOrderedCards
          targetColumn.cardOrderIds = dndOrderedCardId

          return nextColumns
        })
        /**
         * Move Card in the same column when drag-and-drop
         * Call API to update order of cards in the same column
         * Call API to Compoents parent to update order of cards
         **/
        moveCardInTheSameColumn(dndOrderedCards, dndOrderedCardId, oldColumnWhenDraggingCard._id)
      }
    }

    // Handle drag-and-drop columns
    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN && active.id !== over.id) {
      const oldColumnIndex = orderedColumns.findIndex((c) => c._id === active.id)
      const newColumnIndex = orderedColumns.findIndex((c) => c._id === over.id)

      const dndOrderedColumn = arrayMove(orderedColumns, oldColumnIndex, newColumnIndex)

      // Set state when the column is dragged
      setOrderedColumns(dndOrderedColumn)

      // Gọi lên Components cha để call API
      moveColumns(dndOrderedColumn)
    }

    setActiveDragItemId(null)
    setActiveDragItemType(null)
    setActiveDragItemData(null)
    setOldColumnWhenDraggingCard(null)
  }

  // Animation Drop Effect Smooth
  const customDropAnimation = {
    sideEffects: defaultDropAnimationSideEffects({
      styles: { active: { opacity: '0.5' } }
    })
  }

  const collisionDetectionStrategy = useCallback(
    (args) => {
      if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) {
        return closestCorners({ ...args })
      }
      // First, Find collision points
      const pointerIntersections = pointerWithin(args)

      if (!pointerIntersections?.length) return

      let overId = getFirstCollision(pointerIntersections, 'id')

      if (overId) {
        const checkColumn = orderedColumns.find((c) => c._id === overId)
        if (checkColumn) {
          overId = closestCorners({
            ...args,
            droppableContainers: args.droppableContainers.filter((container) => {
              return container.id !== overId && checkColumn?.cardOrderIds?.includes(container.id)
            })
          })[0]?.id
        }
        lastOverId.current = overId
        return [{ id: overId }]
      }

      return lastOverId.current ? [{ id: lastOverId.current }] : []
    },
    [activeDragItemType]
  )

  return (
    <DndContext
      onDragEnd={handleDragEnd}
      onDragOver={handleDragOver}
      onDragStart={handleDragStart}
      // change closet_center to closetCorners, because closet_center cant working with 'card' image big
      collisionDetection={collisionDetectionStrategy}
      // Sensors, handle touch mouse sensor  and touch sensor
      sensors={sensors}>
      <Box
        sx={{
          bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#34495e' : '#1976d2'),
          width: '100%',
          height: (theme) => theme.trello.boardContentHeight,
          p: '10px 0'
        }}>
        <ListColumns
          columns={orderedColumns}
          createNewColumn={createNewColumn}
          createNewCard={createNewCard}
          deleteColumnDetails={deleteColumnDetails}
          handleUpdateCard={handleUpdateCard}
        />
        <DragOverlay dropAnimation={customDropAnimation}>
          {!activeDragItemType && null}
          {activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN && (
            <Column column={activeDragItemData} />
          )}
          {activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.CARD && <Card card={activeDragItemData} />}
        </DragOverlay>
      </Box>
    </DndContext>
  )
}

export default BoardContent
