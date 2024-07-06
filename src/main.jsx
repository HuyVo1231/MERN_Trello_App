import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import CssBaseline from '@mui/material/CssBaseline'
import { Experimental_CssVarsProvider as CssVarsProvider } from '@mui/material/styles'
import theme from '~/theme.js'

// Toast message
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

// MUI Dialog
import { ConfirmProvider } from 'material-ui-confirm'

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
  <CssVarsProvider theme={theme}>
    <ConfirmProvider
      defaultOptions={{
        allowClose: false,
        dialogProps: {
          maxWidth: 'xs'
        },
        confirmationButtonProps: { color: 'secondary', variant: 'outlined' },
        cancellationButtonProps: { color: 'inherit' }
      }}>
      <CssBaseline />
      <App />
      <ToastContainer theme='colored' position='bottom-left' />
    </ConfirmProvider>
  </CssVarsProvider>
  /* </React.StrictMode> */
)
