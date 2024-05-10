import Button from "@mui/material/Button";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import {
  useColorScheme,
} from '@mui/material/styles';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import SettingsBrightness from "@mui/icons-material/SettingsBrightness";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";

function ModeSelect() {
  const { mode, setMode } = useColorScheme()
  const handleChange = (event) => {
    const selectedMode = event.target.value
    setMode(selectedMode)
  };

  return (
    <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
      <InputLabel id="label-select-dark-light-mode">Mode</InputLabel>
      <Select
        labelId="label-select-dark-light-mode"
        id="demo-select-small"
        value={mode}
        label="Mode"
        onChange={handleChange}
      >
        <MenuItem value="light">
          <div style={{ display: 'flex', alignItems: 'center', gap:'8px' }}>
            <LightModeIcon fontSize="small"/> Light
          </div>
        </MenuItem>
        <MenuItem value="dark">
          <Box sx={{ display: 'flex', alignItems: 'center', gap:1 }}>
            <DarkModeOutlinedIcon fontSize="small"/> Dark
          </Box>
        </MenuItem>
        <MenuItem value="system">
          <div style={{ display: 'flex', alignItems: 'center', gap:'8px' }}>
            <SettingsBrightness fontSize="small"/> System
          </div>
        </MenuItem>
      </Select>
    </FormControl>
  );
}

function ModeToggle() {
  const { mode, setMode } = useColorScheme();
  return (
    <Button
      onClick={() => {
        setMode(mode === 'light' ? 'dark' : 'light');
      }}
    >
      {mode === 'light' ? 'Turn dark' : 'Turn light'}
    </Button>
  );
}

function App() {
    return  ( 
      <Container disableGutters maxWidth={false} sx={{ height: '100vh', backgroundColor:'primary.main' }}>
        <Box sx={{ 
          backgroundColor: 'primary.light',
          width: '100%',
          height: (theme) => theme.trello.appBarHeight,
          display: 'flex',
          alignItems: 'center',
        }}>
          <ModeSelect/>
        </Box>
        <Box sx={{ 
          backgroundColor: 'primary.dark',
          width: '100%',
          height: (theme) => theme.trello.boardBarHeight,
          display: 'flex',
          alignItems: 'center',
        }}>
          Board bar
        </Box>
        <Box sx={{ 
          backgroundColor: 'primary.main',
          width: '100%',
          height: (theme) => `calc(100vh) - ${theme.trello.boardBarHeight} - ${theme.trello.appBarHeight}`,
          display: 'flex',
          alignItems: 'center',
         }}>
          Board content
        </Box>
      </Container>
    )
}

export default App;
