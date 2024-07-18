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
          borderRadius: 2,
          boxShadow: 24,
          p: 4
        }}>
        <Typography variant='h6' component='h2' gutterBottom>
          Edit Card
        </Typography>
        <Typography variant='body2' color='textSecondary' gutterBottom>
          Please provide a new title and description for your card. Ensure that the details are
          accurate and concise to maintain clarity.
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
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
          <Button variant='outlined' color='secondary' onClick={onClose} sx={{ mr: 2 }}>
            Cancel
          </Button>
          <Button variant='contained' color='primary' onClick={handleSave}>
            Save
          </Button>
        </Box>
      </Box>
    </Modal>
  )
}

export default EditCardModal
