/* eslint-disable react/jsx-no-duplicate-props */
/* eslint-disable jsx-a11y/media-has-caption */
import React from 'react';
import Stack from '@mui/material/Stack';
import { TextField, useMediaQuery } from '@mui/material';

function GuessScreen() {
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
      <TextField
        id="outlined-basic"
        variant="outlined"
        autoFocus
        autoComplete="off"
        inputProps={{ style: { fontSize: useMediaQuery('(max-width:600px)') ? '1.5em' : '2rem' } }}
        InputProps={{ disableOutline: true }}
        sx={{
          backgroundColor: 'white',
          borderRadius: '5px',
        }}
      />
      <audio controls autoPlay>
        <source src="songs/dont_stop_believing_clip.mp3" type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
    </Stack>
  );
}

export default GuessScreen;
