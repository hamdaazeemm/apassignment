import '../styles/globals.css';
import { ThemeProvider as CustomThemeProvider, ThemeContext } from '../context/ThemeContext';
import Header from '../components/header';
import { useContext, useMemo } from 'react';
import { ThemeProvider as MuiThemeProvider, createTheme, CssBaseline } from '@mui/material';

function AppWrapper({ Component, pageProps }) {
  const { darkMode } = useContext(ThemeContext);

  // Dynamically create MUI theme based on darkMode
  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: darkMode ? 'dark' : 'light',
        },
      }),
    [darkMode]
  );

  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <Header />
      <Component {...pageProps} />
    </MuiThemeProvider>
  );
}

export default function App(props) {
  return (
    <CustomThemeProvider>
      <AppWrapper {...props} />
    </CustomThemeProvider>
  );
}
