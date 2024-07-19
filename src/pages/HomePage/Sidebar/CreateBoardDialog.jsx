import React, { useState } from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import InputAdornment from '@mui/material/InputAdornment'
import DialogTitle from '@mui/material/DialogTitle'
import FormControlLabel from '@mui/material/FormControlLabel'
import CancelIcon from '@mui/icons-material/Cancel'
import AddToPhotosIcon from '@mui/icons-material/AddToPhotos'
import FormatColorTextIcon from '@mui/icons-material/FormatColorText'
import DescriptionIcon from '@mui/icons-material/Description'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import IconButton from '@mui/material/IconButton'
import { toast } from 'react-toastify'

const CreateBoardDialog = ({ open, handleClose, createNewBoard }) => {
  const boardOwner = localStorage.getItem('userId')
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [type, setType] = useState('')

  const handleSubmit = () => {
    // Trim title and description
    const trimmedTitle = title.trim()
    const trimmedDescription = description.trim()

    // Handle form submission
    if (!trimmedTitle || !trimmedDescription || !type) {
      toast.error('Vui lòng nhập đầy đủ các trường')
      return
    }

    createNewBoard({
      boardOwner,
      title: trimmedTitle,
      description: trimmedDescription,
      type
    })
    handleClose()
    toast.success('Thêm board thành công')
  }

  const handleTypeChange = (event) => {
    setType(event.target.value)
  }

  return (
    <Dialog open={open} onClose={handleClose}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <DialogTitle
          sx={{
            fontWeight: 'bold',
            display: 'flex',
            alignItems: 'center',
            gap: 1
          }}>
          <AddToPhotosIcon />
          Create new board
        </DialogTitle>
        <IconButton onClick={handleClose} sx={{ color: 'red' }}>
          <CancelIcon />
        </IconButton>
      </Box>
      <DialogContent>
        <TextField
          required
          name='title'
          label='Title'
          fullWidth
          variant='outlined'
          value={title}
          InputProps={{
            startAdornment: (
              <InputAdornment position='start'>
                <FormatColorTextIcon />
              </InputAdornment>
            )
          }}
          onChange={(e) => setTitle(e.target.value)}
          sx={{ marginBottom: '20px' }}
        />
        <TextField
          required
          margin='dense'
          id='description'
          name='description'
          label='Description'
          fullWidth
          variant='outlined'
          value={description}
          InputProps={{
            startAdornment: (
              <InputAdornment position='start'>
                <DescriptionIcon />
              </InputAdornment>
            )
          }}
          onChange={(e) => setDescription(e.target.value)}
          sx={{ marginBottom: '20px' }}
        />
        <RadioGroup row value={type} onChange={handleTypeChange} sx={{ ml: 1 }}>
          <FormControlLabel value='public' control={<Radio />} label='Public' />
          <FormControlLabel value='private' control={<Radio />} label='Private' />
        </RadioGroup>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} sx={{ color: 'black' }}>
          Cancel
        </Button>
        <Button variant='outlined' onClick={handleSubmit} sx={{ color: 'primary.main' }}>
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default CreateBoardDialog
