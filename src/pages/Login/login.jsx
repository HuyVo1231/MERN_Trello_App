import React, { useState } from 'react'
import { Button, TextField, Typography } from '@mui/material'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { loginUserAPI } from '~/apis' // Điều chỉnh đường dẫn import theo thực tế sử dụng
import { useDispatch } from 'react-redux'
import { loginUser } from '~/redux/authSlice'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleUsernameChange = (event) => {
    setUsername(event.target.value)
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    try {
      await dispatch(loginUser(username, password))
      // Sau khi đăng nhập thành công, điều hướng người dùng đến '/'
      navigate('/')
    } catch (error) {
      toast.error('Login failed. Please check your credentials and try again.')
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
      <ToastContainer position='top-center' autoClose={3000} />
      <Typography component='h1' variant='h5' style={{ marginBottom: '1rem', color: 'white' }}>
        Sign in
      </Typography>
      <form
        onSubmit={handleSubmit}
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
          name='password'
          label='Password'
          type='password'
          id='password'
          autoComplete='current-password'
          value={password}
          onChange={handlePasswordChange}
        />
        <Button
          type='submit'
          fullWidth
          variant='contained'
          sx={{ mt: 3, mb: 2 }}
          style={{ backgroundColor: '#1976d2', color: 'white' }}>
          Sign In
        </Button>
      </form>
    </div>
  )
}

export default Login
