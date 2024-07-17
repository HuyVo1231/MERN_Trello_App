import React, { useState } from 'react'
import { Modal, Box, Typography, TextField, Button } from '@mui/material'

const EditCardModal = ({ isOpen, onClose, card, handleUpdateCard }) => {
  const [title, setTitle] = useState(card.title)
  const [description, setDescription] = useState(card.description)

  const handleSave = () => {
    handleUpdateCard({ ...card, title, description })
    onClose()
  }

  return (
    <Modal open={isOpen} onClose={onClose}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          border: '2px solid #000',
          boxShadow: 24,
          p: 4
        }}>
        <Typography variant='h6' component='h2'>
          Edit Card
        </Typography>
        <TextField
          fullWidth
          margin='normal'
          label='Title'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <TextField
          fullWidth
          margin='normal'
          label='Description'
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          multiline
          rows={4}
        />
        <Button variant='contained' color='primary' onClick={handleSave} sx={{ mt: 2 }}>
          Save
        </Button>
        <Button variant='outlined' color='secondary' onClick={onClose} sx={{ mt: 2, ml: 2 }}>
          Cancel
        </Button>
      </Box>
    </Modal>
  )
}

export default EditCardModal
