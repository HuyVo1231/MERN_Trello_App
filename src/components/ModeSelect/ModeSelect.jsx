import { useColorScheme } from '@mui/material/styles'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import Box from '@mui/material/Box'
import LightModeIcon from '@mui/icons-material/LightMode'
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined'
import SettingsBrightness from '@mui/icons-material/SettingsBrightness'

function ModeSelect() {
  const { mode, setMode } = useColorScheme()
  const handleChange = (event) => {
    const selectedMode = event.target.value
    setMode(selectedMode)
  }

  return (
    <FormControl size='small' sx={{ minWidth: '120px' }}>
      <InputLabel
        sx={{ color: 'white', '&.Mui-focused': { color: 'white' } }}
        id='label-select-dark-light-mode'>
        Mode
      </InputLabel>
      <Select
        labelId='label-select-dark-light-mode'
        id='demo-select-small'
        value={mode}
        label='Mode'
        onChange={handleChange}
        sx={{
          color: 'white',
          '.MuiOutlinedInput-notchedOutline': {
            borderColor: 'white'
          },
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: 'white'
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: 'white'
          },
          '.MuiSvgIcon-root': {
            color: 'white'
          }
        }}>
        <MenuItem value='light'>
          <Box
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
            <LightModeIcon fontSize='small' /> Light
          </Box>
        </MenuItem>
        <MenuItem value='dark'>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <DarkModeOutlinedIcon fontSize='small' /> Dark
          </Box>
        </MenuItem>
        <MenuItem value='system'>
          <Box
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
            <SettingsBrightness fontSize='small' /> System
          </Box>
        </MenuItem>
      </Select>
    </FormControl>
  )
}

export default ModeSelect
