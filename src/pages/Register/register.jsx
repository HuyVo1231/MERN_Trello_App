import React, { useState } from 'react'
import { Button, TextField, Typography } from '@mui/material'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { registerUserAPI } from '~/apis'

const Register = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')
  const [avatar, setAvatar] = useState(null) // State for avatar file

  const handleUsernameChange = (event) => {
    setUsername(event.target.value)
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
  }

  const handleEmailChange = (event) => {
    setEmail(event.target.value)
  }

  const handleAvatarChange = (event) => {
    setAvatar(event.target.files[0])
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    try {
      const formData = new FormData()
      formData.append('username', username)
      formData.append('password', password)
      formData.append('email', email)
      formData.append('avatar', avatar)
      const response = await registerUserAPI(formData)

      toast.success('Registration successful. Please log in.')

      setUsername('')
      setPassword('')
      setEmail('')
      setAvatar(null)
    } catch (error) {
      toast.error('Registration failed. Please try again.')
    }
  }

  return (
    <div
      style={{
        backgroundImage: `url('https://i.pinimg.com/736x/c2/e9/02/c2e902e031e1d9d932411dd0b8ab5eef.jpg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column'
      }}>
      <Typography component='h1' variant='h5' style={{ marginBottom: '1rem', color: 'white' }}>
        Register
      </Typography>
      <form
        onSubmit={handleSubmit}
        encType='multipart/form-data' // Ensure form data is encoded properly for file upload
        style={{
          width: '80%',
          maxWidth: '400px',
          backgroundColor: 'rgba(255, 255, 255, 0.8)',
          padding: '2rem',
          borderRadius: '8px',
          boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)'
        }}>
        <TextField
          variant='outlined'
          margin='normal'
          required
          fullWidth
          id='username'
          label='Username'
          name='username'
          autoComplete='username'
          autoFocus
          value={username}
          onChange={handleUsernameChange}
        />
        <TextField
          variant='outlined'
          margin='normal'
          required
          fullWidth
          id='email'
          label='Email'
          name='email'
          autoComplete='email'
          value={email}
          onChange={handleEmailChange}
        />
        <TextField
          variant='outlined'
          margin='normal'
          required
          fullWidth
          name='password'
          label='Password'
          type='password'
          id='password'
          autoComplete='current-password'
          value={password}
          onChange={handlePasswordChange}
        />
        {/* File input for avatar */}
        <input
          name='avatar'
          type='file'
          accept='image/*'
          onChange={handleAvatarChange}
          style={{ marginBottom: '1rem' }}
        />
        <Button
          type='submit'
          fullWidth
          variant='contained'
          sx={{ mt: 3, mb: 2 }}
          style={{ backgroundColor: '#1976d2', color: 'white' }}>
          Register
        </Button>
      </form>
    </div>
  )
}

export default Register
