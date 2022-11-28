import { createTheme, ThemeProvider } from '@mui/material';
import React from 'react';
import ReactDOM from 'react-dom/client';
import Game from './Game';

const theme = createTheme({
  palette: {
    primary: {
      main: '#124E86',
    },
    secondary: {
      main: '#D9D9D9',
    },
  },
  typography: {
    allVariants: {
      color: '#D9D9D9',
    },
  },
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <Game />
    </ThemeProvider>
  </React.StrictMode>,
);
