import { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';

export default function Header() {
  const { darkMode, setDarkMode } = useContext(ThemeContext);

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>Movie House</Typography>
        <Button color="inherit" onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? 'Light Mode' : 'Dark Mode'}
        </Button>
      </Toolbar>
    </AppBar>
  );
}
