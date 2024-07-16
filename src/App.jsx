// Trong App.js
import React from 'react'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import Board from './pages/Boards/_id'
import Login from './pages/Login/login'
import Register from './pages/Register/register'

import { useSelector } from 'react-redux'
import Home from './pages/HomePage/Home'

function App() {
  const { isLoggedIn } = useSelector((state) => state.auth)

  return (
    <Router>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        {/* <Route path='/' element={<Home />} /> */}
        <Route path='/' element={isLoggedIn ? <Home /> : <Navigate to='/login' replace />} />

        <Route
          path='/boards/:boardId'
          element={isLoggedIn ? <Board /> : <Navigate to='/login' replace />}
        />
      </Routes>
    </Router>
  )
}

export default App
