/* eslint-disable react/jsx-no-duplicate-props */
/* eslint-disable jsx-a11y/media-has-caption */
import React, { useState, useRef } from 'react';
import Stack from '@mui/material/Stack';
import { Grid, TextField, useMediaQuery } from '@mui/material';
import PropTypes from 'prop-types';

function GuessScreen() {
  const refs = useRef([]);

  const setFocus = (idx) => refs.current[idx].focus();

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
      <Grid
        spacing={1}
        container
        justifyContent="center"
      >
        <Grid item>
          <WordField
            idx={0}
            setFocus={setFocus}
            innerRef={(el) => { refs.current[0] = el; }}
          />
        </Grid>
        <Grid item>
          <WordField
            idx={1}
            setFocus={setFocus}
            innerRef={(el) => { refs.current[1] = el; }}
          />
        </Grid>
        <Grid item>
          <WordField
            idx={2}
            setFocus={setFocus}
            innerRef={(el) => { refs.current[2] = el; }}
          />
        </Grid>
      </Grid>
      <audio controls autoPlay>
        <source src="songs/dont_stop_believing_clip.mp3" type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
    </Stack>
  );
}

// eslint-disable-next-line no-unused-vars
function WordField({ idx, setFocus, innerRef }) {
  const [text, setText] = useState('');
  return (
    <TextField
      autoFocus={idx === 0}
      inputRef={innerRef}
      variant="outlined"
      autoComplete="off"
      inputProps={{ style: { fontSize: useMediaQuery('(max-width:600px)') ? '1.5em' : '2rem' } }}
      InputProps={{ disableOutline: true }}
      sx={{
        backgroundColor: 'white',
        borderRadius: '5px',
      }}
      value={text}
      onChange={(e) => { setText(e.target.value); }}
      onKeyDown={(e) => {
        if ((e.code === 'Space' || e.code === 'Enter') && idx < 2) {
          e.preventDefault();
          setFocus(idx + 1);
        }
        if (e.code === 'Backspace' && text.length === 0 && idx > 0) {
          e.preventDefault();
          setFocus(idx - 1);
        }
      }}
    />
  );
}

WordField.propTypes = {
  idx: PropTypes.number.isRequired,
  setFocus: PropTypes.func.isRequired,
  innerRef: PropTypes.func.isRequired,
};

export default GuessScreen;
