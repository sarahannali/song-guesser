import { createTheme, ThemeProvider } from '@mui/material';
import React from 'react';
import ReactDOM from 'react-dom/client';
import Game from './Game';

const theme = createTheme({
  palette: {
    primary: {
      main: '#124E86',
    },
  },
  typography: {
    allVariants: {
      color: '#FFFFFF',
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
