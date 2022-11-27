import React from 'react';
import client from '@urturn/client';
import { Button, Stack, Typography } from '@mui/material';

function HomeScreen() {
  return (
    <Stack
      spacing={2}
      sx={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Typography
        sx={{
          fontSize: '3em',
          color: 'white',
        }}
      >
        SONG GUESSER
      </Typography>
      <Button
        variant="contained"
        size="large"
        onClick={() => client.makeMove({ type: 'start_game' })}
      >
        START
      </Button>
    </Stack>
  );
}

export default HomeScreen;
