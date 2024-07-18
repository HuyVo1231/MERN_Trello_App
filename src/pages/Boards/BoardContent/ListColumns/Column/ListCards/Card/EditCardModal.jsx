import React, { useState } from 'react'
import { Modal, Box, Typography, TextField, Button } from '@mui/material'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

const EditCardModal = ({ isOpen, onClose, card, handleUpdateCard }) => {
  const [title, setTitle] = useState(card.title)
  const [description, setDescription] = useState(card.description)
  const [isEditing, setIsEditing] = useState(false)

  const handleSave = () => {
    handleUpdateCard({ ...card, title, description })
    setIsEditing(false)
  }

  return (
    <Modal open={isOpen} onClose={onClose}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 600,
          maxHeight: '80vh',
          bgcolor: 'background.paper',
          borderRadius: 2,
          boxShadow: 24,
          p: 4
        }}>
        {!isEditing ? (
          <>
            <Typography variant='h6' component='h2' gutterBottom>
              {title}
            </Typography>
            <Box
              sx={{
                maxHeight: '60vh',
                overflowY: 'auto',
                mb: 2
              }}>
              <ReactMarkdown remarkPlugins={[remarkGfm]}>{description}</ReactMarkdown>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
              <Button
                variant='outlined'
                color='primary'
                onClick={() => setIsEditing(true)}
                sx={{ mr: 2 }}>
                Edit
              </Button>
              <Button variant='contained' color='secondary' onClick={onClose}>
                Close
              </Button>
            </Box>
          </>
        ) : (
          <>
            <Typography variant='h6' component='h2' gutterBottom>
              Edit Card
            </Typography>
            <TextField
              fullWidth
              margin='normal'
              label='Title'
              value={title}
              data-no-dnd='true'
              onChange={(e) => setTitle(e.target.value)}
            />
            <TextField
              fullWidth
              margin='normal'
              label='Description'
              value={description}
              data-no-dnd='true'
              onChange={(e) => setDescription(e.target.value)}
              multiline
              rows={8}
            />
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
              <Button
                variant='outlined'
                color='secondary'
                onClick={() => setIsEditing(false)}
                sx={{ mr: 2 }}>
                Cancel
              </Button>
              <Button variant='contained' color='primary' onClick={handleSave}>
                Save
              </Button>
            </Box>
          </>
        )}
      </Box>
    </Modal>
  )
}

export default EditCardModal
