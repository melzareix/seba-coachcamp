import { Box, Grommet } from 'grommet';
import React from 'react';
import './app.css';
import Home from './components/home/home';

const theme = {
  global: {
    colors: {
      brand: '#333',
    },
    font: {
      family: 'Work Sans',
      size: '18px',
      height: '20px',
    },
  },
  anchor: {
    color: 'dark-1',
    hover: {
      extend: () => {
        return {
          color: '#555555',
        };
      },
      textDecoration: 'none',
    },
  },
};

function App() {
  return (
    <Grommet theme={theme}>
      <Box height="high" width="full" overflow="hidden">
        <Home />
      </Box>
    </Grommet>
  );
}

export default App;
